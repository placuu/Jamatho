# AGENTS.md — Jamatho

Guidance for AI agents working on this repository.

## Repository Structure

```
/docs/            # Project documentation (vision, requirements, MVP, user stories, ADRs)
/docs/ADR/        # Architecture Decision Records
/src/Api/         # .NET C# Web API backend
/src/Frontend/    # SPA frontend (React or Vue)
/tests/           # Unit and integration tests
/docker-compose.yml
```

## Backend (.NET)

- Run: `dotnet run` in `/src/Api`
- Build: `dotnet build`
- Test: `dotnet test`
- Follow .NET naming conventions (PascalCase for public members, camelCase for parameters)

## Frontend

- Run: `npm run dev` in `/src/Frontend`
- Install: `npm install`
- Follow existing component structure; prefer functional components + hooks (React) or Composition API (Vue)

## Database

- Start local DB: `docker-compose up -d`
- Migrations: `dotnet ef database update` (if using EF Core)

## Testing

- Backend tests in `/tests/`
- Frontend tests co-located with components (`*.test.ts(x)`)

## Conventions

- Commit messages: `type(scope): description` (e.g., `feat(auth): add login endpoint`)
- New ADRs go in `/docs/ADR/` with next sequential number
- Update `/docs/` when scope or architecture changes
