# Link Shortener – Agent Quick Reference

## Tech Stack

- **Framework**: Next.js 16 (App Router) | **Language**: TypeScript (strict, `@/` → root)
- **Auth**: Clerk (`@clerk/nextjs` v7+) — the only auth provider
- **Database**: Neon (PostgreSQL) via Drizzle ORM
- **UI**: shadcn/ui + Tailwind CSS 4 + Radix UI | **Package manager**: npm

## Commands

| Script | Command | Purpose |
|--------|---------|---------|
| Dev | `npm run dev` | Start dev server |
| Build | `npm run build` | Production build |
| Lint | `npm run lint` | Typecheck + ESLint |
| Format | `npm run format` | Prettier formatting |
| DB generate | `npm run db:generate` | Generate Drizzle migration files |
| DB migrate | `npm run db:migrate` | Apply pending migrations |

## Architecture

\`\`\`
app/                    # Next.js App Router entrypoints
├── (auth)/             # Clerk sign-in/sign-up pages
├── dashboard/          # Protected dashboard page (auth-protected)
├── layout.tsx          # Root layout — ClerkProvider, dark mode, Clerk UI provider
├── page.tsx            # Landing page (public)
└── globals.css         # Tailwind + shadcn theme tokens
components/ui/          # shadcn/ui components (Button, Card, Input, etc.)
data/                   # Domain-specific Drizzle query helpers
db/
├── index.ts            # drizzle-neon client factory
└── schema.ts           # Drizzle table definitions (links table)
drizzle/                # Drizzle migration files
proxy.ts                # Clerk middleware — clerkMiddleware() with route matcher
\`\`\`

## Key Patterns

- **Data fetching**: Server Components only. All DB queries live in `data/` helpers. No client-side `fetch()`.
- **Data mutations**: Server Actions only (in `actions.ts` colocated with components). Always check `auth()` first, validate with Zod, delegate to `data/` helpers.
- **Page-level protection**: Call `await auth.protect()` at the top of protected pages.
- **Session access**: Use `auth()` from `@clerk/nextjs/server`. Check `userId` for auth state.
- **`auth.protect()` vs `auth()`**: `auth.protect()` redirects unauthenticated users; `auth()` returns `{ userId }` for conditional logic.
- **Clerk v7+**: `currentUser()` is removed — use `auth()` exclusively.
- **shadcn/ui**: Never write custom components — extend via `npx shadcn@latest add` or Tailwind classes.

## DB Schema

**`links`** — `id` (serial PK), `userId` (text), `originalUrl` (varchar 2048), `shortCode` (varchar 12), `createdAt` (timestamptz), `updatedAt` (timestamptz)

## Reference

| Topic | File |
|-------|------|
| Auth (Clerk patterns) | `docs/auth.md` |
| Data Fetching | `docs/data-fetching.md` |
| Data Mutations | `docs/data-mutations.md` |
| UI Components | `docs/ui-components.md` |

## Anti-Patterns

- ❌ Custom auth logic — always use Clerk
- ❌ Client-side data fetching — use Server Components
- ❌ Direct Drizzle imports in Server Actions — go through `data/` helpers
- ❌ `currentUser()` — use `auth()` from `@clerk/nextjs/server`
- ❌ `FormData` as action parameters — use typed objects
- ❌ Custom UI components — use shadcn/ui via CLI
- ❌ API routes for mutations — use Server Actions
