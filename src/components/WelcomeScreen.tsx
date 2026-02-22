import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Paperclip, ArrowUp } from "lucide-react";

const SUGGESTIONS = [
  { emoji: "🔍", text: "Find Senior React roles in New York" },
  { emoji: "📄", text: "Rebuild my resume from scratch" },
  { emoji: "📧", text: "Draft cold emails to FAANG hiring managers" },
  { emoji: "🎯", text: "Match my profile against open positions" },
];

const GREETING_WORDS = "What role are you chasing today?".split(" ");

interface WelcomeScreenProps {
  onSubmit: (message: string) => void;
  isExiting: boolean;
}

export const WelcomeScreen = ({ onSubmit, isExiting }: WelcomeScreenProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  const handlePillClick = (text: string) => {
    setInput(text);
    // Small delay so user sees the text fill before submitting
    setTimeout(() => onSubmit(text), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Ambient blob 1 — top-right */}
      <motion.div
        className="absolute top-[15%] right-[15%] w-[600px] h-[600px] rounded-full bg-rose-50 opacity-30"
        style={{ filter: "blur(80px)", animation: "drift 20s ease-in-out infinite" }}
        animate={isExiting ? { opacity: 0 } : {}}
        transition={{ duration: 0.6 }}
      />

      {/* Ambient blob 2 — bottom-left */}
      <motion.div
        className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-slate-100 opacity-20"
        style={{ filter: "blur(80px)", animation: "drift-reverse 18s ease-in-out infinite" }}
        animate={isExiting ? { opacity: 0 } : {}}
        transition={{ duration: 0.6 }}
      />

      {/* Floating brand logo */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -15, scale: 0.92 }}
        animate={isExiting ? { opacity: 0, y: -30, filter: "blur(4px)" } : { opacity: 1, y: 0, scale: 1 }}
        transition={isExiting ? { duration: 0.5, delay: 0.3 } : { duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div
          animate={isExiting ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        >
          <h1 className="text-5xl font-serif font-bold tracking-tight">
            <span className="text-foreground">Career</span>
            <span className="text-primary">Agent</span>
          </h1>
          <p className="mt-1 text-xs text-slate-400 uppercase tracking-[0.15em] text-center font-sans">
            AI-Powered Job Assistant
          </p>
        </motion.div>
      </motion.div>

      {/* Greeting — word-by-word stagger */}
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-x-2"
        initial="initial"
        animate={isExiting ? "exit" : "animate"}
        variants={{
          animate: { transition: { staggerChildren: 0.08, delayChildren: 0.8 } },
          exit: { transition: { staggerChildren: 0.04 } },
        }}
      >
        {GREETING_WORDS.map((word, i) => (
          <motion.span
            key={i}
            className="text-2xl font-serif text-slate-700"
            variants={{
              initial: { opacity: 0, y: 12, filter: "blur(4px)" },
              animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
              exit: { opacity: 0, filter: "blur(4px)", transition: { duration: 0.3 } },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="mt-3 text-base text-muted-foreground font-sans max-w-md text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={isExiting ? { opacity: 0, filter: "blur(4px)" } : { opacity: 1, y: 0 }}
        transition={isExiting ? { duration: 0.3, delay: 0.1 } : { duration: 0.6, delay: 1.2, ease: "easeOut" }}
      >
        I'll find jobs, tailor your resume, draft emails, and apply — all on autopilot.
      </motion.p>

      {/* Central input box */}
      <motion.div
        layoutId="main-input"
        className="mt-10 w-[min(680px,90vw)] h-16 bg-background border border-border rounded-[20px] shadow-float flex items-center px-6 gap-3 transition-all duration-250 hover:shadow-[0_16px_50px_-4px_rgba(0,0,0,0.12)] hover:border-slate-300 focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/10"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1.4 }}
      >
        <Paperclip
          size={20}
          className="text-slate-400 hover:text-slate-600 hover:rotate-[15deg] transition-all duration-200 cursor-pointer flex-shrink-0"
        />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell me about your dream role..."
          className="flex-1 bg-transparent border-none outline-none text-base font-sans text-foreground placeholder:text-slate-400 caret-primary"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 disabled:bg-slate-100 disabled:pointer-events-none bg-primary hover:bg-rose-700 hover:scale-105 hover:shadow-glow-rose active:scale-95"
        >
          <ArrowUp size={20} className={input.trim() ? "text-primary-foreground" : "text-slate-300"} />
        </button>
      </motion.div>

      {/* Suggestion pills */}
      <motion.div
        className="mt-6 flex flex-wrap justify-center gap-3"
        animate={isExiting ? { opacity: 0, y: 10 } : {}}
        transition={{ duration: 0.3 }}
      >
        {SUGGESTIONS.map((pill, index) => (
          <motion.button
            key={index}
            onClick={() => handlePillClick(pill.text)}
            className="px-5 py-2.5 bg-slate-50 border border-border rounded-full text-[13px] font-sans font-medium text-slate-600 cursor-pointer transition-all duration-200 hover:bg-accent hover:border-rose-200 hover:text-rose-700 hover:-translate-y-px hover:shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={isExiting ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            transition={
              isExiting
                ? { duration: 0.2, delay: (SUGGESTIONS.length - 1 - index) * 0.06 }
                : { delay: 1.8 + index * 0.12, duration: 0.4, ease: "easeOut" }
            }
          >
            {pill.emoji} {pill.text}
          </motion.button>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        className="absolute bottom-6 text-[11px] font-sans text-slate-400"
        initial={{ opacity: 0 }}
        animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
        transition={isExiting ? { duration: 0.3 } : { delay: 2.5, duration: 0.6 }}
      >
        Powered by LangGraph · LangSmith · OpenAI
      </motion.p>
    </div>
  );
};
