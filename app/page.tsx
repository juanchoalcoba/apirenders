import Link from "next/link";
import { Users, UserRound, Dog, Code, Footprints } from "lucide-react";
import { RouteItem } from "./types/types";



const routes: RouteItem[] = [
  { href: "/users", label: "Ver Usuarios", icon: Users },
  { href: "/characters", label: "Ver Personajes", icon: UserRound },
  { href: "/pokemon", label: "Show Pokemons", icon: Dog },
  { href: "/dogs", label: "Show Dogs", icon: Dog },
  { href: "/league", label: "Leagues Football", icon: Footprints },
  { href: "/example-fetching", label: "Example Code", icon: Code },
];

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <main className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-lg rounded-2xl p-10 flex flex-col items-center gap-8 w-full max-w-md transition-all">
        {/* Título principal */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            👋 Bienvenido a ApiRenders
          </h1>
          <p className="text-gray-600">
            Demuestra tus habilidades con un fetching de datos moderno 🚀
          </p>
        </div>

        {/* Links a rutas - generados dinámicamente */}
        <div className="flex flex-col gap-4 w-full">
          {routes.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-all shadow-md hover:shadow-lg"
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
        {/* Footer mini */}
        <p className="text-xs text-gray-500 mt-4">
          Next.js + TypeScript + TailwindCSS
        </p>
      </main>
    </div>
  );
}
