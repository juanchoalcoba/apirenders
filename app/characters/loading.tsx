
export default function Loading() {
  // Simulamos 8 skeleton cards
  const skeletons = Array.from({ length: 8 })

  return (
    <div className="p-6 space-y-6">
      {/* 🧭 Encabezado principal */}
      <div className="space-y-3 w-full">
        {/* Skeleton del título (h1) */}
        <div className="h-8 w-2xl bg-gray-200 rounded animate-pulse" />

        {/* Skeleton del input de búsqueda */}
        <div className="h-10 w-full  bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* 🧱 Grid de tarjetas (skeleton cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="
              border
              rounded-lg
              overflow-hidden
              shadow-md
              flex flex-col items-center p-4
              bg-white dark:bg-linear-to-b from-gray-950 to-gray-800 
              animate-pulse
            "
          >
            {/* Imagen circular */}
            <div className="w-32 h-32 mb-2 rounded-full bg-gray-200" />

            {/* Nombre */}
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />

            {/* Especie - estado */}
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
