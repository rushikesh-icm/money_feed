# Moneyfeed (Frontend)

Moneyfeed is a social trading discovery UI for **InCred Money**.

This package contains the **Next.js App Router** frontend built to match the provided Claude HTML designs:
- Consumer UI: feed + trader profile (mobile-first)
- Admin UI: upload/validate/preview/publish console (desktop)

## Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- `next/font` Google fonts (design tokens in `src/app/globals.css`)

## Pages / routes
- **`/feed`**: main consumer feed (Top 10 carousel, Suggested Traders, Top 20 tabs)
- **`/profile/[username]`**: trader profile (hero, stats, performance banner, tabs)
- **`/admin`**: admin console (upload + validation + preview + publish actions — UI-level)
- **`/admin/login`**: admin login screen (UI-only until backend auth is wired)

> Note: Until the backend is connected, the UI uses **demo data** from `src/lib/demo.ts`.

## Run locally

### Prerequisites
- Node.js 20+ recommended
- npm 9+ recommended

### Install
From the repo root:

```bash
cd frontend
npm install
```

### Start dev server

```bash
npm run dev
```

Open:
- `http://localhost:3000/feed`
- `http://localhost:3000/profile/spread_king_59`
- `http://localhost:3000/admin`
- `http://localhost:3000/admin/login`

### Production build

```bash
npm run build
npm start
```

## Design system notes
- **Consumer**: Syne (headings), DM Sans (body), DM Mono (numbers)
- **Admin**: Syne (headings), Manrope (body), IBM Plex Mono (numbers/tables)
- Tokens live in `src/app/globals.css` (both consumer + admin palettes)

## Backend wiring (next step)
Planned API integration points (from `requirements.txt`):
- `GET /api/feed`
- `GET /api/traders/:username`
- `POST /api/admin/upload`
- `POST /api/admin/publish/:date`

