# WebApp Boilerplate (Vue 3 + FastAPI)

Boilerplate for a JWT-protected web app: Vue 3 + Vite + Bootstrap + Font Awesome on the frontend, FastAPI + SQLite + JWT (access/refresh) on the backend, with optional Firebase social login.

## What’s included
- Frontend: Vue 3, Vue Router, Pinia, Axios interceptors for JWT + refresh, Bootstrap 5, Font Awesome icons, auth pages (splash, login, signup, reset), themed legal pages, bottom nav (home, products, orders, profile + floating action).
- Backend: FastAPI, SQLite, SQLAlchemy models for users/products, JWT access/refresh, endpoints for signup/login/refresh/password reset/profile CRUD/products, social login endpoint that exchanges Firebase ID tokens for app JWTs.

## Quick start (Docker)
```sh
# build and run dev services
docker compose up -d --build

# frontend (dev): http://localhost:5173
# backend:         http://localhost:8000
# frontend-prod:   http://localhost:8080
```
If you want persistent SQLite on the host, uncomment the volume under `backend` in `docker-compose.yml` and rerun `docker compose up -d`.

### Production-like Apache frontend
```sh
docker compose up -d --build frontend-prod
```
- Serves the built Vue app on port 8080 (SPA rewrite enabled).
- `VITE_API_BASE_URL` and Firebase vars are baked at build time.
- For a different API host: set `VITE_API_BASE_URL` in your env (or project `.env`) before `docker compose build frontend-prod`.

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
cp .env.example .env  # set VITE_API_BASE_URL and Firebase keys
npm run dev -- --host --port 5173
```

## Environment
- Frontend (`frontend/.env` or root `.env` for Docker builds):
  - `VITE_API_BASE_URL`
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN` (e.g., `your-project.firebaseapp.com`)
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_APP_ID`
- Backend: see `backend/.env.example` (`SECRET_KEY`, token expirations, `DATABASE_URL`, `CORS_ORIGINS`).
- Firebase Admin (backend): `GOOGLE_APPLICATION_CREDENTIALS` pointing to your service account JSON (mounted in Docker).

## Firebase setup (social login)
1) In Firebase Console, create a Web app and copy the config into `frontend/.env` (`VITE_FIREBASE_*`).
2) Enable Google sign-in (Authentication → Sign-in method).
3) Authorized domains: add `localhost` (covers any port) and any host you’ll use.
4) Service account: download JSON for the same project and place at `./secret/service-account.json` (gitignored). Compose already mounts it to `/secret/service-account.json` and sets `GOOGLE_APPLICATION_CREDENTIALS` accordingly.
5) Rebuild images to bake env vars:
   ```sh
   docker compose build --no-cache frontend frontend-prod backend
   docker compose up -d
   ```

## Services (docker-compose)
- `backend`: FastAPI + SQLite + JWT + Firebase social login at `http://localhost:8000`.
- `frontend`: Vite dev server at `http://localhost:5173` (hot reload).
- `frontend-prod`: Apache-serving built assets at `http://localhost:8080`.

## API endpoints (backend)
- `POST /signup` → access_token, refresh_token, user
- `POST /login` → access_token, refresh_token, user
- `POST /social-login` → exchange Firebase ID token for app JWTs
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
- Visible human-check field (type “HUMAN”) and honeypot on login/signup/reset.
- Social login: Google via Firebase → backend `/social-login` issues app JWTs.

## Frontend UX notes
- Auth screens: gradient background, rounded inputs, social row, human check.
- Bottom nav: mobile-friendly sizing with floating center action plus Home, Products, Orders, Profile.
- Toolbar: centered title with logout icon on the right (shown when authenticated).

## Rebuild after changes
- Frontend dev: `docker compose build --no-cache frontend && docker compose up -d frontend`
- Frontend prod: `docker compose build --no-cache frontend-prod && docker compose up -d frontend-prod`
- Backend: `docker compose build --no-cache backend && docker compose up -d backend`
