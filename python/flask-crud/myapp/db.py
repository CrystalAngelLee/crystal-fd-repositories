# 数据库相关:连接 + 建表
# 从 app_db.py 里搬过来的,只是多了从 config 读取数据库名

import sqlite3
from config import DB_NAME   # 从 config.py 导入配置


def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()
