"use client";

import { useState, useEffect, useMemo } from "react";
import { User } from "../../types/types";
import UserList from "./UserList";
import { Search, SortAsc, ArrowLeft, ArrowRight } from "lucide-react";

export default function FilterBar({ users }: { users: User[] }) {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "email">("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  const filtered = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [users, debouncedQuery]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [filtered, sortBy]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sorted.slice(start, end);
  }, [sorted, currentPage]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="flex flex-col items-center w-full p-4 sm:p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-3xl shadow-inner border border-gray-200 dark:border-gray-800 transition-all duration-500">
      {/* 🔍 Barra de búsqueda y selector */}
      <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 sm:gap-4 mb-2">
        {/* Campo de búsqueda */}
        <div className="relative w-full sm:w-72 md:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full pl-9 pr-3 py-2 sm:py-2.5
              text-sm sm:text-base
              text-gray-900 dark:text-gray-100
              bg-gray-50 dark:bg-gray-800
              rounded-xl border border-gray-300 dark:border-gray-700
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              outline-none transition-all
            "
          />
        </div>

        {/* Selector de orden */}
        <div className="relative w-full sm:w-52 md:w-60">
          <SortAsc className="absolute left-3 top-2.5 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "email")}
            className="
              w-full pl-9 pr-3 py-2 sm:py-2.5
              text-sm sm:text-base
              bg-gray-50 dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              rounded-xl border border-gray-300 dark:border-gray-700
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              outline-none transition-all
              appearance-none
            "
          >
            <option value="name">Ordenar por nombre</option>
            <option value="email">Ordenar por email</option>
          </select>
        </div>
      </div>

      {/* 📋 Lista paginada */}
      <div className="w-full mt-3 sm:mt-4">
        <UserList users={paginated} />
      </div>

      {/* 🔢 Controles de paginación */}
      <div className="flex  items-center gap-3 sm:gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
