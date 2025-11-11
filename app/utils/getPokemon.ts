import { Pokemon } from "../types/types";

export async function getPokemon(limit: number = 20): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);

  if (!res.ok) {
    throw new Error(`Error ${res.status}: al obtener los Pokémon`);
  }

  const data = await res.json();

    return Array.isArray(data.results) ? data.results : [];

}
