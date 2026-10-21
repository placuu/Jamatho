# Frontend Technology Analysis — Jamatho

**Project:** Jamatho — Math learning web app for kids (ages 6–14)  
**Backend:** .NET C# Web API  
**Database:** PostgreSQL (Docker)  
**Status:** Pending team decision

---

## Candidate Options

### 1. React

| Aspect | Assessment |
|--------|------------|
| Type | Component UI library (Meta) |
| Learning curve | Moderate (JSX, hooks, component lifecycle) |
| Ecosystem | Largest — vast library of UI kits, tutorials, StackOverflow answers |
| Kid-friendly UI | Tailwind/Material UI + accessible component libraries readily available |
| Team fit | 5-person student team — abundant learning resources, easy to onboard |
| Performance | Virtual DOM, good for lesson/step-by-step UI with frequent state changes |
| Integration with .NET | Excellent — standard fetch/axios to Web API |
| Long-term | Strong job market, active maintenance |

**Verdict:** Recommended default.

### 2. Vue 3

| Aspect | Assessment |
|--------|------------|
| Type | Progressive framework |
| Learning curve | Gentle — intuitive template syntax, clear docs |
| Ecosystem | Solid, but smaller than React |
| Kid-friendly UI | Vuetify, PrimeVue, Tailwind available |
| Team fit | Good if team wants simpler onboarding |
| Performance | Reactive system, fast rendering |
| Integration with .NET | Good |
| Long-term | Active, but smaller hiring pool |

**Verdict:** Strong alternative if team prefers simpler syntax.

### 3. .NET Aspire

| Aspect | Assessment |
|--------|------------|
| Type | Cloud-native orchestration stack for .NET |
| Can build UI? | **No** — it's for backend service orchestration, service discovery, health checks, not frontend rendering |

**Verdict:** Eliminated — not a frontend choice.

### 4. Svelte / SvelteKit

| Aspect | Assessment |
|--------|------------|
| Type | Compiler-based UI framework |
| Learning curve | Easy — less boilerplate, reactive by default |
| Ecosystem | Growing but small |
| Kid-friendly UI | Limited component libraries compared to React/Vue |
| Team fit | Risky for student team — fewer tutorials, harder to troubleshoot |

**Verdict:** Viable but higher risk for a university deadline.

### 5. Angular

| Aspect | Assessment |
|--------|------------|
| Type | Full framework (Google) |
| Learning curve | Steep — TypeScript-heavy, opinionated, many concepts |
| Overkill | Too much for this scope (CRUD + lessons + dashboard) |

**Verdict:** Eliminated — overkill.

---

## Comparison Matrix

| Criterion | React | Vue 3 | Svelte | Angular |
|-----------|-------|-------|--------|---------|
| Ease of learning | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Ecosystem size | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| UI component libraries | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| .NET integration | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Team onboarding speed | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Accessibility (WCAG) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Long-term viability | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## Recommendation

**React** is the recommended frontend framework for Jamatho.

**Reasons:**
1. Largest ecosystem — most tutorials and StackOverflow answers for a student team with a hard deadline.
2. Best UI component library support (Tailwind, shadcn/ui, MUI) for building kid-friendly, accessible interfaces with large buttons, high contrast, and simple navigation.
3. Component-based architecture fits the lesson/step-by-step UI pattern well (Lesson → Step → Practice → Test).
4. Strong integration with .NET Web API via standard HTTP/fetch.
5. Easier to hire/onboard replacements if a team member drops.

**Vue 3** is the acceptable fallback if the team unanimously prefers gentler syntax.

---

## Staging for Decision

The team should vote on React vs. Vue by [date]. Once selected, record the decision in `/docs/ADR/0002-frontend-framework.md`.
