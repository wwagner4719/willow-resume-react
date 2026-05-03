# Resume Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Willow Ian Wagner's personal resume site — React + TypeScript on Vercel, matching the two-column PDF design, with a client-side PDF download and a references submission form backed by a Vercel serverless function that stores to Postgres and sends an email via Resend.

**Architecture:** Vite + React SPA at the project root with all resume content in a typed `src/data/resume.ts` data file. A single Vercel serverless function at `api/references.ts` handles POST submissions — writing to Vercel Postgres and emailing via Resend. PDF export is client-side via `react-to-pdf`.

**Tech Stack:** React 18, TypeScript, Vite, react-to-pdf, Resend SDK, @vercel/postgres, Vitest, React Testing Library, CSS custom properties (no CSS framework)

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/data/resume.ts` | All resume content as typed TS constants |
| `src/styles/tokens.css` | Design tokens: colors, spacing, typography |
| `src/styles/global.css` | Reset + base styles |
| `src/components/layout/TwoColumnLayout.tsx` | Outer grid: left main + right sidebar |
| `src/components/Header.tsx` | Name, title, photo, contact, links |
| `src/components/sections/Summary.tsx` | Summary paragraph |
| `src/components/sections/Experience.tsx` | Work history list |
| `src/components/sections/Education.tsx` | Education list |
| `src/components/sections/Skills.tsx` | Grouped skill tags |
| `src/components/sections/Achievements.tsx` | 3 achievements with diamond icons |
| `src/components/sections/PetProjects.tsx` | gnarlysidewalks.com entry |
| `src/components/sections/RecentCourses.tsx` | Recent courses list |
| `src/components/ReferencesForm.tsx` | Controlled form with validation |
| `src/components/DownloadButton.tsx` | react-to-pdf trigger |
| `src/App.tsx` | Composes layout, imports all sections |
| `src/main.tsx` | Vite entry point |
| `api/references.ts` | POST handler: validate → Postgres → Resend |
| `api/_db.ts` | DB helper: create table if not exists |
| `.env.example` | `RESEND_API_KEY`, `POSTGRES_URL` |
| `vercel.json` | SPA rewrites + function routing |
| `vite.config.ts` | Vitest config |
| `CLAUDE.md` | Updated project identity |
| `PRD.md` | Resume app PRD |
| `README.md` | Setup instructions |

---

## ✅ Task 1: Update project docs — COMPLETE (commit daaffae)

## ✅ Task 2: Scaffold Vite + React + TypeScript — COMPLETE

---

## Task 3: Design tokens and resume data

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/data/resume.ts`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create src/styles/tokens.css**

```css
:root {
  /* Colors */
  --color-navy: #1B2A44;
  --color-navy-dark: #152135;
  --color-accent: #4A8FD4;
  --color-text: #2C2C2C;
  --color-text-light: #555;
  --color-white: #ffffff;
  --color-bg: #ffffff;
  --color-sidebar-text: rgba(255, 255, 255, 0.9);
  --color-sidebar-muted: rgba(255, 255, 255, 0.65);
  --color-divider: rgba(255, 255, 255, 0.2);
  --color-divider-main: #e0e0e0;

  /* Layout */
  --sidebar-width: 35%;
  --main-width: 65%;
  --page-max-width: 1100px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* Typography */
  --font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-size-base: 13px;
  --font-size-sm: 11px;
  --font-size-lg: 15px;
  --font-size-xl: 20px;
  --font-size-name: 36px;
  --line-height: 1.5;
}
```

- [ ] **Step 2: Create src/styles/global.css**

```css
@import './tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--color-text);
  line-height: var(--line-height);
  background: var(--color-bg);
}

a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ul {
  padding-left: var(--space-md);
}

li {
  margin-bottom: var(--space-xs);
}
```

- [ ] **Step 3: Create src/data/resume.ts**

