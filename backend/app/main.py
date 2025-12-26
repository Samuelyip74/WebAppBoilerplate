from datetime import timedelta
from typing import List

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .core.config import settings
from .core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user,
    get_password_hash,
    verify_password,
)
from .db import Base, SessionLocal, engine, get_db
from . import models, schemas

app = FastAPI(title="WebApp Boilerplate API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    seed_products()


def seed_products():
    db = SessionLocal()
    try:
        if db.query(models.Product).count() == 0:
            sample = [
                models.Product(name="Starter Plan", description="Basic features to get going", price=19.0),
                models.Product(name="Growth Plan", description="More power for growing teams", price=49.0),
                models.Product(name="Enterprise", description="Full stack with support", price=99.0),
            ]
            db.add_all(sample)
            db.commit()
    finally:
        db.close()


def token_response(user: models.User) -> schemas.TokenResponse:
    access = create_access_token(user.email, user.id, timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh = create_refresh_token(user.email, user.id, timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS))
    return schemas.TokenResponse(
        access_token=access,
        refresh_token=refresh,
        user=user,
    )


@app.post("/signup", response_model=schemas.TokenResponse)
def signup(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    user = models.User(
        email=payload.email,
        full_name=payload.full_name,
        hashed_password=get_password_hash(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return token_response(user)


@app.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")
    return token_response(user)


@app.post("/refresh", response_model=schemas.TokenResponse)
def refresh(payload: schemas.RefreshRequest, db: Session = Depends(get_db)):
    decoded = decode_token(payload.refresh_token, expected_type="refresh")
    user = db.query(models.User).filter(models.User.id == decoded.get("user_id")).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    return token_response(user)


@app.post("/password-reset")
def password_reset(payload: schemas.PasswordResetRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.hashed_password = get_password_hash(payload.new_password)
    db.add(user)
    db.commit()
    return {"message": "Password updated"}


@app.get("/profile", response_model=schemas.UserRead)
def get_profile(current_user: models.User = Depends(get_current_user)):
    return current_user


@app.put("/profile", response_model=schemas.UserRead)
def update_profile(
    payload: schemas.ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if payload.full_name:
        current_user.full_name = payload.full_name
    if payload.password:
        current_user.hashed_password = get_password_hash(payload.password)
    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    return current_user


@app.get("/products", response_model=List[schemas.ProductRead])
def list_products(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.Product).order_by(models.Product.id.asc()).all()


@app.get("/")
def healthcheck():
    return {"status": "ok"}
