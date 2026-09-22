from sqlalchemy import (
    Column, Integer, String, Float, ForeignKey, CheckConstraint, Index
)
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)   # D2:唯一+非空
    password_hash = Column(String(200), nullable=False)          # 存哈希,不存明文
    budget = Column(Float, nullable=False, server_default="0")   # 预算余额,默认0

    # D1:一个 user 有多笔 expense(1:N)。relationship 是 ORM 层"导航属性",
    # 不产生数据库列;真正的外键在 Expense.user_id。
    expenses = relationship("Expense", back_populates="owner")
    
    __table_args__ = (
        CheckConstraint("budget >= 0", name="ck_user_budget_non_negative"),
    )


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True)
    amount = Column(Float, nullable=False)
    category = Column(String(50), nullable=False)                # D2:非空
    note = Column(String(200))                                   # 可空
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # D1:外键

    owner = relationship("User", back_populates="expenses")

    __table_args__ = (
        CheckConstraint("amount > 0", name="ck_expense_amount_positive"),  # D2
        Index("ix_expenses_user_id", "user_id"),                           # D4
    )