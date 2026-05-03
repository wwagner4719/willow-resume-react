import { summary } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './sidebar.css'

export default function Summary() {
  return (
    <section className="sidebar-section">      
      <div className='text-center pb-3'><img src='../src/assets/ResumePick1.jpeg' width={150}/></div>
      <SectionHeading sidebar>Summary</SectionHeading>
      <p>{summary}</p>
    </section>
  )
}
