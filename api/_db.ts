import sql from 'mssql'

export interface ReferenceRow {
  name: string
  relationship: string
  company: string
  email: string
  phone: string
  message: string
}

let pool: sql.ConnectionPool | null = null

async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await new sql.ConnectionPool(process.env.AZURE_SQL_CONNECTION_STRING!).connect()
  }
  return pool
}

export async function insertReference(row: ReferenceRow): Promise<void> {
  const db = await getPool()
  await db.request()
    .input('name', sql.NVarChar(255), row.name)
    .input('relationship', sql.NVarChar(255), row.relationship)
    .input('company', sql.NVarChar(255), row.company)
    .input('email', sql.NVarChar(255), row.email)
    .input('phone', sql.NVarChar(50), row.phone)
    .input('message', sql.NVarChar(sql.MAX), row.message)
    .query(`
      INSERT INTO references_submissions (name, relationship, company, email, phone, message)
      VALUES (@name, @relationship, @company, @email, @phone, @message)
    `)
}
