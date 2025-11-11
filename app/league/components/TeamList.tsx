import { Team } from "../../utils/getTeams";
import TeamCard from "./TeamCard";

interface Props {
  teams: Team[];
}

export default function TeamList({ teams }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {teams.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}