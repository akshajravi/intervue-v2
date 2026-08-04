// Renders a problem statement. Deliberately not a client component — it holds
// no state, so both /interview and the /history replay view can render it on
// the server.

import type { Problem } from "@/lib/problems/types";

export default function ProblemPanel({ problem }: { problem: Problem }) {
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
