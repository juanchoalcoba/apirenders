"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ Esperamos a que el componente esté montado (cliente)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Evita renderizar nada hasta que el tema esté disponible
    return null;
  }

  return (
    <button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="
    p-2 rounded-full cursor-pointer transition-colors 
    bg-gray-200 text-black              /* modo claro */
    dark:bg-gray-100 dark:text-white    /* modo oscuro */
  "
>

      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-700" />
      ) : (
        <Moon className="w-5 h-5 text-gray-900" />
      )}
    </button>
  );
}
