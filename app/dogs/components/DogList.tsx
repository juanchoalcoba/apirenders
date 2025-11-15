"use client";

import { useState, useMemo, useCallback } from "react";
import DogCard from "./DogCard";
import FilterBar from "@/app/characters/components/FilterBar"; // ajusta el path si está en otra carpeta
import { Dog } from "@/app/types/types";
import { ArrowLeft, DogIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/app/characters/components/ThemeToogle";

interface Props {
  dogs: Dog[];
  itemsPerPage?: number;
}

export default function DogList({ dogs, itemsPerPage = 10 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  

  // 🔹 Cuando cambia el filtro, reseteamos la página
  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
    setCurrentPage(1);
  }, []);

  // 🔹 Filtrado (por nombre o temperamento, case insensitive)
  const filtered = useMemo(() => {
    return dogs.filter((dog) => {
      const query = filter.toLowerCase();
      return (
        dog.name.toLowerCase().includes(query) ||
        dog.temperament?.toLowerCase().includes(query)
      );
    });
  }, [dogs, filter]);

  // 🔹 Paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage, itemsPerPage]);

  // 🔹 Render
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-y-4 md:gap-0 md:flex-row items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
            <DogIcon className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            DoGs
          </h1>
        </div>

        <div className="flex gap-12">
          <ThemeToggle />
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
      <FilterBar
        placeholder="Buscar perros por nombre o temperamento..."
        onFilter={handleFilterChange}
      />

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          No se encontraron perros con ese nombre o temperamento.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
            {paginated.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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

            <span className="font-medium text-gray-800 dark:text-gray-200">
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.max(p + 1, totalPages))}
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
