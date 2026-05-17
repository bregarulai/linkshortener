# Project‑Wide Agent Instructions

This document defines how LLM‑based agents should interact with the _linkshortener_ codebase.  
It contains:

- **General coding conventions** – style, linting, and documentation rules.
- **Instruction files** — platform-agnostic markdown files in `/docs/` that describe conventions and patterns for the codebase.
  All agents must obey these guidelines when writing code or modifying configuration.

---

## General Coding Conventions

| Item              | Guideline                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **File naming**   | Use kebab‑case (`my-component.tsx`) for components and PascalCase (`MyComponent`) for React component names.            |
| **Formatting**    | Run `prettier` with the repository config (`npm run format`). No line breaks > 80 chars unless required by readability. |
| **Linting**       | Enforce ESLint rules defined in `eslint.config.mjs`. All lint warnings must be fixed before commit.                     |
| **Type safety**   | Use TypeScript everywhere; avoid `any` unless absolutely necessary.                                                     |
| **Testing**       | Write unit tests with Jest (`npm test`). Every new feature must have ≥ 80 % code coverage and run on CI.                |
| **Documentation** | Public APIs, React props, and exported utilities must be documented with JSDoc or TypeScript comments.                  |
| **Security**      | Never commit secrets. Use environment variables via `.env`.                                                             |
| **Versioning**    | Follow semantic versioning in `package.json`.                                                                           |
| **Clerk v7**      | Use `auth()` from `@clerk/nextjs/server` (check `userId`). Never use `currentUser()` — it was removed in v7.            |

---

## ⚠️ CRITICAL: Read Docs Before Generating Code

**BEFORE generating ANY code, you MUST read the relevant documentation files in the `/docs` directory.** This is not optional — it is a strict requirement.

Failing to read the relevant docs will result in code that violates project conventions, uses outdated patterns, or conflicts with existing architecture.

**This rule applies to every single task** — even simple UI updates, new pages, or data queries. There are no exceptions.

**How to follow this rule:**

1. Identify the topic relevant to your task (authentication, UI components, database, API, etc.)
2. Locate the corresponding file in `docs/` using the table below
3. **Read the full content of that file** before writing a single line of code
4. Follow the patterns, conventions, and best practices defined in that file

| Topic          | Docs File                                          |
| -------------- | -------------------------------------------------- |
| Authentication | [`docs/auth.md`](./docs/auth.md)                   |
| UI Components  | [`docs/ui-components.md`](./docs/ui-components.md) |
| Data Fetching  | [`docs/data-fetching.md`](./docs/data-fetching.md) |

**Mandatory checks by topic:**

- **Any UI work** (pages, components, layouts, styling) → MUST read [`docs/ui-components.md`](./docs/ui-components.md). All UI must use shadcn/ui components — never create custom components.
- **Any data access** (database queries, API routes, server actions) → MUST read [`docs/data-fetching.md`](./docs/data-fetching.md). All data must go through `/data` helper functions using Drizzle ORM.
- **Any auth-related work** → MUST read [`docs/auth.md`](./docs/auth.md). Use Clerk v7 `auth()` from `@clerk/nextjs/server`.

**If no relevant docs file exists for your task, check with the user before proceeding.**

## Workflow Summary

1. **Instruction Loading** – opencode identifies relevant instruction files from `/docs/` based on the task topic and loads them.
2. **Execution** – The agent follows those instructions to write/edit files.
3. **Verification** – Generated code is run through lint commands. Any failures must be addressed before commit.

---

## Contact & Feedback

If you encounter issues or have suggestions for improving these instructions, open an issue in the repository or contact the maintainer (`<maintainer@example.com>`).

---

_End of @AGENTS.md_
