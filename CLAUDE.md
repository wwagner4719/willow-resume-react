# CLAUDE.md — CheckIn

**Loaded in addition to** `~/.claude/CLAUDE.md` (global). This file does **not** replace the global one.

**Keep short.** Long CLAUDE.md files waste context. Target: reads in 30 seconds.

---

## About This Project

- **Name**: CheckIn
- **Type**: Web app (client-facing + coach admin view)
- **Primary Tech**: Angular + .NET Web API (Clean Architecture) + SQL Server + Azure
- **Key Purpose**: Lets coaching clients log weekly check-ins and view their own progress trends; gives coaches a single view of all client activity between sessions

---

## Project Rules for Claude

- Follow Clean Architecture strictly: Domain → Application → Infrastructure → API
- PascalCase for C# types and methods; camelCase for TypeScript variables; kebab-case for Angular filenames
- Every query must scope by both `CoachId` and `ClientId` — never return data across tenants
- Check-in questions have three types only: `NumericScale`, `YesNo`, `Freeform` — never add new types without updating the PRD
- Question edits create a new version; never mutate historical responses
- *Add more rules here as the project evolves.*

---

## Before Any Feature Work — Read These First

- **`PRD.md`** — WHAT and WHY. Confirm the goal and done checklist before touching code.

If either file is missing or stale, run `/kickoff` to regenerate them.

---

## Critical Files (Ask Before Modifying)

- TBD — add files that are high-risk or load-bearing as the project grows (e.g., EF Core migrations, `Program.cs`, `app.module.ts`)

---

## Definition of Done

A task is done when all of these hold:
1. Behavior matches the PRD
2. No console or terminal errors
3. Tests pass (if any exist)
4. Change is committed via `/commit`

---

## What Does NOT Belong in This File

- Feature specs, requirements, success metrics → **`PRD.md`**
- Personal preferences → **`~/.claude/CLAUDE.md`**
