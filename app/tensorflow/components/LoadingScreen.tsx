"use client";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-800">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-yellow-400/40 animate-pulse mx-auto mb-4" />
        <h2 className="text-2xl md:text-4xl text-white font-bold mb-2">Cargando modelo...</h2>
        <p className="text-white/70">Por favor espera un momento</p>
      </div>
    </div>
  );
}
