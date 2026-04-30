import './DownloadButton.css'

interface Props {
  onDownload: () => void
}

export default function DownloadButton({ onDownload }: Props) {
  return (
    <button
      className="download-btn"
      onClick={onDownload}
      aria-label="Download resume as PDF"
    >
      Download PDF
    </button>
  )
}
