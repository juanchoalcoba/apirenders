"use client";

import Image from "next/image";
import { Pokemon } from "@/app/types/types";

interface Props {
  pokemon: Pokemon;
  index: number;
}

export default function PokemonCard({ pokemon, index }: Props) {
  const id = index + 1;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="flex flex-col items-center bg-white border  dark:border-white  dark:bg-gray-950 shadow-md hover:shadow-lg transition rounded-xl p-4 cursor-pointer">
      <Image
        src={imageUrl}
        alt={pokemon.name}
        width={96}
        height={96}
        className="mb-2 hover:scale-125 transition-all"
      />
      <p className="capitalize font-semibold text-gray-700 dark:text-gray-200">
        {pokemon.name}
      </p>
    </div>
  );
}
