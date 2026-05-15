# Authentication – Clerk

All authentication in this app is handled exclusively by **Clerk**. No other auth methods or libraries may be introduced.

## Core Rules

- Use Clerk for **sign-in, sign-up, sessions, user management, and route protection**.
- Never implement custom auth logic, JWT handling, or session cookies.
- All Clerk configuration must live in environment variables via `.env`.

## Routing Rules

| Scenario                                               | Expected Behavior         |
| ------------------------------------------------------ | ------------------------- |
| User visits `/dashboard` while **not logged in**       | Redirect to `/`.          |
| User visits `/dashboard` while **logged in**           | Grant access normally.    |
| User visits the **homepage** (`/`) while **logged in** | Redirect to `/dashboard`. |
| After **sign-in or sign-up**                           | Redirect to `/dashboard`. |

## Implementation Notes

### Middleware (`proxy.ts`)

- Use `clerkMiddleware()` in `proxy.ts` to protect all routes globally.
- Clerk's middleware handles session verification and redirects unauthenticated users to sign-in automatically.

### Page-Level Protection

- In any protected page component, call `await auth.protect()` from `@clerk/nextjs/server` at the top of the component.
- Example:

```tsx
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  await auth.protect();

  return <h1>Dashboard</h1>;
}
```

- This is the recommended approach for protecting individual pages — it is cleaner and avoids redirect loops.

### General Rules

- In `@clerk/nextjs` v7+, `currentUser()` is removed. Use `auth()` from `@clerk/nextjs/server` and check `userId` instead.
- Use `<SignedIn>` and `<SignedOut>` components (with `mode='modal'` for popups) to guard UI elements.
- Use Clerk's middleware for server-side route protection — do not implement custom auth logic.
- Always verify the user's session before rendering protected content.
