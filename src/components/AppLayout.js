"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-background h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col w-full h-full overflow-hidden transition-all duration-300">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop bg-background custom-scrollbar relative">
          <div className="max-w-[1440px] mx-auto page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
