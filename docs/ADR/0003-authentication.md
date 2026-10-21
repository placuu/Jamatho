# ADR 0003 — Authentication

## Status

Proposed

## Decision

JWT (JSON Web Token) authentication with ASP.NET Core Identity.

## Context

- Kids and parents need separate login flows
- Stateless API fits .NET Web API + SPA architecture
- Tokens stored securely on frontend (httpOnly cookies recommended)
