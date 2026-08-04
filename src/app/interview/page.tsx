"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Chat, { type UiMessage } from "@/components/Chat";
import CodeEditor from "@/components/CodeEditor";
import EvaluationCard from "@/components/EvaluationCard";
import OutputConsole, { type RunStatus } from "@/components/OutputConsole";
import ProblemPanel from "@/components/ProblemPanel";
import type {
  ChatRequest,
  RunResult,
  SaveInterviewRequest,
  SaveInterviewResponse,
} from "@/lib/api";
import { getLanguage, LANGUAGE_LIST, type LanguageId } from "@/lib/languages";
import type { Evaluation } from "@/lib/prompt";
import { loadProblem } from "@/lib/problems/load";
import type { Problem } from "@/lib/problems/types";
import { loadSelection } from "@/lib/session";

// Fired once on mount so the interviewer opens the conversation; never rendered.
const KICKOFF =
  "(The candidate just joined the interview. Greet them briefly, frame the " +
  "problem in a sentence or two, and invite them to talk through an initial " +
  "approach before writing code.)";

// Fired when a run fails, so the interviewer reacts to the failure instead of
// waiting for the candidate to mention it. Never rendered. The code and the
// run output ride along in the <candidate_code>/<last_run> blocks that
// formatCandidateContext appends, so this turn only has to say what happened.
const RUN_FAILED =
  "(The candidate just ran their code and it failed. React to the actual " +
  "error in their run output: ask what they expected versus what happened " +
  "before offering anything, and keep it to a sentence or two.)";

type EvalState = "idle" | "loading" | "done" | "error";
type SaveState = "idle" | "saving" | "saved" | "error";

