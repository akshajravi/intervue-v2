"use client";

// Presentational chat: message list + composer. The interview page owns the
// transcript and streaming logic so the evaluate flow can reuse the same state.

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/api";

export interface UiMessage extends ChatMessage {
  // Kickoff turns are sent to the model but never rendered.
  hidden?: boolean;
  // Failed assistant turns render as a notice and are dropped from later requests.
  error?: boolean;
}

export default function Chat({
  messages,
  streaming,
  disabled,
  onSend,
}: {
  messages: UiMessage[];
  streaming: boolean;
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const streamRef = useRef<HTMLDivElement>(null);

  // Keep the latest message in view as turns arrive and deltas stream in.
  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const visible = messages.filter((m) => !m.hidden);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || streaming || disabled) return;
    setDraft("");
    onSend(text);
  }

  return (
    <div className="iv-chat">
      <div className="iv-chat-stream" ref={streamRef}>
        {visible.length === 0 && (
          <div className="iv-placeholder">Connecting you with your interviewer…</div>
        )}
        {visible.map((m, i) => {
          if (m.error) {
            return (
              <div key={i} className="iv-msg iv-msg-error">
                {m.content}
              </div>
            );
          }
          const isLast = i === visible.length - 1;
          const typing = streaming && isLast && m.role === "assistant" && !m.content;
          return (
            <div
              key={i}
              className={`iv-msg ${m.role === "user" ? "iv-msg-user" : "iv-msg-ai"}`}
            >
              <span className="iv-msg-who">
                {m.role === "user" ? "You" : "Interviewer"}
              </span>
              {typing ? (
                <span className="iv-typing" aria-label="Interviewer is typing">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <div className="iv-msg-body">{m.content}</div>
              )}
            </div>
          );
        })}
      </div>
      <form className="iv-composer" onSubmit={submit}>
        <input
          className="iv-composer-input"
          placeholder={
            disabled ? "Interview has ended" : "Message your interviewer…"
          }
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={disabled}
          aria-label="Message your interviewer"
        />
        <button
          className="iv-composer-send"
          type="submit"
          disabled={disabled || streaming || !draft.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
