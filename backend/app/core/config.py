from pydantic import BaseSettings
from typing import List


class Settings(BaseSettings):
  SECRET_KEY: str = "CHANGE_ME_SUPER_SECRET"
  ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
  REFRESH_TOKEN_EXPIRE_DAYS: int = 7
  ALGORITHM: str = "HS256"
  DATABASE_URL: str = "sqlite:///./app.db"
  CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

  class Config:
    env_file = ".env"


def get_settings():
  return Settings()


settings = get_settings()