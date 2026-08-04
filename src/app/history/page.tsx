// Past interviews, newest first. A server component: it reads the database
// directly rather than going through an API route, which saves an HTTP hop and
// a second auth check.

import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { interviews } from "@/db/schema";
import { getLanguage } from "@/lib/languages";

// A history list can't be prerendered — it's per-user by definition.
export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

// Averaged across the four scored categories, matching what the report shows.
function overallScore(e: {
  correctness: { score: number };
  approach: { score: number };
  communication: { score: number };
  codeQuality: { score: number };
}): number {
  const total =
    e.correctness.score +
    e.approach.score +
    e.communication.score +
    e.codeQuality.score;
  return Math.round((total / 4) * 10) / 10;
}

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default async function HistoryPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in?redirect_url=/history");

  // Explicit columns, not select(): a bare select would drag every transcript
  // and code blob across the wire to render a list of titles and scores.
  const rows = await db
    .select({
      id: interviews.id,
      problemTitle: interviews.problemTitle,
      difficulty: interviews.difficulty,
      language: interviews.language,
      evaluation: interviews.evaluation,
      createdAt: interviews.createdAt,
    })
    .from(interviews)
    .where(eq(interviews.userId, userId))
    .orderBy(desc(interviews.createdAt))
    .limit(PAGE_SIZE);

  return (
    <main className="st-wrap">
      <header className="st-top">
        <Link href="/" className="lp-brand lp-brand-sm">
          <span className="lp-tally" aria-hidden />
          Intervue
        </Link>
        <Link href="/start" className="st-back">
          New interview →
        </Link>
      </header>

      <div className="st-head">
        <p className="lp-eyebrow">Your history</p>
        <h1 className="st-h1">Every rep you&apos;ve put in.</h1>
        <p className="st-sub">
          Reports are kept exactly as they were written — transcript, code, and
          all. Read the old notes before the next attempt.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="hi-empty">
          <p className="iv-placeholder">
            No interviews yet. Your first report will land here.
          </p>
          <Link href="/start" className="lp-btn-primary">
            Start a practice session →
          </Link>
        </div>
      ) : (
        <ul className="hi-list">
          {rows.map((row) => {
            const score = overallScore(row.evaluation);
            return (
              <li key={row.id}>
                <Link href={`/history/${row.id}`} className="hi-card">
                  <div className="hi-card-main">
                    <div className="hi-card-top">
                      <span className="st-problem-title">{row.problemTitle}</span>
                      <span
                        className={`st-diff st-diff-${row.difficulty.toLowerCase()}`}
                      >
                        {row.difficulty}
                      </span>
                    </div>
                    <p className="hi-card-sum">{row.evaluation.summary}</p>
                    <div className="hi-card-meta">
                      <span>{getLanguage(row.language).label}</span>
                      <span aria-hidden>·</span>
                      <time dateTime={row.createdAt.toISOString()}>
                        {DATE_FMT.format(row.createdAt)}
                      </time>
                    </div>
                  </div>
                  <div className="hi-card-score">
                    <span className="ev-score">
                      {score}
                      <i>/5</i>
                    </span>
                    <div className="ev-meter">
                      <i style={{ width: `${(score / 5) * 100}%` }} />
                    </div>
                    <span className="hi-card-go">Read report →</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
