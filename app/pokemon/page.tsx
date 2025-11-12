import { getPokemon } from "../utils/getPokemon";
import PokemonList from "./components/PokemonList";
import { ThemeToggle } from "../characters/components/ThemeToogle";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";

export default async function Home() {
  const pokemons = await getPokemon(20);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-y-4 md:gap-0 md:flex-row items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            Pokemons
          </h1>
        </div>

        <div className="flex gap-12">
          <ThemeToggle />
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>

      <PokemonList pokemons={pokemons} />
    </main>
  );
}
