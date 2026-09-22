from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.config import SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES
from app.database import get_db
from app.models import User

ALGORITHM = "HS256"
security = HTTPBearer()   # 从请求头 Authorization: Bearer xxx 里取令牌


def hash_password(password: str) -> str:
    """明文密码 → bcrypt 哈希(存库用)。"""
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, password_hash: str) -> bool:
    """校验明文密码和库里的哈希是否匹配。"""
    return bcrypt.checkpw(password.encode(), password_hash.encode())


def create_access_token(user_id: int) -> str:
    """签发 JWT,把 user_id 放进 sub,并设过期时间。"""
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "exp": expire}   # sub 必须是字符串
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    """依赖:解令牌 → 查出对应 User 对象。任何接口加上它就变成'登录才能访问'。"""
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
    except Exception:
        raise HTTPException(status_code=401, detail="无效或过期的令牌")

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=401, detail="用户不存在")
    return user