

### SETUP ###
- clean up
- test everything
- add the package manager

### SETUP DB ###
- install mongoose & mongodb
- setup the cluster
- add the db function 
- add the model


### LAYOUT ###
- setup route grouping
- add the layout style
- add the sidebar & header component
- bring in the components and setup the layout










```
<div className="max-w-4xl mx-auto py-10 space-y-8">
      {/* AUTH HEADER */}
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Board</h1>
        hiii
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Logged in as{" "}
              <span className="font-medium">{user.email}</span>
            </span>
            <SignOutButton />
          </div>
        ) : (
          <div>
            <SignInWithGoogleButton />
          </div>
        )}
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      </header>

      {/* CREATE COLUMN */}
      <section className="p-4 border rounded space-y-3">
        <h2 className="font-semibold">Add Column</h2>
        <form action={createColumn} className="flex gap-2 flex-wrap">
          <input
            name="title"
            placeholder="Column title"
            className="border p-2 rounded flex-1 min-w-[150px]"
            required
          />
          <input
            name="position"
            type="number"
            placeholder="Position"
            className="border p-2 rounded w-28"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </form>
      </section>

      {/* COLUMNS + TASKS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col: any) => (
          <div key={col._id} className="border rounded p-3 space-y-3">
            {/* HEADER + DELETE COLUMN */}
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">{col.title}</h2>

              <form action={deleteColumn}>
                <input type="hidden" name="id" value={col._id} />
                <button
                  type="submit"
                  className="text-xs text-red-600 underline"
                >
                  Delete
                </button>
              </form>
            </div>

            {/* UPDATE COLUMN */}
            <form action={updateColumn} className="space-y-2">
              <input type="hidden" name="id" value={col._id} />

              <div className="flex items-center justify-between gap-2">
                <input
                  name="title"
                  defaultValue={col.title}
                  className="border px-2 py-1 rounded text-xs flex-1"
                  required
                />
                <input
                  name="position"
                  type="number"
                  defaultValue={col.position}
                  className="border px-2 py-1 rounded w-16 text-xs"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white text-xs py-1.5 rounded"
              >
                Save Column
              </button>
            </form>

            {/* TASK LIST WITH UPDATE + DELETE */}
            <div className="space-y-2">
              {tasksForColumn(col._id).map((task: any) => (
                <div
                  key={task._id}
                  className="border rounded p-2 bg-gray-50 space-y-1"
                >
                  {/* UPDATE TASK */}
                  <form action={updateTask} className="flex gap-2">
                    <input type="hidden" name="id" value={task._id} />
                    <input
                      name="title"
                      defaultValue={task.title}
                      className="border px-2 py-1 rounded text-xs flex-1"
                      required
                    />
                    <button
                      type="submit"
                      className="text-xs bg-black text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  </form>

                  {/* DELETE TASK */}
                  <form action={deleteTask} className="flex justify-end">
                    <input type="hidden" name="id" value={task._id} />
                    <button
                      type="submit"
                      className="text-[11px] text-red-600 underline"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              ))}

              {tasksForColumn(col._id).length === 0 && (
                <p className="text-xs text-gray-400">No tasks yet</p>
              )}
            </div>

            {/* ADD TASK TO THIS COLUMN */}
            <form action={createTask} className="space-y-2">
              <input type="hidden" name="columnId" value={col._id} />
              <input
                name="title"
                placeholder="New task..."
                className="border p-2 rounded w-full text-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-black text-white text-sm py-1.5 rounded"
              >
                Add Task
              </button>
            </form>
          </div>
        ))}
      </section>
    </div>

```

### DESIGNED BOARD ###

```
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiLayout,
  FiCalendar,
  FiList,
  FiUser,
  FiBell,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
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
  { href: "/team", label: "Team", icon: FiUser },
  { href: "/settings", label: "Settings", icon: FiSettings },
];

function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`relative flex flex-col bg-white shadow-sm border-r border-neutral-200 transition-[width] duration-200 ease-out
      ${expanded ? "w-60" : "w-20"}`}
    >
      {/* Top brand / logo area */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="h-8 w-8 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
            B
          </div>
          <span
            className={`font-semibold text-sm text-neutral-900 transition-opacity duration-150 ${
              expanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            Bordio Clone
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
            (pathname === "/" && item.href === "/board"); // treat "/" as board

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
          {expanded ? "Collapse sidebar" : ""}
        </span>
      </button>
    </aside>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-sky-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (like Bordio top controls) */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center px-6">
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              + Add new
            </button>

            <div className="flex items-center gap-2 text-sm">
              <button className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700">
                Table view
              </button>
              <button className="px-3 py-1.5 rounded-full bg-neutral-900 text-white">
                Kanban board
              </button>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3 text-sm text-neutral-500">
            <button className="px-3 py-1.5 rounded-full hover:bg-neutral-100">
              Group
            </button>
            <button className="px-3 py-1.5 rounded-full hover:bg-neutral-100">
              Filter
            </button>
            {/* Fake avatar group */}
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full bg-pink-400 border-2 border-white" />
              <div className="h-7 w-7 rounded-full bg-yellow-400 border-2 border-white" />
              <div className="h-7 w-7 rounded-full bg-blue-400 border-2 border-white" />
              <div className="h-7 w-7 rounded-full bg-neutral-300 border-2 border-white flex items-center justify-center text-[10px]">
                +3
              </div>
            </div>
          </div>
        </header>

        {/* Main content placeholder */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="h-full rounded-3xl bg-white border border-dashed border-neutral-200 flex items-center justify-center text-neutral-400 text-sm">
            Kanban board will go here 🚀
          </div>
        </main>
      </div>
    </div>
  );
}


```


🎨 Gray Option B — Neutral & Balanced (Vercel-style)
(Flatter, more neutral, less blue; super clean for SaaS dashboards)
Neutral-900 → #171717
Neutral-700 → #404040
Neutral-500 → #737373
Neutral-300 → #D4D4D4
Neutral-200 → #E5E5E5
Neutral-100 → #F5F5F5
Neutral-50 → #FAFAFA
Best Accent:
👉 #404040 (Vercel dark-gray vibe)
🎨 Gray Option C — Warm Stone Gray (Figma-style)
(Slightly warm / beige tone; softer aesthetic)
Stone-900 → #1C1917
Stone-700 → #44403C
Stone-500 → #78716C
Stone-300 → #D6D3D1
Stone-100 → #F5F5F4
Stone-50 → #FAFAF9
Best Accent:
👉 #44403C (warm, elegant)
⭐ My Recommendation for Your Bordio Clone
Based on the screenshot you sent, Bordio uses cool grays rather than warm or neutral.
So the best match is:
Primary Accent Gray (Use for Active Nav, Buttons, Highlights)
👉 #374151 (Tailwind gray-700)
Background Gray
👉 #F3F4F6 (Tailwind gray-100)
Card Background Gray
👉 #F9FAFB (Tailwind gray-50)
Border Gray
👉 #E5E7EB (Tailwind gray-200)



```
import { FiLogOut } from "react-icons/fi";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    try {
      setLoading(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onLogout}
      disabled={loading}
      style={{
        backgroundColor: "#FFFFFF",
        color: "#111111",
        border: "1px solid #D6D6D6",
        padding: "8px 14px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 500,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!loading) e.currentTarget.style.backgroundColor = "#F3F3F3";
      }}
      onMouseLeave={(e) => {
        if (!loading) e.currentTarget.style.backgroundColor = "#FFFFFF";
      }}
    >
      <FiLogOut size={18} />

      {loading ? "Signing out..." : "Log out"}
    </button>
  );
}

```