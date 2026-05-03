import { recentCourses } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './sidebar.css'

export default function RecentCourses() {
  return (
    <section className="sidebar-section">
      <SectionHeading sidebar>Recent Courses/Certificates</SectionHeading>
      {recentCourses.map((c) => (
        <p key={c.title} style={{ color: 'var(--color-sidebar-muted)' }}><a href={c.link} target='_blank'>{c.title}</a></p>
      ))}
    </section>
  )
}