```typescript
export const contact = {
  name: 'Willow Ian Wagner',
  title: 'Senior Web Developer',
  phone: '+1 (248) 396-5511',
  email: 'willow.wagner@gmail.com',
  linkedin: 'https://www.linkedin.com/in/willowwagner/',
  github: 'https://github.com/wwagner4719',
  location: 'Auburn Hills, MI',
}

export const summary =
  'Full Stack Web Developer with over 15 years of experience developing web applications, looking for an opportunity to work with a team that will help me continue to push my development skills to the next level.'

export const achievements = [
  {
    title: 'Enhanced Application Efficiency',
    description:
      'Implemented new functionalities increasing web application efficiency by 50% at Statclash Inc.',
  },
  {
    title: 'Scalable Architecture Design',
    description:
      'Developed scalable architecture supporting 10,000+ concurrent users for Fleet Management System.',
  },
  {
    title: 'Increased User Engagement',
    description:
      'Successfully redesigned UI/UX, boosting user engagement by 20% for Daily Fantasy Sports app.',
  },
]

export const experience = [
  {
    title: 'Senior Web Developer',
    company: 'Lux Interactive',
    location: 'Troy, MI',
    start: '08/2018',
    end: '02/2026',
    bullets: [
      'Worked on a CPA Course sales & compliance tracking system using Sitefinity, MVC, and JavaScript',
      'Worked on the Delta Museum site redesign and widgets using Sitefinity, MVC, JavaScript',
      'Took front-end Lead on an HR/Payroll Management System using React, Redux',
      'Optimized Third-Party Flight Software API Logic for Navitaire APIS using Java and IntelliJ IDEA',
      'Worked on a Hotel Customer Management System using React, Redux, Next.js',
      'Worked on a Passenger Flight Management System using Angular, NgRx, and .NET',
      'Built and supported an Environmental Auditing System using Angular, NgRx',
    ],
  },
  {
    title: 'Senior Web Developer',
    company: 'Spud Software Inc',
    location: 'Grand Blanc, MI',
    start: '08/2016',
    end: '07/2018',
    bullets: [
      'Built and supported a Time and Resource Management System using .NET MVC',
      'Worked on an Automotive Inventory Tool using Angular.js and .NET',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Statclash Inc',
    location: 'Troy, MI',
    start: '07/2015',
    end: '08/2016',
    bullets: [
      'Developed new functionality for a Daily Fantasy Sports web application using MVC4, Razor, and HTML5',
      'Implemented MVVM using Knockout.js for the client-side model and C# on the server side',
      'Took lead on all UI/UX for site layout and styling for complete site rebrand/redesign',
      'Assisted with middle tier/backend development for all new functionality',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Anthelio Healthcare Solutions',
    location: 'Flint, MI',
    start: '03/2014',
    end: '06/2015',
    bullets: [
      'Estimated, designed, implemented, and tested existing internal healthcare management web applications using ASP.NET 4.0/4.5 and MS SQL 2008/2012/2014',
      'N-Tier development using Services, Interface, DTO, BLL, DAL, and stored procedures',
      'Learned Lightswitch Silverlight and HTML5 client rapid development',
      'Graphic creation and manipulation',
    ],
  },
  {
    title: 'Web Developer',
    company: 'QEK Global Solutions',
    location: 'Bloomfield Hills, MI',
    start: '04/2010',
    end: '03/2014',
    bullets: [
      'Helped in development of an asset management system, mainly for employee lease vehicles',
      'Estimated, designed, implemented, and tested modules for an existing fleet management web application using Visual Basic, ASP.NET 4.0, and MS SQL 2008',
      'All DAL and BLL objects using table adapters, datasets, and stored procedures',
      'Improved web application and query performance to handle large numbers of users',
    ],
  },
]

export const education = [
  {
    degree: 'Bachelor of IT Programming',
    school: 'American Intercontinental University',
    location: 'Hoffman Estates, IL',
    start: '03/2007',
    end: '02/2008',
  },
  {
    degree: 'Associate of Business Administration',
    school: 'American Intercontinental University',
    location: 'Hoffman Estates, IL',
    start: '02/2005',
    end: '02/2007',
  },
]

export const skills = {
  Programming: [
    'C#', 'VB', 'ASP.Net', 'MVC', 'Razor', 'T-SQL', 'Web API', 'XML',
    'Bootstrap', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'jQuery',
    'React', 'Redux', 'Angular', 'RxJS', 'NgRx', '.NET', 'Entity Framework',
    'Angular UI', 'Ionic', 'Some Java', 'Some Python',
  ],
  Tools: [
    'Visual Studio', 'VS Code', 'DevOps', 'CLI', 'IntelliJ IDEA', 'IIS',
    'Telerik', 'Kendo UI', 'Material UI', 'Sitefinity', 'nopCommerce', 'Shopify',
  ],
  Databases: ['MS SQL Server', 'Relational DB Design'],
  'Reporting Tools': ['Telerik Reports', 'Crystal Reports'],
  'Source Control': ['DevOps', 'Team Explorer', 'GIT'],
}

export const petProjects = [
  {
    name: 'Ecommerce Projects',
    url: 'https://gnarlysidewalks.com',
    description: 'Developed with Shopify',
    start: '01/2023',
    end: 'Present',
  },
]

export const recentCourses = [
  'MCP Servers Made Easy with Python and OpenAI Agents',
]
```

