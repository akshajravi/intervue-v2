// Language configuration for the editor + code runner.
//
// - `monaco`   — language id understood by the Monaco editor
// - `judge0`   — name prefix matched against Judge0's /languages list; the
//                run route resolves it to the newest matching language id.
//                (The original plan used Piston, but emkc.org went
//                whitelist-only on 2026-02-15 — Judge0 CE is the keyless
//                replacement.)
// - `filename` — the file the code is written to before running. Java is
//                special: Judge0 compiles `Main.java`, so the public class
//                must be `Main`.
//
// Starter code lives on the *problem* (`problems.ts`), not here: a per-language
// stub can't declare the function name and parameters the prompt asks for.

export type LanguageId = "python" | "javascript" | "typescript" | "java" | "cpp";

export interface LanguageConfig {
  id: LanguageId;
  label: string;
  monaco: string;
  judge0: string;
  filename: string;
}

export const LANGUAGES: Record<LanguageId, LanguageConfig> = {
  python: {
    id: "python",
    label: "Python",
    monaco: "python",
    judge0: "Python (3",
    filename: "main.py",
  },
  javascript: {
    id: "javascript",
    label: "JavaScript",
    monaco: "javascript",
    judge0: "JavaScript (Node.js",
    filename: "main.js",
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    monaco: "typescript",
    judge0: "TypeScript (",
    filename: "main.ts",
  },
  java: {
    id: "java",
    label: "Java",
    monaco: "java",
    judge0: "Java (",
    // Every Java starter in problems.ts must declare `public class Main`.
    filename: "Main.java",
  },
  cpp: {
    id: "cpp",
    label: "C++",
    monaco: "cpp",
    judge0: "C++ (GCC",
    filename: "main.cpp",
  },
};

export const LANGUAGE_LIST: LanguageConfig[] = Object.values(LANGUAGES);

export const DEFAULT_LANGUAGE: LanguageId = "python";

export function getLanguage(id: string | null | undefined): LanguageConfig {
  if (id && id in LANGUAGES) {
    return LANGUAGES[id as LanguageId];
  }
  return LANGUAGES[DEFAULT_LANGUAGE];
}
