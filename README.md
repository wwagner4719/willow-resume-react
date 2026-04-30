# Resume Site

Willow Ian Wagner's personal resume web app — React + TypeScript on Vercel.

## Local Development

### Prerequisites
- Node.js v18+
- A Vercel account with the project linked (`vercel link`)
- Vercel Postgres provisioned (run `vercel env pull .env.local`)

### Setup

```bash
npm install
vercel env pull .env.local   # pulls POSTGRES_URL and RESEND_API_KEY
npm run dev                  # http://localhost:5173
```

### Environment Variables

| Variable | Description |
|---|---|
| `POSTGRES_URL` | Vercel Postgres connection string (from Neon) |
| `RESEND_API_KEY` | Resend API key for sending reference emails |

Copy `.env.example` to `.env.local` and fill in values, or use `vercel env pull`.

## Available Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build
npm run preview  # Preview production build locally
npm test         # Run Vitest tests
npm run lint     # ESLint
```

## Project Structure

```
src/
├── components/       # UI components
├── data/resume.ts    # All resume content
├── styles/           # CSS tokens and globals
└── App.tsx

api/
├── references.ts     # POST /api/references
└── _db.ts            # DB connection helper
```

## Deployment

Pushes to `master` deploy automatically via Vercel GitHub integration.
