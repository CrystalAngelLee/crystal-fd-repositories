from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session

# ========== 数据库设置(SQLAlchemy 部分) ==========
Base = declarative_base()


class User(Base):                       # ORM 模型:对应数据库的 users 表
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


engine = create_engine("sqlite:///fastapi_orm.db")
Base.metadata.create_all(engine)        # 自动建表
SessionLocal = sessionmaker(bind=engine)


# 依赖注入:提供 db session,请求结束自动关闭
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ========== 请求/响应模型(Pydantic 部分) ==========
class UserCreate(BaseModel):            # 请求体校验:创建/更新时客户端要传什么
    name: str


# ========== FastAPI 应用 ==========
app = FastAPI()


# ---------- GET:查询所有(已写好,示范) ----------
@app.get("/api/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    # 把 ORM 对象转成普通字典再返回
    return [{"id": u.id, "name": u.name} for u in users]


# ---------- POST:新增(已写好,示范) ----------
@app.post("/api/users", status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(name=user.name)     # 用 Pydantic 拿到的数据创建 ORM 对象
    db.add(new_user)
    db.commit()
    db.refresh(new_user)                # 刷新,拿到数据库分配的 id
    return {"id": new_user.id, "name": new_user.name}


# ---------- PUT:更新(请你写) ----------
@app.put("/api/users/{user_id}")
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    # 1. 用 db.query(User).filter(User.id == user_id).first() 查出目标
    target = db.query(User).filter(User.id == user_id).first()
    if target is None:
        raise HTTPException(status_code=404, detail="用户不存在")
    # 2. 如果查出来是 None,raise HTTPException(status_code=404, detail="用户不存在")
    # 3. 存在就改属性:目标.name = user.name,然后 db.commit()
    target.name = user.name
    db.commit()
    # 4. 返回 {"id": ..., "name": ...}
    return {"id": target.id, "name": target.name}


# ---------- DELETE:删除(请你写) ----------
@app.delete("/api/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    # 1. 查出目标(同上)
    target = db.query(User).filter(User.id == user_id).first()
    if target is None:
        raise HTTPException(status_code=404, detail="用户不存在")
    # 2. None → raise 404
    # 3. 存在就 db.delete(目标) 然后 db.commit()
    db.delete(target)
    db.commit()
    # 4. 返回 {"message": "删除成功"}
    return {"message": "删除成功"}
