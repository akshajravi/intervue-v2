// The interview report card. Stateless, so /history can render it on the
// server; /interview drops it inside an overlay.
//
// `title` is passed in rather than derived from a Problem so history rows can
// show the title they were saved with — getProblem() silently substitutes the
// first problem for unknown ids, which would quietly relabel old interviews.
// Actions differ per surface (overlay gets buttons, history gets none), so they
// come in as children.

import type { Evaluation } from "@/lib/prompt";

const CATEGORY_LABELS: [
  keyof Pick<
    Evaluation,
    "correctness" | "approach" | "communication" | "codeQuality"
  >,
  string,
][] = [
  ["correctness", "Correctness"],
  ["approach", "Approach"],
  ["communication", "Communication"],
  ["codeQuality", "Code quality"],
];

export default function EvaluationCard({
  evaluation,
  title,
  children,
}: {
  evaluation: Evaluation;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="ev-card">
      <div className="ev-head">
        <span className="lp-eyebrow">Interview report</span>
        <h2 className="ev-title">{title}</h2>
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

      {children}
    </div>
  );
}
