# Data Mutations

All data mutations in this application must be performed via **Next.js Server Actions**.

## Core Rules

| Rule | Reason |
| --- | --- |
| Use Server Actions only | No API routes, no client-side `fetch()` mutations. |
| Call Server Actions from Client Components | Server Actions cannot be invoked from Server Components. |
| Name files `actions.ts` | Enforces a consistent, discoverable pattern. |
| Colocate `actions.ts` next to the calling component | Keeps mutations close to their consumers. |
| Type all input parameters | Never use `FormData` — use explicit TypeScript types. |
| Validate all input with Zod | Defense-in-depth: reject invalid data before any DB operation. |
| Check for authenticated user first | Never proceed to DB writes without verifying `auth()`. |
| Use `/data` helper functions for DB operations | Server Actions must never import Drizzle directly. |

## File Layout

```
app/
├── (dashboard)/
│   ├── links/
│   │   ├── list.tsx          ← client component
│   │   └── actions.ts        ← colocated server actions
│   └── settings/
│       ├── page.tsx
│       └── actions.ts
data/
├── links.ts                  ← Drizzle-wrapped helper functions
└── users.ts
```

## Implementation

### 1. Define Input Types

```ts
// app/(dashboard)/links/actions.ts

export type CreateLinkInput = {
  url: string;
  title?: string;
};
```

### 2. Write the Server Action

```ts
// app/(dashboard)/links/actions.ts

"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink } from "@/data/links";

const createSchema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
});

export async function createLinkAction(input: CreateLinkInput) {
  // 1. Auth check
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Validate input
  const result = createSchema.safeParse(input);
  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() };
  }

  // 3. Delegate to /data helper
  const link = await createLink({ ...result.data, userId });
  return { data: link };
}
```

### 3. Call from a Client Component

```tsx
// app/(dashboard)/links/list.tsx
"use client";

import { createLinkAction } from "./actions";

export function LinkList() {
  async function handleSubmit(formData: { url: string; title?: string }) {
    const res = await createLinkAction(formData);
    if (res.error) console.error(res.error);
  }

  return <form onSubmit={() => handleSubmit({ url: "https://example.com" })}>
    <button type="submit">Create</button>
  </form>;
}
```

## Anti-Patterns

```ts
// ❌ WRONG — using FormData as the TypeScript type
export async function createLinkAction(formData: FormData) { … }

// ❌ WRONG — calling from a Server Component
// (actions must be invoked from "use client" components)

// ❌ WRONG — importing Drizzle directly inside a server action
import { db } from "@/db";
export async function badAction(input: CreateLinkInput) {
  await db.insert(links).values(input); // should use /data helper
}

// ❌ WRONG — no auth check
export async function noAuthAction(input: CreateLinkInput) {
  return await createLink(input); // must verify userId first
}

// ❌ WRONG — no validation
export async function noValidationAction(input: CreateLinkInput) {
  const { userId } = await auth();
  return await createLink({ ...input, userId }); // must Zod.validate
}
```

## Checklist

- [ ] Server action file named `actions.ts`?
- [ ] Colocated next to the calling component?
- [ ] Called from a `"use client"` component?
- [ ] Input parameters have explicit TypeScript types (not `FormData`)?
- [ ] Input validated with Zod?
- [ ] Authenticated user checked via `auth()` before DB operations?
- [ ] Database operations delegated to `/data` helper functions?
