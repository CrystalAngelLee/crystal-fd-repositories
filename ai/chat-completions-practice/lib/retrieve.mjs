/**
 * 极简检索：按关键词命中数给本地知识片段打分
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = path.join(__dirname, "..", "knowledge");

function tokenize(text) {
  return String(text)
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fff]+/i)
    .filter((t) => t.length >= 2);
}

export function loadKnowledgeChunks() {
  const files = fs.readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const full = path.join(KNOWLEDGE_DIR, file);
    const content = fs.readFileSync(full, "utf8");
    return { id: file, content };
  });
}

/** @returns {{ id: string, content: string, score: number }[]} */
export function retrieve(question, { topK = 2 } = {}) {
  const qTokens = new Set(tokenize(question));
  if (qTokens.size === 0) return [];

  const scored = loadKnowledgeChunks()
    .map((chunk) => {
      const cTokens = tokenize(chunk.content);
      let score = 0;
      for (const t of qTokens) {
        if (cTokens.includes(t)) score += 1;
      }
      return { ...chunk, score };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}
