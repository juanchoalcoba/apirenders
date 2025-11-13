import Image from "next/image";
import { Pokemon } from "@/app/types/types";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  // Si la API te da una URL como:
  // "https://pokeapi.co/api/v2/pokemon/25/"
  const id = pokemon.url
    ? pokemon.url.split("/").filter(Boolean).pop()
    : pokemon.id;

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 hover:scale-105 transition-all">
      <Image
        src={imageUrl}
        alt={pokemon.name}
        width={120}
        height={120}
        priority
      />
      <p className="mt-2 font-semibold text-gray-800 dark:text-white capitalize">
        {pokemon.name}
      </p>
    </div>
  );
}
