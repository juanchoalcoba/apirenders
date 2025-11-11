import { getPokemon } from "../utils/getPokemon";
import PokemonList from "./components/PokemonList";
import { ThemeToggle } from "../characters/components/ThemeToogle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function Home() {
  const pokemons = await getPokemon(20);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center gap-12">
        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>

        <div className="flex  gap-12">
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
