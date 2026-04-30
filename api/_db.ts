export interface ReferenceRow {
  name: string
  relationship: string
  company: string
  email: string
  phone: string
  message: string
}

export async function insertReference(row: ReferenceRow): Promise<void> {
  const url = `${process.env.RESUME_SUPABASE_URL}/rest/v1/references_submissions`
  const key = process.env.RESUME_SUPABASE_SERVICE_ROLE_KEY!

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'apikey': key,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(row),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`DB insert failed (${res.status}): ${body}`)
  }
}