- [ ] **Step 4: Update src/main.tsx to import global.css**

Replace `src/main.tsx` with:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 5: Commit**
```bash
git add src/styles/ src/data/ src/main.tsx
git commit -m "chore: add design tokens, resume data, and global styles"
```

---

## Task 4: Layout and Header components

**Files:**
- Create: `src/components/layout/TwoColumnLayout.tsx`
- Create: `src/components/layout/TwoColumnLayout.css`
- Create: `src/components/Header.tsx`
- Create: `src/components/Header.css`
- Create: `src/components/Header.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write failing test — create src/components/Header.test.tsx**

```typescript
import { render, screen } from '@testing-library/react'
import Header from './Header'

test('renders name and title', () => {
  render(<Header />)
  expect(screen.getByText('Willow Ian Wagner')).toBeInTheDocument()
  expect(screen.getByText('Senior Web Developer')).toBeInTheDocument()
})

test('renders contact links', () => {
  render(<Header />)
  expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/willowwagner/'
  )
  expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
    'href',
    'https://github.com/wwagner4719'
  )
})
```

- [ ] **Step 2: Run test — verify it fails**
```bash
npm test -- --run Header.test
```
Expected: FAIL — Cannot find module './Header'

- [ ] **Step 3: Create src/components/layout/TwoColumnLayout.css**

```css
.layout {
  display: flex;
  min-height: 100vh;
  max-width: var(--page-max-width);
  margin: 0 auto;
  box-shadow: 0 0 40px rgba(0,0,0,0.12);
}

.layout__main {
  width: var(--main-width);
  padding: var(--space-xl);
  background: var(--color-bg);
}

.layout__sidebar {
  width: var(--sidebar-width);
  padding: var(--space-xl) var(--space-lg);
  background: var(--color-navy);
  color: var(--color-sidebar-text);
}

@media print {
  .layout {
    box-shadow: none;
    max-width: 100%;
  }
}
```

- [ ] **Step 4: Create src/components/layout/TwoColumnLayout.tsx**

```typescript
import './TwoColumnLayout.css'

interface Props {
  main: React.ReactNode
  sidebar: React.ReactNode
}

export default function TwoColumnLayout({ main, sidebar }: Props) {
  return (
    <div className="layout">
      <main className="layout__main">{main}</main>
      <aside className="layout__sidebar">{sidebar}</aside>
    </div>
  )
}
```

- [ ] **Step 5: Create src/components/Header.css**

```css
.header {
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-divider-main);
}

.header__name {
  font-size: var(--font-size-name);
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--color-text);
  text-transform: uppercase;
}

.header__title {
  font-size: var(--font-size-xl);
  color: var(--color-accent);
  font-weight: 400;
  margin-bottom: var(--space-md);
}

