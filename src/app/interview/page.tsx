"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Chat, { type UiMessage } from "@/components/Chat";
import CodeEditor from "@/components/CodeEditor";
import OutputConsole, { type RunStatus } from "@/components/OutputConsole";
import type { ChatRequest, RunResult } from "@/lib/api";
import { getLanguage, LANGUAGE_LIST, type LanguageId } from "@/lib/languages";
import type { Evaluation } from "@/lib/prompt";
import { getProblem, type Problem } from "@/lib/problems";
import { loadSelection } from "@/lib/session";

// Fired once on mount so the interviewer opens the conversation; never rendered.
const KICKOFF =
  "(The candidate just joined the interview. Greet them briefly, frame the " +
  "problem in a sentence or two, and invite them to talk through an initial " +
  "approach before writing code.)";

type EvalState = "idle" | "loading" | "done" | "error";

export default function InterviewPage() {
  // ---- Selection (read from sessionStorage after hydration) --------------
  const [setup, setSetup] = useState<{
    problemId: string | null;
    langId: LanguageId;
  } | null>(null);
  const problem = getProblem(setup?.problemId);
  const language = getLanguage(setup?.langId);
  const ready = setup !== null;

  // ---- Editor + run state ------------------------------------------------
  // null means "untouched" — the editor shows the current language's starter.
  const [code, setCode] = useState<string | null>(null);
  const effectiveCode = code ?? language.starter;
  const [runStatus, setRunStatus] = useState<RunStatus>("idle");
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [runError, setRunError] = useState<string | null>(null);

  // ---- Chat state --------------------------------------------------------
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [streaming, setStreaming] = useState(false);

  // ---- Evaluation --------------------------------------------------------
  const [evalState, setEvalState] = useState<EvalState>("idle");
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);
  const ended = evalState === "done";

  // Callbacks (kickoff effect, Monaco command, chat sends) need the current
  // editor/run state without re-registering — mirror it into refs post-render.
  const codeRef = useRef(effectiveCode);
  const langRef = useRef(language);
  const problemRef = useRef(problem);
  const lastRunRef = useRef<RunResult | null>(null);
  useEffect(() => {
    codeRef.current = effectiveCode;
    langRef.current = language;
    problemRef.current = problem;
  });

  useEffect(() => {
    const sel = loadSelection();
    // sessionStorage is client-only, so a one-time post-mount sync is the point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSetup({
      problemId: sel?.problemId ?? null,
      langId: getLanguage(sel?.language).id,
    });
  }, []);

  // ---- Chat: send a transcript, stream the reply back --------------------
  const requestAssistant = useCallback(async (transcript: UiMessage[]) => {
    setStreaming(true);
    setMessages([...transcript, { role: "assistant", content: "" }]);

    const appendDelta = (chunk: string) =>
      setMessages((prev) => {
        const next = prev.slice();
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: last.content + chunk };
        return next;
      });

    try {
      const payload: ChatRequest = {
        // Errored turns and the empty placeholder never go to the model.
        messages: transcript
          .filter((m) => !m.error && m.content)
          .map(({ role, content }) => ({ role, content })),
        problemId: problemRef.current.id,
        language: langRef.current.id,
        code: codeRef.current,
        lastRun: lastRunRef.current,
      };
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok || !res.body) {
        const err = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(err?.error ?? `Chat request failed (${res.status}).`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        appendDelta(decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      const note =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setMessages((prev) => {
        const next = prev.slice();
        next[next.length - 1] = {
          role: "assistant",
          content: `The interviewer dropped the connection: ${note}`,
          error: true,
        };
        return next;
      });
    } finally {
      setStreaming(false);
    }
  }, []);

  // Hidden kickoff turn — the ref guards React StrictMode's double effect.
  const kickedOff = useRef(false);
  useEffect(() => {
    if (!ready || kickedOff.current) return;
    kickedOff.current = true;
    void requestAssistant([{ role: "user", content: KICKOFF, hidden: true }]);
  }, [ready, requestAssistant]);

  const sendMessage = useCallback(
    (text: string) => {
      setMessages((prev) => {
        const transcript: UiMessage[] = [...prev, { role: "user", content: text }];
        void requestAssistant(transcript);
        return transcript;
      });
    },
    [requestAssistant]
  );

  // ---- Run (single-flight; Piston is shared and rate-limited) ------------
  const runningRef = useRef(false);
  const runCode = useCallback(async () => {
    if (runningRef.current || !langRef.current) return;
    runningRef.current = true;
    setRunStatus("running");
    setRunError(null);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: langRef.current.id,
          code: codeRef.current,
        }),
      });
      const data = (await res.json()) as RunResult & { error?: string };
      if (!res.ok) throw new Error(data.error ?? `Run failed (${res.status}).`);
      setRunResult(data);
      lastRunRef.current = data;
      setRunStatus("done");
    } catch (err) {
      setRunError(
        err instanceof Error ? err.message : "Run failed unexpectedly."
      );
      setRunStatus("error");
    } finally {
      runningRef.current = false;
    }
  }, []);

  // Run shortcut also works when focus is outside Monaco.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        void runCode();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [runCode]);

  // ---- Language switch (resets the editor to the new starter) ------------
  function switchLanguage(id: LanguageId) {
    if (id === language.id) return;
    setSetup((s) => (s ? { ...s, langId: id } : s));
    setCode(null); // back to the new language's starter
    setRunStatus("idle");
    setRunResult(null);
    lastRunRef.current = null;
  }

  // ---- End interview → structured evaluation -----------------------------
  const endInterview = useCallback(async () => {
    if (evalState === "loading") return;
    setEvalState("loading");
    setEvalError(null);
    try {
      const payload: ChatRequest = {
        messages: messages
          .filter((m) => !m.error && m.content)
          .map(({ role, content }) => ({ role, content })),
        problemId: problem.id,
        language: language.id,
        code: codeRef.current,
        lastRun: lastRunRef.current,
      };
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as Evaluation & { error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? `Evaluation failed (${res.status}).`);
      }
      setEvaluation(data);
      setEvalState("done");
    } catch (err) {
      setEvalError(
        err instanceof Error ? err.message : "Evaluation failed unexpectedly."
      );
      setEvalState("error");
    }
  }, [evalState, messages, problem.id, language.id]);

  return (
    <main className="iv-root">
      <header className="iv-bar">
        <Link href="/" className="lp-brand lp-brand-sm">
          <span className="lp-tally" aria-hidden />
          Intervue
        </Link>
        <div className="iv-bar-meta">
          <span className="iv-bar-problem">{problem.title}</span>
          <span className="iv-bar-lang">{language.label}</span>
        </div>
        <button
          className="iv-bar-end"
          onClick={() => void endInterview()}
          disabled={evalState === "loading" || ended}
        >
          {evalState === "loading" ? "Evaluating…" : "End interview"}
        </button>
      </header>

      <div className="iv-mobile-note">
        Intervue works best on a larger screen — the editor and chat sit side
        by side.
      </div>

      {evalState === "error" && (
        <div className="iv-eval-errbar">
          {evalError}
          <button onClick={() => setEvalState("idle")}>Dismiss</button>
        </div>
      )}

      <div className="iv-split">
        {/* ---- Left: problem statement + chat ---- */}
        <section className="iv-left">
          <ProblemPanel problem={problem} />
          <Chat
            messages={messages}
            streaming={streaming}
            disabled={!ready || ended}
            onSend={sendMessage}
          />
        </section>

        {/* ---- Right: editor + run console ---- */}
        <section className="iv-right">
          <div className="iv-editor-bar">
            <span className="iv-editor-file">{language.filename}</span>
            <div className="iv-editor-actions">
              <select
                className="iv-lang-select"
                value={language.id}
                onChange={(e) => switchLanguage(e.target.value as LanguageId)}
                disabled={ended}
                aria-label="Language"
              >
                {LANGUAGE_LIST.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
              <button
                className="iv-run"
                onClick={() => void runCode()}
                disabled={runStatus === "running" || !ready || ended}
                title="Run (⌘/Ctrl+Enter)"
              >
                {runStatus === "running" ? "Running…" : "Run ▸"}
              </button>
            </div>
          </div>
          <div className="iv-editor">
            {ready && (
              <CodeEditor
                language={language.monaco}
                value={effectiveCode}
                onChange={setCode}
                onRun={() => void runCode()}
              />
            )}
          </div>
          <OutputConsole status={runStatus} result={runResult} error={runError} />
        </section>
      </div>

      {ended && evaluation && (
        <EvaluationOverlay evaluation={evaluation} problem={problem} />
      )}
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

const CATEGORY_LABELS: [keyof Pick<
  Evaluation,
  "correctness" | "approach" | "communication" | "codeQuality"
>, string][] = [
  ["correctness", "Correctness"],
  ["approach", "Approach"],
  ["communication", "Communication"],
  ["codeQuality", "Code quality"],
];

function EvaluationOverlay({
  evaluation,
  problem,
}: {
  evaluation: Evaluation;
  problem: Problem;
}) {
  return (
    <div className="ev-overlay" role="dialog" aria-label="Interview evaluation">
      <div className="ev-card">
        <div className="ev-head">
          <span className="lp-eyebrow">Interview report</span>
          <h2 className="ev-title">{problem.title}</h2>
          <p className="ev-summary">{evaluation.summary}</p>
        </div>

        <div className="ev-grid">
          {CATEGORY_LABELS.map(([key, label]) => {
            const cat = evaluation[key];
            return (
              <div key={key} className="ev-cat">
                <div className="ev-cat-top">
                  <span className="ev-cat-label">{label}</span>
                  <span className="ev-score">
                    {cat.score}
                    <i>/5</i>
                  </span>
                </div>
                <div className="ev-meter">
                  <i style={{ width: `${(cat.score / 5) * 100}%` }} />
                </div>
                <p className="ev-notes">{cat.notes}</p>
              </div>
            );
          })}
        </div>

        <div className="ev-next">
          <span className="ev-cat-label">Suggested next steps</span>
          <ul>
            {evaluation.suggestedNextSteps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="ev-actions">
          <Link href="/start" className="lp-btn-primary ev-btn">
            Start another interview
          </Link>
        </div>
      </div>
    </div>
  );
}
