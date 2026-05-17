import { auth } from "@clerk/nextjs/server";
import { getLinksByUserId } from "@/data/links";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  await auth.protect();

  const { userId } = await auth();
  const links = userId ? await getLinksByUserId(userId) : [];

  return (
    <DashboardClient initialLinks={links} />
  );
}
