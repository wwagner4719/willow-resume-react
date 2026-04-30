import { summary } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './sidebar.css'

export default function Summary() {
  return (
    <section className="sidebar-section">
      <SectionHeading sidebar>Summary</SectionHeading>
      <p>{summary}</p>
    </section>
  )
}
