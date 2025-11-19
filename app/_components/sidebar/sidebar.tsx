// app/_components/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiLayout,
  FiCalendar,
  FiList,
  FiUser,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiBell,
} from "react-icons/fi";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: "/board", label: "Board", icon: FiLayout },
  { href: "/tasks", label: "My Tasks", icon: FiList },
  { href: "/calendar", label: "Calendar", icon: FiCalendar },
  { href: "/settings", label: "Settings", icon: FiSettings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`relative flex flex-col bg-white shadow-sm border-r border-neutral-100 transition-[width] duration-200 ease-out
      ${expanded ? "w-60" : "w-20"}`}
    >
      {/* Top brand */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-8 rounded-2xl bg-black flex items-center justify-center text-white font-bold text-sm">
            T
          </div>
          <span
            className={`font-semibold text-sm text-neutral-900 transition-opacity duration-150 ${
              expanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            ToDo Board
          </span>
        </div>

        {expanded && (
          <button
            type="button"
            className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500"
          >
            <FiBell className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 pt-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (pathname === "/" && item.href === "/board"); // treat "/" as Board

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-full px-3 py-2 text-sm transition-colors
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span
                className={`whitespace-nowrap transition-opacity duration-150 ${
                  expanded ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom chevron toggle */}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-3 text-xs text-neutral-500 hover:bg-neutral-50 border-t border-neutral-100"
      >
        <div className="h-6 w-6 rounded-full border border-neutral-300 flex items-center justify-center">
          {expanded ? (
            <FiChevronLeft className="h-4 w-4" />
          ) : (
            <FiChevronRight className="h-4 w-4" />
          )}
        </div>
        <span
          className={`transition-opacity duration-150 ${
            expanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {expanded ? "My ToDo Board" : ""}
        </span>
      </button>
    </aside>
  );
}
