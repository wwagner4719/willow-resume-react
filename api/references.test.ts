import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./_db', () => ({
  insertReference: vi.fn().mockResolvedValue(undefined),
}))
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(function () {
    return {
      emails: { send: vi.fn().mockResolvedValue({ id: 'mock-id' }) },
    }
  }),
}))

const { POST } = await import('./references')

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/references', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/references', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 400 when required fields are missing', async () => {
    const res = await POST(makeRequest({ name: '' }))
    expect(res.status).toBe(400)
  })

  it('returns 200 with valid payload', async () => {
    const res = await POST(makeRequest({
      name: 'Jane',
      relationship: 'Manager',
      company: 'Acme',
      email: 'jane@acme.com',
      message: 'Great!',
    }))
    expect(res.status).toBe(200)
  })
})
