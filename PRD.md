# PRD: CheckIn

> A client-facing dashboard where coaching clients log weekly check-ins and track their own progress over time.

## Problem

Coaching clients have no structured, private place to record how they're doing between sessions. They either forget what happened week-to-week, or arrive at sessions without having reflected on their progress. Coaches also lack a lightweight way to stay informed between sessions without scheduling extra calls. Today both sides rely on memory, email threads, or shared spreadsheets — none of which show a meaningful trend over time.

## Goals

- Clients can complete a weekly check-in in under 3 minutes from any device
- Clients can see their own progress trends without needing to interpret raw data
- Coaches can review all client check-ins since the last session in one view, with no manual aggregation
- Clients feel more accountable between sessions because their commitments are recorded and visible

## Target Users

**Primary persona — Client:** A person working with a coach (fitness, life, or business) who meets 1–4 times per month, wants to stay accountable between sessions, and needs a simple weekly habit that doesn't require learning new software.

**Secondary persona — Coach:** An independent coach managing 5–30 active clients who wants a quick read on how each client is doing before their next session, without chasing down updates via email or DM.

## Scope

### In Scope (v1)
- Client login and profile (one account per client, linked to their coach)
- Weekly check-in form: configurable questions set by the coach (e.g., mood rating, goal status, freeform reflection)
- Client progress dashboard: timeline of past check-ins with trend charts for numeric responses, including anonymised group average overlay
- Coach review view: list of all clients with their latest check-in date and a summary of responses since last session
- Coach configuration: create/edit check-in questions per client or globally across all clients
- Weekly reminder email sent automatically every Monday (cadence is fixed — not configurable per client)
- Automated onboarding invite email triggered when a coach adds a new client

### Out of Scope
- Real-time messaging or chat between coach and client
- Video or audio features
- Payment processing
- Mobile native app (responsive web only for v1)
- Client-to-client interaction
- AI-generated summaries or insights (v2+)

## Success Criteria

| Goal | Criterion | How to Measure |
|------|-----------|---------------|
| Check-in in < 3 min | Median form completion time ≤ 3 minutes | Time-on-page during usability test |
| Clients see own trends | Client can describe their trend in one sentence without prompting | Usability test task |
| Coach review in one view | Coach can review all outstanding check-ins without navigating away from dashboard | Usability test observation |
| Accountability | 70%+ of active clients submit at least one check-in per week after onboarding | Weekly submission rate at 4-week mark |

## Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Clients abandon check-in habit after week 1 | High | Keep form short (≤ 5 questions); send a single well-timed reminder |
| Coach-configurable questions create inconsistent data that's hard to chart | Med | Support three question types only: numeric scale (1–10), yes/no, and freeform text; only numeric scales generate trend charts |
| Multi-tenant data isolation failure (client sees another client's data) | Med | Row-level security on all client-data tables; explicit CoachId + ClientId scoping on every query |
| Check-in questions change over time, breaking historical trend continuity | Med | Treat question edits as new versions; archive old responses rather than overwriting |

## Open Questions

- [x] Should clients see anonymised group averages? — **Yes** — numeric trend charts include an anonymised group average overlay
- [x] Who sends the onboarding invite? — **Automated** — triggered when coach adds a client; no manual step required
- [x] Weekly only or configurable cadence? — **Weekly fixed** — no per-client configuration; simplifies reminder scheduling
- [x] Free tier or paid? — **Free, single tier for v1** — no billing or payment scope
