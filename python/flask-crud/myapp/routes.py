from flask import Blueprint, jsonify, request
from db import get_db

bp = Blueprint("api", __name__)      # 创建一个蓝图

@bp.route("/api/users", methods=["GET"])
def get_users():
    conn = get_db()
    rows = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    # rows 是一堆 sqlite3.Row,转成普通字典列表再返回 JSON
    users = [{"id": r["id"], "name": r["name"]} for r in rows]
    return jsonify(users)


# ---------- POST:新增用户(请你改成数据库版) ----------
@bp.route("/api/users", methods=["POST"])
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

@bp.route("/api/users/<int:user_id>", methods=["PUT"])
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
@bp.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    conn = get_db()
    row = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    if not row:
        conn.close()
        return jsonify({"error": "用户不存在"}), 404
    conn.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "删除成功"})
