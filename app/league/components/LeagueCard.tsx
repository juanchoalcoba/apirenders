"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { League } from "@/app/types/types";

interface Props {
  league: League;
}

export default function LeagueCard({ league }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/league/${league.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
    >
      {league.logo && (
        <Image
          src={league.logo}
          alt={league.name}
          width={128}
          height={128}
          className="w-32 h-32 object-contain mb-4"
        />
      )}
      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 text-center mb-2">
        {league.name}
      </h3>
      {league.flag && (
        <Image
          src={league.flag}
          alt={league.country}
          width={32}
          height={24}
          className="w-8 h-6 object-cover rounded mb-2"
        />
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        {league.country}
      </p>
      {league.currentSeason && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Season {league.currentSeason}
        </p>
      )}
    </div>
  );
}