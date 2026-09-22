from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# 内存数据(先聚焦 FastAPI 本身,不掺数据库)
users = [
    {"id": 1, "name": "小明"},
    {"id": 2, "name": "小红"},
]


# ⭐ Pydantic 模型:定义"新增用户时,请求体该长什么样"
# FastAPI 会自动校验:少了 name、或 name 不是字符串,都会被自动拦下
class UserCreate(BaseModel):
    name: str


# ---------- GET:查询所有用户 ----------
# 注意:Flask 是 @app.route(..., methods=["GET"]),FastAPI 直接 @app.get(...)
@app.get("/api/users")
def get_users():
    return users        # 不用 jsonify,FastAPI 自动转 JSON


# ---------- POST:新增用户 ----------
# 参数 user: UserCreate —— FastAPI 看到类型是 Pydantic 模型,
# 就会自动从请求体解析 JSON、校验字段,再把结果给你。不用手写 if 校验!
@app.post("/api/users", status_code=201)
def create_user(user: UserCreate):
    new_user = {"id": len(users) + 1, "name": user.name}   # 用 user.name 取值
    users.append(new_user)
    return new_user


# ---------- 根据 id 查单个(顺便认识路径参数)----------
@app.get("/api/users/{user_id}")
def get_user(user_id: int):        # 类型写 int,FastAPI 自动转换和校验
    for u in users:
        if u["id"] == user_id:
            return u
    # 找不到就抛 HTTPException,FastAPI 自动返回 404 + 错误 JSON
    raise HTTPException(status_code=404, detail="用户不存在")

@app.put("/api/users/{user_id}")
def update_user(user_id: int, user: UserCreate):   # 同时收 路径id 和 请求体
    for u in users:
        if u["id"] == user_id:
            u["name"] = user.name      # 找到就改名
            return u
    raise HTTPException(status_code=404, detail="用户不存在")   # 找不到抛 404

@app.delete("/api/users/{user_id}")
def delete_user(user_id: int):
    # 提示:
    # 1. 遍历 users 找到 id == user_id 的那个
    for u in users:
        if u["id"] == user_id:
    # 2. 找到就用 users.remove(那个用户),然后 return {"message": "删除成功"}
            users.remove(u)
            return {"message": "删除成功"}
    # 3. 循环结束都没找到,raise HTTPException(status_code=404, detail="用户不存在")
    raise HTTPException(status_code=404, detail="用户不存在")