"use client";

import { useUser, signOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      signOut({ redirectUrl: "/" });
    } else {
      router.push("/");
    }
  }, [isSignedIn, router]);

  return <p className="flex items-center justify-center min-h-screen bg-background text-foreground">Signing out...</p>;
}
