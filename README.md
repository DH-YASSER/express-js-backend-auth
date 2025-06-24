# Express.js Backend Auth

A production-ready REST API boilerplate with JWT authentication built with Node.js and Express.

## API Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT
- `GET /api/profile` — Protected route (requires JWT)

## Setup
```bash
npm install
cp .env.example .env
node server.js
```
