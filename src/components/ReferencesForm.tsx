import { useState } from 'react'
import SectionHeading from './sections/SectionHeading'
import './ReferencesForm.css'

interface FormData {
  name: string
  relationship: string
  company: string
  email: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  relationship?: string
  company?: string
  email?: string
  message?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.relationship.trim()) errors.relationship = 'Relationship is required'
  if (!data.company.trim()) errors.company = 'Company is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Valid email required'
  if (!data.message.trim()) errors.message = 'Message is required'
  return errors
}

const empty: FormData = { name: '', relationship: '', company: '', email: '', phone: '', message: '' }

export default function ReferencesForm() {
  const [data, setData] = useState<FormData>(empty)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(data)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/references', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="references-form references-form__success">
        <p>Thank you for your reference! It has been received.</p>
      </div>
    )
  }

  return (
    <form className="references-form" onSubmit={handleSubmit} noValidate>
      <SectionHeading sidebar>Submit a Reference</SectionHeading>

      {[
        { label: 'Your Name', name: 'name', type: 'text', required: true },
        { label: 'Relationship to Willow', name: 'relationship', type: 'text', required: true },
        { label: 'Company', name: 'company', type: 'text', required: true },
        { label: 'Your Email', name: 'email', type: 'email', required: true },
        { label: 'Phone (optional)', name: 'phone', type: 'tel', required: false },
      ].map(({ label, name, type, required }) => (
        <div key={name} className="references-form__group">
          <label htmlFor={name} className="references-form__label">
            {label}{required && ' *'}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            value={data[name as keyof FormData]}
            onChange={handleChange}
            className="references-form__input"
          />
          {errors[name as keyof FormErrors] && (
            <p className="references-form__error">{errors[name as keyof FormErrors]}</p>
          )}
        </div>
      ))}

      <div className="references-form__group">
        <label htmlFor="message" className="references-form__label">Message *</label>
        <textarea
          id="message"
          name="message"
          value={data.message}
          onChange={handleChange}
          className="references-form__textarea"
        />
        {errors.message && <p className="references-form__error">{errors.message}</p>}
      </div>

      {serverError && <p className="references-form__error">{serverError}</p>}

      <button type="submit" className="references-form__submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Reference'}
      </button>
    </form>
  )
}
