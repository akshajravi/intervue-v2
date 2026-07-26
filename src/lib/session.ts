// The sessionStorage contract for the /start → /interview handoff.
//
// Selection travels via sessionStorage rather than query params (avoids
// `useSearchParams` Suspense friction). Both sides of the handoff go through
// these helpers so the key and payload shape can't drift apart.

import type { LanguageId } from "./languages";

const SESSION_KEY = "intervue:selection";

export interface Selection {
  problemId: string;
  language: LanguageId;
}

export function saveSelection(selection: Selection): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(selection));
}

// Returns null when absent or unreadable — callers fall back to defaults.
// The payload is user-editable storage, so treat fields as possibly missing.
export function loadSelection(): Partial<Selection> | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Partial<Selection>) : null;
  } catch {
    return null;
  }
}
