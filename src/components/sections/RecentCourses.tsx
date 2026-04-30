import { recentCourses } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './sidebar.css'

export default function RecentCourses() {
  return (
    <section className="sidebar-section">
      <SectionHeading sidebar>Recent Courses</SectionHeading>
      {recentCourses.map((c) => (
        <p key={c} style={{ color: 'var(--color-sidebar-muted)' }}>{c}</p>
      ))}
    </section>
  )
}
