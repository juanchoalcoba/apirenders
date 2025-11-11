import CharacterList from "./components/CharacterList";
// 🔹 Importamos el componente CharacterList que se encargará de mostrar la lista de personajes

import { getCharacters } from "../utils/useCharacters";
import { ThemeToggle } from "./components/ThemeToogle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CharactersPage() {
  const characters = await getCharacters();
  // 🔹 Definimos un Server Component de Next.js que será async porque vamos a hacer fetch

  return (
    <section className="max-w-6xl mx-auto p-6 dark:text-white dark:bg-black">
      <div className="flex  justify-between items-center">
        {/* 🔹 Contenedor principal centrado con padding */}
        <h1 className="text-3xl font-bold mb-6">
          Personajes de Rick and Morty
        </h1>

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
