import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Paperclip, ArrowUp, Mic, CheckCircle, RefreshCw, Pencil, Send, Save, XCircle, Shield, FileText, Code, Users, Laptop } from "lucide-react";
import { JobCard } from "@/components/JobCard";

const JOB_CARDS = [
  {
    company: "Stripe", title: "Staff UI Engineer — Design Systems",
    location: "San Francisco, CA (Remote OK)", salary: "$185,000 — $225,000", type: "Full-time",
    matchScore: 94, logoInitial: "S", logoBg: "#EDE9FE", logoText: "#7C3AED",
    ringColor: "hsl(349 89% 60%)",
    reasons: [
      "Your 6 years of React/Next.js directly matches their core tech stack requirement.",
      "Payment gateway optimization project at TechCorp aligns with Stripe's product domain.",
      "Leadership experience managing 4-person frontend team matches Staff-level expectations.",
    ],
  },
  {
    company: "Vercel", title: "Senior Frontend Developer — DX Team",
    location: "New York, NY (Hybrid)", salary: "$165,000 — $195,000", type: "Full-time",
    matchScore: 88, logoInitial: "V", logoBg: "#000000", logoText: "#FFFFFF",
    ringColor: "hsl(350 94% 72%)",
    reasons: [
      "Deep Next.js expertise is their primary requirement — near-perfect alignment.",
      "Open-source contributions to React ecosystem noted in your GitHub profile.",
      "Minor gap: They prefer WebGL/Canvas experience which isn't highlighted in your CV.",
    ],
  },
  {
    company: "Airbnb", title: "Frontend Engineer III — Guest Experience",
    location: "Remote (US-based)", salary: "$170,000 — $200,000", type: "Full-time",
    matchScore: 82, logoInitial: "A", logoBg: "#FFE4E6", logoText: "#E11D48",
    ringColor: "hsl(38 92% 50%)",
    reasons: [
      "Strong React foundation matches their requirements well.",
      "E-commerce checkout optimization experience translates to booking conversion flows.",
      "Gap: Heavy GraphQL usage required — not prominently featured in your current CV.",
    ],
  },
];

function AgentAvatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
      <span className="text-[10px] font-bold text-primary font-sans">CA</span>
    </div>
  );
}

function AgentLabel({ time }: { time: string }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <AgentAvatar />
      <span className="text-[11px] text-primary font-sans">CareerAgent · {time}</span>
    </div>
  );
}

function UserLabel({ time }: { time: string }) {
  return (
    <p className="text-[11px] text-slate-400 font-sans text-right mb-1.5">You · {time}</p>
  );
}

function UserBubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="ml-auto max-w-[65%]">
      <UserLabel time={time} />
      <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-br-sm px-5 py-4 shadow-sm">
        <p className="text-[15px] text-slate-900 font-sans leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function AgentBubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="max-w-[75%]">
      <AgentLabel time={time} />
      <div className="bg-white border border-slate-100 border-l-[3px] border-l-rose-300 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-sm px-5 py-4 shadow-md">
        {children}
      </div>
    </div>
  );
}

function AgentWideCard({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="max-w-[90%]">
      <AgentLabel time={time} />
      <div className="bg-white border border-slate-100 border-l-[3px] border-l-rose-300 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-sm px-5 py-5 shadow-md">
        {children}
      </div>
    </div>
  );
}

