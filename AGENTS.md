# AGENTS.md — Jamatho

Guidance for AI agents working on this repository.

## Repository Structure

```
/docs/            # Project documentation (vision, requirements, MVP, user stories, ADRs)
/docs/ADR/        # Architecture Decision Records
/backend/         # .NET C# Web API backend + .NET Aspire orchestration
  /Jamatho.Api/          # Web API project (net9.0)
  /Jamatho.AppHost/      # Aspire orchestration (API + Postgres + pgAdmin)
  /Jamatho.ServiceDefaults/ # Shared Aspire service defaults
  Jamatho.slnx           # Solution file
```

## Backend (.NET)

- Run full stack (API + Postgres + pgAdmin via Aspire): `dotnet run` in `/backend/Jamatho.AppHost`
- Run API alone: `dotnet run` in `/backend/Jamatho.Api`
- Build: `dotnet build` in `/backend/`
- Test: `dotnet test` in `/backend/` (if test projects exist)
- Follow .NET naming conventions (PascalCase for public members, camelCase for parameters)

## Frontend

- SPA (React or Vue) — not yet scaffolded. Decision pending (see `/docs/ADR/0002-frontend-framework.md`)

## Database

- PostgreSQL provisioned via .NET Aspire `AddPostgres` in `Jamatho.AppHost` (local data volume + pgAdmin).
- Start local DB: `dotnet run` in `/backend/Jamatho.AppHost`
- Migrations: `dotnet ef database update` (if using EF Core; migrations folder scaffolded under `Jamatho.Api/Data/Migrations`)

## Testing

- Backend tests co-located under `/backend/` (`*.test.cs`) when added
- Frontend tests co-located with components (`*.test.ts(x)`) when frontend is scaffolded

## Conventions

- Commit messages: `type(scope): description` (e.g., `feat(auth): add login endpoint`)
- New ADRs go in `/docs/ADR/` with next sequential number
- Update `/docs/` when scope or architecture changes
