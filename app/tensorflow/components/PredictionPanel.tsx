"use client";
import type { Prediction } from "../page";

interface Props {
  predictions?: Prediction[];
}

export default function PredictionsPanel({ predictions = [] }: Props) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 mt-6 shadow-lg max-h-[400px] overflow-y-auto">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
        🔍 Detecciones
      </h2>

      {predictions.length === 0 ? (
        <p className="text-gray-400 text-center py-6 md:py-8">No hay detecciones activas</p>
      ) : (
        <div className="space-y-3">
          {predictions.map((pred, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-green-700/20 via-green-500/10 to-green-700/20 border border-green-400/20 rounded-lg p-3 md:p-4 flex justify-between items-center hover:scale-105 hover:shadow-md transition-transform duration-200"
            >
              <span className="text-white font-semibold text-sm md:text-base">{pred.class}</span>
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs md:text-sm font-bold">
                {Math.round(pred.score * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
