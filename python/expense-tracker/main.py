import os
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker, Session

# ========== 数据库骨架(已写好,直接用) ==========
Base = declarative_base()


# ---------- 阶段① 任务 A:定义 ORM 模型 ----------
# TODO: 定义一个 Expense 类,继承 Base
#   __tablename__ = "expenses"
#   id:       Column(Integer, primary_key=True)
#   amount:   Column(Float, nullable=False)      # 金额用 Float
#   category: Column(String, nullable=False)
#   note:     Column(String)                      # 备注可为空,不写 nullable
#
class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    note = Column(String)

engine = create_engine(os.getenv("DATABASE_URL", "sqlite:///expenses.db"))
# engine = create_engine("postgresql://YOUR_USER@localhost/expense_tracker")
# engine = create_engine("sqlite:///expenses.db")
# 注意:模型定义好后,下面这行才能正确建表
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------- 阶段① 任务 B:定义请求体校验模型(Pydantic) ----------
# TODO: 定义 ExpenseCreate(BaseModel),字段:
#   amount: float
#   category: str
#   note: str = ""        # 默认空字符串,表示备注可以不传
#
class ExpenseCreate(BaseModel):
    amount: float
    category: str
    note: str = ""

app = FastAPI()


# ---------- 阶段① 任务 C:POST 记一笔 ----------
# TODO: 参考 fastapi_orm.py 的 create_user
# @app.post("/api/expenses", status_code=201)
# def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
#     用 expense.amount / expense.category / expense.note 创建 Expense 对象
#     add / commit / refresh,返回 {"id":..., "amount":..., "category":..., "note":...}
@app.post("/api/expenses", status_code=201)
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    new_expense = Expense(amount=expense.amount, category=expense.category, note=expense.note)
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return {"id": new_expense.id, "amount": new_expense.amount, "category": new_expense.category, "note": new_expense.note}

# ---------- 阶段① 任务 D:GET 查全部 ----------
# TODO: 参考 fastapi_orm.py 的 get_users
# @app.get("/api/expenses")
# def get_expenses(db: Session = Depends(get_db)):
#     查出所有 Expense,转成字典列表返回
@app.get("/api/expenses")
def get_expenses(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()
    return [{"id": e.id, "amount": e.amount, "category": e.category, "note": e.note} for e in expenses]


@app.put("/api/expenses/{expense_id}")
def update_expense(expense_id: int, expense: ExpenseCreate, db: Session = Depends(get_db)):
    target = db.query(Expense).filter(Expense.id == expense_id).first()
    if target is None:
        raise HTTPException(status_code=404, detail="expense not found")
    target.amount = expense.amount
    target.category = expense.category
    target.note = expense.note
    db.commit()
    return {"id": target.id, "amount": target.amount, "category": target.category, "note": target.note}

@app.delete("/api/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    target = db.query(Expense).filter(Expense.id == expense_id).first()
    if target is None:
        raise HTTPException(status_code=404, detail="expense not found")
    db.delete(target)
    db.commit()
    return {"message": "expense deleted"}

@app.get("/api/expenses/stats")
def get_stats(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()      # 先查出所有记录

    total = 0
    by_category = {}                        # 空字典,累加每个类别

    for e in expenses:
        total += e.amount                   # 累加总额
        # 累加到对应类别:如果这个类别还没出现过,先设为 0,再加
        by_category[e.category] = by_category.get(e.category, 0) + e.amount

    return {"total": total, "by_category": by_category}