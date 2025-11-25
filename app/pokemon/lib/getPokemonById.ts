import { PokemonDetail } from "@/app/types/types";

// Función para obtener los detalles de un Pokémon específico
export async function getPokemonById(id: string): Promise<PokemonDetail | null> {
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