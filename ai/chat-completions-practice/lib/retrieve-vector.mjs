/**
 * 向量检索：本地 Markdown → embedding 缓存 → 问题向量 → 余弦 topK
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadKnowledgeChunks } from "./retrieve.mjs";
import { cosineSimilarity, embedText, embedTexts, requireEnv } from "./embed.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = path.join(__dirname, "..", ".cache", "knowledge-embeddings.json");

function contentFingerprint(chunks) {
  return chunks.map((c) => `${c.id}:${c.content.length}:${hashLite(c.content)}`).join("|");
}

function hashLite(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h * 31 + text.charCodeAt(i)) | 0;
  }
  return String(h);
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

export async function ensureKnowledgeIndex() {
  const model = requireEnv("LLM_EMBED_MODEL");
  const chunks = loadKnowledgeChunks();
  const fingerprint = contentFingerprint(chunks);
  const cached = readCache();

  if (
    cached &&
    cached.model === model &&
    cached.fingerprint === fingerprint &&
    Array.isArray(cached.items) &&
    cached.items.length === chunks.length
  ) {
    return cached.items;
  }

  console.log("building embedding index…", `(${chunks.length} docs, model=${model})`);
  const vectors = await embedTexts(chunks.map((c) => c.content));
  const items = chunks.map((c, i) => ({
    id: c.id,
    content: c.content,
    embedding: vectors[i],
  }));

  writeCache({ model, fingerprint, items });
  return items;
}

/** @returns {{ id: string, content: string, score: number }[]} */
export async function retrieveByVector(question, { topK = 2 } = {}) {
  const items = await ensureKnowledgeIndex();
  const qVec = await embedText(question);

  return items
    .map((item) => ({
      id: item.id,
      content: item.content,
      score: cosineSimilarity(qVec, item.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
