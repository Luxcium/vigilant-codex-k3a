#!/usr/bin/env node
import { loadGraph } from '../loader.js';

const graphFile = process.argv[2] || 'examples/hierarchical.json';

async function main() {
  const graph = await loadGraph(new URL(graphFile, import.meta.url).pathname);
  process.stdin.on('data', async (d) => {
    const res = await graph.act(d.toString().trim(), { memory: new (await import('../core/InMemoryMemory.js')).InMemoryMemory(), tools: { vector: new (await import('../core/InMemoryVectorStore.js')).InMemoryVectorStore() } });
    console.log(res.content);
  });
}
main();
