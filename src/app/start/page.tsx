"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import ProblemPicker from "@/components/ProblemPicker";
import { getProblemMeta } from "@/lib/problems/catalog";
import { DEFAULT_PROBLEM_ID, type ProblemMeta } from "@/lib/problems/types";
import { LANGUAGE_LIST, DEFAULT_LANGUAGE, type LanguageId } from "@/lib/languages";
import { saveSelection } from "@/lib/session";

export default function StartPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  // The whole ProblemMeta, not just the id: the microcopy below needs the
  // title, and looking it up meant a linear scan of the catalog every render.
  const [problem, setProblem] = useState<ProblemMeta | undefined>(() =>
    getProblemMeta(DEFAULT_PROBLEM_ID)
  );
  const [language, setLanguage] = useState<LanguageId>(DEFAULT_LANGUAGE);

  function start() {
    // Saved before any auth handoff: sessionStorage survives the OAuth
    // round-trip within the same tab, so the selection is still there when
    // Clerk lands the user back on /interview.
    saveSelection({ problemId: problem?.id ?? DEFAULT_PROBLEM_ID, language });
    if (!isSignedIn) {
      openSignIn({ forceRedirectUrl: "/interview" });
      return;
    }
    router.push("/interview");
  }

  return (
    <main className="st-wrap">
      <header className="st-top">
        <Link href="/" className="lp-brand lp-brand-sm">
          <span className="lp-tally" aria-hidden />
          Intervue
        </Link>
        <Link href="/" className="st-back">
          ← Back
        </Link>
      </header>

      <div className="st-head">
        <p className="lp-eyebrow">Before the spotlight</p>
        <h1 className="st-h1">Pick a problem and a language.</h1>
        <p className="st-sub">
          Your interviewer reads the prompt and your code as you go. Choose
          something a notch past comfortable.
        </p>
      </div>

      <section className="st-section">
        <div className="st-rule">
          <span className="st-rule-n">01</span>
          <span className="st-rule-label">Problem</span>
          <span className="st-rule-line" aria-hidden />
        </div>
        <ProblemPicker
          selectedId={problem?.id ?? DEFAULT_PROBLEM_ID}
          onSelect={setProblem}
        />
      </section>

      <section className="st-section">
        <div className="st-rule">
          <span className="st-rule-n">02</span>
          <span className="st-rule-label">Language</span>
          <span className="st-rule-line" aria-hidden />
        </div>
        <div className="st-langs">
          {LANGUAGE_LIST.map((l) => {
            const active = l.id === language;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => setLanguage(l.id)}
                className={`st-lang${active ? " on" : ""}`}
                aria-pressed={active}
              >
                {l.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className="st-actions">
        <button
          type="button"
          className="lp-btn-primary"
          onClick={start}
          disabled={!isLoaded}
        >
          Start the interview →
        </button>
        <span className="st-microcopy">
          Starting <b>{problem?.title}</b> in{" "}
          <b>{LANGUAGE_LIST.find((l) => l.id === language)?.label}</b>
          {isLoaded && !isSignedIn && " · sign in with Google to begin"}
        </span>
      </div>
    </main>
  );
}
