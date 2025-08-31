#!/usr/bin/env node
/* eslint-env node */

// Lightweight CDP client using the DevTools Protocol via WebSocket.
// Requires launching Edge/Chrome with --remote-debugging-port=9222.
// Outputs problem-matcher-friendly lines for VS Code Problems panel.

import http from 'node:http';
import { WebSocket } from 'ws';
import { setTimeout as delay } from 'node:timers/promises';

const proc = globalThis.process;
const DEVTOOLS_HOST = proc?.env?.CDP_HOST || '127.0.0.1';
const DEVTOOLS_PORT = Number(proc?.env?.CDP_PORT || 9222);
const TARGET_URL_PATTERN =
  proc?.env?.CDP_TARGET_PATTERN || 'http://localhost:3000';
const VERBOSE =
  proc?.env?.CDP_VERBOSE === '1' || proc?.env?.CDP_VERBOSE === 'true';

function logInfo(msg) {
  if (VERBOSE && proc?.stderr?.write) proc.stderr.write(`[cdp] ${msg}\n`);
}

function pmLine(severity, file, line, column, message) {
  return `${severity} ${file}:${line}:${column} ${message}`;
}

function fetchJson(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: DEVTOOLS_HOST,
        port: DEVTOOLS_PORT,
        path: pathname,
        method: 'GET',
      },
      res => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', chunk => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on('error', reject);
    req.end();
  });
}

async function findTarget() {
  const list = await fetchJson('/json');
  const pages = Array.isArray(list) ? list : [];
  let best = null;
  for (const p of pages) {
    if (p.type !== 'page' && p.type !== 'iframe') continue;
    if (!p.webSocketDebuggerUrl) continue;
    const url = String(p.url || '');
    if (url.startsWith(TARGET_URL_PATTERN)) {
      best = p;
      break;
    }
  }
  return best;
}

function connectWS(debugUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(debugUrl);
    ws.once('open', () => resolve(ws));
    ws.once('error', reject);
  });
}

let msgId = 0;
function send(ws, method, params) {
  const id = ++msgId;
  ws.send(JSON.stringify({ id, method, params }));
  return id;
}

function onMessage(ws, handlers) {
  ws.on('message', data => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.method && handlers[msg.method])
        handlers[msg.method](msg.params || {});
    } catch {
      // ignore parse errors
    }
  });
}

function extractLocation(details) {
  let file = 'browser';
  let line = 1;
  let column = 1;

  if (details && typeof details.url === 'string' && details.url) {
    file = details.url;
    if (typeof details.lineNumber === 'number') line = details.lineNumber;
    if (typeof details.columnNumber === 'number') column = details.columnNumber;
  }

  const frames =
    details && (details.stackTrace?.callFrames || details.stack?.callFrames);
  if (Array.isArray(frames) && frames.length > 0) {
    const f = frames[0];
    if (f.url) file = f.url;
    if (typeof f.lineNumber === 'number') line = f.lineNumber;
    if (typeof f.columnNumber === 'number') column = f.columnNumber;
  }
  return { file, line, column };
}

function summarizeConsole(params) {
  const type = params.type || 'log';
  const args = params.args || [];
  const texts = args.map(a => a.value ?? a.description ?? '').filter(Boolean);
  const message = texts.join(' ') || type;
  const { file, line, column } = extractLocation(
    params.stackTrace ? { stackTrace: params.stackTrace } : {}
  );
  const severity =
    type === 'error' ? 'ERROR' : type === 'warning' ? 'WARNING' : 'INFO';
  return pmLine(severity, file, line, column, message);
}

function summarizeException(params) {
  const exc = params?.exceptionDetails || {};
  const text =
    exc.text ||
    exc.exception?.description ||
    exc.exception?.value ||
    'Uncaught exception';
  const { file, line, column } = extractLocation(exc);
  return pmLine('ERROR', file, line, column, text);
}

async function main() {
  const start = Date.now();
  const timeoutMs = Number(proc?.env?.CDP_TIMEOUT_MS || 30000);
  let target = null;
  while (!target) {
    try {
      target = await findTarget();
      if (target) break;
    } catch {
      // ignore until timeout
    }
    if (Date.now() - start > timeoutMs) {
      if (proc?.stderr?.write)
        proc.stderr.write('cdp: timed out waiting for target\n');
      if (proc?.exit) proc.exit(2);
      return; // in case exit is not available
    }
    await delay(500);
  }

  logInfo(`Attaching to ${target.url}`);
  const ws = await connectWS(target.webSocketDebuggerUrl);

  send(ws, 'Runtime.enable');
  send(ws, 'Log.enable');
  send(ws, 'Page.enable');

  onMessage(ws, {
    'Runtime.consoleAPICalled': params => {
      try {
        const line = summarizeConsole(params);
        if (proc?.stdout?.write) proc.stdout.write(line + '\n');
      } catch (e) {
        logInfo(`console summarize error: ${e.message}`);
      }
    },
    'Runtime.exceptionThrown': params => {
      if (proc?.stdout?.write)
        proc.stdout.write('INFO browser:1:1 CDP monitor attached\n');
      try {
        const line = summarizeException(params);
        if (proc?.stdout?.write) proc.stdout.write(line + '\n');
      } catch (e) {
        logInfo(`exception summarize error: ${e.message}`);
      }
    },
    'Log.entryAdded': params => {
      try {
        const entry = params?.entry || {};
        const level = String(entry.level || 'info').toLowerCase();
        const severity =
          level === 'error'
            ? 'ERROR'
            : level === 'warning'
              ? 'WARNING'
              : 'INFO';
        const text = entry.text || entry.source || 'log';
        const { file, line, column } = extractLocation(entry);
        if (proc?.stdout?.write)
          proc.stdout.write(pmLine(severity, file, line, column, text) + '\n');
      } catch (e) {
        logInfo(`log entry summarize error: ${e.message}`);
      }
    },
  });

  ws.on('close', () => {
    if (proc?.stderr?.write) proc.stderr.write('cdp: connection closed\n');
    if (proc?.exit) proc.exit(0);
  });
  ws.on('error', err => {
    if (proc?.stderr?.write) proc.stderr.write(`cdp: error ${err.message}\n`);
    if (proc?.exit) proc.exit(1);
  });

  logInfo('CDP monitor attached and streaming events...');
}

main().catch(err => {
  if (proc?.stderr?.write) proc.stderr.write(`cdp: fatal ${err.message}\n`);
  if (proc?.exit) proc.exit(1);
});
