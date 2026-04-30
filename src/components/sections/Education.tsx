import { education } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './Education.css'

export default function Education() {
  return (
    <section className="education">
      <SectionHeading>Education</SectionHeading>
      {education.map((ed) => (
        <div key={ed.degree} className="education__item">
          <div className="education__header">
            <span className="education__degree">{ed.degree}</span>
            <span className="education__dates">{ed.start} – {ed.end}</span>
          </div>
          <div>
            <span className="education__school">{ed.school}</span>
            {' · '}
            <span className="education__location">{ed.location}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
