# FGCK Nyeri Church Website

Full Gospel Churches of Kenya, Nyeri Town LCA Kimathi Branch - Modern React web app with Python backend.

## Project Structure

- `src/` - React frontend (Vite + React Router)
- `backend/` - FastAPI backend with Neon PostgreSQL
- `dist/` - Built frontend assets

## Tech Stack

- Frontend: React 18, Vite, React Router DOM, Leaflet, Lightbox2
- Backend: FastAPI, SQLAlchemy, Neon PostgreSQL
- Auth: JWT with python-jose
- Maps: Leaflet + OpenRouteService

## Local Development

### Prerequisites
- Node.js 18+
- Python 3.10+

### Frontend Setup
```bash
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

### Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```
Backend runs at `http://localhost:8000`

### Admin Dashboard
Access at `http://localhost:8000/admin.html`
Default credentials: `admin` / `admin123`

## Environment Variables

### Backend (`backend/.env`)
- `SECRET_KEY` - JWT secret
- `ADMIN_USERNAME` - Admin login username
- `ADMIN_PASSWORD` - Admin login password
- `DATABASE_URL` - Neon PostgreSQL connection string
- `ORS_KEY` - OpenRouteService API key
- `FRONTEND_URL` - Frontend URL for CORS
- `VERCEL_BACKEND_URL` - Backend Vercel URL
- `ALLOWED_HOSTS` - Comma-separated trusted hosts

### Frontend (Vercel Environment Variables)
- `VITE_API_URL` - Backend API URL (e.g. `https://backend-rho-sage-44.vercel.app/api`)

## Vercel Deployment

### Backend
1. Deploy `backend/` folder to Vercel
2. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `SECRET_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `ORS_KEY`
   - `FRONTEND_URL` = your frontend Vercel URL
   - `VERCEL_BACKEND_URL` = your backend Vercel URL
   - `ALLOWED_HOSTS` = your backend Vercel domain

### Frontend
1. Connect GitHub repo to Vercel
2. Root directory: project root (not `src/`)
3. Framework preset: Vite
4. Add environment variable:
   - `VITE_API_URL` = your backend Vercel URL + `/api`
5. Deploy

## Features

- Responsive SPA with mobile hamburger menu
- Home page with live announcements
- About, Services, Leadership pages
- Departments page with all church groups
- Photo gallery with category filters and lightbox
- Videos page with embedded YouTube playback
- Directions with live routing and map
- Admin dashboard for content management
- Neon PostgreSQL database
- JWT-secured admin API

## API Endpoints

### Public
- `GET /api/announcements`
- `GET /api/magazines`
- `GET /api/library`
- `GET /api/advertisements`
- `GET /api/gallery`
- `GET /api/videos`
- `GET /api/directions?start=&end=`
- `POST /api/upload`

### Admin (requires Bearer token)
- `POST /api/admin/token` - Login
- `GET/POST/PUT/DELETE /api/admin/announcements`
- `GET/POST/PUT/DELETE /api/admin/magazines`
- `GET/POST/PUT/DELETE /api/admin/library`
- `GET/POST/PUT/DELETE /api/admin/advertisements`
- `GET/POST/PUT/DELETE /api/admin/gallery`
- `GET/POST/PUT/DELETE /api/admin/videos`

## Security

- JWT authentication for admin routes
- Security headers: X-Frame-Options, X-Content-Type-Options, etc.
- Trusted host middleware
- CORS locked to specific origins
- `.env` and `*.db` files gitignored

## Build

```bash
npm run build
```
Output goes to `dist/`
