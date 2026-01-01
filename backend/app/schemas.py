from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    full_name: str


class UserCreate(UserBase):
    password: str
    human_answer: str
    trap: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str
    human_answer: str
    trap: Optional[str] = None


class UserRead(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True


class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    password: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserRead


class RefreshRequest(BaseModel):
    refresh_token: str


class PasswordResetRequest(BaseModel):
    email: EmailStr
    new_password: str
    human_answer: str
    trap: Optional[str] = None


class ProductRead(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float

    class Config:
        orm_mode = True


class SocialLoginRequest(BaseModel):
    id_token: str
    provider: str
