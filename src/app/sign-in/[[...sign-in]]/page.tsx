// Catch-all segment because Clerk routes its own sub-steps (SSO callback,
// verification) underneath this path.
//
// With Google as the only enabled connection in the Clerk dashboard, <SignIn />
// renders as a single "Continue with Google" button — which is why we use the
// prebuilt component rather than a custom flow. Core 3's custom OAuth path would
// mean owning the signIn.sso() / finalize() / transfer state machine by hand.

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="au-wrap">
      <header className="st-top">
        <Link href="/" className="lp-brand lp-brand-sm">
          <span className="lp-tally" aria-hidden />
          Intervue
        </Link>
        <Link href="/" className="st-back">
          ← Back
        </Link>
      </header>

      <div className="au-body">
        <p className="lp-eyebrow">Before the spotlight</p>
        <h1 className="au-h1">Sign in to begin.</h1>
        <p className="au-sub">
          Your interviews and reports are saved to your account, so you can
          look back at what landed and what didn&apos;t.
        </p>
        <div className="au-card">
          <SignIn />
        </div>
      </div>
    </main>
  );
}
