"use client";

import Image from "next/image";
import { Team } from "../../utils/getTeams";

interface Props {
  team: Team;
}

export default function TeamCard({ team }: Props) {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
      {team.logo && (
        <Image
          src={team.logo}
          alt={team.name}
          width={128}
          height={128}
          className="w-32 h-32 object-contain mb-4"
        />
      )}
      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 text-center mb-1">
        {team.name}
      </h3>
      {team.code && (
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {team.code}
        </p>
      )}
      {team.venue?.name && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {team.venue.name}
        </p>
      )}
      {team.venue?.city && (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {team.venue.city}
        </p>
      )}
      {team.founded && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Founded: {team.founded}
        </p>
      )}
    </div>
  );
}