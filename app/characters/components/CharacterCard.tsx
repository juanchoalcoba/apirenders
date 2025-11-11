'use client'

import Image from 'next/image'
import { Character } from '@/app/types/types'

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="
    dark:bg-black
    dark:bg-text-white
      border 
      rounded-lg 
      overflow-hidden 
      shadow-md 
      flex flex-col items-center p-4 
      bg-white 
      transform transition-transform duration-300 
      hover:scale-105 hover:shadow-xl 
      dark:hover:text-white
      
      dark:text-white
    ">
      <div className="w-32 h-32 mb-2 overflow-hidden rounded-full">
        <Image
          src={character.image}
          alt={character.name}
          width={128}
          height={128}
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="font-bold text-lg transition-colors duration-300 ">{character.name}</h3>
      <p className="text-sm ">{character.species} - {character.status}</p>
    </div>
  )
}
