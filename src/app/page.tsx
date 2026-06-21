import Link from "next/link";

export default function Landing() {
  return (
    <main>
      <header className="lp-wrap">
        <nav className="lp-nav">
          <div className="lp-brand">
            <span className="lp-tally" aria-hidden />
            Intervue
          </div>
          <div className="lp-nav-links">
            <a href="#how">How it works</a>
            <a href="#catch">What it catches</a>
            <Link href="/interview" className="lp-nav-cta">
              Start practicing
            </Link>
          </div>
        </nav>
      </header>

      {/* ---- Hero: copy + the live-coached transcript ---- */}
      <section className="lp-wrap lp-hero">
        <div className="lp-hero-copy">
          <p className="lp-eyebrow">Live interview coach</p>
          <h1 className="lp-h1">
            The mock interview that <span className="lp-talk">talks back</span>
          </h1>
          <p className="lp-sub">
            Practice behavioral and technical questions out loud. Get specific,
            real-time coaching on what landed and what didn&apos;t — while
            there&apos;s still time to fix it.
          </p>
          <div className="lp-actions">
            <Link href="/interview" className="lp-btn-primary">
              Start a practice session
            </Link>
            <a href="#how" className="lp-btn-ghost">
              See how it works
            </a>
          </div>
          <div className="lp-proof">
            <div className="lp-dots" aria-hidden>
              <span>JK</span>
              <span>AL</span>
              <span>MR</span>
              <span>+</span>
            </div>
            <p>
              <b>100+ students</b> grinding through recruiting season with us
            </p>
          </div>
        </div>

        {/* Signature element */}
        <div className="lp-demo">
          <span className="lp-sticker" aria-hidden>
            ● COACHING LIVE
          </span>
          <div className="lp-card" role="img" aria-label="A practice answer being coached in real time: the coach highlights a strong, specific result, flags filler words, and nudges the candidate to close the loop, while a readiness score climbs to 78.">
            <div className="lp-card-top">
              <span className="lp-mode">BEHAVIORAL</span>
              <div className="lp-meta">
                <span>02:14</span>
                <span className="lp-rec">REC</span>
              </div>
            </div>

            <p className="lp-q-label">Question</p>
            <p className="lp-q">&ldquo;Tell me about a time a project of yours failed.&rdquo;</p>

            <p className="lp-answer">
              <span className="lp-line l1">
                So, <span className="lp-flagged">um, basically</span> our deploy
                pipeline kept timing out before a big launch.{" "}
              </span>
              <span className="lp-line l2">
                I rebuilt the caching layer and{" "}
                <span className="lp-mark">cut deploy time from 40 min to 6</span>.{" "}
              </span>
              <span className="lp-line l3">
                The launch went out on schedule after that.
              </span>
            </p>

            <div className="lp-notes">
              <div className="lp-note good">
                <span className="lp-tag">Strong</span>
                <span>Concrete numbers. This is the kind of impact recruiters remember.</span>
              </div>
              <div className="lp-note flag">
                <span className="lp-tag">Flag</span>
                <span>&ldquo;Um, basically&rdquo; — filler. Pause instead; it reads as confidence.</span>
              </div>
              <div className="lp-note nudge">
                <span className="lp-tag">Nudge</span>
                <span>You named the fix, not the failure. Open with what broke and what you owned.</span>
              </div>
            </div>

            <div className="lp-readout">
              <span className="lp-readout-label">Readiness</span>
              <span className="lp-bar" aria-hidden>
                <i />
              </span>
              <span className="lp-score">71 → 78 ▲</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Modes ---- */}
      <section className="lp-wrap">
        <div className="lp-modes">
          <span className="lp-modes-label">Practice for</span>
          <div className="lp-chips">
            <span className="lp-chip on">Behavioral</span>
            <span className="lp-chip">Coding</span>
            <span className="lp-chip">System design</span>
            <span className="lp-chip">Recruiter screen</span>
          </div>
        </div>
      </section>

      {/* ---- How it works (a real sequence → honest numbering) ---- */}
      <section id="how" className="lp-wrap lp-section">
        <div className="lp-section-head">
          <p className="lp-eyebrow">How it works</p>
          <h2 className="lp-h2">Three minutes from nervous to warmed up.</h2>
        </div>
        <div className="lp-steps">
          <div className="lp-step">
            <span className="lp-step-n">01</span>
            <h3>Pick a prompt</h3>
            <p>
              Behavioral, coding, or system design — real questions pulled from
              real loops. Choose a language and go.
            </p>
          </div>
          <div className="lp-step">
            <span className="lp-step-n">02</span>
            <h3>Answer like it&apos;s real</h3>
            <p>
              Talk it through or write the code. The clock is running and the
              interviewer pushes back, just like the room.
            </p>
          </div>
          <div className="lp-step">
            <span className="lp-step-n">03</span>
            <h3>Get coached on the spot</h3>
            <p>
              Specific notes on structure, filler, and impact as you go — not a
              grade at the end, a fix you can use right now.
            </p>
          </div>
        </div>
      </section>

      {/* ---- What the coach catches ---- */}
      <section id="catch" className="lp-wrap lp-section lp-catch">
        <div className="lp-section-head" style={{ marginBottom: 0 }}>
          <p className="lp-eyebrow">What it catches</p>
          <h2 className="lp-h2">The notes a friend is too polite to give you.</h2>
          <p className="lp-lead">
            Intervue listens for the things that quietly sink answers — and tells
            you plainly, in time to change them.
          </p>
        </div>
        <div className="lp-catch-list">
          <div className="lp-catch-item">
            <span className="lp-k">Rambling</span>
            <p>
              &ldquo;You&apos;re 90 seconds in without a result.{" "}
              <span>Land the outcome, then add detail.&rdquo;</span>
            </p>
          </div>
          <div className="lp-catch-item">
            <span className="lp-k">Vague impact</span>
            <p>
              &ldquo;&lsquo;Improved performance&rsquo; — by how much?{" "}
              <span>Numbers turn a story into evidence.&rdquo;</span>
            </p>
          </div>
          <div className="lp-catch-item">
            <span className="lp-k">Edge cases</span>
            <p>
              &ldquo;Your solution skips the empty input.{" "}
              <span>Walk me through it before you code.&rdquo;</span>
            </p>
          </div>
          <div className="lp-catch-item">
            <span className="lp-k">Confidence</span>
            <p>
              &ldquo;Four hedges in one answer.{" "}
              <span>Say what you did, not what you sort-of did.&rdquo;</span>
            </p>
          </div>
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="lp-wrap lp-final">
        <p className="lp-eyebrow">Recruiting season won&apos;t wait</p>
        <h2 className="lp-h2">Do the rep now, so the room feels like a rerun.</h2>
        <p className="lp-sub">
          One question. A few minutes. Real feedback before it counts.
        </p>
        <div className="lp-actions">
          <Link href="/interview" className="lp-btn-primary">
            Start a practice session
          </Link>
        </div>
        <p className="lp-microcopy">No account needed · Free while in beta</p>
      </section>

      <footer className="lp-wrap lp-footer">
        <div className="lp-brand" style={{ fontSize: 16 }}>
          <span className="lp-tally" aria-hidden />
          Intervue
        </div>
        <span>Built for the week before the interview.</span>
      </footer>
    </main>
  );
}
