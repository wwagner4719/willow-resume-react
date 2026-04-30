# CLAUDE.md — Resume Site

**Loaded in addition to** `~/.claude/CLAUDE.md` (global). This file does **not** replace the global one.

## Context Files

| File | Purpose | Auto-loads? |
|---|---|---|
| `~/.claude/CLAUDE.md` | Portable user rules | Yes |
| `CLAUDE.md` | Project-specific behavior | Yes |
| `SECURITY.md` | Security rules | **No — read on demand** |
| `PRD.md` | Requirements + done checklist | **No — read at task start** |

## About This Project

- **Name**: Resume Site
- **Type**: Personal resume web app
- **Primary Tech**: React + TypeScript (Vite), Vercel serverless functions (TypeScript), Vercel Postgres, Resend
- **Key Purpose**: Willow Ian Wagner's personal resume — PDF download + references submission form

## Security

Full rules in `SECURITY.md`. Read before touching the API function, form inputs, or env vars.

**Non-negotiable baseline:** Never hardcode secrets — use env vars only. `RESEND_API_KEY` and `POSTGRES_URL` live in `.env.local` only.

## Project Rules for Claude

- All resume content lives in `src/data/resume.ts` — never hardcode strings in components
- Design tokens live in `src/styles/tokens.css` — never hardcode colors or spacing in components
- API function validates all inputs server-side before touching the DB or sending email
- **Branches**: `feature/*`, `bugfix/*`, `hotfix/*`

## Before Any Feature Work — Read These First

- **`PRD.md`** — requirements and done checklist
- **`SECURITY.md`** — mandatory security rules before touching API or form code

## Critical Files (Ask Before Modifying)

- `api/references.ts`, `api/_db.ts`, `src/data/resume.ts`, `vercel.json`

## Definition of Done

1. Behavior matches the PRD
2. No console or terminal errors
3. Tests pass (`npm test`)
4. Change is committed via `/commit`

## What Does NOT Belong in This File

- Feature specs → `PRD.md`
- Security rules → `SECURITY.md`
- Setup instructions → `README.md`
- Personal preferences → `~/.claude/CLAUDE.md`
