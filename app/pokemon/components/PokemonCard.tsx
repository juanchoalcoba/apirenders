import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "@/app/types/types";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  const id = pokemon.url
    ? pokemon.url.split("/").filter(Boolean).pop()
    : pokemon.id;

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link
      href={`/pokemon/${id}`}
      className="flex flex-col items-center bg-white dark:bg-gradient-to-b from-gray-950 to-gray-800 shadow-md rounded-xl p-4 hover:scale-105 transition-all cursor-pointer focus-visible:ring-4 focus-visible:ring-blue-500/50 outline-none"
    >
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
    </Link>
  );
}