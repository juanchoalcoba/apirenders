"use client";
import { useState, useMemo, useCallback } from "react";
import PokemonCard from "./PokemonCard";
import FilterBar from "@/app/characters/components/FilterBar";
import { Pokemon } from "@/app/types/types";

interface Props {
  pokemons: Pokemon[];
  itemsPerPage?: number;
}

export default function PokemonList({ pokemons, itemsPerPage = 6 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
    setCurrentPage(1);
  }, []);

  // 🔹 Filtrado (case insensitive)
  const filtered = useMemo(() => {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [pokemons, filter]);

  // 🔹 Paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage, itemsPerPage]);

  // 🔹 Handlers
  const handlePrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  // 🔹 Render
  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        placeholder="Busca tu pokemon preferido"
        onFilter={handleFilterChange}
      />

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          No se encontraron pokemons con ese nombre.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginated.map((pokemon, index) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} index={index} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={handlePrev}
              className="
                p-2 px-4 
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

            <span className="font-medium text-gray-800">
              Página {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={handleNext}
              className="
                p-2 px-4 
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
        </>
      )}
    </div>
  );
}
