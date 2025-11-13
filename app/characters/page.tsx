import CharacterList from "./components/CharacterList";
// 🔹 Importamos el componente CharacterList que se encargará de mostrar la lista de personajes

import { getCharacters } from "../utils/useCharacters";
import { ThemeToggle } from "./components/ThemeToogle";
import Link from "next/link";
import { ArrowLeft, Cat } from "lucide-react";

export default async function CharactersPage() {
  const characters = await getCharacters();
  // 🔹 Definimos un Server Component de Next.js que será async porque vamos a hacer fetch

  return (
    <section className="max-w-6xl mx-auto p-6 dark:text-white dark:bg-black">
      <div className="flex flex-col gap-y-4 md:gap-0 md:flex-row items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
            <Cat className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            Rick & Morty
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
      {/* 🔹 Título de la página */}
      <CharacterList characters={characters} />
      {/* 🔹 Renderizamos nuestro componente CharacterList y le pasamos los personajes filtrados */}
    </section>
  );
}
