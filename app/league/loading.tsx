"use client";

export default function Loading() {
  // Simulamos que hay varios "skeletons" mientras cargan las ligas
  const skeletons = Array.from({ length: 8 });

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-6">
      {skeletons.map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center bg-white dark:bg-linear-to-b from-gray-950 to-gray-800 shadow-md rounded-xl p-6 animate-pulse"
        >
          {/* Imagen del logo */}
          <div className="w-32 h-32 bg-gray-300 dark:bg-linear-to-b from-gray-950 to-gray-800 rounded-md mb-4" />

          {/* Nombre de la liga */}
          <div className="h-5 w-24 bg-gray-300 dark:bg-linear-to-b from-gray-950 to-gray-800 rounded mb-2" />

          {/* Bandera del país */}
          <div className="w-8 h-6 bg-gray-300 dark:bg-linear-to-b from-gray-950 to-gray-800 rounded mb-2" />

          {/* País */}
          <div className="h-4 w-20 bg-gray-300 dark:bg-linear-to-b from-gray-950 to-gray-800 rounded mb-1" />

          {/* Temporada */}
          <div className="h-3 w-16 bg-gray-300 dark:bg-linear-to-b from-gray-950 to-gray-800 rounded" />
        </div>
      ))}
    </div>
  );
}
