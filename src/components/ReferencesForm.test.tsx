import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReferencesForm from './ReferencesForm'

test('renders all form fields', () => {
  render(<ReferencesForm />)
  expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/relationship/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/your email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
})

test('shows validation error when submitting empty form', async () => {
  render(<ReferencesForm />)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
})

test('shows success message after successful submit', async () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true })
  render(<ReferencesForm />)
  await userEvent.type(screen.getByLabelText(/your name/i), 'Jane Doe')
  await userEvent.type(screen.getByLabelText(/relationship/i), 'Manager')
  await userEvent.type(screen.getByLabelText(/company/i), 'Acme')
  await userEvent.type(screen.getByLabelText(/your email/i), 'jane@acme.com')
  await userEvent.type(screen.getByLabelText(/message/i), 'Great developer!')
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(await screen.findByText(/thank you/i)).toBeInTheDocument()
})
