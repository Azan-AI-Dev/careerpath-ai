import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface LogEntry {
  time: string;
  icon: string;
  agent: string;
  message: string;
  status: "green" | "blue" | "purple" | "amber" | "red" | "rose";
  isPaused?: boolean;
}

const logs: LogEntry[] = [
  {
    time: "09:41:02",
    icon: "🟢",
    agent: "Orchestrator",
    message: "Received objective. Decomposing tasks into sub-agent assignments…",
    status: "green",
  },
  {
    time: "09:41:05",
    icon: "🔄",
    agent: "JobScraper Agent",
    message: "Connecting to LinkedIn API… Scraped 43 listings matching JD criteria.",
    status: "blue",
  },
  {
    time: "09:41:12",
    icon: "🧠",
    agent: "Evaluator Agent",
    message: "Running vector similarity match between job descriptions and Base_CV.pdf. Top matches: Google (0.92), Meta (0.88), Spotify (0.79).",
    status: "purple",
  },
  {
    time: "09:41:18",
    icon: "✍️",
    agent: "ResumeTailor Agent",
    message: "Rewriting bullet points to highlight Next.js & design system experience for Google JD. Generated Google_CV_Tailored.pdf.",
    status: "amber",
  },
  {
    time: "09:41:25",
    icon: "🔍",
    agent: "OSINT Agent",
    message: "Scraping Google HR contacts via LinkedIn + Apollo… Found: sarah.hr@google.com (87% confidence).",
    status: "red",
  },
  {
    time: "09:41:26",
    icon: "⏸️",
    agent: "HandOff",
    message: "PAUSED — Awaiting Human-in-the-Loop approval before dispatching email to sarah.hr@google.com.",
    status: "rose",
    isPaused: true,
  },
];

const statusColors: Record<LogEntry["status"], string> = {
  green: "bg-emerald-400",
  blue: "bg-blue-400",
  purple: "bg-violet-400",
  amber: "bg-amber-400",
  red: "bg-orange-400",
  rose: "bg-primary",
};

const agentColors: Record<LogEntry["status"], string> = {
  green: "text-emerald-700 bg-emerald-50",
  blue: "text-blue-700 bg-blue-50",
  purple: "text-violet-700 bg-violet-50",
  amber: "text-amber-700 bg-amber-50",
  red: "text-orange-700 bg-orange-50",
  rose: "text-primary bg-accent",
};

export function RightSidebar() {
  return (
    <aside className="flex flex-col h-full w-full bg-card border-l border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-5 border-b border-border flex items-center justify-between flex-shrink-0">
        <div>
          <h2 className="font-serif text-base font-bold text-foreground tracking-tight">Agent Brain</h2>
          <p className="text-[10px] text-muted-foreground font-sans mt-0.5">LangGraph Observability Feed</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-pulse" />
          <span className="text-[10px] font-bold text-emerald-700 font-sans">LIVE</span>
        </div>
      </div>

      {/* Timeline */}
      <ScrollArea className="flex-1">
        <div className="px-4 py-4 space-y-2.5">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.4 + 0.3,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <div
                className={`rounded-xl p-3.5 border transition-all duration-200 ${
                  log.isPaused
                    ? "border-primary/30 bg-accent/50 shadow-card"
                    : "border-border/60 bg-secondary/30 hover:bg-secondary/60"
                }`}
              >
                {/* Top row: timestamp + agent name */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusColors[log.status]} ${log.isPaused ? "animate-pulse" : ""}`} />
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full font-sans ${agentColors[log.status]}`}>
                      {log.icon} {log.agent}
                    </span>
                  </div>
                  <span className="text-[9px] text-muted-foreground font-mono tabular-nums">{log.time}</span>
                </div>

                {/* Message */}
                <p className={`text-[11px] leading-relaxed font-sans pl-3.5 ${log.isPaused ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {log.message}
                  {i === logs.length - 1 && (
                    <span className="inline-block w-1.5 h-3 bg-primary ml-0.5 animate-blink-cursor align-middle" />
                  )}
                </p>

                {/* Paused pill */}
                {log.isPaused && (
                  <div className="mt-2 flex items-center gap-1.5 pl-3.5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
                      <span className="text-[10px] font-bold font-sans">⏸ PAUSED — Human Approval Required</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Stats Footer */}
      <div className="px-4 py-3.5 border-t border-border bg-secondary/30 flex-shrink-0">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-sm font-bold text-foreground font-sans">43</p>
            <p className="text-[9px] text-muted-foreground font-sans">Jobs Found</p>
          </div>
          <div>
            <p className="text-sm font-bold text-primary font-sans">3</p>
            <p className="text-[9px] text-muted-foreground font-sans">Top Matches</p>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground font-sans">$4.20</p>
            <p className="text-[9px] text-muted-foreground font-sans">API Spent</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