.header__contact {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm) var(--space-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

.header__contact a {
  color: var(--color-text-light);
}

.header__contact a:hover {
  color: var(--color-accent);
}
```

- [ ] **Step 6: Create src/components/Header.tsx**

```typescript
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
```

- [ ] **Step 7: Run test — verify it passes**
```bash
npm test -- --run Header.test
```
Expected: PASS (2 tests)

- [ ] **Step 8: Replace src/App.tsx**

```typescript
import TwoColumnLayout from './components/layout/TwoColumnLayout'
import Header from './components/Header'

export default function App() {
  return (
    <TwoColumnLayout
      main={
        <>
          <Header />
        </>
      }
      sidebar={<></>}
    />
  )
}
```

- [ ] **Step 9: Commit**
```bash
git add src/components/
git commit -m "feat: add layout and header components"
```

---

## Task 5: Left column — Experience and Education

**Files:**
- Create: `src/components/sections/SectionHeading.tsx`
- Create: `src/components/sections/SectionHeading.css`
- Create: `src/components/sections/Experience.tsx`
- Create: `src/components/sections/Experience.css`
- Create: `src/components/sections/Experience.test.tsx`
- Create: `src/components/sections/Education.tsx`
- Create: `src/components/sections/Education.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write failing test — create src/components/sections/Experience.test.tsx**

```typescript
import { render, screen } from '@testing-library/react'
import Experience from './Experience'

test('renders all company names', () => {
  render(<Experience />)
  expect(screen.getByText('Lux Interactive')).toBeInTheDocument()
  expect(screen.getByText('Spud Software Inc')).toBeInTheDocument()
  expect(screen.getByText('Statclash Inc')).toBeInTheDocument()
  expect(screen.getByText('Anthelio Healthcare Solutions')).toBeInTheDocument()
  expect(screen.getByText('QEK Global Solutions')).toBeInTheDocument()
})

test('renders date ranges', () => {
  render(<Experience />)
  expect(screen.getByText(/08\/2018/)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**
```bash
npm test -- --run Experience.test
```
Expected: FAIL

- [ ] **Step 3: Create src/components/sections/SectionHeading.css**

```css
.section-heading {
  font-size: var(--font-size-base);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid var(--color-divider-main);
  color: var(--color-text);
}

.section-heading--sidebar {
  border-bottom-color: var(--color-divider);
  color: var(--color-white);
}
```

- [ ] **Step 4: Create src/components/sections/SectionHeading.tsx**

```typescript
import './SectionHeading.css'

interface Props {
  children: React.ReactNode
  sidebar?: boolean
}

export default function SectionHeading({ children, sidebar }: Props) {
  return (
    <h2 className={`section-heading${sidebar ? ' section-heading--sidebar' : ''}`}>
      {children}
    </h2>
  )
}
```

- [ ] **Step 5: Create src/components/sections/Experience.css**

```css
.experience {
  margin-bottom: var(--space-xl);
}

.experience__item {
  margin-bottom: var(--space-lg);
}

.experience__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-xs);
}

.experience__title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text);
}

.experience__dates {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  white-space: nowrap;
}

.experience__company {
  color: var(--color-accent);
  font-weight: 500;
  margin-bottom: var(--space-xs);
}

.experience__location {
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
}

.experience__bullets {
  margin-top: var(--space-sm);
  color: var(--color-text);
}
```

- [ ] **Step 6: Create src/components/sections/Experience.tsx**

```typescript
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
```

- [ ] **Step 7: Run test — verify it passes**
```bash
npm test -- --run Experience.test
```
Expected: PASS

- [ ] **Step 8: Create src/components/sections/Education.css**

```css
.education {
  margin-bottom: var(--space-xl);
}

.education__item {
  margin-bottom: var(--space-md);
}

