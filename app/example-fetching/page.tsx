"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../characters/components/ThemeToogle";
import AnimatedCode from "./components/AnimatedCode";
import { codeExamples } from "../data/fetchExamples";
import { cn } from "../lib/utils";

const CODE_OPTIONS = [
  { key: "next", label: "Next.js" },
  { key: "react", label: "React.js" },
] as const;

type CodeOption = (typeof CODE_OPTIONS)[number]["key"];

export default function ExampleFetchingPage() {
  const [selected, setSelected] = useState<CodeOption>("next");

  return (
    <main className="min-h-screen rounded-3xl bg-linear-to-b from-gray-950 to-gray-800 text-white flex flex-col items-center justify-center px-6 py-16">
      {/* Header */}
      <div className="flex justify-center md:justify-end w-full gap-x-12 pb-12 pr-12 items-center">
        <ThemeToggle />
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-5xl font-extrabold mb-8 text-center">
        🚀 Ejemplo de Fetching en Next.js y React
      </h1>

      <p className="text-lg text-gray-300 text-center max-w-2xl mb-8">
        Elegí el ejemplo que querés ver animado 👇
      </p>

      {/* Toggle buttons */}
      <div className="flex gap-4 mb-12">
        {CODE_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={cn(
              "px-4 py-2 rounded-lg cursor-pointer font-medium transition-colors",
              selected === key
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Code viewer */}
      <div className="w-full max-w-3xl transition-all duration-500">
        <AnimatedCode code={codeExamples[selected]} />
      </div>
    </main>
  );
}
