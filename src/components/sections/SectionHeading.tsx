import './SectionHeading.css'

interface Props {
  children: React.ReactNode
  sidebar?: boolean
}

export default function SectionHeading({ children, sidebar }: Props) {
  return (
    <h2 className={`section-heading${sidebar ? ' section-heading--sidebar' : ''}`}>
      {children}
    </h2>
  )
}
