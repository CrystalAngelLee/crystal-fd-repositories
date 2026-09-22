# Python 练习仓库

从独立 `python-learning` 合并而来。按阶段拆分，对应公开文档里的「Python 后端进阶」路径。

| 目录 | 内容 |
| --- | --- |
| `basics/` | 语法小练习 + pytest |
| `flask-crud/` | Flask 内存/SQLite CRUD、`myapp` Blueprint 拆分 |
| `fastapi-crud/` | FastAPI、SQLAlchemy、JWT、pytest |
| `alembic-demo/` | Alembic 迁移最小示例 |
| `expense-tracker/` | 记账本 API（单服务 + Dockerfile） |
| `expense-api/` | 毕业项目：多用户 + Alembic + Docker Compose |

## 本地环境

```bash
cd crystal-fd-repositories/python
python3 -m venv .venv
source .venv/bin/activate
# 在各子项目目录按 requirements.txt 安装
```

不要提交 `.env`、`*.db`、`.venv/`。
