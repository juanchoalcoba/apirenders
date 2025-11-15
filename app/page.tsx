"use client";

import Link from "next/link";
import { Users, UserRound, Dog, Code, Footprints, Code2 } from "lucide-react";
import { RouteItem } from "./types/types";

const routes: RouteItem[] = [
  { href: "/users", label: "Ver Usuarios", icon: Users },
  { href: "/characters", label: "Ver Personajes", icon: UserRound },
  { href: "/pokemon", label: "Show Pokemons", icon: Dog },
  { href: "/dogs", label: "Show Dogs", icon: Dog },
  { href: "/league", label: "Leagues Football", icon: Footprints },
  { href: "/example-fetching", label: "Example Code", icon: Code },
  { href: "/tensorflow", label: "TensorFlowJsIA", icon: Code2 },
];

export default function Home() {
  return (
    <div className="min-h-screen rounded-2xl  w-full p-10 bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12 ">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          👋 Bienvenido a ApiRenders
        </h1>
        <p className="text-slate-300 mt-3 text-lg">
          Explora diferentes APIs con un diseño moderno y elegante 🚀
        </p>
      </div>

      {/* GRID DE TARJETAS */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-8 
          w-full 
          max-w-6xl
        "
      >
        {routes.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="
              group 
              bg-white/10 
              backdrop-blur-xl 
              border border-white/20 
              p-8 
              rounded-3xl 
              shadow-xl 
              hover:shadow-2xl 
              hover:bg-white/20 
              transition-all 
              flex 
              flex-col 
              items-center 
              text-center
            "
          >
            {/* Icono grande */}
            <div className="bg-white/20 p-5 rounded-2xl mb-5 group-hover:bg-white/30 transition">
              <Icon size={40} className="text-white" />
            </div>

            {/* Texto */}
            <h2 className="text-xl font-semibold text-white tracking-wide mb-1">
              {label}
            </h2>
            <p className="text-sm text-slate-300 opacity-80">
              Ir a la sección →
            </p>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <p className="text-xs text-slate-400 mt-14">
        Next.js • TypeScript • TailwindCSS
      </p>
    </div>
  );
}
