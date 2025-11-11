"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full cursor-pointer dark:text-white dark:bg-gray-100  transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-700" />
      ) : (
        <Moon className="w-5 h-5 dark:text-gray-900  tex-white" />
      )}
    </button>
  );
}