export default function InterviewPage() {
  // ---- Selection (read from sessionStorage after hydration) --------------
  const [setup, setSetup] = useState<{
    problemId: string | null;
    langId: LanguageId;
  } | null>(null);
  // The bank is code-split per problem, so this arrives a tick after `setup`
  // (see lib/problems/load.ts). Everything downstream already tolerated the
  // pre-hydration render, so this is one more branch on an existing gate, not
  // a new loading concept.
  const [problem, setProblem] = useState<Problem | null>(null);
  const language = getLanguage(setup?.langId);
  const ready = setup !== null && problem !== null;

  // ---- Editor + run state ------------------------------------------------
  // null means "untouched" — the editor shows this problem's starter for the
  // current language, signature and all.
  const [code, setCode] = useState<string | null>(null);
  const effectiveCode = code ?? problem?.starters[language.id] ?? "";
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

  // ---- Persistence (strictly additive — never blocks the report) ---------
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [savedId, setSavedId] = useState<string | null>(null);

  // Callbacks (kickoff effect, Monaco command, chat sends) need the current
  // editor/run state without re-registering — mirror it into refs post-render.
  const codeRef = useRef(effectiveCode);
  const langRef = useRef(language);
  const problemRef = useRef<Problem | null>(problem);
  const lastRunRef = useRef<RunResult | null>(null);
  // A failing run starts its own turn, so runCode also needs the live
  // transcript and whether the chat is busy — without taking them as deps and
  // re-registering the Monaco command on every keystroke.
  const messagesRef = useRef<UiMessage[]>(messages);
  const streamingRef = useRef(streaming);
  const endedRef = useRef(ended);
  useEffect(() => {
    codeRef.current = effectiveCode;
    langRef.current = language;
    problemRef.current = problem;
    messagesRef.current = messages;
    streamingRef.current = streaming;
    endedRef.current = ended;
  });

  useEffect(() => {
    const sel = loadSelection();
    // sessionStorage is client-only, so a one-time post-mount sync is the point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSetup({
      problemId: sel?.problemId ?? null,
      langId: getLanguage(sel?.language).id,
    });
    // An unknown id resolves to the default problem rather than rejecting, so
    // there's no error branch here — same fallback the server's getProblem has.
    void loadProblem(sel?.problemId).then(setProblem);
  }, []);

  // ---- Chat: send a transcript, stream the reply back --------------------
  // Deltas land in whatever message is currently last, so a superseded or
  // late-arriving stream must not keep writing. Each request takes a
  // generation number and goes quiet once it is no longer the live one.
  const genRef = useRef(0);
  const requestAssistant = useCallback(async (transcript: UiMessage[]) => {
    // Every caller is gated on `ready`, which includes the problem having
    // loaded; this is the type-level statement of that.
    const currentProblem = problemRef.current;
    if (!currentProblem) return;
    const gen = ++genRef.current;
    const current = () => genRef.current === gen;

    setStreaming(true);
    setMessages([...transcript, { role: "assistant", content: "" }]);

    const appendDelta = (chunk: string) => {
      if (!current()) return;
      setMessages((prev) => {
        const next = prev.slice();
        const last = next[next.length - 1];
        next[next.length - 1] = { ...last, content: last.content + chunk };
        return next;
      });
    };

    try {
      const payload: ChatRequest = {
        // Errored turns and the empty placeholder never go to the model.
        messages: transcript
          .filter((m) => !m.error && m.content)
          .map(({ role, content }) => ({ role, content })),
        problemId: currentProblem.id,
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
      if (!current()) return;
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
      if (current()) setStreaming(false);
    }
  }, []);

  // Hidden kickoff turn — the ref guards React StrictMode's double effect.
  const kickedOff = useRef(false);
  useEffect(() => {
    if (!ready || kickedOff.current) return;
    kickedOff.current = true;
    void requestAssistant([{ role: "user", content: KICKOFF, hidden: true }]);
  }, [ready, requestAssistant]);

  // The request must fire outside the state updater — updaters have to be pure,
  // and StrictMode double-invokes them, which would send the turn twice.
  const sendMessage = useCallback(
    (text: string) => {
      const transcript: UiMessage[] = [
        ...messages,
        { role: "user", content: text },
      ];
      setMessages(transcript);
      void requestAssistant(transcript);
    },
    [messages, requestAssistant]
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

      // A failing run is the moment the interviewer is most useful, and the
      // candidate often says nothing — so surface it rather than waiting for
      // their next message. A clean run stays silent: it still reaches the
      // interviewer via <last_run> on the next turn, and commenting on every
      // successful run would talk over someone who is iterating.
      //
      // lastRunRef is assigned above first, so the turn carries this run's
      // output. Failures in the catch below are ours (Judge0 unreachable,
      // rate limited), not the candidate's code, and never start a turn.
      // exitCode is the whole test, deliberately — the run route sets it to 0
      // only when Judge0 said Accepted, and to null for a compile error or a
      // timeout (api/run/route.ts). Non-empty stderr is NOT a failure signal:
      // the route folds compile_output into stderr, so a Java program that
      // compiles with warnings and runs fine has stderr text, as does anyone
      // debugging with console.error — and neither should make the
      // interviewer interrupt.
      const failed = data.exitCode !== 0;
      if (failed && !streamingRef.current && !endedRef.current) {
        void requestAssistant([
          ...messagesRef.current,
          { role: "user", content: RUN_FAILED, hidden: true },
        ]);
      }
    } catch (err) {
      setRunError(
        err instanceof Error ? err.message : "Run failed unexpectedly."
      );
      setRunStatus("error");
    } finally {
      runningRef.current = false;
    }
    // requestAssistant is itself dependency-free, so this stays stable and the
    // Monaco run command doesn't re-register as the candidate types.
  }, [requestAssistant]);

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

  // ---- Persist the finished interview ------------------------------------
  // Deliberately separate from endInterview, with a catch that never rethrows.
  // A throw reaching endInterview's catch would set evalState to "error", which
  // makes `ended` false and stops the overlay rendering at all — a database
  // hiccup would then destroy a report Claude has already been paid to produce.
  const savePayloadRef = useRef<SaveInterviewRequest | null>(null);
  const saveInterview = useCallback(async (payload: SaveInterviewRequest) => {
    savePayloadRef.current = payload;
    setSaveState("saving");
    try {
      const res = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as SaveInterviewResponse & {
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? `Save failed (${res.status}).`);
      setSavedId(data.id);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }, []);

  const retrySave = useCallback(() => {
    if (savePayloadRef.current) void saveInterview(savePayloadRef.current);
  }, [saveInterview]);

  // ---- End interview → structured evaluation -----------------------------
  const endInterview = useCallback(async () => {
    if (evalState === "loading" || !problem) return;
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
      void saveInterview({ ...payload, evaluation: data });
    } catch (err) {
      setEvalError(
        err instanceof Error ? err.message : "Evaluation failed unexpectedly."
      );
      setEvalState("error");
    }
  }, [evalState, messages, problem, language.id, saveInterview]);

  return (
    <main className="iv-root">
      <header className="iv-bar">
        <Link href="/" className="lp-brand lp-brand-sm">
          <span className="lp-tally" aria-hidden />
          Intervue
        </Link>
        <div className="iv-bar-meta">
          <span className="iv-bar-problem">{problem?.title ?? "…"}</span>
          <span className="iv-bar-lang">{language.label}</span>
        </div>
        <div className="iv-bar-right">
          <UserButton />
          <button
            className="iv-bar-end"
            onClick={() => void endInterview()}
            disabled={evalState === "loading" || ended}
          >
            {evalState === "loading" ? "Evaluating…" : "End interview"}
          </button>
        </div>
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
          {problem ? (
            <ProblemPanel problem={problem} />
          ) : (
            <div className="iv-problem iv-problem-loading">Loading the problem…</div>
          )}
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

      {ended && evaluation && problem && (
        <EvaluationOverlay
          evaluation={evaluation}
          problem={problem}
          saveState={saveState}
          savedId={savedId}
          onRetrySave={retrySave}
        />
      )}
    </main>
  );
}

function EvaluationOverlay({
  evaluation,
  problem,
  saveState,
  savedId,
  onRetrySave,
}: {
  evaluation: Evaluation;
  problem: Problem;
  saveState: SaveState;
  savedId: string | null;
  onRetrySave: () => void;
}) {
  return (
    <div className="ev-overlay" role="dialog" aria-label="Interview evaluation">
      <EvaluationCard evaluation={evaluation} title={problem.title}>
        <div className="ev-actions">
          {/* Save status sits inline beside the button — never a toast or a
              modal, so nothing can cover the scores it took 16k tokens to make. */}
          <p className="ev-save" aria-live="polite">
            {saveState === "saving" && "Saving…"}
            {saveState === "saved" && (
              <>
                Saved to your history{" · "}
                <Link href={savedId ? `/history/${savedId}` : "/history"}>
                  View →
                </Link>
              </>
            )}
            {saveState === "error" && (
              <span className="ev-save-flag">
                Couldn&apos;t save this report.{" "}
                <button onClick={onRetrySave}>Retry</button>
              </span>
            )}
          </p>
          <Link href="/start" className="lp-btn-primary ev-btn">
            Start another interview
          </Link>
        </div>
      </EvaluationCard>
    </div>
  );
}
