"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/courses": "Courses",
  "/course-builder": "Course Builder",
  "/employees": "Employees",
  "/analytics": "Analytics",
  "/assessments": "Assessments",
  "/settings": "Company Settings",
  "/support": "Support",
};

export function Topbar({ onMenuClick }) {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "LXD Studio";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 bg-surface border-b border-outline-variant">
      <div className="flex items-center gap-lg">
        <button
          onClick={onMenuClick}
          className="md:hidden text-on-surface-variant p-sm rounded-lg hover:bg-surface-container-high transition-colors duration-150"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="hidden md:flex items-center">
          <h2 className="text-headline-sm font-headline font-bold text-primary tracking-tight">{title}</h2>
        </div>
      </div>

      <div className="flex-1 max-w-[28rem] mx-lg hidden sm:block">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search courses, employees..."
            className="w-full pl-xl pr-sm py-sm rounded-lg border border-outline-variant bg-surface-bright focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/20 text-body-md text-on-surface placeholder:text-on-surface-variant outline-none transition-all duration-150"
          />
        </div>
      </div>

      <div className="flex items-center gap-sm">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="btn-icon hidden sm:block"
            title="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined outlined">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
        )}
        <button className="btn-icon relative" title="Notifications">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-xs right-xs w-2 h-2 bg-error rounded-full animate-pulse-dot"></span>
        </button>
        <button className="btn-icon hidden sm:block" title="Settings">
          <span className="material-symbols-outlined outlined">settings</span>
        </button>
        <div className="ml-sm w-8 h-8 rounded-full bg-secondary-container overflow-hidden border border-outline-variant cursor-pointer flex items-center justify-center">
          <span className="text-label-sm font-bold text-on-secondary-container">YA</span>
        </div>
      </div>
    </header>
  );
}
