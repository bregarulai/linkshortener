# Using /docs Instruction Files

This file explains how to use the `/docs` instruction files in this project.

## CRITICAL: Before ANY Code Changes

**You MUST read the relevant docs file BEFORE making any code changes.** This is non-negotiable.

### For UI work (components, pages, styling):

1. **READ `docs/ui-components.md` FIRST** — before writing, editing, or deleting ANY UI code
2. Follow instructions in that file strictly
3. **NEVER skip reading this file** — failure to read it before UI work is a critical error

### For data access:

- Read `docs/data-fetching.md` before writing queries or API routes

### For data mutations:

- Read `docs/data-mutations.md` before writing create/update/delete logic

### For authentication:

- Read `docs/auth.md` before writing auth-related code

## Available Docs Files

| Topic | File |
| --- | --- |
| Authentication | [`auth.md`](docs/auth.md) |
| UI Components | [`ui-components.md`](docs/ui-components.md) |
| Data Fetching | [`data-fetching.md`](docs/data-fetching.md) |
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
