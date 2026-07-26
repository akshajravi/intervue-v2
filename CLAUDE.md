# Intervue — AI-Assisted SWE Mock Interview App

A full-stack web app for practicing software-engineering interviews with an AI
interviewer. The candidate solves a coding problem in a real editor while an AI
"interviewer" converses with them — asking them to think aloud, giving graduated
hints (never the full solution), probing on complexity and edge cases, and
ultimately evaluating the session.

> Status: early build. This file describes the **intended** architecture; not
> every file below exists yet. See `ROADMAP.md` for what's built and what's next.

## Product shape

- **Landing (`/`)** — marketing page; CTAs point to `/start`. Its copy sells the
  long-term vision (behavioral questions, system design, voice coaching) — only
  the coding interview is real today. Don't build toward the landing copy unless
  a roadmap session calls for it.
- **Start (`/start`)** — pick a problem + language, then begin.
- **Interview (`/interview`)** — split screen:
  - Left: problem statement + live chat with the AI interviewer.
  - Right: Monaco code editor + "Run" button + output console.
- The interviewer is **text chat** for now. Voice (speech-to-text in, TTS out)
  is a planned later milestone, not in scope yet.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`; styles in `src/app/globals.css`)
- **@anthropic-ai/sdk** — the AI interviewer. Model: **`claude-opus-4-8`**.
  Responses are **streamed** to the client.
- **@monaco-editor/react** — the code editor (client-only).
- **Judge0 CE** (public instance at `ce.judge0.com`) — sandboxed code execution.
  No API key. (Piston was the original plan, but the public `emkc.org` API went
  whitelist-only on 2026-02-15.)

Node 24+ / npm 11+. Use the official Anthropic SDK for all Claude calls — never
raw `fetch` to the API, never an OpenAI-compatible shim.

## Intended structure

```
src/
  app/
    layout.tsx              Root layout + globals
    page.tsx                Marketing landing (CTAs → /start)
    start/page.tsx          Picker: problem + language → sessionStorage → /interview
    globals.css             Tailwind import + theme tokens
    interview/page.tsx      Main interview UI (client component, holds state)
    api/
      chat/route.ts         Streams the Claude interviewer reply (SSE/text stream)
      run/route.ts          Proxies code execution to Judge0 CE
      evaluate/route.ts     Structured end-of-interview evaluation
  lib/
    languages.ts            Language config: monaco id, judge0 name prefix, starter code
    api.ts                  Request/response contracts shared by pages and routes
    problems.ts             Problem bank (title, difficulty, prompt, examples)
    session.ts              sessionStorage contract for the /start → /interview handoff
    prompt.ts               Builds the interviewer system prompt
  components/
    Chat.tsx                Message list + composer
    CodeEditor.tsx          Monaco wrapper (client-only)
    OutputConsole.tsx       Run output (stdout/stderr)
    ProblemPanel.tsx        Renders the problem statement (currently inline in interview/page.tsx)
```

## Key conventions & decisions

- **The interviewer always sees the candidate's current code.** Each `/api/chat`
  request includes a snapshot of the editor contents; it's appended to the latest
  user turn so the model can reference what the candidate has written.
- **Interviewer behavior lives in one place:** `src/lib/prompt.ts`. Tune behavior
  there (hint policy, tone, when to evaluate) rather than scattering instructions.
- **Keep interviewer replies snappy:** modest `max_tokens` (~1024), thinking off
  by default for chat latency. Turn thinking on only for the end-of-interview
  evaluation if that milestone needs deeper reasoning.
- **Selection passes via `sessionStorage`,** not query params — `/start` saves
  `{ problemId, language }` and `/interview` reads it on mount, both through the
  typed helpers in `src/lib/session.ts`. This avoids `useSearchParams` Suspense
  friction. Fall back to defaults if absent.
- **Code execution is untrusted output going to a third party.** Judge0 CE is a
  public sandbox; never send secrets in code, and treat its output as untrusted.
  It's also shared and rate-limited with no key — keep Run single-flight
  (disable while a run is in flight), rely on Judge0's own CPU/wall-clock
  limits, and truncate oversized stdout/stderr before rendering or forwarding
  it to Claude.
- **Java requires `public class Main`** — Judge0 compiles Java submissions as
  `Main.java`, so keep the starter's class name aligned with
  `languages.ts`'s `filename`.
## Frontend Aesthetics
Avoid generic AI aesthetics. Make creative, distinctive choices.

## Typography
- Never use Inter, Roboto, Open Sans, Lato, Arial, or system fonts.
- Body: Bricolage Grotesque. Display: Fraunces. Mono: JetBrains Mono.
- Use weight extremes: 200 vs 800, not 400 vs 600.
- Size jumps of 3x+, not 1.5x.

## Color & theme
- Commit to a single dominant color with one sharp accent.
- All colors live in CSS variables in `app/globals.css`.
- Forbidden: purple-to-blue gradients on white backgrounds.

## Backgrounds
- Layered CSS gradients or geometric patterns over solid colors.
- Hero sections must have atmospheric depth.

## Motion
- CSS-only for non-React. Motion (formerly Framer Motion) for React.
- One well-orchestrated page-load reveal beats scattered micro-interactions.

## Components
- Always use shadcn/ui primitives where they exist (Button, Card, Dialog, Form).
- Never hand-roll a component that exists in the shadcn registry.
- Tailwind classes only. No inline styles. No CSS modules.

## Environment

- `ANTHROPIC_API_KEY` — required for the interviewer. Copy `.env.local.example`
  to `.env.local` and fill it in. The SDK reads it from the environment
  automatically (`new Anthropic()`).

## Commands

```bash
npm run dev      # local dev server (http://localhost:3000)
npm run build    # production build (use to verify the app compiles)
npm run start    # serve the production build
npm run lint     # ESLint (flat config in eslint.config.mjs; `next lint` was removed in Next 16)
```

After non-trivial changes, run `npm run build` to confirm the app still compiles,
and `npm run lint` to keep the tree warning-free.

## Out of scope (for now)

Voice I/O, auth/accounts, saved interview history, a custom execution sandbox
(we use Judge0 CE), and multi-problem interview sessions. These are tracked as later
milestones in `ROADMAP.md` — don't build them unless a session calls for it.
