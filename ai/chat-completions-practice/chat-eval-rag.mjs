/**
 * RAG 小评测：固定用例，对比 keyword / whole-vector / chunk-vector 是否命中期望来源
 *
 * 不调 Chat（省额度）；只评「检索有没有找对文档」。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { retrieve } from "./lib/retrieve.mjs";
import { retrieveByVector } from "./lib/retrieve-vector.mjs";
import { retrieveByChunkVector } from "./lib/retrieve-chunks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CASES_PATH = path.join(__dirname, "eval", "rag-cases.json");

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`缺少环境变量 ${name}。`);
  }
  return value;
}

function sourceOf(hit) {
  if (hit.source) return hit.source;
  const id = String(hit.id || "");
  const hash = id.indexOf("#");
  return hash >= 0 ? id.slice(0, hash) : id;
}

function hitExpected(hits, expectSources) {
  const got = new Set(hits.map(sourceOf));
  const missing = expectSources.filter((s) => !got.has(s));
  return { ok: missing.length === 0, got: [...got], missing };
}

function printRow(label, result, hits) {
  const mark = result.ok ? "PASS" : "FAIL";
  const preview = hits
    .slice(0, 3)
    .map((h) => `${h.id}(${typeof h.score === "number" ? h.score.toFixed?.(4) ?? h.score : h.score})`)
    .join(", ");
  console.log(`  [${mark}] ${label}: got=[${result.got.join(", ") || "-"}] ${preview}`);
  if (!result.ok) {
    console.log(`         missing=[${result.missing.join(", ")}]`);
  }
}

async function main() {
  requireEnv("LLM_EMBED_MODEL");

  const cases = JSON.parse(fs.readFileSync(CASES_PATH, "utf8"));
  const topK = Number(process.env.RAG_TOP_K || 3);
  const maxChars = Number(process.env.RAG_CHUNK_CHARS || 280);
  const overlap = Number(process.env.RAG_CHUNK_OVERLAP || 60);

  const tally = {
    keyword: { pass: 0, fail: 0 },
    vector: { pass: 0, fail: 0 },
    chunk: { pass: 0, fail: 0 },
  };

  console.log(`cases=${cases.length} topK=${topK} chunk(max=${maxChars}, overlap=${overlap})\n`);

  for (const c of cases) {
    console.log(`## ${c.id}`);
    console.log(`Q: ${c.question}`);
    console.log(`expect: ${c.expectSources.join(", ")} (${c.note || ""})`);

    const kwHits = retrieve(c.question, { topK });
    const kw = hitExpected(kwHits, c.expectSources);
    printRow("keyword", kw, kwHits);
    tally.keyword[kw.ok ? "pass" : "fail"] += 1;

    const vHits = await retrieveByVector(c.question, { topK });
    const v = hitExpected(vHits, c.expectSources);
    printRow("vector ", v, vHits);
    tally.vector[v.ok ? "pass" : "fail"] += 1;

    const cHits = await retrieveByChunkVector(c.question, {
      topK,
      maxChars,
      overlap,
    });
    const ch = hitExpected(cHits, c.expectSources);
    printRow("chunk  ", ch, cHits);
    tally.chunk[ch.ok ? "pass" : "fail"] += 1;

    console.log("");
  }

  console.log("========== summary ==========");
  for (const [name, s] of Object.entries(tally)) {
    const total = s.pass + s.fail;
    console.log(`${name}: ${s.pass}/${total} pass`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
