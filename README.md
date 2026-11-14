# Jamatho

A web application for learning math — built for kids preparing for the 8th-grade final exam with step-by-step lessons, practice exercises, and parent progress tracking.

## Contents

| Document | Description |
|----------|-------------|
| `VISION.md` | Problem statement, target users, goals, non-goals |
| `REQUIREMENTS.md` | Functional and non-functional business requirements |
| `MVP.md` | Minimum viable product scope, success metrics, roadmap |
| `USER_STORIES.md` | User stories with acceptance criteria |
| `analysis/frontend-analysis.md` | Frontend framework comparison and recommendation |
| `ADR/` | Architecture Decision Records |

## Tech Stack

- **Backend:** .NET C# Web API
- **Database:** PostgreSQL (Docker)
- **Frontend:** React

## Documentation

See `/docs/` for vision, requirements, MVP, user stories, ADRs, and analysis.

## Quick Start

```bash
# Full local stack (API + Postgres + pgAdmin via .NET Aspire)
cd backend/Jamatho.AppHost
dotnet run

# API alone
cd backend/Jamatho.Api
dotnet run
```

API runs on `http://localhost:5006` when started directly (`dotnet run` in `Jamatho.Api`, `http` profile). When started via `Jamatho.AppHost`, the port is assigned dynamically by .NET Aspire. API endpoints are tested and documented in Postman; OpenAPI is available at `/openapi.json` in Development.

# Frontend
cd frontend
npm install
npm run dev

## Deadline

January 2027
