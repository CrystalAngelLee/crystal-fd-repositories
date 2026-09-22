from flask import Flask, jsonify, request

# 创建一个 Flask 应用
app = Flask(__name__)

users = [
    {"id": 1, "name": "小明"},
    {"id": 2, "name": "小红"},
]

# @app.route 把一个"网址路径"和下面的函数绑定起来
# 访问 http://localhost:5000/ 时,就会运行 home() 函数
@app.route("/")
def home():
    return "你好,这是我的第一个后端服务!"


# 访问 http://localhost:5000/hello/小明 时,把"小明"作为参数传进来
@app.route("/hello/<name>")
def hello(name):
    return f"你好,{name}!"


# 返回 JSON 数据(后端 API 最常见的形式)
@app.route("/api/user")
def get_user():
    user = {"id": 1, "name": "小明", "age": 25}
    return user   # Flask 会自动把字典转成 JSON

@app.route("/api/users")
def get_users():
    return jsonify(users)    


@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()

    if not data or "name" not in data:
        return jsonify({"error": "缺少 name 参数"}), 400

    new_user = {
        "id": len(users) + 1,       # 简单地用长度+1当新 id
        "name": data["name"]
    }
    users.append(new_user)          # 加到列表里
    return jsonify(new_user), 201

@app.route("/api/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    # <int:user_id> 表示 URL 里这段是整数,自动转成 int 传进来
    # 任务:从 users 列表里删掉 id 等于 user_id 的那个用户
    # 提示:可以用列表推导式,或者循环找到后 users.remove(那个用户)
    global users                                      # 声明要修改全局变量

    found = any(u["id"] == user_id for u in users)
    if not user_id or user_id <= 0:
        return jsonify({"error": "无效的用户 ID"}), 400
    if not found:
        return jsonify({"error": "用户不存在"}), 404
    
    users = [u for u in users if u["id"] != user_id]  # 保留 id 不等于目标的
    return jsonify({"message": "删除成功"})

# 启动服务器
if __name__ == "__main__":
    app.run(port=5000, debug=True)
