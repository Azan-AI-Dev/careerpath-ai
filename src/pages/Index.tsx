import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { LeftSidebar } from "@/components/LeftSidebar";
import { CenterPanel } from "@/components/CenterPanel";
import { RightSidebar } from "@/components/RightSidebar";

type AppState = "welcome" | "transitioning" | "workspace";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [firstMessage, setFirstMessage] = useState("");

  const handleWelcomeSubmit = useCallback((message: string) => {
    setFirstMessage(message);
    setAppState("transitioning");
    setTimeout(() => setAppState("workspace"), 1200);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {(appState === "welcome" || appState === "transitioning") && (
          <WelcomeScreen
            key="welcome"
            onSubmit={handleWelcomeSubmit}
            isExiting={appState === "transitioning"}
          />
        )}
      </AnimatePresence>

      {appState === "workspace" && (
        <div className="flex h-full w-full overflow-hidden">
          {/* Left Sidebar — 20% */}
          <div className="w-[20%] min-w-[220px] max-w-[280px] h-full flex-shrink-0">
            <LeftSidebar />
          </div>

          {/* Center Panel — 50% */}
          <div className="flex-1 h-full min-w-0">
            <CenterPanel />
          </div>

          {/* Right Sidebar — 30% */}
          <div className="w-[30%] min-w-[280px] max-w-[380px] h-full flex-shrink-0">
            <RightSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