.education__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.education__degree {
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.education__dates {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  white-space: nowrap;
}

.education__school {
  color: var(--color-accent);
  font-weight: 500;
}

.education__location {
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
}
```

- [ ] **Step 9: Create src/components/sections/Education.tsx**

```typescript
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
```

- [ ] **Step 10: Update src/App.tsx**

```typescript
import TwoColumnLayout from './components/layout/TwoColumnLayout'
import Header from './components/Header'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'

export default function App() {
  return (
    <TwoColumnLayout
      main={
        <>
          <Header />
          <Experience />
          <Education />
        </>
      }
      sidebar={<></>}
    />
  )
}
```

- [ ] **Step 11: Commit**
```bash
git add src/components/sections/
git commit -m "feat: add experience and education sections"
```

---

## Task 6: Right sidebar sections

**Files:**
- Create: `src/components/sections/sidebar.css`
- Create: `src/components/sections/Summary.tsx`
- Create: `src/components/sections/Achievements.tsx`
- Create: `src/components/sections/Achievements.css`
- Create: `src/components/sections/Skills.tsx`
- Create: `src/components/sections/Skills.css`
- Create: `src/components/sections/PetProjects.tsx`
- Create: `src/components/sections/RecentCourses.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create src/components/sections/sidebar.css**

```css
.sidebar-section {
  margin-bottom: var(--space-xl);
  color: var(--color-sidebar-text);
  font-size: var(--font-size-md);
}

.sidebar-section p {
  line-height: 1.6;
}
```

- [ ] **Step 2: Create src/components/sections/Summary.tsx**

```typescript
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
```

- [ ] **Step 3: Create src/components/sections/Achievements.css**

```css
.achievements__item {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.achievements__icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-accent);
}

.achievements__title {
  font-weight: 600;
  font-size: var(--font-size-base);
  margin-bottom: var(--space-xs);
  color: var(--color-white);
}

.achievements__desc {
  color: var(--color-sidebar-muted);
  line-height: 1.5;
}
```

- [ ] **Step 4: Create src/components/sections/Achievements.tsx**

```typescript
import { achievements } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './sidebar.css'
import './Achievements.css'

export default function Achievements() {
  return (
    <section className="sidebar-section">
      <SectionHeading sidebar>Key Achievements</SectionHeading>
      {achievements.map((a) => (
        <div key={a.title} className="achievements__item">
          <span className="achievements__icon" aria-hidden="true">◆</span>
          <div>
            <p className="achievements__title">{a.title}</p>
            <p className="achievements__desc">{a.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
```

- [ ] **Step 5: Create src/components/sections/Skills.css**

```css
.skills__group {
  margin-bottom: var(--space-md);
}

.skills__group-name {
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-white);
  margin-bottom: var(--space-xs);
  letter-spacing: 0.5px;
}

.skills__list {
  color: var(--color-sidebar-muted);
  line-height: 1.7;
  font-size: var(--font-size-sm);
}
```

- [ ] **Step 6: Create src/components/sections/Skills.tsx**

```typescript
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
```

- [ ] **Step 7: Create src/components/sections/PetProjects.tsx**

```typescript
import { petProjects } from '../../data/resume'
import SectionHeading from './SectionHeading'
import './sidebar.css'

export default function PetProjects() {
  return (
    <section className="sidebar-section">
      <SectionHeading sidebar>Pet Projects</SectionHeading>
      {petProjects.map((p) => (
        <div key={p.name}>
          <p style={{ fontWeight: 600, color: 'var(--color-white)', marginBottom: 2 }}>{p.name}</p>
          <p style={{ color: 'var(--color-sidebar-muted)', fontSize: 'var(--font-size-sm)' }}>
            {p.start} – {p.end}
          </p>
          <a href={p.url} target="_blank" rel="noreferrer"
            style={{ color: 'var(--color-accent)', fontSize: 'var(--font-size-sm)' }}>
            {p.url.replace('https://', '')}
          </a>
          <p style={{ color: 'var(--color-sidebar-muted)', marginTop: 4 }}>{p.description}</p>
        </div>
      ))}
    </section>
  )
}
```

- [ ] **Step 8: Create src/components/sections/RecentCourses.tsx**

```typescript
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
```

- [ ] **Step 9: Update src/App.tsx**

```typescript
import TwoColumnLayout from './components/layout/TwoColumnLayout'
import Header from './components/Header'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Summary from './components/sections/Summary'
import Achievements from './components/sections/Achievements'
import Skills from './components/sections/Skills'
import PetProjects from './components/sections/PetProjects'
import RecentCourses from './components/sections/RecentCourses'

export default function App() {
  return (
    <TwoColumnLayout
      main={
        <>
          <Header />
          <Experience />
          <Education />
        </>
      }
      sidebar={
        <>
          <Summary />
          <Achievements />
          <Skills />
          <PetProjects />
          <RecentCourses />
        </>
      }
    />
  )
}
```

- [ ] **Step 10: Commit**
```bash
git add src/components/sections/
git commit -m "feat: add sidebar sections (summary, achievements, skills, projects, courses)"
```

---

## Task 7: PDF Download button

**Files:**
- Create: `src/components/DownloadButton.tsx`
- Create: `src/components/DownloadButton.css`
- Create: `src/components/DownloadButton.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write failing test — create src/components/DownloadButton.test.tsx**

```typescript
import { render, screen } from '@testing-library/react'
import DownloadButton from './DownloadButton'
import { createRef } from 'react'

test('renders download button', () => {
  const ref = createRef<HTMLDivElement>()
  render(<DownloadButton targetRef={ref} />)
  expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**
```bash
npm test -- --run DownloadButton.test
```
Expected: FAIL

- [ ] **Step 3: Create src/components/DownloadButton.css**

```css
.download-btn {
  position: fixed;
  bottom: var(--space-xl);
  right: var(--space-xl);
  background: var(--color-accent);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--font-size-base);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  transition: background 0.15s;
  z-index: 100;
}

.download-btn:hover {
  background: #3a7fc4;
}

@media print {
  .download-btn {
    display: none;
  }
}
```

- [ ] **Step 4: Create src/components/DownloadButton.tsx**

```typescript
import { usePDF } from 'react-to-pdf'
import './DownloadButton.css'

interface Props {
  targetRef: React.RefObject<HTMLElement | null>
}

export default function DownloadButton({ targetRef }: Props) {
  const { toPDF } = usePDF({ filename: 'WillowWagner_Resume.pdf' })

  return (
    <button
      className="download-btn"
      onClick={() => toPDF()}
      aria-label="Download resume as PDF"
    >
      Download PDF
    </button>
  )
}
```

- [ ] **Step 5: Run test — verify it passes**
```bash
npm test -- --run DownloadButton.test
```
Expected: PASS

- [ ] **Step 6: Update src/App.tsx to wire up ref**

```typescript
import { useRef } from 'react'
import TwoColumnLayout from './components/layout/TwoColumnLayout'
import Header from './components/Header'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Summary from './components/sections/Summary'
import Achievements from './components/sections/Achievements'
import Skills from './components/sections/Skills'
import PetProjects from './components/sections/PetProjects'
import RecentCourses from './components/sections/RecentCourses'
import DownloadButton from './components/DownloadButton'

export default function App() {
  const resumeRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div ref={resumeRef}>
        <TwoColumnLayout
          main={
            <>
              <Header />
              <Experience />
              <Education />
            </>
          }
          sidebar={
            <>
              <Summary />
              <Achievements />
              <Skills />
              <PetProjects />
              <RecentCourses />
            </>
          }
        />
      </div>
      <DownloadButton targetRef={resumeRef} />
    </>
  )
}
```

- [ ] **Step 7: Commit**
```bash
git add src/components/DownloadButton.tsx src/components/DownloadButton.css src/components/DownloadButton.test.tsx src/App.tsx
git commit -m "feat: add client-side PDF download button"
```

---

## Task 8: References form UI

**Files:**
- Create: `src/components/ReferencesForm.tsx`
- Create: `src/components/ReferencesForm.css`
- Create: `src/components/ReferencesForm.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write failing tests — create src/components/ReferencesForm.test.tsx**

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReferencesForm from './ReferencesForm'

test('renders all form fields', () => {
  render(<ReferencesForm />)
  expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/relationship/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/your email/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
})

test('shows validation error when submitting empty form', async () => {
  render(<ReferencesForm />)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
})

test('shows success message after successful submit', async () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true })
  render(<ReferencesForm />)
  await userEvent.type(screen.getByLabelText(/your name/i), 'Jane Doe')
  await userEvent.type(screen.getByLabelText(/relationship/i), 'Manager')
  await userEvent.type(screen.getByLabelText(/company/i), 'Acme')
  await userEvent.type(screen.getByLabelText(/your email/i), 'jane@acme.com')
  await userEvent.type(screen.getByLabelText(/message/i), 'Great developer!')
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  expect(await screen.findByText(/thank you/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — verify it fails**
```bash
npm test -- --run ReferencesForm.test
```
Expected: FAIL

- [ ] **Step 3: Create src/components/ReferencesForm.css**

```css
.references-form {
  background: var(--color-navy-dark);
  padding: var(--space-lg);
  border-radius: 4px;
  margin-top: var(--space-xl);
}

.references-form__group {
  margin-bottom: var(--space-md);
}

.references-form__label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-sidebar-text);
  margin-bottom: var(--space-xs);
  font-weight: 500;
}

.references-form__input,
.references-form__textarea {
  width: 100%;
  padding: var(--space-sm);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 3px;
  background: rgba(255,255,255,0.08);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-family: var(--font-family);
}

.references-form__input::placeholder,
.references-form__textarea::placeholder {
  color: var(--color-sidebar-muted);
}

.references-form__input:focus,
.references-form__textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.references-form__textarea {
  resize: vertical;
  min-height: 80px;
}

.references-form__error {
  color: #ff8080;
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
}

.references-form__submit {
  background: var(--color-accent);
  color: var(--color-white);
  border: none;
  border-radius: 3px;
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: var(--space-sm);
}

.references-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.references-form__success {
  text-align: center;
  padding: var(--space-lg);
  color: var(--color-sidebar-text);
}
```

- [ ] **Step 4: Create src/components/ReferencesForm.tsx**

```typescript
import { useState } from 'react'
import SectionHeading from './sections/SectionHeading'
import './ReferencesForm.css'

interface FormData {
  name: string
  relationship: string
  company: string
  email: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  relationship?: string
  company?: string
  email?: string
  message?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.relationship.trim()) errors.relationship = 'Relationship is required'
  if (!data.company.trim()) errors.company = 'Company is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Valid email required'
  if (!data.message.trim()) errors.message = 'Message is required'
  return errors
}

