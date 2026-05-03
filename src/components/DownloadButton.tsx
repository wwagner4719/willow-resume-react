import './DownloadButton.css'
import resumePdf from '../assets/WillowIanWagnerResume.pdf'

export default function DownloadButton() {
  return (
    <a
      className="download-btn"
      href={resumePdf}
      download="WillowIanWagnerResume.pdf"
      aria-label="Download resume as PDF"
    >
      Download PDF
    </a>
  )
}
