# ADR 0006 — .NET Aspire Orchestration

## Status

Accepted

## Decision

Use .NET Aspire as the local/runtime orchestration layer for the Jamatho backend.

Projects:
- `Jamatho.Api` — ASP.NET Core Web API (net9.0), OpenTelemetry
- `Jamatho.AppHost` — Aspire distributed application host; wires API + PostgreSQL + pgAdmin
- `Jamatho.ServiceDefaults` — shared service defaults (health checks, service discovery, OpenTelemetry)

## Context

- Team needs a consistent local environment across 5 members without hand-writing `docker-compose.yml`
- API must wait for PostgreSQL to be ready before starting
- Frontend team needs Postman collection to inspect and test endpoints during development
- Observability (health checks, tracing, metrics) desired for debugging the lesson/practice/test flow

## Decision details

`Jamatho.AppHost/AppHost.cs`:
- `builder.AddPostgres("jamatho-postgres")` with data volume `jamatho_postgres_data` and pgAdmin
- `postgres.AddDatabase("jamathoDB")`
- `builder.AddProject<Projects.Jamatho_Api>("jamatho-api")` with `.WithReference(jamathoDB).WaitFor(jamathoDB)`

`Jamatho.Api/Program.cs`:
- `builder.AddServiceDefaults()` registers OpenTelemetry, default health checks, service discovery, and HTTP resilience
- `app.MapDefaultEndpoints()` maps `/health` and `/alive` in Development

## Consequences

- Single `dotnet run` in `Jamatho.AppHost` starts API + Postgres + pgAdmin together
- API listens on `http://localhost:5006` (launchSettings `http` profile)
- Health checks at `/health` and `/alive` (Development only)
- EF Core PostgreSQL migrations scaffolded under `Jamatho.Api/Data/Migrations` (ready in develop)
- Adds .NET Aspire dependency; team must install .NET 9 SDK and Aspire workload

## Related

- ADR 0001 — Technology Stack
- ADR 0004 — Database
- ADR 0005 — API Style
