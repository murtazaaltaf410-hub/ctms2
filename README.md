# Campus Transport Management System (CTMS)

**University of Kashmir North Campus** — A production-ready full-stack platform for real-time campus bus tracking, route management, and transport announcements.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Leaflet.js |
| Backend | Node.js, Express.js, Socket.IO |
| Database | MySQL |
| Auth | JWT + Bcrypt |
| Maps | OpenStreetMap via Leaflet |

## Features

- **Real-time bus tracking** with Socket.IO live GPS updates
- **ETA prediction** with stop-based countdown timers
- **Role-based dashboards** for Students, Drivers, and Admins
- **Interactive maps** with route paths, stops, and animated bus markers
- **Announcements & notifications** with real-time push via Socket.IO
- **Admin panel** with CRUD for buses, routes, students, drivers
- **Security**: JWT auth, bcrypt, rate limiting, XSS sanitization, prepared SQL statements, audit trail
- **Dark/Light mode**, responsive mobile-first UI

## Project Structure

```
├── backend/          # Express API + Socket.IO
├── frontend/         # React + Vite SPA
├── database/         # MySQL schema & seed SQL
└── README.md
```

## Prerequisites

- Node.js 18+
- MySQL 8.0+

## Setup

### 1. Database

Create the schema, then seed demo users with **valid bcrypt password hashes**:

```bash
# Option A (recommended): schema + seed via Node
cd backend
cp .env.example .env
# Set DB_PASSWORD in .env to your local MySQL root password
npm install
npm run seed
```

```bash
# Option B: schema only via mysql CLI
mysql -u root -p < database/schema.sql
cd backend && npm run seed
```

**Important:** Do not rely on `database/seed.sql` alone for login — it contains placeholder password hashes. Always run `npm run seed` in `backend/` to create working demo accounts.

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials
npm install
npm run seed
npm run dev
```

Backend runs at **http://localhost:5000**

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

## Demo Credentials

All accounts use password: **`Password@123`**

| Role | Email |
|------|-------|
| Admin | admin@uoknorth.edu.in |
| Driver | driver1@uoknorth.edu.in |
| Student | student1@uoknorth.edu.in |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Login |
| GET | /api/buses | List buses |
| GET | /api/routes | List routes |
| GET | /api/routes/eta | Stop ETA |
| POST | /api/driver/journey/start | Start journey |
| POST | /api/driver/location | Share GPS |
| GET | /api/admin/stats | Admin dashboard stats |
| POST | /api/announcements | Create announcement |

## Real-Time Events (Socket.IO)

- `bus:location` — Live bus GPS update
- `bus:status` — Driver status change
- `announcement:new` — New admin announcement
- `journey:started` / `journey:ended` — Journey lifecycle

## Production Deployment

1. Use a **public** MySQL host in Vercel (Railway, PlanetScale, Aiven, etc.).
   - Do **not** use internal-only hosts like `mysql.railway.internal` — Vercel cannot reach them.
   - On Railway: copy **MYSQL_PUBLIC_URL** (or the public TCP proxy URL), not the private URL.
2. Set `DATABASE_URL=mysql://user:password@public-host:3306/ctms_db` on the backend Vercel project.
3. Set `JWT_SECRET`, `COOKIE_SECRET`, and `CLIENT_URL` (your frontend Vercel URL).
4. Run `npm run seed` once against the production database (locally with production `DATABASE_URL` in `.env`).
5. Set frontend `VITE_API_URL=https://your-backend.vercel.app/api` in Vercel environment variables.
6. Build frontend: `cd frontend && npm run build`

## License

Built for University of Kashmir North Campus.
