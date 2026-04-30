# PRD: Resume Site

## Goal

Willow Ian Wagner's personal resume as a public web app — visually matching the existing PDF resume design, with a PDF download button and a form for contacts to submit references.

## Users

- **Recruiters / hiring managers** — view resume, download PDF
- **Former colleagues / clients** — submit a reference via form

## Scope (v1)

### Resume Display
- Header: name, title, phone, email, LinkedIn, GitHub, location
- Two-column layout: left (Experience, Education) / right sidebar (Summary, Achievements, Skills, Pet Projects, Recent Courses)
- Design matches existing PDF: dark navy sidebar (#1B2A44), blue accents (#4A8FD4), white main

### PDF Download
- Single button — triggers client-side PDF export of the resume page
- No server involvement

### References Form
- Fields: Name, Relationship to Willow, Company, Email, Phone (optional), Message
- On submit: store in Vercel Postgres + send email to willow.wagner@gmail.com via Resend
- Success state: inline confirmation message; error state: inline error message

## Out of Scope
- Authentication
- CMS / editable content
- Dark mode toggle
- Mobile-specific layout (responsive is nice-to-have, not required for v1)

## Done When
- [ ] All resume sections render with real content
- [ ] PDF download produces a readable document
- [ ] References form stores submission in Postgres
- [ ] References form triggers email to willow.wagner@gmail.com
- [ ] Deployed on Vercel at the existing project URL
- [ ] No console errors in production
