import { motion } from "framer-motion";
import { Pause, Bell, User } from "lucide-react";

const PIPELINE_STEPS = [
  { label: "Search", done: true },
  { label: "Match", done: true },
  { label: "Tailor", done: true },
  { label: "Outreach", current: true },
  { label: "Done", done: false },
];

export function TopBar() {
  return (
    <motion.header
      className="h-[60px] w-full flex items-center justify-between px-6 border-b border-slate-100 backdrop-blur-md bg-white/90 z-50 flex-shrink-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
    >
      {/* Left */}
      <div className="flex items-center">
        <h1 className="font-serif text-lg font-bold tracking-tight">
          <span className="text-foreground">Career</span>
          <span className="text-primary">Agent</span>
        </h1>
        <div className="w-px h-6 bg-slate-200 mx-4" />
        <span className="text-sm font-medium text-slate-700 font-sans">
          Senior Frontend Roles — NY/Remote
        </span>
        <div className="w-2 h-2 rounded-full bg-green-500 ml-3 animate-pulse" />
      </div>

      {/* Center — Pipeline */}
      <div className="flex items-center gap-1">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center">
            {/* Dot */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div
                  className={`w-2 h-2 rounded-full ${
                    step.done
                      ? "bg-primary"
                      : step.current
                      ? "bg-primary"
                      : "bg-slate-200"
                  }`}
                />
                {step.current && (
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping opacity-40" />
                )}
              </div>
              <span
                className={`text-[10px] font-medium mt-1 font-sans ${
                  step.current ? "text-primary" : "text-slate-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {/* Connector line */}
            {i < PIPELINE_STEPS.length - 1 && (
              <div
                className={`w-6 h-0.5 mx-1 mb-4 ${
                  step.done ? "bg-primary" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-600 text-sm font-medium font-sans hover:bg-slate-50 transition-colors">
          <Pause size={16} />
          <span className="hidden lg:inline">Pause Agent</span>
        </button>
        <div className="relative">
          <Bell size={16} className="text-slate-500 cursor-pointer hover:text-slate-700 transition-colors" />
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-rose-200 flex items-center justify-center cursor-pointer hover:border-rose-400 transition-colors">
          <span className="text-xs font-semibold text-slate-600 font-sans">JD</span>
        </div>
      </div>
    </motion.header>
  );
}
