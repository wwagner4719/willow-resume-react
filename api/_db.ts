import { createPool } from '@vercel/postgres'

export function getPool() {
  return createPool({ connectionString: process.env.RESUME_POSTGRES_URL })
}

export async function ensureTable() {
  const db = getPool()
  await db.sql`
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
