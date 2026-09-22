"""
极简检索：按关键词命中数给本地知识片段打分
"""

import os
import re

# 本文件在 py/raglib/，要比 JS 的 lib/ 多往上走一层才到仓库根
_BASE = os.path.dirname(os.path.abspath(__file__))
KNOWLEDGE_DIR = os.path.join(_BASE, "..", "..", "knowledge")

_TOKEN_SPLIT = re.compile(r"[^a-z0-9\u4e00-\u9fff]+", re.IGNORECASE)


def tokenize(text):
    return [t for t in _TOKEN_SPLIT.split(str(text).lower()) if len(t) >= 2]


def load_knowledge_chunks():
    files = [f for f in os.listdir(KNOWLEDGE_DIR) if f.endswith(".md")]
    chunks = []
    for file in files:
        full = os.path.join(KNOWLEDGE_DIR, file)
        with open(full, "r", encoding="utf-8") as fh:
            content = fh.read()
        chunks.append({"id": file, "content": content})
    return chunks


def retrieve(question, top_k=2):
    q_tokens = set(tokenize(question))
    if not q_tokens:
        return []

    scored = []
    for chunk in load_knowledge_chunks():
        c_tokens = tokenize(chunk["content"])
        score = 0
        for t in q_tokens:
            if t in c_tokens:
                score += 1
        scored.append({**chunk, "score": score})

    scored = [c for c in scored if c["score"] > 0]
    scored.sort(key=lambda c: c["score"], reverse=True)
    return scored[:top_k]
