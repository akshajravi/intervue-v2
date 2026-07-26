"use client";

// Run output: status line, stdout, stderr. Pure display — the interview page
// owns the run lifecycle.

import type { RunResult } from "@/lib/api";

export type RunStatus = "idle" | "running" | "done" | "error";

export default function OutputConsole({
  status,
  result,
  error,
}: {
  status: RunStatus;
  result: RunResult | null;
  error: string | null;
}) {
  return (
    <div className="iv-console">
      <div className="iv-console-head">
        <span className="iv-console-label">Output</span>
        {status === "running" && (
          <span className="iv-console-status is-running">Running…</span>
        )}
        {status === "done" && result && (
          <span
            className={`iv-console-status ${
              result.exitCode === 0 ? "is-ok" : "is-bad"
            }`}
          >
            exit {result.exitCode ?? "?"}
            {result.truncated ? " · output truncated" : ""}
          </span>
        )}
      </div>

      {status === "idle" && (
        <div className="iv-placeholder">
          Hit Run (or ⌘/Ctrl+Enter) to execute your code.
        </div>
      )}
      {status === "error" && <div className="iv-console-err">{error}</div>}
      {status === "done" && result && (
        <>
          {result.stdout && <pre className="iv-console-pre">{result.stdout}</pre>}
          {result.stderr && (
            <pre className="iv-console-pre iv-console-stderr">{result.stderr}</pre>
          )}
          {!result.stdout && !result.stderr && (
            <div className="iv-placeholder">No output.</div>
          )}
        </>
      )}
    </div>
  );
}
