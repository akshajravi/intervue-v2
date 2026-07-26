"use client";

// Thin Monaco wrapper (client-only — @monaco-editor/react lazy-loads the
// editor in the browser). Cmd/Ctrl+Enter inside the editor triggers Run.

import Editor, { type BeforeMount, type OnMount } from "@monaco-editor/react";
import { useEffect, useRef } from "react";

// Light editor theme matched to the app's "whiteboard" palette: blue-black
// ink on white, blue keywords, green strings, and a red-marker cursor.
const defineBoardTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("intervue-board", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8d99c2", fontStyle: "italic" },
      { token: "keyword", foreground: "2b4acb" },
      { token: "string", foreground: "1e7a45" },
      { token: "number", foreground: "d93a1c" },
      { token: "type", foreground: "2b4acb" },
    ],
    colors: {
      "editor.background": "#ffffff",
      "editor.foreground": "#1b2a5e",
      "editorLineNumber.foreground": "#b6c0e0",
      "editorLineNumber.activeForeground": "#2b4acb",
      "editorCursor.foreground": "#d93a1c",
      "editor.selectionBackground": "#d9e0f8",
      "editor.lineHighlightBackground": "#f5f7fb",
      "editorIndentGuide.background1": "#e6eaf7",
      "editorWidget.background": "#ffffff",
      "editorWidget.border": "#d4dbf0",
    },
  });
};

export default function CodeEditor({
  language,
  value,
  onChange,
  onRun,
}: {
  // Monaco language id (LanguageConfig.monaco).
  language: string;
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
}) {
  // Monaco registers the keybinding once on mount; route through a ref so the
  // command always sees the current run handler.
  const onRunRef = useRef(onRun);
  useEffect(() => {
    onRunRef.current = onRun;
  });

  const handleMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRunRef.current();
    });
  };

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme="intervue-board"
      onChange={(v) => onChange(v ?? "")}
      beforeMount={defineBoardTheme}
      onMount={handleMount}
      loading={
        <div className="iv-placeholder" style={{ padding: 18 }}>
          Loading editor…
        </div>
      }
      options={{
        minimap: { enabled: false },
        fontSize: 13.5,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 14 },
        tabSize: 4,
        renderLineHighlight: "none",
        overviewRulerLanes: 0,
        wordWrap: "on",
      }}
    />
  );
}
