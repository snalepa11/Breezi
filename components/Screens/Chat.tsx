import React, { useState, useRef, useEffect } from "react";
import { Message, Suggestion } from "@/types";
import ChatHeader from "../Layout/ChatHeader";
import styles from "./Chat.module.css";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      intro: true,
      content:
        "Hi! I'm your New York weather assistant. Ask me anything about today — whether there is good air quality in your area, if it's a good time to run, what to wear, and more.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const ask = (text: string) => {
    setInput(text);
    setTimeout(() => send(text), 0);
  };

  const send = async (message?: string) => {
    const q = (message || input).trim();
    if (!q || loading) return;

    const newMessages = [...messages, { role: "user" as const, content: q }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Simulate AI response (in real app, would call API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const simulatedResponse =
        "I'm a demo weather assistant. In production, I'd provide helpful weather advice based on current conditions!";
      setMessages([
        ...newMessages,
        { role: "assistant", content: simulatedResponse },
      ]);
    } catch (e) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I'm having trouble reaching the forecast right now - please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const suggestions: Suggestion[] = [
    {
      label: "Is it safe to exercise outside today?",
      onClick: () => ask("Is it safe to exercise outside today?"),
    },
    {
      label: "Which NYC borough has the best air quality today?",
      onClick: () => ask("Which NYC borough has the best air quality today?"),
    },
    {
      label:
        "Would you like activity suggestions based on your local weather outlook?",
      onClick: () =>
        ask(
          "WWould you like activity suggestions based on your local weather outlook?",
        ),
    },
    {
      label: "When will it rain?",
      onClick: () => ask("When is it going to rain today?"),
    },
  ];

  const showSuggestions =
    messages.filter((m) => !m.intro).length === 0 && !loading;

  return (
    <>
      <ChatHeader />

      <div ref={scrollRef} className={styles.messagesContainer}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user" ? styles.messageUser : styles.messageAssistant
            }
          >
            <div
              className={
                m.role === "user"
                  ? styles.messageBubbleUser
                  : styles.messageBubbleAssistant
              }
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className={styles.messageAssistant}>
            <div className={styles.messageBubbleAssistant}>
              <div className={styles.loadingDots}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className={styles.suggestions}>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={s.onClick}
                className={styles.suggestionButton}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.inputBox}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the weather…"
            className={styles.input}
          />
          <button onClick={() => send()} className={styles.sendButton}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
