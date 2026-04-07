# MERN Authentication System

This repository now contains a simple full-stack authentication flow:

- **Backend** (`/backend`): Node + Express + MongoDB + Mongoose API.
- **Frontend** (`/`): React + Vite client with registration, login, and protected dashboard pages.

## Features

- Register with `name`, `email`, and `password`
- Password hashing with `bcryptjs`
- Login verification with hashed password check
- Protected dashboard route (redirects to login if unauthenticated)
- Responsive, clean UI using vanilla CSS

## Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your MongoDB connection string.
4. Start API:
   ```bash
   npm run dev
   ```

Default backend runs on `http://localhost:5000`.

## Frontend Setup

1. Install frontend dependencies:
   ```bash
   npm install
   ```
2. (Optional) Configure API base URL in `.env`:
   ```bash
   VITE_API_BASE_URL=http://localhost:5000
   ```
3. Start frontend:
   ```bash
   npm run dev
   ```

## Frontend Routes

- `/register`
- `/login`
- `/dashboard` (protected via `localStorage` session check)

## Notes

- Client-side route protection is implemented for this assignment.
- For production, add token-based auth (JWT + HTTP-only cookies) and server-side authorization middleware.
