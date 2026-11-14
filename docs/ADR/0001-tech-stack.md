# ADR 0001 — Technology Stack

## Status

Accepted

## Decision

- **Backend:** .NET C# Web API (ASP.NET Core)
- **Database:** PostgreSQL
- **Database hosting:** Docker (local), cloud-managed (production)
- **Frontend:** React.js

## Consequences

- Strong integration between .NET backend and C#-familiar team members
- PostgreSQL provides robust relational data for users, progress, lessons
- Docker ensures consistent local development across 5 team members
