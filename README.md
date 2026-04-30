# willow-resume

Willow Wagner's personal resume site — built with React, TypeScript, and Vite. Deployed on Vercel.

## Features

- Resume display with two-column layout matching the original PDF design
- Client-side PDF export via `react-to-pdf`
- References submission form (stores to Supabase, sends email via Resend)
- Public references display in the sidebar

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **API:** Vercel serverless functions
- **Database:** Supabase (Postgres)
- **Email:** Resend
- **Hosting:** Vercel

## Development

```bash
npm install
vercel env pull .env.local
npm run dev
```

## Testing

```bash
npm test
```
