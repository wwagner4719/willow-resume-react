import { summary } from '../../data/resume'
import SectionHeading from './SectionHeading'
import profilePic from '../../assets/ResumePick1.jpeg'
import './sidebar.css'

export default function Summary() {
  return (
    <section className="sidebar-section">
      <div className='text-center pb-3'><img src={profilePic} width={150}/></div>
      <SectionHeading sidebar>Summary</SectionHeading>
      <p>{summary}</p>
    </section>
  )
}
