import { petProjects } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './sidebar.css'

export default function PetProjects() {
  return (
    <section className="sidebar-section">
      <SectionHeading sidebar>Pet Projects</SectionHeading>
      {petProjects.map((p) => (
        <div key={p.name}>
          <p style={{ fontWeight: 600, color: 'var(--color-white)', marginBottom: 2 }}>{p.name}</p>
          <p style={{ color: 'var(--color-sidebar-muted)', fontSize: 'var(--font-size-sm)' }}>
            {p.start} – {p.end}
          </p>
          <a href={p.url} target="_blank" rel="noreferrer"
            style={{ color: 'var(--color-accent)', fontSize: 'var(--font-size-sm)' }}>
            {p.url.replace('https://', '')}
          </a>
          <p style={{ color: 'var(--color-sidebar-muted)', marginTop: 4 }}>{p.description}</p>
        </div>
      ))}
    </section>
  )
}
