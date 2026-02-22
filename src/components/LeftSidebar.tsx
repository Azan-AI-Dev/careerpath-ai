import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil, FileText, Mail, Key, Folder, ChevronDown, X, Settings,
} from "lucide-react";

const EXPERIENCE_LEVELS = ["Junior", "Mid-Level", "Senior", "Staff", "Lead", "Principal"];
const LOCATIONS = ["Remote Only", "New York, NY", "San Francisco, CA", "Austin, TX", "London, UK"];

export function LeftSidebar() {
  const [apiSpend, setApiSpend] = useState(12.4);
  const [maxApps, setMaxApps] = useState(10);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["Senior", "Staff"]);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["Remote Only", "New York, NY"]);

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  return (
    <motion.aside
      className="w-[320px] h-[calc(100vh-60px)] bg-slate-50 border-r border-slate-100 flex flex-col overflow-y-auto flex-shrink-0"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 22, delay: 0.1 }}
    >
      <div className="p-6 flex flex-col gap-6 flex-1">
        {/* Active Campaign Card */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 font-sans">
              Current Campaign
            </span>
            <Pencil size={14} className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" />
          </div>
          <p className="text-[15px] font-semibold text-foreground font-sans">Sr. Frontend Engineer Hunt</p>
          <p className="text-xs text-slate-400 font-sans mt-0.5">Started 2 hours ago</p>
          <div className="flex justify-between mt-4">
            <div className="text-center">
              <p className="text-[13px] font-semibold text-slate-700 font-sans">142</p>
              <p className="text-[11px] text-slate-400 font-sans">Scanned</p>
            </div>
            <div className="text-center">
              <p className="text-[13px] font-semibold text-green-600 font-sans">3</p>
              <p className="text-[11px] text-slate-400 font-sans">Matched</p>
            </div>
            <div className="text-center">
              <p className="text-[13px] font-semibold text-primary font-sans">1</p>
              <p className="text-[11px] text-slate-400 font-sans">Applied</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full h-1 rounded-full bg-slate-100">
              <div className="h-1 rounded-full bg-primary" style={{ width: "65%" }} />
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-1">65% Complete</p>
          </div>
        </div>

        {/* Budget & Limits */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 font-sans mb-4">
            Budget & Limits
          </p>

          {/* API Spend */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-medium text-slate-700 font-sans">Monthly API Spend</label>
              <span className="text-xs text-slate-600 font-mono">${apiSpend.toFixed(2)} / $50.00</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={0.1}
              value={apiSpend}
              onChange={(e) => setApiSpend(Number(e.target.value))}
              className="w-full h-1 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform"
            />
          </div>

          {/* Max Applications */}
          <div className="mb-4">
            <label className="text-[13px] font-medium text-slate-700 font-sans block mb-2">Max Applications / Day</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMaxApps(Math.max(1, maxApps - 1))}
                className="w-7 h-7 bg-slate-100 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors font-sans"
              >
                −
              </button>
              <span className="text-lg font-semibold text-slate-900 font-sans min-w-[48px] text-center">{maxApps}</span>
              <button
                onClick={() => setMaxApps(Math.min(50, maxApps + 1))}
                className="w-7 h-7 bg-slate-100 rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors font-sans"
              >
                +
              </button>
            </div>
          </div>

          {/* Minimum Salary */}
          <div className="mb-4">
            <label className="text-[13px] font-medium text-slate-700 font-sans block mb-2">Minimum Salary</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-sans">$</span>
              <input
                type="text"
                defaultValue="150,000"
                className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg pl-7 pr-3 text-sm text-right text-foreground font-sans focus:border-rose-400 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-4 relative">
            <label className="text-[13px] font-medium text-slate-700 font-sans block mb-2">Location</label>
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 flex items-center justify-between text-sm text-slate-700 font-sans hover:border-slate-300 transition-colors"
            >
              <span className="truncate">
                {selectedLocations.length > 0 ? selectedLocations.join(" + ") : "Select locations"}
              </span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${locationOpen ? "rotate-180" : ""}`} />
            </button>
            {locationOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 overflow-hidden">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => toggleLocation(loc)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-sans hover:bg-slate-50 transition-colors ${
                      selectedLocations.includes(loc) ? "bg-rose-50" : ""
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedLocations.includes(loc) ? "border-primary bg-primary" : "border-slate-300"
                    }`}>
                      {selectedLocations.includes(loc) && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                      )}
                    </div>
                    <span className="text-slate-700">{loc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Experience Level */}
          <div>
            <label className="text-[13px] font-medium text-slate-700 font-sans block mb-2">Experience Level</label>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => toggleLevel(level)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium font-sans border transition-all duration-200 ${
                    selectedLevels.includes(level)
                      ? "bg-rose-100 text-primary border-rose-200"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-rose-50 hover:text-primary"
                  }`}
                >
                  {level}
                  {selectedLevels.includes(level) && <X size={12} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 font-sans mb-3">
            Data Sources
          </p>
          <div className="divide-y divide-slate-100">
            {[
              { icon: <FileText size={16} className="text-primary" />, name: "John_Doe_Resume_2024.pdf", sub: "Last indexed: 2h ago", status: "Indexed", color: "green" },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, name: "linkedin.com/in/johndoe", sub: "Profile data synced", status: "Synced", color: "green" },
              { icon: <Mail size={16} className="text-red-500" />, name: "johndoe.careers@gmail.com", sub: "OAuth2 connected", status: "Connected", color: "green" },
              { icon: <Key size={16} className="text-amber-500" />, name: "Email Finder API", sub: "42 / 500 monthly credits used", status: "Active", color: "green" },
              { icon: <Folder size={16} className="text-amber-500" />, name: "Cover Letter Templates", sub: "5 documents synced", status: "Linked", color: "blue" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-slate-800 font-sans truncate">{item.name}</p>
                  <p className="text-[11px] text-slate-400 font-sans">{item.sub}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.color === "green" ? "bg-green-500" : "bg-blue-500"}`} />
                  <span className={`text-[11px] font-medium font-sans ${item.color === "green" ? "text-green-600" : "text-blue-600"}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 pt-0 space-y-2 flex-shrink-0">
        <button className="w-full h-11 bg-primary text-white rounded-lg text-sm font-semibold font-sans hover:bg-rose-700 hover:shadow-md transition-all">
          + New Campaign
        </button>
        <button className="w-full h-11 bg-transparent border border-slate-200 text-slate-600 rounded-lg text-sm font-medium font-sans hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
          <Settings size={16} />
          Settings
        </button>
      </div>
    </motion.aside>
  );
}
