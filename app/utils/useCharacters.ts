// lib/useCharacters.ts
import { Character, ApiResponse } from "../types/types";

export async function getCharacters(): Promise<Character[]> {
  // 🔹 Fetch desde la API de Rick and Morty
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "no-store", // 🔹 Siempre datos frescos
  });

  const data: ApiResponse = await res.json();
  console.log(data.results);
  // 🔹 Tipamos la respuesta completa para TS

  // 🔹 Transformamos la respuesta a nuestro Character simplificado
  const characters: Character[] = data.results.map(
    (c) =>
      ({
        ...c,
      } as Character)
  );

  return characters; // 🔹 Retornamos solo los datos que necesitamos
}
