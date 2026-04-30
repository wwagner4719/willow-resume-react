import { render, screen } from '@testing-library/react'
import DownloadButton from './DownloadButton'
import { createRef } from 'react'

test('renders download button', () => {
  const ref = createRef<HTMLDivElement>()
  render(<DownloadButton targetRef={ref} />)
  expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument()
})
