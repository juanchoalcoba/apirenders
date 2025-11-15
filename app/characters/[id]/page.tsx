// app/characters/[id]/page.tsx
import { getCharacters } from "@/app/utils/useCharacters";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const allCharacters = await getCharacters();
  const character = allCharacters.find((c) => c.id.toString() === id);

  if (!character) {
    return (
      <div className="text-center mt-12 text-gray-600 dark:text-gray-300">
        <p>No se encontró el personaje.</p>
        <Link
          href="/characters"
          className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/characters"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la lista
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="border border-black p-3 rounded-lg shadow-md dark:shadow-amber-50">
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="rounded-lg shadow-md object-cover hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="flex flex-col gap-3 max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            {character.name}
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Estado:</strong>{" "}
            <span
              className={`inline-block px-2 py-1 rounded text-sm ${
                character.status === "Alive"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : character.status === "Dead"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {character.status}
            </span>
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Especie:</strong> {character.species}
          </p>

          {character.type && character.type !== "" && (
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Tipo:</strong> {character.type}
            </p>
          )}

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Género:</strong> {character.gender}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Origen:</strong> {character.origin.name}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>Ubicación:</strong> {character.location.name}
          </p>

          {character.episode && character.episode.length > 0 && (
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Episodios:</strong> {character.episode.length}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}