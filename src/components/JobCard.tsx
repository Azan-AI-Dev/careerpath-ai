import { useEffect, useState } from "react";
import { MapPin, DollarSign, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface JobCardProps {
  company: string;
  title: string;
  location: string;
  salary: string;
  matchScore: number;
  logoInitials: string;
  logoColor: string;
  delay?: number;
}

function MatchRing({ score, delay = 0 }: { score: number; delay?: number }) {
  const [animated, setAnimated] = useState(false);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animated ? score / 100 : 0) * circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay * 1000 + 300);
    return () => clearTimeout(t);
  }, [delay]);

  const color = score >= 90 ? "#BE123C" : score >= 80 ? "#E11D48" : "#f43f5e";

  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="hsl(355 100% 94%)"
          strokeWidth="3.5"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold text-primary font-sans">{score}%</span>
      </div>
    </div>
  );
}

export function JobCard({ company, title, location, salary, matchScore, logoInitials, logoColor, delay = 0 }: JobCardProps) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border/60 shadow-card hover:shadow-elevated hover:border-border transition-all duration-300 cursor-pointer group"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.15 + 0.2, duration: 0.4 }}
      whileHover={{ scale: 1.005 }}
    >
      {/* Company Logo */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold font-sans"
        style={{ backgroundColor: logoColor }}
      >
        {logoInitials}
      </div>

      {/* Job Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate font-sans group-hover:text-primary transition-colors">
          {title}
        </p>
        <p className="text-xs text-muted-foreground font-medium font-sans">{company}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-sans">
            <MapPin size={10} /> {location}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-sans">
            <DollarSign size={10} /> {salary}
          </span>
        </div>
      </div>

      {/* Match Score Ring */}
      <div className="flex items-center gap-2">
        <MatchRing score={matchScore} delay={delay * 0.15} />
        <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}
