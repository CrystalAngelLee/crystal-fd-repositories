/**
 * 文本切块：先按空行分段，再装进固定窗口；相邻块保留 overlap，避免关键句被切断。
 */

/**
 * @param {string} text
 * @param {{ maxChars?: number, overlap?: number }} [opts]
 * @returns {string[]}
 */
export function chunkText(text, opts = {}) {
  const maxChars = opts.maxChars ?? 280;
  const overlap = opts.overlap ?? 60;
  if (overlap < 0 || overlap >= maxChars) {
    throw new Error("overlap 必须 >= 0 且 < maxChars");
  }

  const paragraphs = String(text)
    .replace(/\r\n/g, "\n")
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  /** @type {string[]} */
  const chunks = [];
  let current = "";

  const pushAndOverlap = (piece) => {
    const trimmed = piece.trim();
    if (!trimmed) return;
    chunks.push(trimmed);
    return trimmed.slice(Math.max(0, trimmed.length - overlap));
  };

  const hardSplit = (longText) => {
    const step = maxChars - overlap;
    for (let i = 0; i < longText.length; i += step) {
      const slice = longText.slice(i, i + maxChars).trim();
      if (slice) chunks.push(slice);
    }
  };

  for (const para of paragraphs) {
    const candidate = current ? `${current}\n\n${para}` : para;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) {
      current = pushAndOverlap(current) || "";
      const again = current ? `${current}\n\n${para}` : para;
      if (again.length <= maxChars) {
        current = again;
      } else if (para.length <= maxChars) {
        if (current.trim()) chunks.push(current.trim());
        current = para;
      } else {
        if (current.trim()) chunks.push(current.trim());
        hardSplit(para);
        current = "";
      }
      continue;
    }

    // current 为空且单段超长
    hardSplit(para);
    current = "";
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}
