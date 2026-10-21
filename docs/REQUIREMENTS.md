# Business Requirements — Jamatho

## Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | User registration and login (kid and parent accounts) | High |
| FR-02 | Browse math categories: Arithmetic, Geometry, Fractions & Decimals, Algebra | High |
| FR-03 | Lesson view: explanation + step-by-step worked example | High |
| FR-04 | Practice problems with step-by-step hints/help (without revealing answer) | High |
| FR-05 | End-of-lesson test/quiz with scoring | High |
| FR-06 | Progress tracking per kid (completed lessons, scores, time spent) | High |
| FR-07 | Parent dashboard: view linked child's progress, strengths/weaknesses | Low |
| FR-08 | Age/grade-based difficulty filtering | Medium |
| FR-09 | Responsive web UI (desktop + tablet) | High |
| FR-10 | Password reset / account recovery | Medium |

## Non-Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NF-01 | Backend: .NET C# Web API | High |
| NF-02 | Database: PostgreSQL, runnable via Docker | High |
| NF-03 | Frontend: SPA (React or Vue — pending ADR) | High |
| NF-04 | Page load < 2s on low-end tablets | Medium |
| NF-05 | WCAG 2.1 AA accessibility (large buttons, high contrast, screen-reader friendly) | High |
| NF-06 | API authentication via JWT | High |
| NF-07 | Data privacy: minimal PII (name, grade level only) | High |
| NF-08 | Local development via Docker Compose | Medium |
