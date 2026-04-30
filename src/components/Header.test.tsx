import { render, screen } from '@testing-library/react'
import Header from './Header'

test('renders name and title', () => {
  render(<Header />)
  expect(screen.getByText('Willow Ian Wagner')).toBeInTheDocument()
  expect(screen.getByText('Senior Web Developer')).toBeInTheDocument()
})

test('renders contact links', () => {
  render(<Header />)
  expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/willowwagner/'
  )
  expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
    'href',
    'https://github.com/wwagner4719'
  )
})
