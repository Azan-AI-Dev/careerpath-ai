import { LeftSidebar } from "@/components/LeftSidebar";
import { CenterPanel } from "@/components/CenterPanel";
import { RightSidebar } from "@/components/RightSidebar";

const Index = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
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
  );
};

export default Index;
