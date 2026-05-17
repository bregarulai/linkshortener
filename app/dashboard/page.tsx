import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Link2 } from "lucide-react";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  await auth.protect();

  const { userId } = await auth();
  const links = userId ? await getLinksByUserId(userId) : [];

  return (
    <DashboardClient initialLinks={links} />
  );
}
