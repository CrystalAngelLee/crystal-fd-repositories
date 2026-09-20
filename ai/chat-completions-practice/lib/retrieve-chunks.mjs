/**
 * 切块后的向量索引与检索（与「整篇一个向量」分开缓存）
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chunkText } from "./chunk.mjs";
import { cosineSimilarity, embedText, embedTexts, requireEnv } from "./embed.mjs";
import { loadKnowledgeChunks } from "./retrieve.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = path.join(__dirname, "..", ".cache", "knowledge-embeddings-chunks.json");

function hashLite(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) | 0;
  }
  return String(h);
}

function buildChunkRecords({ maxChars, overlap }) {
  const docs = loadKnowledgeChunks();
  /** @type {{ id: string, source: string, content: string }[]} */
  const records = [];
  for (const doc of docs) {
    const parts = chunkText(doc.content, { maxChars, overlap });
    parts.forEach((part, i) => {
      records.push({
        id: `${doc.id}#c${i}`,
        source: doc.id,
        content: part,
      });
    });
  }
  return records;
}

function fingerprint(records, maxChars, overlap) {
  const body = records.map((r) => `${r.id}:${r.content.length}:${hashLite(r.content)}`).join("|");
  return `max=${maxChars}|overlap=${overlap}|${body}`;
}

function readCache() {
  if (!fs.existsSync(CACHE_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return null;
  }
}

function writeCache(payload) {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(payload, null, 2), "utf8");
}

export async function ensureChunkIndex(opts = {}) {
  const maxChars = opts.maxChars ?? 280;
  const overlap = opts.overlap ?? 60;
  const model = requireEnv("LLM_EMBED_MODEL");
  const records = buildChunkRecords({ maxChars, overlap });
  const fp = fingerprint(records, maxChars, overlap);
  const cached = readCache();

  if (
    cached &&
    cached.model === model &&
    cached.fingerprint === fp &&
    Array.isArray(cached.items) &&
    cached.items.length === records.length
  ) {
    return cached.items;
  }

  console.log(
    "building chunk embedding index…",
    `(${records.length} chunks from ${loadKnowledgeChunks().length} docs, maxChars=${maxChars}, overlap=${overlap})`
  );

  const vectors = await embedTexts(records.map((r) => r.content));
  const items = records.map((r, i) => ({
    id: r.id,
    source: r.source,
    content: r.content,
    embedding: vectors[i],
  }));

  writeCache({ model, fingerprint: fp, maxChars, overlap, items });
  return items;
}

/** @returns {{ id: string, source: string, content: string, score: number }[]} */
export async function retrieveByChunkVector(question, opts = {}) {
  const topK = opts.topK ?? 3;
  const items = await ensureChunkIndex(opts);
  const qVec = await embedText(question);

  return items
    .map((item) => ({
      id: item.id,
      source: item.source,
      content: item.content,
      score: cosineSimilarity(qVec, item.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
