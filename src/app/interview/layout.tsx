// Gates /interview without touching page.tsx, which is a client component.
//
// The interview requires sign-in rather than only gating the save: page.tsx
// fires a kickoff /api/chat call on mount, so an anonymous visitor would land
// on a page whose first action is an error banner.

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/interview");
  return children;
}
