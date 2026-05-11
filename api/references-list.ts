import { getPool } from './_db.js'

export async function GET(): Promise<Response> {
  try {
    const db = await getPool()
    const result = await db.request().query(`
      SELECT name, relationship, company, message, created_at
      FROM references_submissions
      ORDER BY created_at DESC
    `)
    return Response.json(result.recordset)
  } catch {
    return Response.json([], { status: 200 })
  }
}
