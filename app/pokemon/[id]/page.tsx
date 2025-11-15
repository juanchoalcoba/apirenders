// app/pokemon/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PokemonDetail } from "@/app/types/types";

// Función para obtener los detalles de un Pokémon específico
async function getPokemonById(id: string): Promise<PokemonDetail | null> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data: PokemonDetail = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    return null;
  }
}

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemonById(id);

  if (!pokemon) {
    return (
      <div className="text-center mt-12 text-gray-600 dark:text-gray-300">
        <p>No se encontró el Pokémon.</p>
        <Link
          href="/pokemon"
          className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>
    );
  }

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/pokemon"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la lista
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Imagen del Pokémon */}
        <div className="border border-black p-3 rounded-lg shadow-md dark:shadow-amber-50 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            width={300}
            height={300}
            className="rounded-lg object-contain hover:scale-110 transition-transform duration-700"
            priority
          />
        </div>

        {/* Información del Pokémon */}
        <div className="flex flex-col gap-3 max-w-lg w-full">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 capitalize">
            {pokemon.name}
          </h1>

          <p className="text-gray-600 dark:text-gray-300">
            <strong>N°:</strong> #{pokemon.id.toString().padStart(3, "0")}
          </p>

          {/* Tipos */}
          <div className="text-gray-600 dark:text-gray-300">
            <strong>Tipos:</strong>{" "}
            <span className="inline-flex gap-2 flex-wrap mt-1">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getTypeColor(
                    type.type.name
                  )}`}
                >
                  {type.type.name}
                </span>
              ))}
            </span>
          </div>

          {/* Altura y Peso */}
          <div className="grid grid-cols-2 gap-4">
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Altura:</strong> {(pokemon.height / 10).toFixed(1)} m
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg
            </p>
          </div>

          {/* Habilidades */}
          {pokemon.abilities && pokemon.abilities.length > 0 && (
            <div className="text-gray-600 dark:text-gray-300">
              <strong>Habilidades:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name} className="capitalize">
                    {ability.ability.name.replace("-", " ")}
                    {ability.is_hidden && (
                      <span className="text-xs text-purple-600 dark:text-purple-400 ml-2 font-semibold">
                        (Oculta)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Estadísticas */}
          {pokemon.stats && pokemon.stats.length > 0 && (
            <div className="text-gray-600 dark:text-gray-300 mt-4">
              <strong className="text-lg">Estadísticas Base:</strong>
              <div className="mt-3 space-y-3">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize font-medium">
                        {translateStatName(stat.stat.name)}
                      </span>
                      <span className="font-bold">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Función auxiliar para los colores de tipos
function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: "bg-gray-400 text-white",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    electric: "bg-yellow-400 text-gray-800",
    grass: "bg-green-500 text-white",
    ice: "bg-cyan-400 text-gray-800",
    fighting: "bg-red-700 text-white",
    poison: "bg-purple-500 text-white",
    ground: "bg-yellow-700 text-white",
    flying: "bg-indigo-400 text-white",
    psychic: "bg-pink-500 text-white",
    bug: "bg-lime-500 text-white",
    rock: "bg-yellow-800 text-white",
    ghost: "bg-purple-700 text-white",
    dragon: "bg-indigo-700 text-white",
    dark: "bg-gray-800 text-white",
    steel: "bg-gray-500 text-white",
    fairy: "bg-pink-300 text-gray-800",
  };

  return colors[type] || "bg-gray-300 text-gray-800";
}

// Función auxiliar para traducir nombres de stats
function translateStatName(name: string): string {
  const translations: Record<string, string> = {
    hp: "PS",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "At. Especial",
    "special-defense": "Def. Especial",
    speed: "Velocidad",
  };

  return translations[name] || name.replace("-", " ");
}