"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { Camera, Sparkles, AlertCircle } from "lucide-react";
import type { ObjectDetection as CocoSsdModel } from "@tensorflow-models/coco-ssd";

interface Prediction {
  class: string;
  score: number;
  bbox: [number, number, number, number];
}

export default function ObjectDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef(Date.now());

  const [model, setModel] = useState<CocoSsdModel | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [fps, setFps] = useState(0);

  // =====================================
  // Cargar modelo TensorFlow
  // =====================================
  useEffect(() => {
    const load = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const tf = await import("@tensorflow/tfjs");
        const cocoSsd = await import("@tensorflow-models/coco-ssd");

        await tf.ready();
        const loadedModel = await cocoSsd.load();

        setModel(loadedModel);
        setIsLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError("Error cargando modelo: " + err.message);
        } else {
          setError("Error cargando modelo: error desconocido");
        }
      }
    };

    load();
  }, []);

  // =====================================
  // Iniciar cámara
  // =====================================
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsDetecting(true);
        };
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error cargando modelo: " + err.message);
      } else {
        setError("Error cargando modelo: error desconocido");
      }
    }
  }, []);

  // =====================================
  // Detener cámara
  // =====================================
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }

    setIsDetecting(false);
    setPredictions([]);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // =====================================
  // Detección de objetos
  // =====================================
  const detectObjects = useCallback(async () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      animationRef.current = requestAnimationFrame(detectObjects);
      return;
    }

    // FPS
    const now = Date.now();
    const delta = now - lastTimeRef.current;
    if (delta > 0) setFps(Math.round(1000 / delta));
    lastTimeRef.current = now;

    // Detectar
    const results = await model.detect(video);
    setPredictions(results as Prediction[]);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    results.forEach((pred: Prediction) => {
      const [x, y, w, h] = pred.bbox;

      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, w, h);

      const label = `${pred.class} ${Math.round(pred.score * 100)}%`;

      ctx.font = "16px Arial";
      const textWidth = ctx.measureText(label).width;

      ctx.fillStyle = "#00ff00";
      ctx.fillRect(x, y - 25, textWidth + 10, 25);

      ctx.fillStyle = "#000000";
      ctx.fillText(label, x + 5, y - 7);
    });

    if (isDetecting) {
      animationRef.current = requestAnimationFrame(detectObjects);
    }
  }, [model, isDetecting]);

  // =====================================
  // Iniciar detección cuando todo está listo
  // =====================================
  useEffect(() => {
    if (isDetecting && model) {
      animationRef.current = requestAnimationFrame(detectObjects);
    }
  }, [isDetecting, model, detectObjects]);

  // =====================================
  // Cleanup
  // =====================================
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      stopCamera();
    };
  }, [stopCamera]);

  // =====================================

  return (
    <div className="min-h-screen bg-gradient-to-b rounded-3xl from-gray-950 to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
            <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-yellow-400" />
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Detector de Objetos con IA
            </h1>
            <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-yellow-400" />
          </div>
          <p className="text-blue-200 text-sm md:text-lg">
            TensorFlow.js + Next.js en tiempo real
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Video */}
          <div className="md:col-span-2 bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
            <div className="relative">
              {/* VIDEO INVISIBLE */}
              <video
                ref={videoRef}
                className="w-full rounded-lg"
                style={{
                  visibility: "hidden",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />

              {/* CANVAS */}
              <canvas ref={canvasRef} className="w-full rounded-lg" />

              {!isDetecting && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="text-center px-4">
                    <Camera className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-3" />
                    <p className="text-white text-base md:text-lg">
                      Inicia la cámara para comenzar
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Controles */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={startCamera}
                disabled={isLoading || isDetecting}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:bg-gray-600 text-white font-semibold py-2 md:py-3 px-6 rounded-lg transition-all"
              >
                {isLoading ? "Cargando modelo..." : "Iniciar Cámara"}
              </button>

              <button
                onClick={stopCamera}
                disabled={!isDetecting}
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:bg-gray-600 text-white font-semibold py-2 md:py-3 px-6 rounded-lg transition-all"
              >
                Detener
              </button>
            </div>

            {isDetecting && (
              <div className="mt-3 text-center">
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs md:text-sm font-mono">
                  FPS: {fps}
                </span>
              </div>
            )}
          </div>

          {/* Panel detecciones */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />
              Detecciones
            </h2>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 md:p-4 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-3">
              {predictions.length === 0 ? (
                <p className="text-gray-400 text-center py-6 md:py-8 text-sm md:text-base">
                  {isDetecting
                    ? "Buscando objetos..."
                    : "No hay detecciones activas"}
                </p>
              ) : (
                predictions.map((pred, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-lg p-3 md:p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold text-base md:text-lg">
                        {pred.class}
                      </span>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                        {Math.round(pred.score * 100)}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${pred.score * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 md:p-4">
              <h3 className="text-blue-300 font-semibold mb-1 md:mb-2">
                💡 Modelo: COCO-SSD
              </h3>
              <p className="text-blue-200 text-xs md:text-sm">
                Detecta hasta 80 objetos diferentes en tiempo real.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 md:mt-8 bg-black/20 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
          <h3 className="text-white text-lg md:text-xl font-bold mb-2">
            🚀 Sobre esta aplicación
          </h3>
          <p className="text-blue-200 text-sm md:text-base">
            Todo el procesamiento sucede en tu navegador, sin enviar datos a
            ningún servidor. TensorFlow.js FTW 💙
          </p>
        </div>
      </div>
    </div>
  );
}
