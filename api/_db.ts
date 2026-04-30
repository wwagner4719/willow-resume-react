import { sql } from '@vercel/postgres'

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS references_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      relationship TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}
