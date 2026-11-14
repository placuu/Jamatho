# ADR 0004 — Database

## Status

Accepted

## Decision

PostgreSQL provisioned via .NET Aspire `AddPostgres` in `Jamatho.AppHost`, with a named data volume (`jamatho_postgres_data`) and pgAdmin sidecar for local development. Managed PostgreSQL for production.

## Context

- Relational data fits users, lessons, progress, test results
- .NET Aspire AppHost orchestrates API + Postgres + pgAdmin together; `dotnet run` in `Jamatho.AppHost` starts the full stack
- Named data volume persists DB data across restarts
- Ensures all team members run identical DB versions
- Managed PostgreSQL for production deployment
