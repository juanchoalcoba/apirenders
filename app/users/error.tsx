// app/users/error.tsx
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error("Error en /users:", error);

  return (
    <div className="p-6 text-red-500 space-y-3">
      <h2 className="font-bold text-lg">⚠️ Algo salió mal</h2>
      <p>{error.message}</p>

      <button
        onClick={() => reset()}
        className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
      >
        Reintentar
      </button>
    </div>
  );
}
