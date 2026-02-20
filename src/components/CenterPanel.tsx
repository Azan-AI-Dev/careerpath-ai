import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JobCard } from "@/components/JobCard";
import { HitLBlock } from "@/components/HitLBlock";
import { Paperclip, ArrowUp, Target, Bot, User } from "lucide-react";
import { motion } from "framer-motion";

const jobListings = [
  {
    company: "Google",
    title: "Sr. UI Engineer",
    location: "New York, NY",
    salary: "$180k–$230k",
    matchScore: 92,
    logoInitials: "G",
    logoColor: "#4285F4",
  },
  {
    company: "Meta",
    title: "Senior Frontend Engineer",
    location: "New York, NY",
    salary: "$170k–$210k",
    matchScore: 88,
    logoInitials: "M",
    logoColor: "#0866FF",
  },
  {
    company: "Spotify",
    title: "React Engineer — Design Sys.",
    location: "New York, NY",
    salary: "$155k–$195k",
    matchScore: 79,
    logoInitials: "S",
    logoColor: "#1DB954",
  },
];

type Message = {
  id: string;
  role: "user" | "agent";
  content: React.ReactNode;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Find me React developer roles in New York and apply to the best matches.",
  },
  {
    id: "2",
    role: "agent",
    content: (
      <div className="space-y-3">
        <p className="text-sm text-foreground font-sans leading-relaxed">
          I scanned <span className="font-semibold">Indeed</span> and <span className="font-semibold">LinkedIn</span> and found{" "}
          <span className="font-semibold text-primary">43 roles</span> matching your profile. Here are the top 3 matches scored against{" "}
          <span className="font-mono text-[11px] bg-secondary px-1.5 py-0.5 rounded text-foreground">Base_CV.pdf</span>:
        </p>
        <div className="space-y-2">
          {jobListings.map((job, i) => (
            <JobCard key={job.company} {...job} delay={i} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "3",
    role: "agent",
    content: (
      <div className="space-y-1">
        <p className="text-sm text-foreground font-sans leading-relaxed">
          I've tailored your CV for{" "}
          <span className="font-semibold text-primary">Google — Sr. UI Engineer</span>. I located the Hiring Manager's contact:{" "}
          <a
            href="mailto:sarah.hr@google.com"
            className="font-mono text-[11px] text-primary hover:underline bg-accent px-1.5 py-0.5 rounded"
          >
            sarah.hr@google.com
          </a>
          . Please review the tailored CV and cover letter below before I proceed.
        </p>
      </div>
    ),
  },
  {
    id: "4",
    role: "agent",
    content: <HitLBlock />,
  },
];

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="flex items-end gap-2.5 justify-end"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="max-w-[80%] bg-card border border-border rounded-2xl rounded-br-sm px-4 py-3 shadow-card">
        <p className="text-sm text-foreground font-sans leading-relaxed">{children}</p>
      </div>
      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <User size={13} className="text-muted-foreground" />
      </div>
    </motion.div>
  );
}

function AgentBubble({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="flex items-start gap-2.5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot size={13} className="text-primary" />
      </div>
      <div className="flex-1 max-w-[90%]">{children}</div>
    </motion.div>
  );
}

export function CenterPanel() {
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 2500);
  }, []);

  return (
    <main className="flex flex-col h-full w-full bg-background overflow-hidden">
      {/* Top Goal Bar */}
      <motion.div
        className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-card/80 backdrop-blur-sm flex-shrink-0"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent border border-primary/20">
            <Target size={13} className="text-primary" />
            <span className="text-xs font-semibold text-primary font-sans">
              Goal: Secure Sr. Frontend Role
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary border border-border">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-medium text-muted-foreground font-sans">In Progress</span>
          </div>
        </div>
        <span className="text-[11px] text-muted-foreground font-sans">
          New York, NY · Remote OK
        </span>
      </motion.div>

      {/* Chat Feed */}
      <ScrollArea className="flex-1">
        <div className="px-6 py-6 space-y-6">
          {initialMessages.map((msg, i) => (
            msg.role === "user" ? (
              <UserBubble key={msg.id}>{msg.content}</UserBubble>
            ) : (
              <AgentBubble key={msg.id} delay={i * 0.1}>
                {msg.id === "2" || msg.id === "4" ? (
                  msg.content
                ) : (
                  <div className="bg-secondary/50 rounded-2xl rounded-tl-sm px-4 py-3 border border-border/50">
                    {msg.content}
                  </div>
                )}
              </AgentBubble>
            )
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input Box */}
      <div className="px-6 pb-5 pt-3 flex-shrink-0">
        <motion.div
          className="flex items-center gap-3 bg-card rounded-2xl border border-border shadow-elevated px-4 py-3 focus-within:border-primary/40 focus-within:shadow-rose transition-all duration-300"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-secondary flex-shrink-0">
            <Paperclip size={17} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Give me a new goal, or ask me anything…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-sans"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="icon"
              className={`w-8 h-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-rose flex-shrink-0 transition-all duration-200 ${
                !inputValue ? "opacity-50" : "opacity-100"
              }`}
              disabled={!inputValue}
            >
              <ArrowUp size={15} />
            </Button>
          </motion.div>
        </motion.div>
        <p className="text-center text-[10px] text-muted-foreground mt-2 font-sans">
          CareerAgent can make mistakes. Review all applications before approving.
        </p>
      </div>
    </main>
  );
}
