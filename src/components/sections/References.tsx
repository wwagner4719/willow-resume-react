import { useEffect, useState } from 'react'
import SectionHeading from './SectionHeading'
import './sidebar.css'
import './References.css'

interface Reference {
  name: string
  relationship: string
  company: string
  message: string
}

export default function References() {
  const [references, setReferences] = useState<Reference[]>([])

  useEffect(() => {
    fetch('/api/references-list')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setReferences(data) })
      .catch(() => {})
  }, [])

  if (references.length === 0) return null

  return (
    <section className="sidebar-section">
      <SectionHeading sidebar>References</SectionHeading>
      {references.map((ref, i) => (
        <div key={i} className="references__item">
          <p className="references__message">"{ref.message}"</p>
          <p className="references__attribution">{ref.name}</p>
          <p className="references__role">{ref.relationship} · {ref.company}</p>
        </div>
      ))}
    </section>
  )
}
