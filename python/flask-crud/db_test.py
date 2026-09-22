import sqlite3

conn = sqlite3.connect("test.db")
cursor = conn.cursor()

# 1. 建表(IF NOT EXISTS 表示如果表已存在就不重复建)
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
""")

# 2. 插入两条数据(请你补全:用 ? 占位符插入"小明"和"小红")
cursor.execute("INSERT INTO users (name) VALUES (?)", ("小明",))
# TODO: 再插入一条"小红"
cursor.execute("INSERT INTO users (name) VALUES (?)", ("小红",))

# 3. 提交
conn.commit()

# 4. 查询所有并打印(请你补全)
# TODO: 用 SELECT 查出所有,fetchall() 拿到结果,for 循环打印每一行
cursor.execute("SELECT * FROM users")
rows = cursor.fetchall()
for row in rows:
    print(row)

conn.close()