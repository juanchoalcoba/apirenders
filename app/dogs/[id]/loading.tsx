export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8 animate-pulse">
      {/* Botón volver */}
      <div className="flex items-center gap-2 w-32 h-5 mb-6 
        bg-gray-300 dark:bg-gray-700 rounded" />

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        
        {/* Imagen del perro */}
        <div className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg shadow-md">
          <div className="w-[300px] h-[295px] bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 max-w-lg w-full">
          {/* Nombre */}
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />

          {/* Varios textos */}
          <div className="space-y-3">
            <div className="h-4 w-60 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-52 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-72 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-56 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-44 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
