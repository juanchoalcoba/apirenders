// lib/useCharacters.ts
import { Character, ApiResponse } from "../types/types";

export async function getCharacters(): Promise<Character[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "no-store",
  });

  const data: ApiResponse = await res.json();

  const characters: Character[] = data.results.map((c) => ({
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    image: c.image,
    origin: c.origin,
    location: c.location,
  }));

  return characters;
}
