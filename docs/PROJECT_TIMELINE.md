# Project Timeline — Jamatho

## Target Deadline

**January 10, 2027** — MVP release and university submission.

## Current Status (as of 2026-11-28)

- **Backend scaffold:** Complete — `Jamatho.Api`, `Jamatho.AppHost`, `Jamatho.ServiceDefaults` are in place. `dotnet run` in `Jamatho.AppHost` starts API + Postgres + pgAdmin together.
- **DbContext & EF Core migrations:** Complete — `JamathoDbContext` with 4 migrations (`InitialCreate`, `AddCkeExamModifications`, `AddQuestionNumberToQuizQuestion`, `AddCategoryIndexAndQuestionNumber`).
- **API endpoints implemented:**
  - Auth (register/login, JWT, refresh tokens) — `AuthController`
  - Categories & lessons — `CategoriesController`, category/lesson seeders, JSON seed data
  - Quizzes & exams — `QuizzesController`, quiz evaluation, XP calculation, submit endpoint
  - Parent-student linking — `ParentStudentController`, `ParentLinkService`
- **CORS:** Configured for local frontend ports.
- **Docker / pgAdmin:** `Dockerfile`, `docker-compose`, preconfigured `servers.json`.
- **Frontend:** Initialized (`package.json`, TypeScript config). Branches `frontend/login-page`, `frontend/register`, `frontend/dashboard`, `frontend/user-profil` exist, but are not yet merged into the main frontend.
- **Still missing:** Practice API (`PracticeProblem`, `PracticeHint` entities exist but no controller), progress tracking API (`LessonProgress` entity exists but no controller), more lesson content (only `L1.1` seeded), merged frontend UI.

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
    EF Core DbContext & migrations :done,   be2, 2026-10-25, 2026-11-24
    User accounts (register/login): :done,  be3, 2026-11-01, 2026-11-27
    Math categories & lessons API :done,   be4, 2026-11-05, 2026-11-25
    Quiz & test endpoints         :done,   be5, 2026-11-05, 2026-11-27
    Parent dashboard API          :done,   be6, 2026-11-10, 2026-11-27
    Practice API endpoints        :        be7, 2026-11-30, 2026-12-08
    Progress tracking API         :        be8, 2026-12-01, 2026-12-10
    More lesson content (seeders) :        be9, 2026-12-05, 2026-12-15

    section Frontend Development
    React scaffold & routing      :done,   fe1, 2026-11-01, 2026-11-28
    Auth UI (login/register)      :        fe2, 2026-11-28, 2026-12-08
    Category & lesson views       :        fe3, 2026-12-05, 2026-12-15
    Practice & test UI            :        fe4, 2026-12-10, 2026-12-20
    Parent dashboard UI           :        fe5, 2026-12-15, 2026-12-28

    section Testing & Polish
    Accessibility & WCAG AA       :        test1, 2026-12-20, 2026-12-28
    Bug fixes & polish            :        test2, 2026-12-22, 2027-01-05
    Final testing & submission prep:        test3, 2027-01-02, 2027-01-10
```

## Roadmap Phases

| Phase | Timeline | Focus | Status |
|-------|----------|-------|--------|
| Phase 1 | Nov 30 – Dec 18, 2026 | Remaining backend API (practice, progress) + more lessons + frontend UI for all core flows | In progress |
| Phase 2 | Dec 18, 2026 – Jan 05, 2027 | Polish, accessibility (WCAG AA), bug fixes | Upcoming |
| Phase 3 | Jan 05 – Jan 10, 2027 | Final testing, university submission, MVP release | Upcoming |

## Key Milestones

| Date | Milestone |
|------|-----------|
| 2026-10-01 | Vision, requirements, MVP, user stories documented |
| 2026-10-15 | ADRs 0001–0006 completed (tech stack, frontend, auth, DB, API style, Aspire) |
| 2026-10-25 | Backend initialized: .NET 9 API + Aspire AppHost + ServiceDefaults |
| 2026-11-24 | EF Core migrations complete (InitialCreate + CKE exam + QuestionNumber + CategoryIndex) |
| 2026-11-27 | Core API endpoints complete (auth, categories, lessons, quizzes, parent-student) |
| 2026-11-28 | Project status review — backend core done, frontend initialized but not merged |
| 2026-12-18 | Phase 1 complete: practice & progress APIs, more lessons, frontend MVP |
| 2027-01-05 | Phase 2 complete: polish, accessibility, bug fixes |
| 2027-01-10 | Final testing, university submission, MVP release |

## Notes

- Backend core (scaffold, DbContext, migrations, auth, categories, lessons, quizzes, parent-student API) is complete on `develop`.
- `Jamatho.Api/Migrations` is gitignored and contains 4 migration files — do not track them in git.
- Frontend is initialized but UI work happens on separate branches (`frontend/login-page`, `frontend/register`, `frontend/dashboard`, `frontend/user-profil`) and must be merged.
- Practice API (`PracticeProblem`, `PracticeHint`) and Progress tracking API (`LessonProgress`) entities exist but lack controllers — these are the next backend tasks.
- All dates are inclusive. Weekends are excluded from the Gantt chart working days.