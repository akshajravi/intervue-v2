"use client";

// Auth-dependent nav items, isolated into a client component on purpose.
// <Show> reads session state, and using it directly in the landing server
// component would opt the whole marketing page out of static rendering.
// Resolving it in the browser keeps / prerendered.

import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavAuth() {
  return (
    <>
      <Show when="signed-out">
        <Link href="/sign-in">Sign in</Link>
      </Show>
      <Show when="signed-in">
        <Link href="/history">History</Link>
      </Show>
    </>
  );
}

export function NavAvatar() {
  return (
    <Show when="signed-in">
      <UserButton />
    </Show>
  );
}
