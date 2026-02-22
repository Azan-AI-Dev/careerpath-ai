import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { TopBar } from "@/components/TopBar";
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
        <div className="flex flex-col h-full w-full">
          <TopBar />
          <div className="flex flex-1 overflow-hidden">
            <LeftSidebar />
            <div className="flex-1 min-w-0">
              <CenterPanel />
            </div>
            <RightSidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
