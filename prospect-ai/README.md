# Prospect AI

AI-powered B2B outreach generation. Paste a LinkedIn profile, get personalised connection requests, emails, and call scripts in seconds.

**Completely independent project** — separate codebase, database, and deployment.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Anthropic Claude API
- **Frontend**: React (Vite), React Router, Pure CSS Design System, Geist Font
- **AI**: Claude claude-sonnet-4-6 via Anthropic SDK

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
# Fill in your MongoDB URI, Anthropic API key, JWT secret
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
# Update VITE_API_URL if needed
npm install
npm run dev
```

## Features

- **Deep Profile Analysis** — Extracts signals from LinkedIn profiles
- **Multi-Channel Output** — Connection request, email, call script
- **What NOT to Say** — Unique avoid-list per prospect
- **Personalisation Score** — 1-10 rating with reasoning
- **Session History** — localStorage persistence
- **Rate Limiting** — 20 generations/hour per IP

## Deployment

- **Backend**: Railway (health check at `GET /api/health`)
- **Frontend**: Vercel

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/outreach/generate` | Generate outreach |
