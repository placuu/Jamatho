# ADR 0002 — Frontend Framework

## Status

Decided

## Decision

React.js

## Context

- Kid-friendly, accessible UI with large buttons and high contrast (Tailwind, shadcn/ui, MUI)
- Largest ecosystem — most tutorials and StackOverflow answers for a student team
- Strong integration with .NET Web API via standard HTTP/fetch
- Component-based architecture fits the lesson/step-by-step UI pattern (Lesson → Step → Practice → Test)
- Easiest onboarding and hiring/onboarding replacements if a team member drops

Vue 3 remains an acceptable alternative but was not selected.

See `/docs/analysis/frontend-analysis.md` for the full comparison that led to this decision.
