# Intervue — Build Roadmap

Session-by-session plan for building the AI-assisted SWE mock interview app.
Each session is a self-contained chunk with a clear goal, concrete steps, and
acceptance criteria you can verify before moving on. Check items off as you go.

Legend: `[ ]` todo · `[~]` in progress · `[x]` done

---

## Session 0 — Project setup ✅ (done)

**Goal:** A compiling Next.js + TypeScript skeleton with all dependencies.

- [x] `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`
- [x] Tailwind v4 wired up (`globals.css`, postcss plugin)
- [x] Dependencies installed (Next 16, React 19, Anthropic SDK, Monaco, Tailwind)
- [x] `.gitignore`, `.env.local.example`
- [x] `CLAUDE.md`, `ROADMAP.md`

**Acceptance:** repo installs cleanly; docs describe the target architecture.

---

## Session 1 — Core scaffold & domain model

**Goal:** App shell renders, with the problem/language data model in place.

- [x] `src/app/layout.tsx` — root layout, imports `globals.css`, app metadata
- [x] `src/lib/languages.ts` — `LanguageConfig` (monaco id, piston name, filename,
      starter code) for Python, JS, TS, Java, C++
- [x] `src/lib/problems.ts` — `Problem` type + a starter bank of 3 problems
      across difficulties (Two Sum / Merge Intervals / LRU Cache)
- [x] Problem/language picker that stores `{ problemId, language }` in
      `sessionStorage` and routes to `/interview`. **Note:** the marketing
      landing page stays at `/`; the picker lives at a dedicated `/start` route
      (landing CTAs point there) rather than replacing `page.tsx`.
- [x] `src/app/interview/page.tsx` — static shell of the split layout: problem
      panel + chat placeholder on the left, editor + console placeholder on the
      right. Reads the `/start` selection from `sessionStorage` on mount.

**Acceptance:** ✅ `npm run dev` → `/start` lists problems/languages; clicking
Start navigates to `/interview` and shows the two-pane layout. `npm run build`
passes.

---

## Session 2 — The AI interviewer (chat)

**Goal:** A working, streaming text conversation with the Claude interviewer.

- [ ] `.env.local` created from the example with a real `ANTHROPIC_API_KEY`
- [ ] `src/lib/prompt.ts` — `buildSystemPrompt(problem, language)`: defines the
      interviewer persona, hint policy (graduated, never full solutions), and
      conversational style
- [ ] `src/app/api/chat/route.ts` — `POST`: builds the system prompt, appends the
      current code snapshot to the latest user turn, calls
      `client.messages.stream({ model: "claude-opus-4-8", ... })`, and streams
      text deltas back to the client
- [ ] `src/components/Chat.tsx` — message list + composer; reads the streamed
      response and appends deltas live; auto-scroll
- [ ] Wire chat into `/interview`; on mount, fire a hidden kickoff turn so the
      interviewer greets the candidate and frames the problem

**Acceptance:** opening an interview produces a streamed greeting; sending a
message gets a relevant, streamed reply that references the chosen problem.

---

## Session 3 — Code editor & execution

**Goal:** Candidate can write and actually run code, seeing real output.

- [ ] `src/components/CodeEditor.tsx` — `@monaco-editor/react` wrapper (client
      only), themed dark, seeded with the language's starter code
- [ ] `src/app/api/run/route.ts` — `POST`: resolves the Piston runtime version
      (with in-memory cache), executes `{ language, filename, code, stdin }`,
      returns stdout/stderr/exit code
- [ ] `src/components/OutputConsole.tsx` — shows run status, stdout, stderr
- [ ] Language switcher in `/interview` (resets editor to the new starter)
- [ ] "Run" button wired end to end

**Acceptance:** writing a print/loop in any supported language and hitting Run
shows correct output; compile/runtime errors surface in the console.

---

## Session 4 — Make it feel like one cohesive interview

**Goal:** The editor and interviewer feel connected, not like two separate apps.

- [ ] Interviewer reliably references the candidate's latest code in its replies
- [ ] "I'm stuck" / "give me a hint" flows produce graduated hints, not solutions
- [ ] Layout polish: resizable or sensibly proportioned panes, loading/disabled
      states, empty states, mobile-friendly fallback message
- [ ] Small UX: send on Enter, streaming indicator, scroll-to-latest, Run keyboard
      shortcut
- [ ] Pass the most recent run output to the interviewer as context (optional but
      powerful — lets it react to failing output)

**Acceptance:** a full practice loop (read problem → discuss → code → run →
get feedback) feels smooth and connected.

---

## Session 5 — End-of-interview evaluation

**Goal:** A structured assessment when the candidate ends the interview.

- [ ] "End interview" action
- [ ] `src/app/api/evaluate/route.ts` — produces a structured verdict
      (correctness, approach, communication, code quality, suggested next steps).
      Consider thinking on + structured outputs (`output_config.format`) here,
      since latency matters less than quality for the final report
- [ ] Results view that renders the evaluation cleanly
- [ ] Refine the system prompt so in-interview behavior and final scoring align

**Acceptance:** ending an interview yields a useful, well-structured evaluation
grounded in the actual transcript and code.

---

## Session 6 — Persistence & history (optional)

**Goal:** Interviews survive a refresh and can be revisited.

- [ ] Choose storage (start with `localStorage`; consider SQLite/Postgres later)
- [ ] Save transcript + final code + evaluation per session
- [ ] History list + replay view

**Acceptance:** completed interviews are listed and can be reopened.

---

## Session 7 — Voice interviewer (future)

**Goal:** The original vision — an interviewer that listens and speaks.

- [ ] Speech-to-text for the candidate (e.g. Deepgram / Whisper / Web Speech API)
- [ ] Stream partial transcripts into the chat pipeline
- [ ] Text-to-speech for the interviewer's replies
- [ ] Push-to-talk vs. continuous-listening UX; barge-in handling

**Acceptance:** a candidate can hold a spoken back-and-forth with the interviewer
while coding.

---

## Session 8 — Accounts & deployment (future)

**Goal:** Multi-user and shippable.

- [ ] Auth (e.g. NextAuth) + per-user history
- [ ] Rate limiting / cost controls on the Claude and run endpoints
- [ ] Deploy (Vercel or similar); set `ANTHROPIC_API_KEY` as a server secret
- [ ] Basic analytics/observability

**Acceptance:** anyone can sign in, run an interview, and see their history on a
deployed URL.

---

## Working notes

- Run `npm run build` at the end of each session to confirm the app compiles.
- Keep interviewer behavior centralized in `src/lib/prompt.ts`.
- Expand the problem bank in `src/lib/problems.ts` anytime — it's just data.
