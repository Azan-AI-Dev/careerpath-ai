import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface LogEntry {
  time: string;
  emoji: string;
  agent: string;
  title: string;
  desc: string;
  thought?: string;
  status: "done" | "running" | "waiting";
}

const LOGS: LogEntry[] = [
  { time: "10:00:01", emoji: "🟢", agent: "OrchestratorAgent", title: "Goal Decomposition", desc: "Parsed user intent. Created execution plan with 4 sub-tasks.", status: "done", thought: "Thought: User wants Senior Frontend roles in NY/Remote, $160k+.\nPlan:\n Task 1: Scrape job listings (ScraperAgent)\n Task 2: Score matches against CV (EvaluatorAgent)\n Task 3: Tailor CV for top match (TailorAgent)\n Task 4: Find HR contact and draft email (CommsAgent)\nExecuting Task 1 first..." },
  { time: "10:00:04", emoji: "🔍", agent: "ScraperAgent", title: "LinkedIn API Query", desc: "Queried LinkedIn: React, Next.js, >$160k, NY/Remote.", status: "done", thought: "Connecting to LinkedIn Scraper API...\nQuery: { keywords: ['React', 'Next.js'], location: 'New York', remote: true, salary_min: 160000 }\nResponse: 87 listings returned.\nFiltering duplicates... 82 unique." },
  { time: "10:00:07", emoji: "🔍", agent: "ScraperAgent", title: "Indeed API Query", desc: "Queried Indeed. Found 55 listings, 37 net new.", status: "done", thought: "Connecting to Indeed API...\nMirroring LinkedIn parameters.\nResponse: 55 listings.\nCross-referencing... 18 duplicates removed.\nNet new: 37." },
  { time: "10:00:09", emoji: "🔍", agent: "ScraperAgent", title: "Glassdoor + Salary Validation", desc: "Validated salary data. Total pool: 142 unique jobs.", status: "done", thought: "Glassdoor salary cross-reference complete.\n23 below $160k removed.\nFinal pool: 142 qualified listings.\nPassing to EvaluatorAgent..." },
  { time: "10:00:12", emoji: "🧠", agent: "EvaluatorAgent", title: "Vector Embedding — Resume", desc: "Converted resume into 1536-dim vector embeddings.", status: "done", thought: "Loading: John_Doe_Resume_2024.pdf (2.4 MB)\nExtracting text... 847 words.\nGenerating embeddings via text-embedding-3-small...\nVector dimensions: 1536.\nStored in session memory." },
  { time: "10:00:15", emoji: "🧠", agent: "EvaluatorAgent", title: "Cosine Similarity Scoring", desc: "Scored 142 JDs. Top 3: Stripe (94%), Vercel (88%), Airbnb (82%).", status: "done", thought: "Embedding 142 job descriptions...\nRunning cosine similarity...\n\nTop 5:\n1. Stripe: 0.94\n2. Vercel: 0.88\n3. Airbnb: 0.82\n4. Shopify: 0.79\n5. Netflix: 0.77\n\nFiltering Top 3 for presentation." },
  { time: "10:00:18", emoji: "🤖", agent: "OrchestratorAgent", title: "Results Presented", desc: "Displayed 3 job cards. Awaiting user selection.", status: "done", thought: "Generated rich card UI for top 3 matches.\nWaiting for human-in-the-loop selection..." },
  { time: "10:00:25", emoji: "👤", agent: "Human Input", title: "User Selected: Stripe", desc: "User chose 'Tailor CV & Apply' for Stripe — Staff UI Engineer.", status: "done" },
  { time: "10:00:28", emoji: "✍️", agent: "TailorAgent", title: "JD Requirements Extraction", desc: "Analyzed Stripe JD. Identified 6 key skills, 2 gaps.", status: "done", thought: "Analyzing Stripe JD for Staff UI Engineer...\n\nRequired Skills:\n- Next.js / React (STRONG MATCH ✓)\n- Design Systems (PARTIAL ~)\n- Performance optimization (STRONG ✓)\n- TypeScript (MATCH ✓)\n- Leadership (MATCH ✓)\n- Payment/fintech (PARTIAL ~)\n\nGap Analysis:\n- 'Design Systems' not explicit. Reframe component library work.\n- Payment exp buried. Moving to bullet 2." },
  { time: "10:00:32", emoji: "✍️", agent: "TailorAgent", title: "Resume Rewrite Complete", desc: "12 bullets enhanced. 8 keywords injected. 6 metrics added.", status: "done", thought: "Strategy:\n1. Promote payment exp to top 3\n2. 'component library' → 'design system'\n3. Add metrics: LCP -42%, team 4 eng, conversion +18%\n4. Keywords: Next.js 14, TypeScript, Storybook, Web Vitals\n5. Remove: jQuery, 2016 internship\n\nGenerated: John_Doe_Stripe_Tailored.pdf\nConfidence: 96/100" },
  { time: "10:00:35", emoji: "📧", agent: "CommsAgent", title: "HR Contact Discovery", desc: "Found: sarah.baker@stripe.com (97% confidence).", status: "done", thought: "Querying Hunter.io...\nDomain: stripe.com\nDept: Engineering, HR\n\n1. sarah.baker@stripe.com — Head of Eng Recruiting\n Confidence: 97% | LinkedIn + Company page\n2. michael.chen@stripe.com — Eng Manager\n Confidence: 84%\n\nSelected: sarah.baker (highest).\nMX record verified. Deliverable." },
  { time: "10:00:38", emoji: "📧", agent: "CommsAgent", title: "Email Draft Generated", desc: "Personalized email written. Subject A/B tested.", status: "done", thought: "Strategy:\n- Hook: Stripe's unified checkout redesign blog\n- Value: Next.js achievement (42% LCP reduction)\n- Social proof: 2M+ users\n- CTA: 15-min call\n\nSubjects:\nA: 'Application: Staff UI Engineer — John Doe'\nB: 'Loved Stripe\\'s Design System vision'\nSelected: A (34% predicted open rate)\n\nBody: 127 words. Professional tone." },
  { time: "10:00:40", emoji: "⏸️", agent: "OrchestratorAgent", title: "Human-in-the-Loop Checkpoint", desc: "Paused for user review. CV + Email displayed.", status: "done", thought: "All prep complete. Presenting:\n- Tailored CV diff\n- Email draft\n- Awaiting explicit 'Send' approval.\nWill NOT auto-send." },
  { time: "10:01:15", emoji: "📧", agent: "CommsAgent", title: "Email Dispatched via Gmail", desc: "Sent to sarah.baker@stripe.com. ID: msg_8x7k2j9f", status: "done", thought: "User approved at 10:01:12.\nConnecting Gmail API (OAuth2)...\nComposing MIME message...\nAttaching: John_Doe_Stripe_Tailored.pdf (2.4 MB)\nSending...\n\nResponse: 200 OK\nMessage ID: msg_8x7k2j9f\n\nWebhook set: 7-day reply monitor.\nPipeline updated: Stripe → 'Applied'" },
];

