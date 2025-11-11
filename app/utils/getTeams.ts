import { ApiTeamsResponse, Team } from "../types/types";

const BASE_URL = "https://v3.football.api-sports.io";



// 🔹 Función principal: obtiene los equipos de una liga y temporada
export async function getTeams(
  league: number,
  season: number
): Promise<Team[]> {
  const res = await fetch(`${BASE_URL}/teams?league=${league}&season=${season}`, {
    headers: {
      "x-apisports-key": process.env.NEXT_PUBLIC_FOOTBALL_API_TOKEN || "",
    },
    cache: "no-store", // fuerza datos frescos
  });

  if (!res.ok) {
    console.error("❌ Error en fetch de equipos:", res.status, res.statusText);
    throw new Error(`Error ${res.status}`);
  }

  const json: ApiTeamsResponse = await res.json();

  // 🔍 Debug temporal para ver qué responde la API
  console.log("📦 API response for league", league, ":", json.response?.length, "teams");

  return json.response.map((t) => ({
    id: t.team.id,
    name: t.team.name,
    code: t.team.code,
    country: t.team.country,
    founded: t.team.founded,
    logo: t.team.logo,
    venue: t.venue,
  }));
}

// 🔹 Wrapper rápido: trae equipos de la Premier League (para pruebas o demo)
export async function getTeamsSimple(): Promise<Team[]> {
  const defaultLeague = 39; // Premier League
  const defaultSeason = 2023; // Temporada actual
  return getTeams(defaultLeague, defaultSeason);
}
