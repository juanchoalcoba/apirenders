"use client";


export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-yellow-400/40 animate-pulse" />
            <div className="h-8 md:h-12 w-56 md:w-96 rounded-lg bg-white/10 animate-pulse" />
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-yellow-400/40 animate-pulse" />
          </div>
          <div className="mx-auto w-48 md:w-72 h-4 rounded bg-blue-200/20 animate-pulse" />
        </div>

        {/* Main grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Video area skeleton */}
          <div className="md:col-span-2 bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
            <div className="relative">
              <div className="w-full rounded-lg aspect-video bg-gray-700/30 border border-white/5 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/5 animate-pulse" />
              </div>

              {/* overlay placeholder */}
              <div className="absolute inset-0 flex items-center justify-center rounded-lg pointer-events-none">
                <div className="text-center px-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 animate-pulse mx-auto mb-3" />
                  <div className="h-4 w-40 rounded bg-white/5 animate-pulse mx-auto" />
                </div>
              </div>
            </div>

            {/* Controls skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="flex-1 h-12 md:h-14 rounded-lg bg-gradient-to-r from-green-500/30 to-emerald-600/30 animate-pulse" />
              <div className="flex-1 h-12 md:h-14 rounded-lg bg-gradient-to-r from-red-500/30 to-rose-600/30 animate-pulse" />
            </div>

            {/* FPS badge */}
            <div className="mt-3 text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 animate-pulse">&nbsp;</div>
            </div>
          </div>

          {/* Panel detecciones skeleton */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
            <div className="h-6 w-36 rounded bg-white/8 animate-pulse mb-4" />

            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 md:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-4 w-32 rounded bg-white/8 animate-pulse" />
                    <div className="h-5 w-12 rounded-full bg-green-500/10 animate-pulse" />
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-green-400/40 to-emerald-500/40 animate-pulse" style={{ width: `${30 + i * 15}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 md:p-4">
              <div className="h-4 w-40 rounded bg-blue-300/10 animate-pulse" />
              <div className="mt-2 h-3 w-56 rounded bg-blue-200/10 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Footer skeleton */}
        <div className="mt-6 md:mt-8 bg-black/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
          <div className="h-6 w-64 rounded bg-white/8 animate-pulse mb-2" />
          <div className="h-4 w-full md:w-3/4 rounded bg-white/6 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
