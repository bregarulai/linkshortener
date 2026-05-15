"use client";

import { ClerkProvider as ClerkProviderInner } from "@clerk/nextjs";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ClerkProviderInner>{children}</ClerkProviderInner>;
}