const empty: FormData = { name: '', relationship: '', company: '', email: '', phone: '', message: '' }

export default function ReferencesForm() {
  const [data, setData] = useState<FormData>(empty)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(data)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/references', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitted(true)
    } catch {
      setServerError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="references-form references-form__success">
        <p>Thank you for your reference! It has been received.</p>
      </div>
    )
  }

  return (
    <form className="references-form" onSubmit={handleSubmit} noValidate>
      <SectionHeading sidebar>Submit a Reference</SectionHeading>

      {[
        { label: 'Your Name', name: 'name', type: 'text', required: true },
        { label: 'Relationship to Willow', name: 'relationship', type: 'text', required: true },
        { label: 'Company', name: 'company', type: 'text', required: true },
        { label: 'Your Email', name: 'email', type: 'email', required: true },
        { label: 'Phone (optional)', name: 'phone', type: 'tel', required: false },
      ].map(({ label, name, type, required }) => (
        <div key={name} className="references-form__group">
          <label htmlFor={name} className="references-form__label">
            {label}{required && ' *'}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            value={data[name as keyof FormData]}
            onChange={handleChange}
            className="references-form__input"
          />
          {errors[name as keyof FormErrors] && (
            <p className="references-form__error">{errors[name as keyof FormErrors]}</p>
          )}
        </div>
      ))}

      <div className="references-form__group">
        <label htmlFor="message" className="references-form__label">Message *</label>
        <textarea
          id="message"
          name="message"
          value={data.message}
          onChange={handleChange}
          className="references-form__textarea"
        />
        {errors.message && <p className="references-form__error">{errors.message}</p>}
      </div>

      {serverError && <p className="references-form__error">{serverError}</p>}

      <button type="submit" className="references-form__submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Reference'}
      </button>
    </form>
  )
}
```

- [ ] **Step 5: Run tests — verify all 3 pass**
```bash
npm test -- --run ReferencesForm.test
```
Expected: PASS (3 tests)

- [ ] **Step 6: Add ReferencesForm to App.tsx sidebar**

In `src/App.tsx`, import ReferencesForm and add `<ReferencesForm />` as the last item after `<RecentCourses />` in the sidebar.

- [ ] **Step 7: Commit**
```bash
git add src/components/ReferencesForm.tsx src/components/ReferencesForm.css src/components/ReferencesForm.test.tsx src/App.tsx
git commit -m "feat: add references submission form with validation"
```

---

## Task 9: Vercel Postgres schema and API function

**Files:**
- Create: `api/_db.ts`
- Create: `api/references.ts`
- Create: `api/references.test.ts`

- [ ] **Step 1: Write failing test — create api/references.test.ts**

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./_db', () => ({ ensureTable: vi.fn() }))
vi.mock('@vercel/postgres', () => ({
  sql: vi.fn().mockResolvedValue({ rows: [] }),
}))
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: { send: vi.fn().mockResolvedValue({ id: 'mock-id' }) },
  })),
}))

const { POST } = await import('./references')

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/references', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/references', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns 400 when required fields are missing', async () => {
    const res = await POST(makeRequest({ name: '' }))
    expect(res.status).toBe(400)
  })

  it('returns 200 with valid payload', async () => {
    const res = await POST(makeRequest({
      name: 'Jane',
      relationship: 'Manager',
      company: 'Acme',
      email: 'jane@acme.com',
      message: 'Great!',
    }))
    expect(res.status).toBe(200)
  })
})
```

