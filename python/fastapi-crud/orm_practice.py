from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    def __repr__(self):
        return f"<User id={self.id} name={self.name}>"

engine = create_engine("sqlite:///practice.db")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

# 清空,保证每次运行干净
session.query(User).delete()
session.commit()

session.add(User(name="小明"))
session.add(User(name="小红"))
session.add(User(name="小刚"))
session.commit()
print("新增后:", session.query(User).all())

print(session.query(User).filter(User.name == "小刚").first())

print(session.query(User).count())

session.close()
