# Project Timeline — Jamatho

## Target Deadline

**January 10, 2027** — MVP release and university submission.

## Current Status (as of 2026-11-28)

- **Backend scaffold:** Complete — `Jamatho.Api`, `Jamatho.AppHost`, `Jamatho.ServiceDefaults` are in place. `dotnet run` in `Jamatho.AppHost` starts API + Postgres + pgAdmin together.
- **API endpoints:** Not implemented yet — controllers, services, DbContext, and EF Core migrations are still missing.
- **Frontend:** Not scaffolded — React decision recorded (ADR 0002), but no React project exists yet.
- **Database:** `Jamatho.Api/Migrations` folder is gitignored and currently empty — migrations must be generated with `dotnet ef migrations add`.

## Gantt Chart

```mermaid
gantt
    title Jamatho Project Timeline
    dateFormat  YYYY-MM-DD
    excludes    weekends

    section Documentation & Architecture
    Vision & requirements        :done,    doc1, 2026-10-01, 2026-10-15
    ADRs (tech stack, DB, auth, API, Aspire) :done, doc2, 2026-10-15, 2026-10-31
    Frontend framework decision (React) :done, doc3, 2026-11-01, 2026-11-14

    section Backend Development
    Aspire AppHost + API scaffold :done,   be1, 2026-10-25, 2026-11-14
    EF Core DbContext & migrations :        be2, 2026-11-28, 2026-12-04
    User accounts (register/login):        be3, 2026-12-01, 2026-12-08
    Math categories & lessons API :        be4, 2026-12-05, 2026-12-12
    Practice & test endpoints     :        be5, 2026-12-08, 2026-12-15
    Progress tracking API         :        be6, 2026-12-10, 2026-12-18
    Parent dashboard API          :        be7, 2026-12-12, 2026-12-20

    section Frontend Development
    React scaffold & routing      :        fe1, 2026-11-30, 2026-12-07
    Auth UI (login/register)      :        fe2, 2026-12-05, 2026-12-12
    Category & lesson views       :        fe3, 2026-12-10, 2026-12-17
    Practice & test UI            :        fe4, 2026-12-15, 2026-12-22
    Parent dashboard UI           :        fe5, 2026-12-18, 2026-12-28

    section Testing & Polish
    Accessibility & WCAG AA       :        test1, 2026-12-20, 2026-12-28
    Bug fixes & polish            :        test2, 2026-12-22, 2027-01-05
    Final testing & submission prep:        test3, 2027-01-02, 2027-01-10
```

## Roadmap Phases

| Phase | Timeline | Focus | Status |
|-------|----------|-------|--------|
| Phase 1 | Nov 28 – Dec 18, 2026 | MVP core: backend API (accounts, categories, lessons, practice, tests, progress) + frontend scaffold | In progress |
| Phase 2 | Dec 18, 2026 – Jan 05, 2027 | Polish, accessibility, bug fixes, more lessons per category | Upcoming |
| Phase 3 | Jan 05 – Jan 10, 2027 | Final testing, university submission, MVP release | Upcoming |

## Key Milestones

| Date | Milestone |
|------|-----------|
| 2026-10-01 | Vision, requirements, MVP, user stories documented |
| 2026-10-15 | ADRs 0001–0006 completed (tech stack, frontend, auth, DB, API style, Aspire) |
| 2026-11-14 | Backend scaffold initialized (.NET 9 API + Aspire AppHost + ServiceDefaults) |
| 2026-11-28 | Project status review — backend scaffold complete, endpoints not yet implemented |
| 2026-12-18 | Phase 1 complete: core backend API + frontend scaffold |
| 2027-01-05 | Phase 2 complete: polish, accessibility, bug fixes |
| 2027-01-10 | Final testing, university submission, MVP release |

## Notes

- Backend scaffold (`Jamatho.Api`, `Jamatho.AppHost`, `Jamatho.ServiceDefaults`) is complete; actual API controllers and EF Core migrations still need to be added.
- Frontend is not yet scaffolded; React was selected in ADR 0002 but no React project exists.
- `Jamatho.Api/Migrations` folder is gitignored and currently empty — migrations must be generated with `dotnet ef migrations add`.
- All dates are inclusive. Weekends are excluded from the Gantt chart working days.