"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProblem, type Problem } from "@/lib/problems";
import { getLanguage, type LanguageConfig } from "@/lib/languages";

const SESSION_KEY = "intervue:selection";

export default function InterviewPage() {
  const [problem, setProblem] = useState<Problem>(() => getProblem(null));
  const [language, setLanguage] = useState<LanguageConfig>(() =>
    getLanguage(null)
  );

  // Selection is passed from /start via sessionStorage; fall back to defaults.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const { problemId, language: langId } = JSON.parse(raw);
        setProblem(getProblem(problemId));
        setLanguage(getLanguage(langId));
      }
    } catch {
      // Keep defaults on any parse/storage error.
    }
  }, []);

  return (
    <main className="iv-root">
      <header className="iv-bar">
        <Link href="/" className="lp-brand" style={{ fontSize: 16 }}>
          <span className="lp-tally" aria-hidden />
          Intervue
        </Link>
        <div className="iv-bar-meta">
          <span className="iv-bar-problem">{problem.title}</span>
          <span className="iv-bar-lang">{language.label}</span>
        </div>
        <Link href="/start" className="iv-bar-exit">
          End session
        </Link>
      </header>

      <div className="iv-split">
        {/* ---- Left: problem statement + chat ---- */}
        <section className="iv-left">
          <ProblemPanel problem={problem} />
          <div className="iv-chat">
            <div className="iv-chat-stream">
              <div className="iv-placeholder">
                The interviewer will greet you here once chat is wired up
                (Session 2).
              </div>
            </div>
            <div className="iv-composer">
              <input
                className="iv-composer-input"
                placeholder="Message your interviewer…"
                disabled
              />
              <button className="iv-composer-send" disabled>
                Send
              </button>
            </div>
          </div>
        </section>

        {/* ---- Right: editor + run console ---- */}
        <section className="iv-right">
          <div className="iv-editor-bar">
            <span className="iv-editor-file">{language.filename}</span>
            <button className="iv-run" disabled>
              Run ▸
            </button>
          </div>
          <div className="iv-editor">
            <pre className="iv-editor-starter">{language.starter}</pre>
            <div className="iv-placeholder iv-editor-note">
              Monaco editor mounts here (Session 3).
            </div>
          </div>
          <div className="iv-console">
            <div className="iv-console-label">Output</div>
            <div className="iv-placeholder">
              Run output (stdout / stderr) appears here (Session 3).
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProblemPanel({ problem }: { problem: Problem }) {
  return (
    <div className="iv-problem">
      <div className="iv-problem-head">
        <h1 className="iv-problem-title">{problem.title}</h1>
        <span className={`st-diff st-diff-${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </span>
      </div>
      <p className="iv-problem-prompt">{problem.prompt}</p>

      <h2 className="iv-problem-sub">Examples</h2>
      {problem.examples.map((ex, i) => (
        <div key={i} className="iv-example">
          <div>
            <span className="iv-example-k">Input</span> {ex.input}
          </div>
          <div>
            <span className="iv-example-k">Output</span> {ex.output}
          </div>
          {ex.explanation && (
            <div className="iv-example-exp">{ex.explanation}</div>
          )}
        </div>
      ))}

      <h2 className="iv-problem-sub">Constraints</h2>
      <ul className="iv-constraints">
        {problem.constraints.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
