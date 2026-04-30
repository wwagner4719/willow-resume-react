import { render, screen } from '@testing-library/react'
import Experience from './Experience'

test('renders all company names', () => {
  render(<Experience />)
  expect(screen.getByText('Lux Interactive')).toBeInTheDocument()
  expect(screen.getByText('Spud Software Inc')).toBeInTheDocument()
  expect(screen.getByText('Statclash Inc')).toBeInTheDocument()
  expect(screen.getByText('Anthelio Healthcare Solutions')).toBeInTheDocument()
  expect(screen.getByText('QEK Global Solutions')).toBeInTheDocument()
})

test('renders date ranges', () => {
  render(<Experience />)
  expect(screen.getByText(/08\/2018/)).toBeInTheDocument()
})
