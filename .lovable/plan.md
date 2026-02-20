
## CareerAgent — Multi-Agent Job-Seeking Assistant UI

A stunning, light-mode-only, 3-column frontend UI that looks and feels like a premium AI product. Built with React + Tailwind CSS + Framer Motion. No backend required now — all data is hardcoded and architected so real API calls can be swapped in later.

---

### 🎨 Design System Setup
- Import `DM Sans` and `Libre Baskerville` from Google Fonts via `index.html`
- Extend Tailwind config with a `rose` accent palette and custom shadow tokens
- Set the global background to pure white, body font to `DM Sans`
- All component depth achieved via soft shadows and spacing — zero harsh black borders

---

### 🗂️ Left Sidebar — "Control Tower" (20% width)
- **Brand header:** "CareerAgent" in `Libre Baskerville`, with a rose-red dot/accent
- **Budget & Constraints section:** Three sliders with numeric readouts:
  - Max API Spend (e.g. $12.50 / $50.00)
  - Job Search Radius (e.g. 25 miles)
  - Min Expected Salary (e.g. $120,000)
- **Knowledge Base section:** Shows connected sources with status badges:
  - ✅ Google Drive — "Resumes" folder linked
  - ✅ Base_CV.pdf — Uploaded (3 days ago)
  - ➕ "Connect Source" button (outlined, subtle)
- Light gray `#F9FAFB` background, right-side border separator

---

### 💬 Center Panel — "Human-Agent Interaction" (50% width)
- **Top bar:** Pill-shaped goal status chip — "🎯 Goal: Secure Sr. Frontend Role" with a subtle rose badge
- **Chat feed** (scrollable):
  1. **User bubble** — Right-aligned, clean white card: *"Find me React developer roles in New York and apply to the best matches."*
  2. **Agent response** — Left-aligned: Text intro + **3 Job Cards** rendered as beautiful horizontal cards with:
     - Company logo placeholder, job title, company, location, salary
     - A circular "Match Score" ring in rose-red (92%, 88%, 79%)
  3. **Agent action message** — "I have tailored your CV for Google — Sr. UI Engineer. Hiring Manager found: sarah.hr@google.com"
  4. **HitL Block (Human-in-the-Loop):** An elevated inline card with:
     - A scrollable full document viewer showing the tailored CV (realistic bullet points, sections)
     - Below the CV, a rendered Cover Letter preview
     - Primary rose-red CTA: **"Approve & Send Email via Gmail"**
     - Secondary: **"Edit CV"** (outlined button)
- **Input box** (anchored bottom): Floating, soft-rounded rectangle, slight shadow elevation. Paperclip icon left, rose-red arrow/send button right. Placeholder: *"Give me a new goal, or ask me anything..."*

---

### 🧠 Right Sidebar — "Agent Observability / Think Aloud" (30% width)
- **Always visible** — pure white background, inner cards slightly elevated
- **Header:** "Agent Brain" title with a pulsing green "LIVE" dot
- **Timeline feed:** Logs animate in one-by-one with a staggered Framer Motion reveal on page load (simulating a live feed), then a cursor-blinking effect on the last active log:
  - `[09:41:02] 🟢 Orchestrator:` Received objective. Decomposing tasks...
  - `[09:41:05] 🔄 JobScraper Agent:` Connecting to LinkedIn API... [Fetched 43 listings]
  - `[09:41:12] 🧠 Evaluator Agent:` Running vector similarity match: JD vs Base_CV
  - `[09:41:18] ✍️ ResumeTailor Agent:` Modified bullet points for Next.js; generated Google_CV_Tailored.pdf
  - `[09:41:25] 🔍 OSINT Agent:` Scraped Google HR contact → sarah.hr@google.com
  - `[09:41:26] ⏸️ HandOff:` **PAUSED** — Awaiting Human-in-the-Loop approval (rose-red highlighted status pill)
- Each log entry is a subtle card with timestamp, agent icon, message, and a colored status dot

---

### ✨ Micro-interactions & Polish
- Chat bubbles fade+slide in with Framer Motion on mount
- Job Match Score rings animate from 0 to value on load
- Observability logs stagger in with a 400ms delay between each
- Sidebar sliders have smooth thumb drag animations
- All buttons have `scale(1.01)` hover + color transition
- "Approve & Send" button has a subtle shimmer/pulse to draw attention
