// Next 16 renamed the `middleware` convention to `proxy`. This runs on the
// Node.js runtime by default.
//
// Its only job is hydrating the Clerk session so `await auth()` works in route
// handlers and server components. It deliberately does NOT gate anything:
// Clerk and the Next docs both recommend checking as close to the resource as
// possible, and keeping the proxy out of the response path means it can never
// buffer /api/chat's stream into a single chunk.

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Everything except Next internals and static assets.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
