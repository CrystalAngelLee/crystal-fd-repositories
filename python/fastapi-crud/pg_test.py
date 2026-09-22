from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# 1. 连接串:连到本机的 learning 库(把 XXX 换成正确的连接串)
engine = create_engine("postgresql://YOUR_USER@localhost/learning")

Base = declarative_base()

# 2. 定义一个 User 模型,对应你在 psql 里建的 users 表
#    表名要和数据库里的一致(users),三列:id / name / age
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)

# 3. 开个 session
Session = sessionmaker(bind=engine)
session = Session()

# 4. 查出所有用户并打印(用你学过的 ORM 查询)
users = session.query(User).all()
for u in users:
    print(u.id, u.name, u.age)

session.close()