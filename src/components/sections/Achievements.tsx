import { achievements } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './sidebar.css'
import './Achievements.css'

export default function Achievements() {
  return (
    <section className="sidebar-section">
      <SectionHeading sidebar>Key Achievements</SectionHeading>
      {achievements.map((a) => (
        <div key={a.title} className="achievements__item">
          <span className="achievements__icon" aria-hidden="true">◆</span>
          <div>
            <p className="achievements__title">{a.title}</p>
            <p className="achievements__desc">{a.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
