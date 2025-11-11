"use client";

import { useState, useMemo } from "react";
import { Character } from "@/app/types/types";
import CharacterCard from "./CharacterCard";
import FilterBar from "./FilterBar";

interface CharacterListProps {
  characters: Character[];
  itemsPerPage?: number;
}

export default function CharacterList({
  characters,
  itemsPerPage = 8,
}: CharacterListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  // 🔹 Filtrado
  const filtered = useMemo(() => {
    return characters.filter((c) =>
      c.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [characters, filter]);

  // 🔹 Paginación
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div>
      <FilterBar onFilter={setFilter} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {paginated.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="
    p-2 
    bg-blue-900 
    text-white 
    rounded 
    cursor-pointer 
    disabled:bg-gray-600 
    disabled:cursor-not-allowed 
    disabled:opacity-70 
    transition-colors
    hover:bg-blue-800
  "
        >
          Anterior
        </button>

        <span className="self-center font-medium">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="
    p-2 
    bg-blue-900 
    text-white 
    rounded 
    cursor-pointer 
    disabled:bg-gray-600 
    disabled:cursor-not-allowed 
    disabled:opacity-70 
    transition-colors
    hover:bg-blue-800
  "
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
