import { usePDF } from 'react-to-pdf'
import './DownloadButton.css'

export default function DownloadButton() {
  const { toPDF } = usePDF({ filename: 'WillowWagner_Resume.pdf' })

  return (
    <button
      className="download-btn"
      onClick={() => toPDF()}
      aria-label="Download resume as PDF"
    >
      Download PDF
    </button>
  )
}
