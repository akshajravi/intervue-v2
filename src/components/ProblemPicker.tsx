"use client";

// The /start problem chooser.
//
// Replaced the generic <AnimatedList />, which rendered every problem as a
// motion.div with its own IntersectionObserver inside a 420px scroller — fine
// for three problems, unworkable for seventy-five. This one filters first and
// only ever draws what survives the filter.
//
// Fed by PROBLEM_CATALOG (id/title/difficulty/topic/summary), never the bank
// itself: the prompts and five starters apiece stay out of the client bundle.

import { useMemo, useState } from "react";
import { PROBLEM_CATALOG } from "@/lib/problems/catalog";
import { TOPICS, type Difficulty, type ProblemMeta, type Topic } from "@/lib/problems/types";

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

interface Group {
  topic: Topic;
  problems: ProblemMeta[];
}

export default function ProblemPicker({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (problem: ProblemMeta) => void;
}) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);

  // Topics that actually have problems, in the canonical order — so the filter
  // row never offers a facet that returns nothing.
  const topicsPresent = useMemo(() => {
    const counts = new Map<Topic, number>();
    for (const p of PROBLEM_CATALOG) counts.set(p.topic, (counts.get(p.topic) ?? 0) + 1);
    return TOPICS.filter((t) => counts.has(t)).map((t) => ({ topic: t, count: counts.get(t)! }));
  }, []);

  const groups = useMemo<Group[]>(() => {
    const needle = query.trim().toLowerCase();
    const matches = PROBLEM_CATALOG.filter((p) => {
      if (difficulty && p.difficulty !== difficulty) return false;
      if (topic && p.topic !== topic) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) || p.summary.toLowerCase().includes(needle)
      );
    });
    // PROBLEM_CATALOG is already sorted by topic, so grouping is a single pass.
    const out: Group[] = [];
    for (const p of matches) {
      const last = out[out.length - 1];
      if (last && last.topic === p.topic) last.problems.push(p);
      else out.push({ topic: p.topic, problems: [p] });
    }
    return out;
  }, [query, difficulty, topic]);

  const shown = groups.reduce((n, g) => n + g.problems.length, 0);
  const filtered = shown !== PROBLEM_CATALOG.length;

  return (
    <div className="st-pick">
      <div className="st-pick-controls">
        <input
          type="search"
          className="st-pick-search"
          placeholder="Search problems…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search problems"
        />
        <div className="st-pick-pills" role="group" aria-label="Filter by difficulty">
          <Pill on={difficulty === null} onClick={() => setDifficulty(null)}>
            All
          </Pill>
          {DIFFICULTIES.map((d) => (
            <Pill
              key={d}
              on={difficulty === d}
              tone={d.toLowerCase()}
              onClick={() => setDifficulty(difficulty === d ? null : d)}
            >
              {d}
            </Pill>
          ))}
        </div>
      </div>

      <div className="st-pick-pills st-pick-topics" role="group" aria-label="Filter by topic">
        <Pill on={topic === null} onClick={() => setTopic(null)}>
          All topics
        </Pill>
        {topicsPresent.map(({ topic: t, count }) => (
          <Pill key={t} on={topic === t} onClick={() => setTopic(topic === t ? null : t)}>
            {t} <span className="st-pick-count">{count}</span>
          </Pill>
        ))}
      </div>

      <div className="st-pick-scroll" role="radiogroup" aria-label="Problem">
        {groups.map((group) => (
          <section key={group.topic} className="st-pick-group">
            <h3 className="st-pick-group-head">
              {group.topic}
              <span className="st-pick-group-n">{group.problems.length}</span>
            </h3>
            {group.problems.map((p) => {
              const on = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={`st-pick-row${on ? " on" : ""}`}
                  onClick={() => onSelect(p)}
                >
                  <span className="st-problem-top">
                    <span className="st-problem-title">{p.title}</span>
                    <span className={`st-diff st-diff-${p.difficulty.toLowerCase()}`}>
                      {p.difficulty}
                    </span>
                  </span>
                  <span className="st-problem-sum">{p.summary}</span>
                </button>
              );
            })}
          </section>
        ))}
        {shown === 0 && (
          <p className="st-pick-empty">
            Nothing matches that. <button type="button" onClick={reset}>Clear the filters</button>
          </p>
        )}
      </div>

      <p className="st-pick-tally" aria-live="polite">
        {filtered ? `${shown} of ${PROBLEM_CATALOG.length} problems` : `${shown} problems`}
      </p>
    </div>
  );

  function reset() {
    setQuery("");
    setDifficulty(null);
    setTopic(null);
  }
}

function Pill({
  on,
  tone,
  onClick,
  children,
}: {
  on: boolean;
  tone?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`st-pick-pill${on ? " on" : ""}${tone ? ` st-pick-pill-${tone}` : ""}`}
    >
      {children}
    </button>
  );
}
