import { ApiLeaguesResponse, League } from "../types/types";

const BASE_URL = "https://v3.football.api-sports.io";


// Obtener todas las ligas
export async function getLeagues(): Promise<League[]> {
  const res = await fetch(`${BASE_URL}/leagues`, {
    headers: {
      "x-apisports-key": process.env.NEXT_PUBLIC_FOOTBALL_API_TOKEN || "",
      "X-RapidAPI-Host": "v3.football.api-sports.io",
    },
  });

  if (!res.ok) throw new Error(`Error ${res.status}`);
  const json: ApiLeaguesResponse = await res.json();

  return json.response.map(l => ({
    id: l.league.id,
    name: l.league.name,
    type: l.league.type,
    logo: l.league.logo,
    country: l.country.name,
    countryCode: l.country.code,
    flag: l.country.flag,
    currentSeason: l.seasons.find(s => s.current)?.year,
  }));
}

// Obtener ligas principales predefinidas
export async function getMainLeagues(): Promise<League[]> {
  // IDs de las ligas más populares
  const mainLeagueIds = [
    39,  // Premier League
    140, // La Liga
    135, // Serie A
    78,  // Bundesliga
    61,  // Ligue 1
    2,   // UEFA Champions League
    3,   // UEFA Europa League
    94,  // Primeira Liga
    88,  // Eredivisie
    203, // Süper Lig
    268,
    930
  ];

  const allLeagues = await getLeagues();
  return allLeagues.filter(league => mainLeagueIds.includes(league.id));
}