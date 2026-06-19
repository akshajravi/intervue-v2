# Intervue — AI-Assisted SWE Mock Interview App

A full-stack web app for practicing software-engineering interviews with an AI
interviewer. The candidate solves a coding problem in a real editor while an AI
"interviewer" converses with them — asking them to think aloud, giving graduated
hints (never the full solution), probing on complexity and edge cases, and
ultimately evaluating the session.

> Status: early build. This file describes the **intended** architecture; not
> every file below exists yet. See `ROADMAP.md` for what's built and what's next.

## Product shape

- **Landing (`/`)** — choose a problem + language, then start.
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
- **Piston** (public API at `emkc.org`) — sandboxed code execution. No API key.

Node 24+ / npm 11+. Use the official Anthropic SDK for all Claude calls — never
raw `fetch` to the API, never an OpenAI-compatible shim.

## Intended structure

```
src/
  app/
    layout.tsx              Root layout + globals
    page.tsx                Landing: pick problem + language
    globals.css             Tailwind import + theme tokens
    interview/page.tsx      Main interview UI (client component, holds state)
    api/
      chat/route.ts         Streams the Claude interviewer reply (SSE/text stream)
      run/route.ts          Proxies code execution to Piston
  lib/
    languages.ts            Language config: monaco id, piston name, starter code
    problems.ts             Problem bank (title, difficulty, prompt, examples)
    prompt.ts               Builds the interviewer system prompt
  components/
    Chat.tsx                Message list + composer
    CodeEditor.tsx          Monaco wrapper (client-only)
    OutputConsole.tsx       Run output (stdout/stderr)
    ProblemPanel.tsx        Renders the problem statement
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
- **Selection passes via `sessionStorage`,** not query params — the landing page
  stores `{ problemId, language }` and `/interview` reads it on mount. This avoids
  `useSearchParams` Suspense friction. Fall back to defaults if absent.
- **Code execution is untrusted output going to a third party.** Piston is a
  public sandbox; never send secrets in code, and treat its output as untrusted.
- **Java requires `public class Main` in `Main.java`** — the runner sends the
  filename from `languages.ts`, so keep Java's class/filename aligned.

## Environment

- `ANTHROPIC_API_KEY` — required for the interviewer. Copy `.env.local.example`
  to `.env.local` and fill it in. The SDK reads it from the environment
  automatically (`new Anthropic()`).

## Commands

```bash
npm run dev      # local dev server (http://localhost:3000)
npm run build    # production build (use to verify the app compiles)
npm run start    # serve the production build
npm run lint     # lint
```

After non-trivial changes, run `npm run build` to confirm the app still compiles.

## Out of scope (for now)

Voice I/O, auth/accounts, saved interview history, a custom execution sandbox
(we use Piston), and multi-problem interview sessions. These are tracked as later
milestones in `ROADMAP.md` — don't build them unless a session calls for it.
