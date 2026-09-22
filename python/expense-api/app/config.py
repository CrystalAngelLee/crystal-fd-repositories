import os
from dotenv import load_dotenv

load_dotenv()  # 读取 .env,塞进环境变量

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://YOUR_USER@localhost/expense_v2")
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))