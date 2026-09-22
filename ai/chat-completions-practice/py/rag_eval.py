import json
import os

BASE = os.path.dirname(os.path.abspath(__file__))

# 读 cases：加载 ../eval/rag-cases.json
with open(os.path.join(BASE, '..', 'eval', 'rag-cases.json'), 'r', encoding='utf-8') as f:
    cases = json.load(f)
print(cases)


# 读 knowledge：列出 ../knowledge/*.md，每篇变成 {id: 文件名, content: 全文}。
knowledge_dir = os.path.join(BASE, '..', 'knowledge')
knowledge = []
for file in os.listdir(knowledge_dir):
    if file.endswith('.md'):
        with open(os.path.join(knowledge_dir, file), 'r', encoding='utf-8') as f:
            knowledge.append({
                'id': file,
                'content': f.read()
            })
print(knowledge)