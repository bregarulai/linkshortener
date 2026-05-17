# Using /docs Instruction Files

This file explains how to use the `/docs` instruction files in this project.

## When to Use Docs Files

**Before writing ANY code, read the relevant `/docs/*.md` file.** This applies in both PLAN and BUILD mode. There are no exceptions.

## Available Docs Files

| Topic          | File                                          |
| -------------- | --------------------------------------------- |
| Authentication | [`auth.md`](docs/auth.md)                     |
| UI Components  | [`ui-components.md`](docs/ui-components.md)   |
| Data Fetching  | [`data-fetching.md`](docs/data-fetching.md)   |
| Data Mutations | [`data-mutations.md`](docs/data-mutations.md) |

## Quick Reference

- **UI work** (pages, components, styling) → read `docs/ui-components.md`
- **Data access** (queries, API routes, server actions) → read `docs/data-fetching.md`
- **Data mutations** (create, update, delete) → read `docs/data-mutations.md`
- **Auth work** → read `docs/auth.md`

## IMPORTANT: UI Components

- **ALWAYS read `docs/ui-components.md` before editing or creating ANY UI component.** This is EXTREMELY IMPORTANT.
- **NEVER create components in `/components/ui/` directory.** This is where shadcn/ui components belong.
- **ALWAYS use `npx shadcn@latest add <component>` to download/add shadcn components when needed.**

## CRITICAL RULES

- **NEVER create a component file inside `/components/ui/` directory.** This directory is reserved exclusively for shadcn/ui components that are managed by the project's package manager.
- **ALWAYS use `npx shadcn@latest add <component>` to download and add new shadcn components when needed.**
- **If you need to create a new component, place it in the root `/components/` directory or a feature-specific subdirectory.**

## If No Relevant Docs File Exists

Check with the user before proceeding.
