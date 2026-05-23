"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
  { icon: "school", label: "Courses", path: "/courses" },
  { icon: "handyman", label: "Course Builder", path: "/course-builder" },
  { icon: "group", label: "Employees", path: "/employees" },
  { icon: "analytics", label: "Analytics", path: "/analytics" },
  { icon: "quiz", label: "Assessments", path: "/assessments" },
];

const BOTTOM_ITEMS = [
  { icon: "corporate_fare", label: "Company Settings", path: "/settings" },
  { icon: "contact_support", label: "Support", path: "/support" },
];

export function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed md:sticky top-0 left-0 h-screen w-64 bg-surface-container-low border-r border-outline-variant
          flex flex-col pt-4 pb-8 z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="px-lg pb-lg flex justify-between items-center">
          <div>
            <h1 className="text-headline-md font-headline font-bold text-primary tracking-tight">LXD Studio</h1>
            <p className="text-body-sm font-body text-on-surface-variant">Enterprise Training</p>
          </div>
          <button className="md:hidden text-on-surface-variant p-1" onClick={() => setIsOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-lg pb-md">
          <Link
            href="/course-builder"
            className="w-full bg-primary text-on-primary font-medium text-label-md py-sm px-md rounded-lg flex items-center justify-center gap-xs hover:bg-on-surface-variant transition-colors duration-150"
            onClick={() => setIsOpen(false)}
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Course
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto mt-sm flex flex-col gap-xs px-sm custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`nav-item ${isActive ? "nav-item-active" : ""}`}
              >
                <span className={`material-symbols-outlined text-[20px] ${!isActive ? "outlined" : ""}`}>
                  {item.icon}
                </span>
                <span className="text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="px-sm flex flex-col gap-xs pt-lg border-t border-outline-variant mt-auto">
          {BOTTOM_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`nav-item ${isActive ? "nav-item-active" : ""}`}
              >
                <span className={`material-symbols-outlined text-[20px] outlined`}>{item.icon}</span>
                <span className="text-label-md">{item.label}</span>
              </Link>
            );
          })}

          <Link
            href="/login"
            className="nav-item text-error/70 hover:text-error hover:bg-error-container/30 mt-xs"
          >
            <span className="material-symbols-outlined text-[20px] outlined">logout</span>
            <span className="text-label-md">Sign Out</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
