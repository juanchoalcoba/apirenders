"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        p-2 rounded-full cursor-pointer transition-colors
        bg-gray-200 text-black
        dark:bg-gray-100 dark:text-white
      "
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-inherit" />
      ) : (
        <Moon className="w-5 h-5 text-inherit" />
      )}
    </button>
  );
}
