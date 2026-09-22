from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

DB_NAME = "app.db"


# 辅助函数:拿到一个数据库连接
def get_db():
    conn = sqlite3.connect(DB_NAME)
    # 这一行让查询结果能像字典一样用列名访问(row["name"]),而不是只能用下标
    conn.row_factory = sqlite3.Row
    return conn


# 启动时建表(如果还没建)
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


# ---------- GET:查询所有用户(已写好,当作示范) ----------
@app.route("/api/users", methods=["GET"])
def get_users():
    conn = get_db()
    rows = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    # rows 是一堆 sqlite3.Row,转成普通字典列表再返回 JSON
    users = [{"id": r["id"], "name": r["name"]} for r in rows]
    return jsonify(users)


# ---------- POST:新增用户(请你改成数据库版) ----------
@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()
    if not data or "name" not in data:
        return jsonify({"error": "缺少 name 参数"}), 400

    # TODO 1: 用 get_db() 拿连接
    conn = get_db()
    # TODO 2: execute 一条 INSERT 语句(记得用 ? 占位符传 data["name"])
    cursor = conn.execute("INSERT INTO users (name) VALUES (?)", (data["name"],))
    # TODO 3: conn.commit() 提交
    conn.commit()
    # 小提示:插入后可以用 cursor.lastrowid 拿到新记录的 id
    #        cursor = conn.execute("INSERT ...", (...,))
    #        new_id = cursor.lastrowid
    # TODO 4: conn.close()
    conn.close()
    # TODO 5: 返回 {"id": new_id, "name": data["name"]} 和状态码 201
    return jsonify({"id": cursor.lastrowid, "name": data["name"]}), 201

@app.route("/api/users/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()

    # 1. 校验:和 POST 一样,没传 name 就返回 400
    if not data or "name" not in data:
        return jsonify({"error": "缺少 name 参数"}), 400

    # 2. 拿连接,先查 id 存不存在(和 DELETE 里一样,用 fetchone)
    conn = get_db()
    row = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    #    不存在 → close 后返回 {"error": "用户不存在"}, 404
    if not row:
        conn.close()
        return jsonify({"error": "用户不存在"}), 404
    # 3. 存在就执行 UPDATE:
    conn.execute("UPDATE users SET name = ? WHERE id = ?", (data["name"], user_id))
    #    注意占位符顺序:第一个 ? 对应 name,第二个 ? 对应 id
    #    然后 commit、close
    conn.commit()
    conn.close()

    # 4. 返回更新后的数据 {"id": user_id, "name": data["name"]}(状态码默认 200)
    return jsonify({"id": user_id, "name": data["name"]}), 200

# ---------- DELETE:删除用户(请你改成数据库版) ----------
@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    # TODO 1: 拿连接
    conn = get_db()
    # TODO 2: 先查这个 id 存不存在:
    #         row = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    #         fetchone() 查一条,不存在返回 None
    row = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    # TODO 3: 如果 row 是 None,close 后返回 {"error": "用户不存在"}, 404
    if not row:
        conn.close()
        return jsonify({"error": "用户不存在"}), 404
    # TODO 4: 存在就 execute 一条 DELETE ... WHERE id = ?,commit,close
    conn.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()
    # TODO 5: 返回 {"message": "删除成功"}
    return jsonify({"message": "删除成功"})


if __name__ == "__main__":
    init_db()          # 启动前先建表
    app.run(port=5000, debug=True)
