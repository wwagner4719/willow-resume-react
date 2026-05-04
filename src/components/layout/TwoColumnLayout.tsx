import './TwoColumnLayout.css'

interface Props {
  main: React.ReactNode
  sidebar: React.ReactNode
}

export default function TwoColumnLayout({ main, sidebar }: Props) {
  return (
    <div className="layout d-flex flex-column flex-md-row ">
      <main className="layout__main">{main}</main>
      <aside className="layout__sidebar">{sidebar}</aside>
    </div>
  )
}
