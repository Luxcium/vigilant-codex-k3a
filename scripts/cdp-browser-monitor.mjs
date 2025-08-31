#!/usr/bin/env node
/* eslint-env node */

// Enhanced CDP monitor for VS Code integration
// Provides real-time browser error capture with VS Code problem matcher support
// Connects to DevTools Protocol and outputs formatted error lines

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
const RECONNECT_DELAY = Number(proc?.env?.CDP_RECONNECT_DELAY || 5000);
const MAX_RETRIES = Number(proc?.env?.CDP_MAX_RETRIES || 10);

class CDPMonitor {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.retryCount = 0;
    this.shouldReconnect = true;
  }

  logInfo(msg) {
    if (VERBOSE && proc?.stderr?.write) {
      proc.stderr.write(`[cdp] ${new Date().toISOString()} ${msg}\n`);
    }
  }

  logError(msg) {
    if (proc?.stderr?.write) {
      proc.stderr.write(`[cdp] ERROR: ${msg}\n`);
    }
  }

  // Format messages for VS Code problem matcher
  formatProblemLine(severity, file, line, column, message) {
    return `${severity} ${file}:${line}:${column} ${message}`;
  }

  async fetchJson(pathname) {
    return new Promise((resolve, reject) => {
      const req = http.request(
        {
          host: DEVTOOLS_HOST,
          port: DEVTOOLS_PORT,
          path: pathname,
          method: 'GET',
          timeout: 5000,
        },
        res => {
          let data = '';
          res.setEncoding('utf8');
          res.on('data', chunk => (data += chunk));
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error(`JSON parse error: ${e.message}`));
            }
          });
        }
      );
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      req.end();
    });
  }

  async findTarget() {
    try {
      const list = await this.fetchJson('/json');
      const pages = Array.isArray(list) ? list : [];

      for (const page of pages) {
        if (page.type !== 'page' && page.type !== 'iframe') continue;
        if (!page.webSocketDebuggerUrl) continue;

        const url = String(page.url || '');
        if (url.startsWith(TARGET_URL_PATTERN)) {
          return page;
        }
      }
      return null;
    } catch (error) {
      this.logError(`Failed to fetch targets: ${error.message}`);
      return null;
    }
  }

  extractLocation(details) {
    let file = 'browser';
    let line = 1;
    let column = 1;

    // Try to get location from URL and line/column numbers
    if (details && typeof details.url === 'string' && details.url) {
      file = details.url;
      if (typeof details.lineNumber === 'number') line = details.lineNumber;
      if (typeof details.columnNumber === 'number')
        column = details.columnNumber;
    }

    // Check stack trace for better location info
    const frames =
      details && (details.stackTrace?.callFrames || details.stack?.callFrames);
    if (Array.isArray(frames) && frames.length > 0) {
      const frame = frames[0];
      if (frame.url) file = frame.url;
      if (typeof frame.lineNumber === 'number') line = frame.lineNumber;
      if (typeof frame.columnNumber === 'number') column = frame.columnNumber;
    }

    return { file, line, column };
  }

  handleConsoleMessage(params) {
    try {
      const type = params.type || 'log';
      const args = params.args || [];
      const texts = args
        .map(a => a.value ?? a.description ?? '')
        .filter(Boolean);
      const message = texts.join(' ') || type;

      if (type === 'error' || type === 'warning') {
        const { file, line, column } = this.extractLocation(
          params.stackTrace ? { stackTrace: params.stackTrace } : {}
        );
        const severity = type === 'error' ? 'ERROR' : 'WARNING';
        const formattedLine = this.formatProblemLine(
          severity,
          file,
          line,
          column,
          message
        );

        if (proc?.stdout?.write) {
          proc.stdout.write(formattedLine + '\n');
        }
      }
    } catch (error) {
      this.logError(`Console message handling error: ${error.message}`);
    }
  }

  handleRuntimeException(params) {
    try {
      const exc = params?.exceptionDetails || {};
      const text =
        exc.text ||
        exc.exception?.description ||
        exc.exception?.value ||
        'Uncaught exception';
      const { file, line, column } = this.extractLocation(exc);
      const formattedLine = this.formatProblemLine(
        'ERROR',
        file,
        line,
        column,
        text
      );

      if (proc?.stdout?.write) {
        proc.stdout.write(formattedLine + '\n');
      }
    } catch (error) {
      this.logError(`Exception handling error: ${error.message}`);
    }
  }

  handleLogEntry(params) {
    try {
      const entry = params?.entry || {};
      const level = String(entry.level || 'info').toLowerCase();

      if (level === 'error' || level === 'warning') {
        const severity = level === 'error' ? 'ERROR' : 'WARNING';
        const text = entry.text || entry.source || 'log';
        const { file, line, column } = this.extractLocation(entry);
        const formattedLine = this.formatProblemLine(
          severity,
          file,
          line,
          column,
          text
        );

        if (proc?.stdout?.write) {
          proc.stdout.write(formattedLine + '\n');
        }
      }
    } catch (error) {
      this.logError(`Log entry handling error: ${error.message}`);
    }
  }

  async connectToTarget(target) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(target.webSocketDebuggerUrl);

      ws.on('open', () => {
        this.ws = ws;
        this.isConnected = true;
        this.retryCount = 0;

        this.logInfo(`Connected to ${target.url}`);

        // Enable required domains
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));

        // Output readiness signal for VS Code background task
        if (proc?.stdout?.write) {
          proc.stdout.write('INFO browser:1:1 CDP monitor attached\n');
        }

        resolve(ws);
      });

      ws.on('message', data => {
        try {
          const msg = JSON.parse(data.toString());

          if (msg.method && msg.params) {
            switch (msg.method) {
              case 'Runtime.consoleAPICalled':
                this.handleConsoleMessage(msg.params);
                break;
              case 'Runtime.exceptionThrown':
                this.handleRuntimeException(msg.params);
                break;
              case 'Log.entryAdded':
                this.handleLogEntry(msg.params);
                break;
            }
          }
        } catch (error) {
          this.logError(`Message parsing error: ${error.message}`);
        }
      });

      ws.on('close', () => {
        this.isConnected = false;
        this.ws = null;
        this.logInfo('WebSocket connection closed');

        if (this.shouldReconnect && this.retryCount < MAX_RETRIES) {
          this.scheduleReconnect();
        }
      });

      ws.on('error', error => {
        this.logError(`WebSocket error: ${error.message}`);
        reject(error);
      });
    });
  }

  async scheduleReconnect() {
    this.retryCount++;
    this.logInfo(
      `Scheduling reconnect attempt ${this.retryCount}/${MAX_RETRIES} in ${RECONNECT_DELAY}ms`
    );

    await delay(RECONNECT_DELAY);

    if (this.shouldReconnect && this.retryCount < MAX_RETRIES) {
      await this.start();
    } else if (this.retryCount >= MAX_RETRIES) {
      this.logError('Max reconnection attempts reached');
      if (proc?.exit) proc.exit(1);
    }
  }

  async start() {
    this.logInfo(`Starting CDP monitor for ${TARGET_URL_PATTERN}`);

    const target = await this.findTarget();

    if (!target) {
      this.logError('No suitable target found');
      await this.scheduleReconnect();
      return;
    }

    try {
      await this.connectToTarget(target);
    } catch (error) {
      this.logError(`Connection failed: ${error.message}`);
      await this.scheduleReconnect();
    }
  }

  stop() {
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Initialize and start monitor
const monitor = new CDPMonitor();

// Graceful shutdown
proc?.on?.('SIGINT', () => {
  monitor.stop();
  if (proc?.stdout?.write) {
    proc.stdout.write('INFO browser:1:1 CDP monitor shutting down\n');
  }
  if (proc?.exit) proc.exit(0);
});

proc?.on?.('SIGTERM', () => {
  monitor.stop();
  if (proc?.exit) proc.exit(0);
});

// Start monitoring
monitor.start().catch(error => {
  if (proc?.stderr?.write) {
    proc.stderr.write(`[cdp] Fatal error: ${error.message}\n`);
  }
  if (proc?.exit) proc.exit(1);
});
