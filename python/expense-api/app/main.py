from typing import List

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User, Expense
from app.schemas import UserCreate, Token, ExpenseCreate, ExpenseOut, BudgetDeposit
from app.auth import (
    hash_password, verify_password, create_access_token, get_current_user
)

app = FastAPI(title="Expense API")


# ---------- 认证 ----------
@app.post("/register", status_code=201)
def register(body: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == body.username).first():
        raise HTTPException(status_code=400, detail="用户名已存在")
    user = User(username=body.username, password_hash=hash_password(body.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "username": user.username}


@app.post("/login", response_model=Token)
def login(body: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == body.username).first()
    if user is None or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="用户名或密码错误")
    return Token(access_token=create_access_token(user.id))


@app.post("/api/budget/deposit")
def deposit(
    body: BudgetDeposit,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # 原子加钱:数据库端计算 budget = budget + amount,天然并发安全
    db.query(User).filter(User.id == current_user.id).update(
        {User.budget: User.budget + body.amount},
        synchronize_session=False,
    )
    db.commit()
    user = db.query(User).filter(User.id == current_user.id).first()
    return {"budget": user.budget}


# ---------- 记账(登录才能访问,且只操作自己的数据)----------
@app.post("/api/expenses", response_model=ExpenseOut, status_code=201)
def create_expense(
    body: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # D6 并发安全:WHERE budget >= amount 保证不透支;
    #             SET budget = budget - amount 是【数据库端】原子计算,不存在"读到应用里再算"的空档。
    rows = db.query(User).filter(
        User.id == current_user.id,
        User.budget >= body.amount,
    ).update(
        {User.budget: User.budget - body.amount},
        synchronize_session=False,
    )
    if rows == 0:                       # 一行都没更新 = 预算不足
        db.rollback()
        raise HTTPException(status_code=400, detail="预算不足")

    # D5 事务:扣预算 + 记支出 在同一个事务里,一起 commit。
    #         要么都成功,要么(出错时)都回滚 —— 绝不会"扣了钱却没记账"。
    expense = Expense(
        amount=body.amount, category=body.category,
        note=body.note, user_id=current_user.id,
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense


@app.get("/api/expenses", response_model=List[ExpenseOut])
def list_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # 只查当前用户自己的支出 —— 多用户隔离的关键
    return db.query(Expense).filter(Expense.user_id == current_user.id).all()