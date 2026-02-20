import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus, FileText, HardDrive, ChevronRight, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

export function LeftSidebar() {
  const [apiSpend, setApiSpend] = useState([12.5]);
  const [radius, setRadius] = useState([25]);
  const [minSalary, setMinSalary] = useState([120]);

  const apiMax = 50;
  const salaryMax = 250;

  return (
    <aside className="flex flex-col h-full w-full bg-secondary border-r border-border overflow-y-auto">
      {/* Brand Header */}
      <motion.div
        className="px-5 py-5 border-b border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase size={14} className="text-primary-foreground" />
          </div>
          <h1 className="font-serif text-lg font-bold text-foreground tracking-tight">
            Career<span className="text-primary">Agent</span>
          </h1>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground font-sans">
          Multi-Agent Job-Seeking Assistant
        </p>
      </motion.div>

      {/* Budget & Constraints */}
      <motion.div
        className="px-5 py-5 border-b border-border"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4 font-sans">
          Budget & Constraints
        </p>

        {/* Max API Spend */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-foreground font-sans">Max API Spend</label>
            <span className="text-xs font-semibold text-primary font-sans">
              ${apiSpend[0].toFixed(2)}
              <span className="text-muted-foreground font-normal"> / ${apiMax}.00</span>
            </span>
          </div>
          <Slider
            value={apiSpend}
            onValueChange={setApiSpend}
            min={0}
            max={apiMax}
            step={0.5}
            className="[&_.bg-primary]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-rose"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">$0</span>
            <span className="text-[10px] text-muted-foreground">${apiMax}</span>
          </div>
        </div>

        {/* Job Search Radius */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-foreground font-sans">Job Search Radius</label>
            <span className="text-xs font-semibold text-primary font-sans">
              {radius[0]} mi
            </span>
          </div>
          <Slider
            value={radius}
            onValueChange={setRadius}
            min={5}
            max={100}
            step={5}
            className="[&_.bg-primary]:bg-primary [&_[role=slider]]:border-primary"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">5 mi</span>
            <span className="text-[10px] text-muted-foreground">100 mi</span>
          </div>
        </div>

        {/* Min Expected Salary */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-foreground font-sans">Min Salary Expected</label>
            <span className="text-xs font-semibold text-primary font-sans">
              ${minSalary[0]}k
            </span>
          </div>
          <Slider
            value={minSalary}
            onValueChange={setMinSalary}
            min={60}
            max={salaryMax}
            step={5}
            className="[&_.bg-primary]:bg-primary [&_[role=slider]]:border-primary"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">$60k</span>
            <span className="text-[10px] text-muted-foreground">${salaryMax}k</span>
          </div>
        </div>
      </motion.div>

      {/* Knowledge Base */}
      <motion.div
        className="px-5 py-5 flex-1"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 font-sans">
          Knowledge Base
        </p>

        <div className="space-y-2">
          {/* Google Drive */}
          <div className="flex items-center gap-2.5 rounded-lg p-2.5 bg-card shadow-card border border-border/50 group hover:border-border transition-all duration-200">
            <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0">
              <HardDrive size={13} className="text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate font-sans">Google Drive</p>
              <p className="text-[10px] text-muted-foreground truncate">"Resumes" folder linked</p>
            </div>
            <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
          </div>

          {/* Base_CV.pdf */}
          <div className="flex items-center gap-2.5 rounded-lg p-2.5 bg-card shadow-card border border-border/50 group hover:border-border transition-all duration-200">
            <div className="w-7 h-7 rounded-md bg-rose-50 flex items-center justify-center flex-shrink-0">
              <FileText size={13} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate font-sans">Base_CV.pdf</p>
              <p className="text-[10px] text-muted-foreground">Uploaded 3 days ago</p>
            </div>
            <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
          </div>
        </div>

        {/* Connect Source Button */}
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full text-xs gap-1.5 border-dashed border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-200 font-sans"
        >
          <Plus size={13} />
          Connect Source
        </Button>
      </motion.div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors font-sans group">
          <span>View full settings</span>
          <ChevronRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </aside>
  );
}
