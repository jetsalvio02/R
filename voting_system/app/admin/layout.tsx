"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/admin" },
  { name: "Polls", href: "/admin/polls" },
  { name: "Create Poll", href: "/admin/polls/create" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex md:w-64 md:flex-col bg-white border-r">
        <div className="p-6 font-bold text-lg">Voting Admin</div>
        <nav className="space-y-1 px-4">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition
                ${
                  pathname === item.href
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <aside className="fixed inset-y-0 left-0 w-64 bg-white z-50 md:hidden shadow-lg">
            <div className="p-6 font-bold text-lg flex justify-between">
              Voting Admin
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <nav className="space-y-1 px-4">
              {menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition
                    ${
                      pathname === item.href
                        ? "bg-indigo-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* Topbar (Mobile) */}
        <header className="h-14 bg-white border-b flex items-center px-4 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="text-gray-700 text-xl font-bold"
          >
            ☰
          </button>
          <span className="ml-4 font-semibold">Admin</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
