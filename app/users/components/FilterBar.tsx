"use client"; 
// Indica que este componente se ejecuta del lado del cliente (Next.js 13+)

import { useState, useEffect, useMemo } from "react";
// Importa los hooks principales de React: useState, useEffect, useMemo

import { User } from "../../types/types";
// Importa el tipo 'User' desde tu definición de tipos (para tipar las props y estados)

import UserList from "./UserList";
// Importa un componente hijo que muestra la lista de usuarios

import { Search, SortAsc, ArrowLeft, ArrowRight } from "lucide-react";
// Importa íconos SVG listos para usar desde la librería 'lucide-react'


// Componente principal que recibe la lista de usuarios como prop
export default function FilterBar({ users }: { users: User[] }) {

  // 🔹 Estado para el texto de búsqueda actual
  const [query, setQuery] = useState<string>("");

  // 🔹 Estado para el texto "debounced" (retardado), evita búsquedas inmediatas
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  // 🔹 Estado para definir por qué campo ordenar (nombre o email)
  const [sortBy, setSortBy] = useState<"name" | "email">("name");

  // 🔹 Estado para la página actual del paginado
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 🔹 Cantidad de usuarios por página
  const itemsPerPage = 5;


  // 🕒 useEffect para manejar el "debounce" del campo de búsqueda
  useEffect(() => {
    // Crea un temporizador de 400ms cada vez que cambia 'query'
    const handler = setTimeout(() => {
      setDebouncedQuery(query); // Actualiza el valor real a buscar
      setCurrentPage(1);        // Reinicia el paginado a la primera página
    }, 400);

    // Limpia el temporizador si el usuario sigue escribiendo
    return () => clearTimeout(handler);
  }, [query]);


  // 🔍 Filtrado de usuarios según la búsqueda
  const filtered = useMemo(() => {
    // Retorna solo los usuarios cuyo nombre incluya el texto buscado
    return users.filter((u) =>
      u.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [users, debouncedQuery]);
  // useMemo evita recalcular el filtro a menos que cambien los usuarios o la búsqueda


  // ↕️ Ordenamiento de los usuarios según el criterio actual (nombre o email)
  const sorted = useMemo(() => {
    // Se hace una copia del array filtrado antes de ordenar
    return [...filtered].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [filtered, sortBy]);
  // localeCompare compara strings alfabéticamente de forma segura


  // 📄 Paginado: toma solo una parte de la lista según la página actual
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage; // Índice inicial
    const end = start + itemsPerPage;               // Índice final
    return sorted.slice(start, end);                // Devuelve ese trozo del array
  }, [sorted, currentPage]);


  // 📊 Calcula cuántas páginas hay en total
  const totalPages = Math.ceil(sorted.length / itemsPerPage);


  // ⬅️ Manejador para ir a la página anterior
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  // ➡️ Manejador para ir a la página siguiente
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));


  // 💅 Renderizado del componente
  return (
    <div
      className="
        flex flex-col items-center w-full p-4 sm:p-6
        bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg
        rounded-3xl shadow-inner border border-gray-200 dark:border-gray-800
        transition-all duration-500
      "
    >
      {/* 🔍 Barra de búsqueda y selector */}
      <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-3 sm:gap-4 mb-2">
        
        {/* Campo de búsqueda */}
        <div className="relative w-full sm:w-72 md:w-80">
          <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Actualiza el texto en tiempo real
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
        <div className="relative w-full sm:w-52 md:w-80">
          <SortAsc className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "email")} // Cambia el orden
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

      {/* 📋 Lista paginada de usuarios */}
      <div className="w-full mt-3 sm:mt-4">
        <UserList users={paginated} /> 
        {/* Se renderiza el componente hijo con la lista filtrada, ordenada y paginada */}
      </div>

      {/* 🔢 Controles de paginación */}
      <div className="flex items-center gap-3 sm:gap-4 mt-6">
        
        {/* Botón Anterior */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1} // Deshabilitado en la primera página
          className="
            flex items-center gap-1 px-3 py-1.5 sm:px-3 sm:py-2
            rounded-xl bg-blue-600 text-white text-sm sm:text-base font-medium
            hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          "
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Texto con la página actual */}
        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          Página {currentPage} de {totalPages}
        </span>

        {/* Botón Siguiente */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages} // Deshabilitado en la última página
          className="
            flex items-center gap-1 px-3 py-1.5 sm:px-3 sm:py-2
            rounded-xl bg-blue-600 text-white text-sm sm:text-base font-medium
            hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          "
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
