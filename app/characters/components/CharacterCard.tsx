'use client'

import Image from 'next/image'
import { Character } from '@/app/types/types'

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <div
  className="
    group
    bg-white dark:bg-gradient-to-b from-gray-950 to-gray-800 
    text-neutral-900 dark:text-white
    border border-neutral-200 dark:border-neutral-800
    rounded-2xl
    shadow-md 
    p-4 sm:p-5

    flex 
    flex-col        /* mobile → columna */
    sm:flex-row     /* sm → fila */
    md:flex-col     /* md → vuelve a columna para no aplastar en 2 columnas */
    lg:flex-col     /* lg → columna clásica */

    items-center 
    justify-between
    gap-3
    
    transition-all duration-300
    hover:shadow-xl hover:scale-[1.03]
  "
>

      {/* Imagen */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md">
        <Image
          src={character.image}
          alt={character.name}
          width={160}
          height={160}
          className="
            object-cover w-full h-full 
            transition-transform duration-300 
            group-hover:scale-110
          "
        />
      </div>

      {/* Nombre */}
      <h3 className="
        font-bold 
        text-base sm:text-lg md:text-xl 
        text-center 
        tracking-tight
      ">
        {character.name}
      </h3>

      {/* Info */}
      <p className="
        text-xs sm:text-sm 
        opacity-80 
        text-center 
        leading-tight
      ">
        {character.species} • {character.status}
      </p>

      {/* Badge */}
      <span 
        className={`
          mt-1 px-3 py-1 
          text-xs font-semibold 
          rounded-full
          ${
            character.status === "Alive"
              ? "bg-green-500/20 dark:text-green-300 border  border-green-400/30"
              : character.status === "Dead"
              ? "bg-red-500/20 dark:text-red-300 border border-red-400/30"
              : "bg-gray-500/20 dark:text-gray-300 border border-gray-400/20"
          }
        `}
      >
        {character.status}
      </span>
    </div>
  )
}
