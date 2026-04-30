import { contact } from '../data/resume'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__name">{contact.name}</h1>
      <p className="header__title">{contact.title}</p>
      <div className="header__contact">
        <span>{contact.phone}</span>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          LinkedIn
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          GitHub
        </a>
        <span>{contact.location}</span>
      </div>
    </header>
  )
}
