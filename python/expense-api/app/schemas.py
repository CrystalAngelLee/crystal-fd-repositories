from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


# ---------- 认证相关 ----------
class UserCreate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ---------- 支出相关 ----------
class ExpenseCreate(BaseModel):
    amount: float = Field(gt=0)      # 应用层校验:必须 > 0
    category: str
    note: str = ""


class ExpenseOut(BaseModel):
    id: int
    amount: float
    category: str
    note: Optional[str] = None

    # 允许直接把 ORM 对象(Expense 实例)转成这个响应模型
    model_config = ConfigDict(from_attributes=True)


class BudgetDeposit(BaseModel):
    amount: float = Field(gt=0)