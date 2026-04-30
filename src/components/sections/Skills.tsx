import { skills } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './sidebar.css'
import './Skills.css'

export default function Skills() {
  return (
    <section className="sidebar-section">
      <SectionHeading sidebar>Skills</SectionHeading>
      {Object.entries(skills).map(([group, items]) => (
        <div key={group} className="skills__group">
          <p className="skills__group-name">{group}</p>
          <p className="skills__list">{items.join(' · ')}</p>
        </div>
      ))}
    </section>
  )
}
