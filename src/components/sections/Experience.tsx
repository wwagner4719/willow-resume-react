import { experience } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './Experience.css'

export default function Experience() {
  return (
    <section className="experience">
      <SectionHeading>Experience</SectionHeading>
      {experience.map((job) => (
        <div key={`${job.company}-${job.start}`} className="experience__item">
          <div className="experience__header">
            <span className="experience__title">{job.title}</span>
            <span className="experience__dates">{job.start} – {job.end}</span>
          </div>
          <div>
            <span className="experience__company">{job.company}</span>
            {' '}
            <span className="experience__location">{job.location}</span>
          </div>
          <ul className="experience__bullets">
            {job.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      ))}
    </section>
  )
}
