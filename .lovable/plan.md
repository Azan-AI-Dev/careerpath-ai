

## Phase 1: Welcome Screen and State Machine

This phase replaces the current direct-to-workspace layout with a beautiful welcome screen that transitions into the workspace when the user submits their first message.

---

### Overview

The app will use a state machine (`welcome` -> `transitioning` -> `workspace`) managed in the Index page. On first load, users see a full-screen welcome screen with animated branding, a central input box, and suggestion pills. On submit, everything animates out and the existing 3-column workspace appears.

---

### Changes

**1. Update `index.html`**
- Add JetBrains Mono to the Google Fonts link (alongside existing DM Sans and Libre Baskerville)

**2. Update `tailwind.config.ts`**
- Add `fontFamily` config: sans (DM Sans), serif (Libre Baskerville), mono (JetBrains Mono)
- Add custom `boxShadow`: `float` and `glow-rose`
- Add custom `animation`/`keyframes`: `float`, `drift`, `drift-reverse`

**3. Update `src/index.css`**
- Add custom scrollbar styles (thin 5px, slate-colored thumb)
- Add `::selection` style (rose-tinted)
- Add `@keyframes drift` and `drift-reverse` for ambient blobs
- Remove focus outlines globally (custom ones used instead)

**4. Create `src/components/WelcomeScreen.tsx`** (new file)
The main welcome screen component containing:
- **Ambient blobs**: Two large, faint, blurred circles (rose-50 and slate-100) with drift animations
- **Floating brand logo**: "CareerAgent" in Libre Baskerville, "Career" black + "Agent" rose-600, with continuous float animation and subtitle "AI-POWERED JOB ASSISTANT"
- **Greeting text**: "What role are you chasing today?" with word-by-word stagger animation (blur + fade + slide)
- **Subtitle**: Descriptive text fading in after greeting
- **Central input box**: 680px wide, 64px tall, rounded-[20px], with shadow-float, paperclip icon, rose-600 circular submit button. Has `layoutId="main-input"` for future Phase 2 shared layout animation. Auto-focuses after animations complete
- **Suggestion pills**: 4 clickable pills that fill the input and auto-submit on click, with staggered entry animation
- **Footer**: "Powered by LangGraph . LangSmith . OpenAI" pinned to bottom

Props: `onSubmit(message: string)` callback

**5. Update `src/pages/Index.tsx`**
- Add state machine: `appState` (`welcome` | `transitioning` | `workspace`), `firstMessage`
- When `appState === 'welcome'`: render `<WelcomeScreen onSubmit={...} />`
- On submit: store message, set state to `transitioning`, trigger exit animations, then after 1200ms set state to `workspace`
- When `appState === 'transitioning'`: render the welcome screen with exit animations (elements fade/blur out in reverse stagger order, input box remains)
- When `appState === 'workspace'`: render the existing 3-column layout (LeftSidebar, CenterPanel, RightSidebar)

---

### Technical Details

- All animations use framer-motion (`motion.div` with `initial`, `animate`, `exit` variants and `AnimatePresence`)
- The input box uses `layoutId="main-input"` so it can be animated to the workspace position in Phase 2
- Suggestion pill click: sets input value to pill text (minus emoji), then calls the submit handler
- Submit button disabled state: `bg-slate-100` with `slate-300` icon when input is empty
- Focus-within state on input container: `border-rose-500` + `ring` glow effect
- No dark mode classes anywhere
- All colors strictly from the approved palette

