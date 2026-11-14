# Project Timeline — Jamatho

## Target Deadline

**January 10, 2027** — MVP release and university submission.

## Gantt Chart

```mermaid
gantt
    title Jamatho Project Timeline
    dateFormat  YYYY-MM-DD
    excludes    weekends
    %% Today: 2026-11-14

    section Documentation & Architecture
    Vision & requirements        :done,    doc1, 2026-10-01, 2026-10-15
    ADRs (tech stack, DB, auth, API, Aspire) :done, doc2, 2026-10-15, 2026-10-31
    Frontend framework decision (React) :done, doc3, 2026-11-01, 2026-11-14

    section Backend Development
    Aspire AppHost + API scaffold :done,   be1, 2026-10-25, 2026-11-14
    EF Core PostgreSQL migrations :        be2, 2026-11-15, 2026-11-30
    User accounts (register/login):        be3, 2026-11-15, 2026-11-25
    Math categories & lessons API :        be4, 2026-11-25, 2026-12-10
    Practice & test endpoints     :        be5, 2026-12-01, 2026-12-15
    Progress tracking API         :        be6, 2026-12-05, 2026-12-18
    Parent dashboard API          :        be7, 2026-12-10, 2026-12-20

    section Frontend Development
    React scaffold & routing      :        fe1, 2026-11-15, 2026-11-30
    Auth UI (login/register)      :        fe2, 2026-11-25, 2026-12-05
    Category & lesson views       :        fe3, 2026-12-01, 2026-12-12
    Practice & test UI            :        fe4, 2026-12-08, 2026-12-18
    Parent dashboard UI           :        fe5, 2026-12-12, 2026-12-22

    section Testing & Polish
    Accessibility & WCAG AA       :        test1, 2026-12-15, 2026-12-22
    Bug fixes & polish            :        test2, 2026-12-15, 2026-12-28
    Final testing & submission prep:        test3, 2026-12-22, 2027-01-10
```

## Roadmap Phases

| Phase | Timeline | Focus | Status |
|-------|----------|-------|--------|
| Phase 1 | Nov 14 – Nov 15, 2026 | MVP core: accounts, categories, lessons, practice, tests, parent dashboard | In progress / completing |
| Phase 2 | Nov 15 – Dec 15, 2026 | Polish, accessibility, bug fixes, more lessons per category | Upcoming |
| Phase 3 | Dec 15, 2026 – Jan 10, 2027 | Final testing, university submission prep | Upcoming |

## Key Milestones

| Date | Milestone |
|------|-----------|
| 2026-10-01 | Vision, requirements, MVP, user stories documented |
| 2026-10-15 | ADRs 0001–0005 completed (tech stack, frontend analysis, auth, DB, API style) |
| 2026-10-25 | Backend initialized: .NET 9 API + Aspire AppHost + ServiceDefaults |
| 2026-11-01 | Frontend framework analysis completed |
| 2026-11-14 | Frontend framework decision: **React** (ADR 0002 updated) |
| 2026-11-14 | Documentation aligned with backend (AGENTS.md, README, ADR 0004, ADR 0006) |
| 2026-11-14 | API documented and tested in Postman; OpenAPI available at /openapi.json in Development |
| 2026-11-30 | Backend API endpoints implemented (categories, lessons, practice, tests) |
| 2026-12-15 | Frontend MVP complete (React UI for all core flows) |
| 2026-12-22 | Accessibility (WCAG 2.1 AA) and bug fixes complete |
| 2027-01-10 | Final testing, university submission, MVP release |

## Notes

- All dates are inclusive.
- Weekends are excluded from the Gantt chart working days.
