"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Users, UserRound, Menu, Bubbles, Dog, Code, Volleyball } from "lucide-react";
import { usePathname } from "next/navigation";
import { RouteItem } from "../types/types";

const navItems: RouteItem[] = [
  { href: "/users", label: "Users", icon: Users },
  { href: "/characters", label: "Characters", icon: UserRound },
  { href: "/pokemon", label: "Pokémon", icon: Bubbles },
  { href: "/dogs", label: "DogsApi", icon: Dog },
  { href: "/league", label: "Teams", icon: Volleyball },
  { href: "/example-fetching", label: "Example", icon: Code },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.setAttribute("data-sidebar-collapsed", collapsed.toString());
  }, [collapsed]);

  return (
    <>
      {/* ✅ Sidebar para pantallas grandes */}
      <aside
        className={`hidden md:flex fixed top-0 left-0 h-screen flex-col dark:text-white dark:bg-black border-r border-gray-200 transition-all duration-300
        ${collapsed ? "w-20" : "w-56"}`}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h2 className="text-lg font-bold">Panel</h2>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded cursor-pointer"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                  transition-colors hover:bg-gray-100 hover:text-black ${
                    active ? "bg-gray-200 text-gray-900" : "dark:text-white"
                  }`}
              >
                <Icon size={20} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ✅ Barra inferior para móviles */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black dark:bg-black border-t border-gray-800 flex justify-around py-2 z-50">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center text-xs ${
                active ? "text-blue-400" : "text-gray-400"
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px]">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
