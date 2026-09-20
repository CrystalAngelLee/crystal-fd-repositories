/**
 * L1：system 规矩 + few-shot，再要 JSON
 *
 * 依赖与 chat-once.mjs 相同的 .env
 */

import { explainTerm } from "./lib/explain-term.mjs";

async function main() {
  const term = process.argv.slice(2).join(" ") || "事件循环";
  const { raw, data } = await explainTerm(term);
  console.log("raw content:", raw);
  console.log("parsed:", data);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
