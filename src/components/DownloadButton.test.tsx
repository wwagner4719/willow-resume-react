import { render, screen } from '@testing-library/react'
import DownloadButton from './DownloadButton'

test('renders download button', () => {
  render(<DownloadButton />)
  expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument()
})
