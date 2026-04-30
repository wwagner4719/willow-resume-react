import { usePDF } from 'react-to-pdf'
import './DownloadButton.css'

interface Props {
  targetRef: React.RefObject<HTMLElement | null>
}

export default function DownloadButton({ targetRef }: Props) {
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
