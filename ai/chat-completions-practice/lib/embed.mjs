/**
 * OpenAI 兼容 Embeddings：POST {base}/embeddings
 */

export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`缺少环境变量 ${name}。`);
  }
  return value;
}

export async function embedTexts(texts) {
  const apiKey = requireEnv("LLM_API_KEY");
  const baseUrl = requireEnv("LLM_BASE_URL").replace(/\/$/, "");
  const model = requireEnv("LLM_EMBED_MODEL");

  const input = Array.isArray(texts) ? texts : [texts];
  const res = await fetch(`${baseUrl}/embeddings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, input }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `embeddings 调用失败 ${res.status}: ${JSON.stringify(data)}（检查 LLM_EMBED_MODEL 是否与平台一致）`
    );
  }

  const rows = data.data;
  if (!Array.isArray(rows) || rows.length !== input.length) {
    throw new Error(`embeddings 响应异常: ${JSON.stringify(data)}`);
  }

  // 部分网关不保证顺序，按 index 排序
  const sorted = [...rows].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  return sorted.map((row) => {
    if (!Array.isArray(row.embedding)) {
      throw new Error(`缺少 embedding 字段: ${JSON.stringify(row)}`);
    }
    return row.embedding;
  });
}

export async function embedText(text) {
  const [vec] = await embedTexts([text]);
  return vec;
}

/** 余弦相似度，范围约 [-1, 1]，越接近 1 越相似 */
export function cosineSimilarity(a, b) {
  if (!a?.length || a.length !== b.length) {
    throw new Error("向量维度不一致，无法计算相似度");
  }
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  if (denom === 0) return 0;
  return dot / denom;
}
