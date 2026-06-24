"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import AnimatedList from "@/components/AnimatedList";
import { PROBLEMS, DEFAULT_PROBLEM_ID } from "@/lib/problems";
import { LANGUAGE_LIST, DEFAULT_LANGUAGE, type LanguageId } from "@/lib/languages";

const SESSION_KEY = "intervue:selection";

export default function StartPage() {
  const router = useRouter();
  const [problemId, setProblemId] = useState<string>(DEFAULT_PROBLEM_ID);
  const [language, setLanguage] = useState<LanguageId>(DEFAULT_LANGUAGE);

  function start() {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ problemId, language })
    );
    router.push("/interview");
  }

  return (
    <main className="st-wrap">
      <header className="st-top">
        <Link href="/" className="lp-brand" style={{ fontSize: 18 }}>
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
        <AnimatedList
          className="st-problem-list"
          items={PROBLEMS.map((p) => (
            <>
              <div className="st-problem-top">
                <span className="st-problem-title">{p.title}</span>
                <span className={`st-diff st-diff-${p.difficulty.toLowerCase()}`}>
                  {p.difficulty}
                </span>
              </div>
              <p className="st-problem-sum">{p.summary}</p>
            </>
          ))}
          onItemSelect={(_, index) => setProblemId(PROBLEMS[index].id)}
          initialSelectedIndex={PROBLEMS.findIndex((p) => p.id === problemId)}
          showGradients={false}
          displayScrollbar={false}
          enableArrowNavigation={false}
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
        <button type="button" className="lp-btn-primary" onClick={start}>
          Start the interview →
        </button>
        <span className="st-microcopy">
          Starting{" "}
          <b>{PROBLEMS.find((p) => p.id === problemId)?.title}</b> in{" "}
          <b>{LANGUAGE_LIST.find((l) => l.id === language)?.label}</b>
        </span>
      </div>
    </main>
  );
}
