import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session
import bcrypt
import jwt

load_dotenv()

# ========== 配置 ==========
SECRET = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
engine = create_engine(os.getenv("DATABASE_URL"))

# ========== 数据库 ==========
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)   # 用户名唯一
    hashed_password = Column(String, nullable=False)         # 只存哈希,不存明文

Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ========== 请求体校验 ==========
class UserAuth(BaseModel):
    username: str
    password: str


# ========== 密码工具函数 ==========
def hash_password(password: str) -> str:
    # bcrypt 处理的是 bytes,所以要 encode();存库时再 decode 成字符串
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())


app = FastAPI()


# ========== 注册(已写好,当示范)==========
@app.post("/register", status_code=201)
def register(user: UserAuth, db: Session = Depends(get_db)):
    # 检查用户名是否已存在
    exists = db.query(User).filter(User.username == user.username).first()
    if exists:
        raise HTTPException(status_code=400, detail="用户名已存在")

    # 创建用户,密码存哈希值
    new_user = User(
        username=user.username,
        hashed_password=hash_password(user.password),   # 关键:加密后再存
    )
    db.add(new_user)
    db.commit()
    return {"message": "注册成功", "username": user.username}


# ========== 登录(留一处给你补)==========
@app.post("/login")
def login(user: UserAuth, db: Session = Depends(get_db)):
    # 1. 按用户名查用户
    db_user = db.query(User).filter(User.username == user.username).first()

    # 2. 用户不存在,或密码不对 → 都返回 401(不告诉对方到底哪错了,更安全)
    #    TODO: 补全这个 if 判断
    #    条件:db_user 不存在  或者  verify_password(用户输入的密码, db_user.hashed_password) 为假
    if not db_user or not verify_password(user.password, db_user.hashed_password):
    #    满足则 raise HTTPException(status_code=401, detail="用户名或密码错误")
        raise HTTPException(status_code=401, detail="用户名或密码错误")
    # 3. 验证通过,生成 JWT 令牌返回
    token = jwt.encode({"sub": db_user.username}, SECRET, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}


# ========== 认证依赖:验令牌、找出当前用户(已写好)==========
# HTTPBearer 会自动从请求头 "Authorization: Bearer <token>" 里提取令牌
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    token = credentials.credentials      # 拿到令牌字符串
    try:
        # 解开令牌;如果被篡改、过期或非法,jwt.decode 会抛异常
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        username = payload["sub"]
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="令牌无效")

    # 根据令牌里的用户名,查出真实用户
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="用户不存在")
    return user


# ========== 受保护的接口:留给你写 ==========
# TODO: 写一个 GET /me 接口,只有带有效令牌才能访问
@app.get("/me")
def read_me(current_user: User = Depends(get_current_user)):
#     只要参数里写了 current_user: User = Depends(get_current_user),
#     FastAPI 就会先跑上面的验令牌逻辑;通过了才进函数,current_user 就是当前登录用户。
#     返回 {"id": ..., "username": ...}
    return {"id": current_user.id, "username": current_user.username}