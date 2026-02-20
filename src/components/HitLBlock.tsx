import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Edit3, CheckCircle, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cvContent = {
  name: "Alex Morgan",
  contact: "alex.morgan@email.com · linkedin.com/in/alexmorgan · New York, NY",
  summary:
    "Senior Frontend Engineer with 8+ years of experience building high-performance web applications at scale. Deep expertise in React, Next.js, and TypeScript. Led teams of 6+ engineers at two Series B startups, shipping products used by millions. Passionate about component architecture, design systems, and developer experience.",
  experience: [
    {
      role: "Sr. Frontend Engineer",
      company: "Stripe",
      period: "2021 – Present",
      bullets: [
        "Architected the React + Next.js component library adopted by 14 internal product teams, reducing UI development time by 40%.",
        "Led migration of the Stripe Dashboard from a legacy Angular codebase to Next.js App Router, improving Lighthouse scores by 35 points.",
        "Collaborated with the design systems team to build a token-driven design system used across 6 Stripe products.",
        "Mentored 3 junior engineers via structured 1:1 coaching, all of whom received promotions within 18 months.",
      ],
    },
    {
      role: "Frontend Lead",
      company: "Figma",
      period: "2019 – 2021",
      bullets: [
        "Built the collaborative real-time commenting system for Figma web using React and WebSockets, supporting 500k+ concurrent users.",
        "Reduced bundle size by 52% through code-splitting, tree-shaking, and lazy-loading component strategies.",
        "Introduced Storybook-driven development, improving cross-team component reuse and visual regression testing coverage.",
      ],
    },
    {
      role: "Software Engineer — UI",
      company: "Vercel",
      period: "2017 – 2019",
      bullets: [
        "Developed the Vercel Analytics dashboard in React, visualizing deployment and performance metrics for 200k+ developers.",
        "Implemented server-side rendering patterns with Next.js that cut TTFB by 60% on the main marketing site.",
      ],
    },
  ],
  skills: "React · Next.js · TypeScript · Tailwind CSS · GraphQL · Node.js · Figma · Design Systems · WebSockets · Storybook",
  education: "B.Sc. Computer Science — New York University, 2016",
};

const coverLetterContent = `Dear Hiring Manager at Google,

I'm writing to express my strong interest in the Senior UI Engineer role at Google. After reviewing the job description, I'm confident that my experience leading frontend architecture at Stripe and Figma aligns closely with what your team is building.

At Stripe, I led the redesign of the Dashboard using Next.js and React — a project that directly mirrors the scale and complexity I understand Google's products to demand. I bring deep expertise in design systems, component architecture, and cross-functional collaboration with product and design teams.

I'm particularly excited about Google's investment in Material You and the challenge of building UI systems that scale to billions of users. I'd love to bring my experience in design token systems and real-time collaborative interfaces to your team.

Thank you for considering my application. I've attached my tailored CV and would welcome the chance to speak further.

Warm regards,
Alex Morgan`;

export function HitLBlock() {
  const [cvExpanded, setCvExpanded] = useState(true);
  const [approved, setApproved] = useState(false);

  return (
    <motion.div
      className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText size={15} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground font-sans">
              Review: Google — Sr. UI Engineer
            </p>
            <p className="text-[11px] text-muted-foreground font-sans">
              Tailored CV + Cover Letter · sarah.hr@google.com
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-amber-700 font-sans">Awaiting Review</span>
        </div>
      </div>

      {/* CV Section */}
      <div className="border-b border-border">
        <button
          onClick={() => setCvExpanded(!cvExpanded)}
          className="w-full flex items-center justify-between px-5 py-3 hover:bg-secondary/30 transition-colors"
        >
          <span className="text-xs font-semibold text-foreground font-sans flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-primary/10 inline-flex items-center justify-center text-primary text-[10px] font-bold">CV</span>
            Tailored Curriculum Vitae — Google_CV_Tailored.pdf
          </span>
          {cvExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
        </button>

        <AnimatePresence>
          {cvExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <ScrollArea className="h-64">
                <div className="px-5 pb-5 font-sans text-[11px] leading-relaxed text-foreground space-y-4">
                  {/* Name & Contact */}
                  <div className="border-b border-border pb-3">
                    <h2 className="font-serif text-base font-bold text-foreground">{cvContent.name}</h2>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{cvContent.contact}</p>
                  </div>

                  {/* Summary */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Professional Summary</p>
                    <p className="text-[11px] text-foreground leading-relaxed">{cvContent.summary}</p>
                  </div>

                  {/* Experience */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Experience</p>
                    <div className="space-y-3">
                      {cvContent.experience.map((exp) => (
                        <div key={exp.role}>
                          <div className="flex items-baseline justify-between">
                            <p className="text-[11px] font-semibold text-foreground">{exp.role} — {exp.company}</p>
                            <span className="text-[10px] text-muted-foreground ml-2 flex-shrink-0">{exp.period}</span>
                          </div>
                          <ul className="mt-1 space-y-0.5 pl-3">
                            {exp.bullets.map((b, i) => (
                              <li key={i} className="text-[10px] text-muted-foreground leading-relaxed before:content-['·'] before:mr-1.5 before:text-primary">
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Technical Skills</p>
                    <p className="text-[11px] text-foreground">{cvContent.skills}</p>
                  </div>

                  {/* Education */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">Education</p>
                    <p className="text-[11px] text-foreground">{cvContent.education}</p>
                  </div>
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cover Letter */}
      <div className="border-b border-border">
        <div className="px-5 py-3 flex items-center gap-2 border-b border-border/50">
          <span className="w-5 h-5 rounded bg-blue-50 inline-flex items-center justify-center text-blue-500 text-[10px] font-bold">CL</span>
          <span className="text-xs font-semibold text-foreground font-sans">Cover Letter Preview</span>
        </div>
        <ScrollArea className="h-36">
          <div className="px-5 py-3 font-sans">
            <pre className="text-[11px] text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans">
              {coverLetterContent}
            </pre>
          </div>
        </ScrollArea>
      </div>

      {/* Actions */}
      <div className="px-5 py-4 flex items-center gap-3">
        <AnimatePresence mode="wait">
          {!approved ? (
            <motion.div
              key="actions"
              className="flex items-center gap-3 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="flex-1" whileHover={{ scale: 1.01 }}>
                <Button
                  className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-rose animate-shimmer-pulse font-sans"
                  onClick={() => setApproved(true)}
                >
                  <Mail size={15} />
                  Approve & Send Email via Gmail
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs border-border text-muted-foreground hover:text-foreground font-sans"
                >
                  <Edit3 size={13} />
                  Edit CV
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="confirmed"
              className="flex items-center gap-2 w-full justify-center py-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={16} className="text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-600 font-sans">
                Application sent to sarah.hr@google.com
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
