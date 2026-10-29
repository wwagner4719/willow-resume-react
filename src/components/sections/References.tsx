import SectionHeading from './SectionHeading'
import './sidebar.css'
import './References.css'

interface Reference {
  name: string
  relationship: string
  company: string
  message: string
}

// Hardcoded — the references DB was removed, so these are no longer fetched from /api/references-list.
const references: Reference[] = [
  {
    name: 'Theresa Baker',
    relationship: 'Project Manager',
    company: 'Lux Interactive',
    message:
      'I am pleased to provide my recommendation for Willow, whom I had the opportunity to work with for many years at LUX Interactive. Willow consistently proved to be an exceptional developer and a highly reliable team member. He is incredibly easy to work with, approachable, professional, and collaborative, making him a strong contributor in both team-based environments and independent project work. Not only does he actively engage with teammates, but is professional and personable with clients, product owners, and stake-holders. One of Willow’s standout qualities is his adaptability and willingness to learn. He quickly adjusts to changing priorities and project requirements without needing extensive direction. He thinks critically, often anticipating needs and solving problems proactively rather than waiting for explicit instructions. Willow is also highly motivated and eager to learn. He consistently shows openness to new technologies, tools, and approaches, and applies that knowledge effectively in his work. His technical skills, combined with his initiative and work ethic, make him a dependable and capable developer. Beyond his technical abilities, Willow brings a positive and personable presence to any team. His communication style and collaborative mindset contribute to a productive and supportive work environment. I highly recommend Willow for any role where a strong, adaptable, and self-driven developer is needed. He would be a valuable asset to any organization.',
  },
  {
    name: 'Amy Warren',
    relationship: 'Senior Developer',
    company: 'LUX interactive, LLC',
    message:
      'I had the opportunity to work closely with Willow across multiple projects over several years, and I can confidently say he is one of the strongest full-stack developers I’ve worked with. He brings a rare combination of deep technical expertise, practical problem-solving, and strong leadership skills. His experience spans modern front-end frameworks like React and Angular, along with extensive .NET backend development, allowing him to contribute effectively across the full application stack. Beyond simply writing code, he consistently helped drive architecture decisions, improve development processes, and mentor team members. One thing that always stood out was his ability to deliver reliable, scalable solutions in fast-paced production environments. He worked on platforms supporting large user volumes and handled complex technical challenges with a calm, solutions-focused approach. He’s also someone who stays ahead of the curve technically, recently expanding his expertise into AI tooling and integrations involving OpenAI, Claude Code, and MCP technologies. Equally important, he’s collaborative, dependable, and easy to work with. He communicates well with both technical and non-technical stakeholders and naturally steps into leadership roles when needed. It was always a pleasure being on a project with Willow, even when the technology was new to us and deadlines were tight. I would strongly recommend him for any senior or lead engineering position and believe he would be a valuable asset to any development team.',
  },
]

export default function References() {
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
