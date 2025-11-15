"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
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
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState(query);

  // 🔹 Debounce del filtro
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(query);
      setPage(1);
    }, 400);
    return () => clearTimeout(id);
  }, [query]);

  // 🔹 Filtrado + paginación
  const filtered = useMemo(
    () =>
      characters.filter((c) =>
        c.name.toLowerCase().includes(debounced.toLowerCase())
      ),
    [characters, debounced]
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // 🔹 Handlers
  const handleFilter = useCallback((v: string) => setQuery(v), []);
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  // 🔹 Render
  return (
    <div className="space-y-4">
      <FilterBar onFilter={handleFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4">
        {paginated.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="p-2 px-4 bg-blue-900 text-white rounded disabled:bg-gray-600 disabled:opacity-70 hover:bg-blue-800 transition"
        >
          Anterior
        </button>

        <span className="font-medium">
          {page} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="p-2 px-4 bg-blue-900 text-white rounded disabled:bg-gray-600 disabled:opacity-70 hover:bg-blue-800 transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
