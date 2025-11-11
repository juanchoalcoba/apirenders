import { League } from "@/app/utils/getLeagues";
import LeagueCard from "./LeagueCard";

interface Props {
  leagues: League[];
}

export default function LeagueList({ leagues }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
      {leagues.map(league => (
        <LeagueCard key={league.id} league={league} />
      ))}
    </div>
  );
}