"use client";
import { useState } from "react";
import styles from "./Chatbot.module.css";
import { Send } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg })
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages(prev => [...prev, { role: 'ai', content: data.error || data.response || "Server error occurred." }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: data.response || "No response received." }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', content: "Error connecting to AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chat" className={styles.chatbotSection}>
      <div className={`glass-panel ${styles.chatContainer}`}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <div className={styles.mainTitle}>
              <div className={styles.geminiStarCrop}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Google_Gemini_logo_2025.svg/250px-Google_Gemini_logo_2025.svg.png" 
                  alt="Gemini"
                  className={styles.officialLogoStar}
                />
              </div>
              <h2>F1 AI Assistant</h2>
            </div>
          </div>
          <span className={styles.status}>Online</span>
        </div>
        
        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              Ask me anything about F1! Try: "Who won the 2021 Championship?" or "Predict the next race winner."
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.ai}`}>
              <div className={styles.avatar}>{msg.role === 'user' ? 'U' : 'AI'}</div>
              <div className={styles.content}>{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.ai}`}>
              <div className={styles.avatar}>AI</div>
              <div className={styles.typing}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className={styles.inputArea}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your F1 question..."
            className={styles.input}
            disabled={isLoading}
          />
          <button type="submit" className={styles.sendBtn} disabled={isLoading || !input.trim()}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}
