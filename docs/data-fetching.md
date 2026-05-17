# Data Fetching

All data fetching in this Next.js application must follow a strict, centralized pattern to ensure consistency, performance, and maintainability.

## Core Rules

- **ALWAYS use Server Components for data fetching.** Never use Client Components (`"use client"`) to fetch data.
- **ALWAYS use the helper functions in the `/data` directory.** Never fetch data directly inside components.
- **ALL helper functions in `/data` must use Drizzle ORM.** No raw SQL queries or alternative database clients.

## Why These Rules Exist

| Rule                        | Reason                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Server Components only      | Eliminates unnecessary client-side network requests, improves TTFB, and keeps data access on the server.     |
| Centralized `/data` helpers | Single source of truth for queries; easy to update, cache, or swap implementations without touching UI code. |
| Drizzle ORM exclusively     | Type-safe database interactions, consistent query patterns, and maintainable migrations.                     |

## Implementation Guidelines

### 1. Create Helper Functions in `/data`

Every data access should be a named export in a file under `/data`, organized by domain (e.g., `links.ts`, `users.ts`).

```ts
// data/links.ts
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getLinkById(id: string) {
  const result = await db.select().from(links).where(eq(links.id, id)).limit(1);
  return result[0] ?? null;
}

export async function getAllLinks() {
  return await db.select().from(links).orderBy(links.createdAt);
}
```

### 2. Consume Helpers in Server Components

```tsx
import { getLinkById } from "@/data/links";

export default async function LinkPage({ params }: { params: { id: string } }) {
  const link = await getLinkById(params.id);

  if (!link) return <p>Link not found</p>;

  return <div>{link.url}</div>;
}
```

### 3. Never Fetch in Client Components

```tsx
// ❌ WRONG — never do this
"use client";

export function MyComponent() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/api/links")
      .then((r) => r.json())
      .then(setData);
  }, []);
  return <div>{data}</div>;
}

// ✅ CORRECT — use Server Component + helper
import { getAllLinks } from "@/data/links";

export default async function LinksList() {
  const links = await getAllLinks();
  return <div>{/* render links */}</div>;
}
```

## When Client-Side Fetching Is Acceptable

The only exception is **optimistic UI updates** (e.g., search input, infinite scroll) where data is already loaded server-side and the client only needs to refine or append results. Even then, prefer using Next.js API routes or Server Actions rather than direct `fetch()` calls to the database.
