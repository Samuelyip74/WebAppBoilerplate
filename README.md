# WebApp Boilerplate (Vue 3 + FastAPI)

Boilerplate for a JWT-protected web app: Vue 3 + Vite + Bootstrap + Font Awesome on the frontend, FastAPI + SQLite + JWT (access/refresh) on the backend.

## What’s included
- Frontend: Vue 3, Vue Router, Pinia, Axios interceptors for JWT + refresh, Bootstrap 5, Font Awesome icons, auth pages (splash, login, signup, reset), themed legal pages, main app shell with bottom nav (home, products, orders, profile + floating action).
- Backend: FastAPI, SQLite, SQLAlchemy models for users/products, JWT access/refresh, endpoints for signup, login, refresh, password reset, profile CRUD, products seed.

## Quick start (Docker)
```sh
# build and run
docker compose up -d --build

# frontend: http://localhost:5173
# backend:  http://localhost:8000
# apache-prod: http://localhost:8080
```
If you want persistent SQLite on the host, uncomment the volume under `backend` in `docker-compose.yml` and rerun `docker compose up -d`.

### Production-like Apache frontend
An Apache-served build is provided via `frontend-prod`:
```sh
docker compose up -d --build frontend-prod
```
- Serves the built Vue app on port 8080 (SPA rewrite enabled).
- `VITE_API_BASE_URL` is baked at build time; in compose it points to `http://localhost:8000`. Update `docker-compose.yml` if you deploy the API elsewhere.
- For a different API host at build time: `docker compose build --build-arg VITE_API_BASE_URL=https://api.example.com frontend-prod`

## Running locally (no Docker)
Backend:
```sh
cd backend
python -m venv .venv && .venv/Scripts/activate  # or source .venv/bin/activate on mac/linux
pip install -r requirements.txt
cp .env.example .env  # optional; adjust SECRET_KEY/DB path
uvicorn app.main:app --reload --port 8000
```

Frontend (Node 18+):
```sh
cd frontend
npm install
cp .env.example .env  # optional; set VITE_API_BASE_URL
npm run dev -- --host --port 5173
```

## Environment
- Frontend: `VITE_API_BASE_URL` (default in compose: `http://localhost:8000`).
- Backend: see `backend/.env.example` (`SECRET_KEY`, token expirations, `DATABASE_URL`, `CORS_ORIGINS`).

## Services (docker-compose)
- `backend`: FastAPI + SQLite + JWT at `http://localhost:8000`.
- `frontend`: Vite dev server at `http://localhost:5173` (hot reload).
- `frontend-prod`: Apache-serving built assets at `http://localhost:8080`.

## API endpoints (backend)
- `POST /signup` → access_token, refresh_token, user
- `POST /login` → access_token, refresh_token, user
- `POST /refresh` → new access_token (and refresh_token)
- `POST /password-reset` → update password
- `GET /profile` → current user
- `PUT /profile` → update name/password
- `GET /products` → sample products (requires auth)
- `GET /` → health

## Auth flow (frontend)
- Tokens saved to `localStorage`; Axios attaches `Authorization: Bearer <access>`.
- On 401, interceptor calls `/refresh` with stored refresh token and retries.
- “Remember me” saves email/password to `localStorage` for demo convenience.
- Visible human-check field (type “HUMAN”) and honeypot help deter bots on login/signup/reset.

## Frontend UX notes
- Auth screens: gradient background, rounded inputs, social row, visible human check.
- Bottom nav: mobile-friendly sizing with floating center action plus Home, Products, Orders, Profile.
- Toolbar: centered title with logout icon on the right (shown when authenticated).

## Rebuild after changes
- Frontend image: `docker compose build --no-cache frontend && docker compose up -d frontend`
- Backend image: `docker compose build --no-cache backend && docker compose up -d backend`
