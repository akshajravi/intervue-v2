// Language configuration for the editor + code runner.
//
// - `monaco`   — language id understood by the Monaco editor
// - `piston`   — runtime name understood by the Piston execution API
// - `filename` — the file the code is written to before running. Java is special:
//                the public class must match the filename (`Main` / `Main.java`).
// - `starter`  — seed code shown in a fresh editor for this language

export type LanguageId = "python" | "javascript" | "typescript" | "java" | "cpp";

export interface LanguageConfig {
  id: LanguageId;
  label: string;
  monaco: string;
  piston: string;
  filename: string;
  starter: string;
}

export const LANGUAGES: Record<LanguageId, LanguageConfig> = {
  python: {
    id: "python",
    label: "Python",
    monaco: "python",
    piston: "python",
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
    piston: "javascript",
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
    piston: "typescript",
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
    piston: "java",
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
    piston: "c++",
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
