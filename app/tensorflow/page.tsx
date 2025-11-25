"use client";
import { useState, useEffect } from "react";
import type { ObjectDetection as CocoSsdModel } from "@tensorflow-models/coco-ssd";
import LoadingScreen from "./components/LoadingScreen";
import VideoCanvas from "./components/VideoCanvas";
import PredictionsPanel from "./components/PredictionPanel";

export interface Prediction {
  class: string;
  score: number;
  bbox?: [number, number, number, number];
}

export default function ObjectDetectionPage() {
  const [model, setModel] = useState<CocoSsdModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const loadModel = async () => {
      const tf = await import("@tensorflow/tfjs");
      const cocoSsd = await import("@tensorflow-models/coco-ssd");
      await tf.ready();
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      setIsLoading(false);
    };
    loadModel();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
  <div className="min-h-screen p-4 md:p-10 bg-gray-950">
    <h1 className="text-white text-4xl md:text-5xl font-bold mb-10 text-center tracking-tight">
      Detector de Objetos en Tiempo Real
    </h1>

    <div className="flex flex-col lg:flex-row gap-6 justify-center max-w-7xl mx-auto">
      
      {/* Cámara */}
      <div className="flex-1 flex justify-center">
        <div className="bg-gray-900/50 rounded-2xl shadow-xl border border-gray-800 p-4 w-full max-w-3xl">
          <VideoCanvas
            model={model}
            isDetecting={isDetecting}
            setIsDetecting={setIsDetecting}
            setPredictions={setPredictions}
          />
        </div>
      </div>

      {/* Panel de detecciones */}
      <div className="w-full lg:w-96">
        <div className="bg-gray-900/50 rounded-2xl shadow-xl border border-gray-800 p-6 sticky top-10">
          <PredictionsPanel predictions={predictions} />
        </div>
      </div>
    </div>
  </div>
);

}
