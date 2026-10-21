# ADR 0001 — Technology Stack

## Status

Proposed

## Decision

- **Backend:** .NET C# Web API (ASP.NET Core)
- **Database:** PostgreSQL
- **Database hosting:** Docker (local), cloud-managed (production)
- **Frontend:** SPA (React or Vue — see ADR 0002)

## Consequences

- Strong integration between .NET backend and C#-familiar team members
- PostgreSQL provides robust relational data for users, progress, lessons
- Docker ensures consistent local development across 5 team members