const FILTER_TABS = ["All", "Planner", "Scraper", "Evaluator", "Writer", "Errors"];

function LogNode({ entry }: { entry: LogEntry }) {
  const [expanded, setExpanded] = useState(false);

  const statusBadge = {
    done: { bg: "bg-green-50", text: "text-green-600", label: "Done" },
    running: { bg: "bg-rose-50", text: "text-primary", label: "Running" },
    waiting: { bg: "bg-amber-50", text: "text-amber-600", label: "Paused" },
  }[entry.status];

  const dotColor = {
    done: "bg-primary",
    running: "bg-primary",
    waiting: "bg-amber-400",
  }[entry.status];

  return (
    <div className="relative flex gap-3 mb-3">
      {/* Timeline dot */}
      <div className="flex flex-col items-center flex-shrink-0 pt-3">
        <div className="relative">
          <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
          {entry.status === "running" && (
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-40" />
          )}
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 bg-white border border-slate-100 rounded-lg p-3 shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono">{entry.time}</span>
            <span className="text-[11px] font-semibold text-slate-700 font-sans">{entry.emoji} {entry.agent}</span>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
            {statusBadge.label}
          </span>
        </div>
        <p className="text-[13px] font-semibold text-slate-800 font-sans mt-1.5">{entry.title}</p>
        <p className="text-xs text-slate-500 font-sans">{entry.desc}</p>

        {entry.thought && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs font-medium text-primary font-sans mt-2 hover:underline"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? "Hide Reasoning" : "Show Reasoning"}
            </button>
            {expanded && (
              <div className="mt-2 bg-slate-50 border-l-2 border-rose-200 rounded-md p-3">
                <pre className="text-[11px] text-slate-600 font-mono whitespace-pre-wrap leading-relaxed">
                  {entry.thought}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function RightSidebar() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <motion.aside
      className="w-[400px] h-[calc(100vh-60px)] bg-[#FAFAFA] border-l border-slate-100 flex flex-col flex-shrink-0"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.5 }}
    >
      <div className="p-5 flex-shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold text-foreground font-sans">Agent Activity</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-green-600 font-sans">Live</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium font-sans whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cost Tracker */}
        <div className="bg-white rounded-lg p-3 shadow-sm mt-4 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-sm font-semibold text-slate-800 font-mono">14,280</p>
            <p className="text-[10px] text-slate-400 font-sans">tokens</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary font-mono">$0.52</p>
            <p className="text-[10px] text-slate-400 font-sans">spent</p>
          </div>
          <div>
            <div className="w-full h-[3px] rounded-full bg-slate-100 mt-2">
              <div className="h-[3px] rounded-full bg-primary" style={{ width: "52%" }} />
            </div>
            <p className="text-[10px] text-slate-400 font-sans mt-1">52% of $1.00</p>
          </div>
        </div>
      </div>

      {/* Log Timeline */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[5px] top-3 bottom-0 w-0.5 bg-slate-200" />
          {LOGS.map((entry, i) => (
            <LogNode key={i} entry={entry} />
          ))}
        </div>
      </div>

      {/* Mini Pipeline Tracker */}
      <div className="border-t border-slate-100 px-5 py-3 flex-shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 font-sans mb-2">
          Application Pipeline
        </p>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: "Discovered", count: 142, color: "bg-slate-200 text-slate-600" },
            { label: "Matched", count: 3, color: "bg-amber-100 text-amber-700" },
            { label: "Applied", count: 1, color: "bg-rose-100 text-primary", chip: "Stripe" },
            { label: "Interview", count: 0, color: "bg-green-100 text-green-700" },
          ].map((col) => (
            <div key={col.label}>
              <p className="text-[10px] font-medium text-slate-500 font-sans">{col.label}</p>
              <div className={`inline-flex items-center justify-center min-w-5 h-5 rounded-full text-[10px] font-semibold mt-1 px-1.5 ${col.color}`}>
                {col.count}
              </div>
              {col.chip && (
                <p className="text-[9px] text-primary font-sans mt-0.5">{col.chip}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
