"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform`}
      >
        <div className="p-4 font-bold text-xl border-b">Admin Panel</div>

        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/polls/create"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            Create Poll
          </Link>

          <Link
            href="/admin/polls"
            className="block px-3 py-2 rounded hover:bg-gray-100"
          >
            Polls
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64">
        {/* TOP BAR (Mobile) */}
        <header className="md:hidden flex items-center justify-between bg-white border-b p-4">
          <button onClick={() => setOpen(true)} className="text-xl font-bold">
            ☰
          </button>
          <span className="font-semibold">Admin</span>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4">{children}</main>
      </div>

      {/* OVERLAY (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
