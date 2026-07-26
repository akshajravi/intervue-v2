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
// - `starter`  — seed code shown in a fresh editor for this language

export type LanguageId = "python" | "javascript" | "typescript" | "java" | "cpp";

export interface LanguageConfig {
  id: LanguageId;
  label: string;
  monaco: string;
  judge0: string;
  filename: string;
  starter: string;
}

export const LANGUAGES: Record<LanguageId, LanguageConfig> = {
  python: {
    id: "python",
    label: "Python",
    monaco: "python",
    judge0: "Python (3",
    filename: "main.py",
    starter: `def solution():
    # Write your solution here
    pass


if __name__ == "__main__":
    solution()
`,
  },
  javascript: {
    id: "javascript",
    label: "JavaScript",
    monaco: "javascript",
    judge0: "JavaScript (Node.js",
    filename: "main.js",
    starter: `function solution() {
  // Write your solution here
}

solution();
`,
  },
  typescript: {
    id: "typescript",
    label: "TypeScript",
    monaco: "typescript",
    judge0: "TypeScript (",
    filename: "main.ts",
    starter: `function solution(): void {
  // Write your solution here
}

solution();
`,
  },
  java: {
    id: "java",
    label: "Java",
    monaco: "java",
    judge0: "Java (",
    // Must stay aligned with the public class name below.
    filename: "Main.java",
    starter: `public class Main {
    public static void main(String[] args) {
        // Write your solution here
    }
}
`,
  },
  cpp: {
    id: "cpp",
    label: "C++",
    monaco: "cpp",
    judge0: "C++ (GCC",
    filename: "main.cpp",
    starter: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here
    return 0;
}
`,
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
