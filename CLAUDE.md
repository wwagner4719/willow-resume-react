# CLAUDE.md — CheckIn

**Loaded in addition to** `~/.claude/CLAUDE.md` (global). This file does **not** replace the global one.

**Keep short.** Long CLAUDE.md files waste context. Target: reads in 30 seconds.

---

## Context Files

| File | Purpose | Auto-loads? |
|---|---|---|
| `~/.claude/CLAUDE.md` (Global) | Portable user rules | Yes |
| `CLAUDE.md` (Project, this file) | Project-specific behavior | Yes |
| `SECURITY.md` | Mandatory security rules | **No — read on demand** |
| `PRD.md` | WHAT + WHY (requirements, "done") | **No — read at task start** |
| `README.md` | How to install and run | No |

---

## About This Project

- **Name**: CheckIn
- **Type**: Web app (client-facing + coach admin view)
- **Primary Tech**: Angular + .NET Web API (Clean Architecture) + SQL Server + Azure
- **Key Purpose**: Lets coaching clients log weekly check-ins and view their own progress trends; gives coaches a single view of all client activity between sessions

---

## Security

Full rules in [`SECURITY.md`](SECURITY.md). Read it before writing any code that handles secrets, user input, authentication, authorization, database queries, or external service calls.

**Non-negotiable baseline:** Never hardcode secrets — use environment variables only. Never log tokens or PII.

---

## Project Rules for Claude

- Follow Clean Architecture strictly: Domain → Application → Infrastructure → API
- PascalCase for C# types and methods; camelCase for TypeScript variables; kebab-case for Angular filenames
- Every query must scope by both `CoachId` and `ClientId` — never return data across tenants
- Check-in questions have three types only: `NumericScale`, `YesNo`, `Freeform` — never add new types without updating the PRD
- Question edits create a new version; never mutate historical responses
- **Testing**: Unit tests for Application layer use cases; integration tests for API endpoints
- **Branches**: `feature/*`, `bugfix/*`, `hotfix/*`
- *Add more rules here as the project evolves.*

---

## Before Any Feature Work — Read These First

- **`PRD.md`** — WHAT and WHY. Confirm the goal and done checklist before touching code.
- **`SECURITY.md`** — mandatory security rules. Read before writing any auth, input, or data-handling code.

If either file is missing or stale, run `/kickoff` to regenerate them.

---

## Critical Files (Ask Before Modifying)

- `Program.cs`, EF Core migrations, `appsettings.json`, Angular `app.module.ts`
- Add more as the project grows.

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
- Full security rules → **`SECURITY.md`**
- Install / run instructions → **`README.md`**
- Personal preferences → **`~/.claude/CLAUDE.md`**
