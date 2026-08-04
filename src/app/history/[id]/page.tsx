// Replays one past interview: problem, transcript, final code, last run, report.
//
// The layout deliberately mirrors /interview (.iv-split / .iv-left / .iv-right)
// so a report reads in the same shape it was earned in.

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Chat from "@/components/Chat";
import EvaluationCard from "@/components/EvaluationCard";
import OutputConsole from "@/components/OutputConsole";
import ProblemPanel from "@/components/ProblemPanel";
import { db } from "@/db";
import { interviews } from "@/db/schema";
import { getLanguage } from "@/lib/languages";
import { getProblem } from "@/lib/problems";

export const dynamic = "force-dynamic";

// Postgres raises 22P02 on a malformed uuid rather than returning no rows, so a
// junk path segment would surface as a 500. Screen it and 404 like any other id.
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function InterviewDetailPage({
  params,
}: {
  // params is a Promise in Next 16.
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect(`/sign-in?redirect_url=/history/${id}`);
  if (!UUID_RE.test(id)) notFound();

  // The ownership check lives in the WHERE clause, not in an `if` after the
  // fetch — fetch-then-compare is where IDOR bugs come from. This way another
  // user's interview is indistinguishable from one that doesn't exist: both 404.
  const [row] = await db
    .select()
    .from(interviews)
    .where(and(eq(interviews.id, id), eq(interviews.userId, userId)))
    .limit(1);

  if (!row) notFound();

  const language = getLanguage(row.language);
  const problem = getProblem(row.problemId);
  // getProblem() falls back to the first problem for unknown ids, so a renamed
  // or deleted problem would silently render as a different one. Detect that
  // and show the stored title instead of a confident wrong answer.
  const problemMissing = problem.id !== row.problemId;

  // .hi-root, not .iv-root: the live interview pins itself to 100vh and hides
  // overflow, but this page scrolls — the report sits below the split.
  return (
    <main className="hi-root">
      <header className="iv-bar">
        <Link href="/" className="lp-brand lp-brand-sm">
          <span className="lp-tally" aria-hidden />
          Intervue
        </Link>
        <div className="iv-bar-meta">
          <span className="iv-bar-problem">{row.problemTitle}</span>
          <span className="iv-bar-lang">{language.label}</span>
        </div>
        <div className="iv-bar-right">
          <Link href="/history" className="st-back">
            ← All interviews
          </Link>
        </div>
      </header>

      <div className="iv-split">
        <section className="iv-left">
          {problemMissing ? (
            <div className="iv-problem">
              <div className="iv-problem-head">
                <h1 className="iv-problem-title">{row.problemTitle}</h1>
                <span
                  className={`st-diff st-diff-${row.difficulty.toLowerCase()}`}
                >
                  {row.difficulty}
                </span>
              </div>
              <p className="iv-placeholder">
                This problem is no longer in the bank, so its full statement
                isn&apos;t available. Your transcript, code, and report are
                unchanged.
              </p>
            </div>
          ) : (
            <ProblemPanel problem={problem} />
          )}
          <Chat
            messages={row.transcript}
            streaming={false}
            disabled
            readOnly
          />
        </section>

        <section className="iv-right">
          <div className="iv-editor-bar">
            <span className="iv-editor-file">{language.filename}</span>
            <div className="iv-editor-actions">
              <span className="hi-readonly">Read-only replay</span>
            </div>
          </div>
          {/* Not CodeEditor: Monaco is a heavy client-only dependency with two
              required callbacks, and nothing here is editable. */}
          <div className="iv-editor hi-code">
            <pre className="iv-console-pre">{row.code}</pre>
          </div>
          <OutputConsole
            status={row.lastRun ? "done" : "idle"}
            result={row.lastRun}
            error={null}
          />
        </section>
      </div>

      <div className="hi-report">
        <EvaluationCard evaluation={row.evaluation} title={row.problemTitle} />
      </div>
    </main>
  );
}
