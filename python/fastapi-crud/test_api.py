# 测试 fastapi_app.py 里的接口
from fastapi.testclient import TestClient
from fastapi_app import app

client = TestClient(app)


# ---------- 示范:测 GET 列表 ----------
def test_get_users():
    response = client.get("/api/users")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2          # fastapi_app 初始有 2 个用户(小明、小红)
    assert data[0]["name"] == "小明"


# ---------- 🎯 任务 1:测 POST 新增 ----------
def test_create_user():
    # TODO:
    # 1. response = client.post("/api/users", json={"name": "小刚"})
    #    (注意:TestClient 用 json=... 直接传字典,比 curl 方便)
    response = client.post("/api/users", json={"name": "小刚"})
    # 2. assert 状态码 == 201
    assert response.status_code == 201
    # 3. assert 返回的 json()["name"] == "小刚"
    assert response.json()["name"] == "小刚"


# ---------- 🎯 任务 2:测查不存在的用户返回 404 ----------
def test_get_user_not_found():
    # TODO:
    # 1. response = client.get("/api/users/999")   # 999 不存在
    response = client.get("/api/users/999")
    # 2. assert 状态码 == 404
    assert response.status_code == 404
