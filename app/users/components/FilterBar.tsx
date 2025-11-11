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
    <div className="flex flex-col items-center gap-8 w-full p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg rounded-3xl shadow-inner border border-gray-200 dark:border-gray-800 transition-all duration-500">
      {/* 🔍 Barra de búsqueda */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* 🔽 Selector de orden */}
        <div className="flex items-center gap-2">
          <SortAsc className="text-gray-500 dark:text-gray-400 w-5 h-5" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "email")}
            className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="name">Ordenar por nombre</option>
            <option value="email">Ordenar por email</option>
          </select>
        </div>
      </div>

      {/* 📃 Lista paginada */}
      <div className="w-full mt-4">
        <UserList users={paginated} />
      </div>

      {/* 🔢 Controles de paginación */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </button>

        <span className="text-sm text-gray-700 dark:text-gray-300">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Siguiente
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
