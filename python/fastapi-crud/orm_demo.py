from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# ---------- ① 定义模型:一个类 = 一张表 ----------
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)      # 主键,自动递增
    name = Column(String, nullable=False)       # name 列,不能为空

    # 这个方法只是为了打印时好看(可选)
    def __repr__(self):
        return f"<User id={self.id} name={self.name}>"


# ---------- ② 引擎:连接数据库并建表 ----------
engine = create_engine("sqlite:///orm.db")
Base.metadata.create_all(engine)     # 根据 User 类自动建表(不用写 CREATE TABLE)

# ---------- ③ 会话:增删改查的入口 ----------
Session = sessionmaker(bind=engine)
session = Session()


# ========== 演示完整 CRUD ==========

# 先清空,保证每次运行结果干净
session.query(User).delete()
session.commit()

# 【增】创建两个用户
session.add(User(name="小明"))
session.add(User(name="小红"))
session.commit()
print("新增后:", session.query(User).all())

# 【查】按条件查一个
u = session.query(User).filter(User.id == 1).first()
print("查 id=1:", u)

# 【改】把小明改名成小明明
u.name = "小明明"
session.commit()
print("改名后:", session.query(User).all())

# 【删】删掉 id=2
target = session.query(User).filter(User.id == 2).first()
session.delete(target)
session.commit()
print("删除后:", session.query(User).all())

session.close()
