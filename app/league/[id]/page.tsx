import TeamList from "../components/TeamList";
import { getTeams } from "@/app/utils/getTeams";
import Link from "next/link";

type LeagueParams = {
  id: string;
};

export default async function LeaguePage({ params }: { params: Promise<LeagueParams> }) {

  const { id } = await params; // ⬅️ más limpio
  const leagueId = parseInt(id);
  const currentSeason = 2023;

  const teams = await getTeams(leagueId, currentSeason);

  const leagueNames: Record<number, string> = {
    39: "Premier League",
    140: "La Liga",
    135: "Serie A",
    78: "Bundesliga",
    61: "Ligue 1",
    2: "UEFA Champions League",
    3: "UEFA Europa League",
    94: "Primeira Liga",
    88: "Eredivisie",
    203: "Süper Lig",
    268: "Primera División - Apertura",
    930: "Copa Uruguay",
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/league" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
        ← Back to Leagues
      </Link>

      <h1 className="text-4xl font-bold text-center mb-4">
        {leagueNames[leagueId] || `League ${leagueId}`} Teams
      </h1>

      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Season {currentSeason}</p>

      {teams.length > 0 ? (
        <TeamList teams={teams} />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No teams found for this league</p>
      )}
    </main>
  );
}