- [ ] **Step 2: Run test — verify it fails**
```bash
npm test -- --run references.test
```
Expected: FAIL

- [ ] **Step 3: Create api/_db.ts**

```typescript
import { sql } from '@vercel/postgres'

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS references_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      relationship TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      submitted_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}
```

- [ ] **Step 4: Create api/references.ts**

```typescript
import { sql } from '@vercel/postgres'
import { Resend } from 'resend'
import { ensureTable } from './_db'

interface ReferenceBody {
  name: string
  relationship: string
  company: string
  email: string
  phone?: string
  message: string
}

function validate(body: Partial<ReferenceBody>): string | null {
  if (!body.name?.trim()) return 'name is required'
  if (!body.relationship?.trim()) return 'relationship is required'
  if (!body.company?.trim()) return 'company is required'
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'valid email is required'
  if (!body.message?.trim()) return 'message is required'
  return null
}

export async function POST(req: Request): Promise<Response> {
  let body: Partial<ReferenceBody>
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const validationError = validate(body)
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 })
  }

  const { name, relationship, company, email, phone = '', message } = body as ReferenceBody

  try {
    await ensureTable()
    await sql`
      INSERT INTO references_submissions (name, relationship, company, email, phone, message)
      VALUES (${name}, ${relationship}, ${company}, ${email}, ${phone}, ${message})
    `

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'willow.wagner@gmail.com',
      subject: `New reference from ${name} (${company})`,
      html: `
        <h2>New Reference Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Relationship:</strong> ${relationship}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return Response.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Reference submission error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

- [ ] **Step 5: Run tests — verify both pass**
```bash
npm test -- --run references.test
```
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**
```bash
git add api/
git commit -m "feat: add references API function with Postgres and Resend"
```

---

## Task 10: Provision Vercel Postgres and env vars

This task requires manual steps in the Vercel dashboard and Resend website. See instructions when this task is reached.

---

## Task 11: Final wiring and push to GitHub

- [ ] Run `npm test` — all tests pass
- [ ] Run `npm run build` — no TypeScript errors
- [ ] `git push -u origin feature/resume-scaffold`
