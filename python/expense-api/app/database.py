from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.config import DATABASE_URL

# engine:连接池入口,只认一个连接串。换库只改 .env,代码不动。
engine = create_engine(DATABASE_URL)

# Session 工厂:每个请求开一个会话操作数据库
SessionLocal = sessionmaker(bind=engine, autoflush=False)

# 所有 ORM 模型的基类(下一步 models.py 要继承它)
Base = declarative_base()


def get_db():
    """FastAPI 依赖:每个请求发一个 db,用完自动关闭。"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()