import { Resend } from 'resend'
import { ensureTable, getPool } from './_db'

interface ReferenceBody {
  name: string
  relationship: string
  company: string
  email: string
  phone?: string
  message: string
}

function validate(body: Partial<ReferenceBody>): string | null {
  if (!body.name?.trim()) return 'name is required'
  if (!body.relationship?.trim()) return 'relationship is required'
  if (!body.company?.trim()) return 'company is required'
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'valid email is required'
  if (!body.message?.trim()) return 'message is required'
  return null
}

export async function POST(req: Request): Promise<Response> {
  let body: Partial<ReferenceBody>
  try {
    body = await req.json() as Partial<ReferenceBody>
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const validationError = validate(body)
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 })
  }

  const { name, relationship, company, email, phone = '', message } = body as ReferenceBody

  try {
    await ensureTable()
    const db = getPool()
    await db.sql`
      INSERT INTO references_submissions (name, relationship, company, email, phone, message)
      VALUES (${name}, ${relationship}, ${company}, ${email}, ${phone}, ${message})
    `

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'willow.wagner@gmail.com',
      subject: `New reference from ${name} (${company})`,
      html: `
        <h2>New Reference Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Relationship:</strong> ${relationship}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return Response.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Reference submission error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