export function CenterPanel() {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 500);
  }, []);

  return (
    <main className="flex flex-col h-full bg-white">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {/* MSG 1 — User */}
        <UserBubble time="10:00 AM">
          Find me Senior Frontend Engineering roles (React/Next.js) in New York or Remote. My target salary is $160k+.
          Use my uploaded resume. For the best match, tailor my CV, find the hiring manager's email, draft a cold email,
          and send it via my connected Gmail.
        </UserBubble>

        {/* MSG 2 — Agent text */}
        <AgentBubble time="10:00 AM">
          <p className="text-[15px] text-slate-900 font-sans leading-relaxed">
            🎯 Got it. I'm launching a multi-agent search across LinkedIn, Indeed, and Glassdoor. I'll match results against your uploaded resume, score them, and present the top candidates. This should take about 30 seconds.
          </p>
          <p className="text-xs italic text-slate-400 font-sans mt-2">⏳ Scanning 3 platforms...</p>
        </AgentBubble>

        {/* MSG 3 — Job Results */}
        <AgentWideCard time="10:00 AM">
          <h3 className="text-lg font-semibold text-foreground font-sans">🔍 Top Matches Found</h3>
          <p className="text-sm text-slate-500 font-sans mt-1">
            Scanned 142 listings across LinkedIn, Indeed, and Glassdoor. Here are your top 3 matches:
          </p>
          <div className="space-y-3 mt-4">
            {JOB_CARDS.map((job) => (
              <JobCard key={job.company} {...job} />
            ))}
          </div>
        </AgentWideCard>

        {/* MSG 4 — User */}
        <UserBubble time="10:00 AM">
          Stripe looks perfect. Go ahead — tailor my resume for that role and prepare the outreach email.
        </UserBubble>

        {/* MSG 5 — Agent text */}
        <AgentBubble time="10:00 AM">
          <p className="text-[15px] text-slate-900 font-sans leading-relaxed">
            Excellent choice — Stripe is your strongest match at 94%. I'm now:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1 text-[15px] text-slate-900 font-sans leading-relaxed">
            <li>Analyzing the Stripe JD for key requirements</li>
            <li>Rewriting your CV to highlight relevant experience</li>
            <li>Finding the hiring manager's contact via Hunter.io</li>
            <li>Drafting a personalized cold email</li>
          </ol>
          <p className="text-[15px] text-slate-900 font-sans leading-relaxed mt-2">
            I'll pause before sending anything so you can review everything first.
          </p>
        </AgentBubble>

        {/* MSG 6 — CV Diff */}
        <AgentWideCard time="10:00 AM">
          <h3 className="text-base font-semibold text-foreground font-sans">✍️ Resume Tailored for Stripe — Staff UI Engineer</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 font-sans mb-2">Current</p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                <p className="text-[13px] text-slate-400 font-sans line-through">• Built frontend features using React and JavaScript.</p>
                <p className="text-[13px] text-slate-400 font-sans line-through">• Managed a small team of developers.</p>
                <p className="text-[13px] text-slate-400 font-sans line-through">• Worked on payment integrations.</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-primary font-sans mb-2">Optimized</p>
              <div className="bg-white border border-rose-200 border-l-[3px] border-l-rose-400 rounded-lg p-4 space-y-2">
                <p className="text-[13px] text-slate-800 font-sans"><span className="bg-green-50 px-0.5 rounded">• Architected Next.js 14 design system serving 2M+ daily users, reducing LCP by 42%.</span></p>
                <p className="text-[13px] text-slate-800 font-sans"><span className="bg-green-50 px-0.5 rounded">• Led cross-functional frontend team of 4 engineers, shipping 12 features in Q3 2024.</span></p>
                <p className="text-[13px] text-slate-800 font-sans"><span className="bg-green-50 px-0.5 rounded">• Engineered PCI-compliant payment flow optimization, increasing conversion rate by 18%.</span></p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <span className="text-xs text-slate-600 bg-slate-50 rounded-full px-3 py-1 font-sans">📝 12 bullets enhanced</span>
            <span className="text-xs text-slate-600 bg-slate-50 rounded-full px-3 py-1 font-sans">🎯 8 keywords injected</span>
            <span className="text-xs text-slate-600 bg-slate-50 rounded-full px-3 py-1 font-sans">📊 6 achievements quantified</span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button className="flex items-center gap-2 bg-primary text-white text-sm font-semibold font-sans rounded-lg h-10 px-5 hover:bg-rose-700 transition-colors">
              <CheckCircle size={16} /> Approve Changes
            </button>
            <button className="flex items-center gap-2 border border-slate-200 text-slate-700 text-sm font-medium font-sans rounded-lg h-10 px-4 hover:bg-slate-50 transition-colors">
              <Pencil size={14} /> Edit Manually
            </button>
            <button className="flex items-center gap-2 text-slate-500 text-sm font-sans hover:text-slate-700 transition-colors">
              <RefreshCw size={14} /> Regenerate
            </button>
          </div>
        </AgentWideCard>

        {/* MSG 7 — Email Composer */}
        <AgentWideCard time="10:00 AM">
          <h3 className="text-base font-semibold text-foreground font-sans">📧 Outreach Email Ready for Review</h3>
          <p className="text-[13px] text-slate-500 font-sans mt-1">HR Contact found via Hunter.io</p>

          <div className="flex items-center gap-2 mt-3 bg-green-50 border border-green-200 rounded-full px-3 py-1 w-fit">
            <Shield size={14} className="text-green-600" />
            <span className="text-[13px] font-medium text-slate-800 font-sans">sarah.baker@stripe.com</span>
            <span className="text-[11px] text-green-600 font-sans">Verified (97% confidence)</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-4 space-y-3">
            <div className="flex gap-2 text-sm font-sans">
              <span className="text-[11px] font-semibold text-slate-400 uppercase w-14 flex-shrink-0 pt-0.5">From</span>
              <span className="text-slate-800">johndoe.careers@gmail.com <span className="text-green-600 text-[11px]">Connected</span></span>
            </div>
            <div className="flex gap-2 text-sm font-sans">
              <span className="text-[11px] font-semibold text-slate-400 uppercase w-14 flex-shrink-0 pt-0.5">To</span>
              <span className="text-slate-800">sarah.baker@stripe.com <span className="text-green-600 text-[11px]">97% verified</span></span>
            </div>
            <div className="flex gap-2 text-sm font-sans">
              <span className="text-[11px] font-semibold text-slate-400 uppercase w-14 flex-shrink-0 pt-0.5">Subject</span>
              <input
                defaultValue="Application: Staff UI Engineer, Design Systems — John Doe | Next.js & React Expert"
                className="flex-1 text-slate-800 bg-transparent border-none outline-none focus:bg-slate-50 focus:border focus:border-slate-200 rounded px-1 -mx-1 font-sans"
              />
            </div>
            <div className="border-t border-slate-100 my-1" />
            <textarea
              className="w-full h-[200px] resize-y text-sm text-slate-800 font-sans leading-6 bg-transparent border-none outline-none focus:border focus:border-slate-200 rounded p-1 -m-1"
              defaultValue={`Hi Sarah,

I noticed Stripe's recent investment in building a unified design system across the Dashboard — it's something I've been deeply passionate about in my current role at TechCorp.

Over the past 3 years, I've architected a Next.js-based component library serving 2M+ daily active users, reducing page load times by 42% and improving developer velocity by 3x through standardized patterns.

I'd love to bring this experience to Stripe's Design Systems team. I've attached my tailored resume highlighting relevant achievements.

Would you have 15 minutes this week for a quick call?

Best regards,
John Doe
linkedin.com/in/johndoe | github.com/johndoe`}
            />
            <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-lg px-4 py-2 w-fit">
              <FileText size={16} className="text-primary" />
              <span className="text-[13px] font-medium text-slate-700 font-sans">John_Doe_Stripe_Tailored.pdf</span>
              <span className="text-[11px] text-slate-400 font-sans">2.4 MB</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button className="flex items-center gap-2 bg-primary text-white text-sm font-semibold font-sans rounded-lg h-11 px-6 hover:bg-rose-700 hover:shadow-glow-rose transition-all">
              <Send size={14} /> Send via Gmail
            </button>
            <button className="flex items-center gap-2 border border-slate-200 text-slate-700 text-sm font-medium font-sans rounded-lg h-11 px-4 hover:bg-slate-50 transition-colors">
              <Pencil size={14} /> Edit Email
            </button>
            <button className="flex items-center gap-2 text-slate-500 text-sm font-sans hover:text-slate-700 transition-colors">
              <Save size={14} /> Save Draft
            </button>
            <button className="flex items-center gap-2 text-red-500 text-sm font-sans hover:text-red-600 transition-colors ml-auto">
              <XCircle size={14} /> Cancel
            </button>
          </div>
        </AgentWideCard>

        {/* MSG 8 — Success */}
        <div className="max-w-[75%]">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
            </motion.div>
            <div>
              <p className="text-[15px] font-semibold text-green-700 font-sans">
                Email sent successfully to sarah.baker@stripe.com
              </p>
              <p className="text-[13px] text-green-600/70 font-sans mt-1">
                Application tracked. You'll be notified of any reply within 7 days.
              </p>
              <a href="#" className="text-[13px] text-primary font-sans hover:underline mt-1 inline-block">
                View in Sent folder →
              </a>
            </div>
          </div>
        </div>

        {/* MSG 9 — Interview Prep */}
        <AgentWideCard time="10:01 AM">
          <h3 className="text-base font-semibold text-foreground font-sans">🎤 Ready to prepare for the Stripe interview?</h3>
          <p className="text-sm text-slate-500 font-sans mt-1">I can simulate interview rounds based on Stripe's known patterns.</p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { icon: <Code size={24} className="text-slate-600" />, title: "Technical Screen", sub: "React & System Design", dur: "~45 min" },
              { icon: <Users size={24} className="text-slate-600" />, title: "Behavioral Round", sub: "Leadership & Collaboration", dur: "~30 min" },
              { icon: <Laptop size={24} className="text-slate-600" />, title: "Take-Home Prep", sub: "Challenge Practice", dur: "~2 hours" },
            ].map((opt) => (
              <div key={opt.title} className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-rose-200 hover:shadow-sm hover:bg-rose-50/30 transition-all cursor-pointer">
                <div className="flex justify-center mb-2">{opt.icon}</div>
                <p className="text-sm font-semibold text-foreground font-sans">{opt.title}</p>
                <p className="text-xs text-slate-500 font-sans">{opt.sub}</p>
                <p className="text-[11px] text-slate-400 font-sans mt-1">{opt.dur}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 h-10 border border-primary text-primary rounded-lg text-sm font-semibold font-sans hover:bg-primary hover:text-white transition-all">
            Start Mock Interview
          </button>
        </AgentWideCard>

        {/* MSG 10 — Agent text */}
        <AgentBubble time="10:01 AM">
          <p className="text-[15px] text-slate-900 font-sans leading-relaxed">
            Your Stripe application is now live! Here's what's happening next:
          </p>
          <ul className="mt-2 space-y-1 text-[15px] text-slate-900 font-sans leading-relaxed">
            <li>• 📬 Monitoring sarah.baker@stripe.com for replies (7-day window)</li>
            <li>• 📊 Your pipeline: 1 Active, 2 Ready to Apply</li>
            <li>• 💡 Tip: Want me to proceed with Vercel (88% match) while we wait?</li>
          </ul>
        </AgentBubble>

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="px-8 py-4 border-t border-slate-100 bg-white flex-shrink-0">
        <motion.div
          layoutId="main-input"
          className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm flex items-center px-5 gap-3 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-100 focus-within:bg-white transition-all"
        >
          <Paperclip size={18} className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors flex-shrink-0" />
          <Mic size={18} className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors flex-shrink-0" />
          <input
            type="text"
            placeholder="Follow up, ask questions, or give instructions..."
            className="flex-1 bg-transparent text-sm text-foreground font-sans placeholder:text-slate-400 outline-none caret-primary"
          />
          <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-rose-700 hover:scale-105 active:scale-95 transition-all flex-shrink-0">
            <ArrowUp size={18} className="text-white" />
          </button>
        </motion.div>
      </div>
    </main>
  );
}
