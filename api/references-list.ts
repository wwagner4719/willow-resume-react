export async function GET(): Promise<Response> {
  const url = `${process.env.RESUME_SUPABASE_URL}/rest/v1/references_submissions?select=name,relationship,company,message,submitted_at&order=submitted_at.desc`
  const key = process.env.RESUME_SUPABASE_SERVICE_ROLE_KEY!

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${key}`,
      'apikey': key,
    },
  })

  if (!res.ok) {
    return Response.json([], { status: 200 })
  }

  const data = await res.json()
  return Response.json(data)
}
