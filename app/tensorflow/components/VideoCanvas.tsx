"use client";
import { useRef, useEffect, useCallback } from "react";
import type { ObjectDetection as CocoSsdModel, DetectedObject } from "@tensorflow-models/coco-ssd";
import type { Prediction } from "../page";

interface Props {
  model: CocoSsdModel | null;
  isDetecting: boolean;
  setIsDetecting: (val: boolean) => void;
  setPredictions?: (predictions: Prediction[]) => void;
}

export default function VideoCanvas({ model, isDetecting, setIsDetecting, setPredictions }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const startCamera = useCallback(async () => {
    if (!videoRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();
    setIsDetecting(true);
  }, [setIsDetecting]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsDetecting(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (setPredictions) setPredictions([]);
  }, [setIsDetecting, setPredictions]);

  useEffect(() => {
    if (!isDetecting || !model) return;

    const detectObjects = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const results: DetectedObject[] = await model.detect(video);
      if (setPredictions) setPredictions(results as Prediction[]);

      results.forEach((pred) => {
        const [x, y, w, h] = pred.bbox;
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, w, h);

        const label = `${pred.class} ${Math.round(pred.score * 100)}%`;
        ctx.font = "16px Arial";
        const textWidth = ctx.measureText(label).width;

        ctx.fillStyle = "#00ff00";
        ctx.fillRect(x, y - 25, textWidth + 10, 25);

        ctx.fillStyle = "#000";
        ctx.fillText(label, x + 5, y - 7);
      });

      animationRef.current = requestAnimationFrame(detectObjects);
    };

    animationRef.current = requestAnimationFrame(detectObjects);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDetecting, model, setPredictions]);

  return (
    <div className="relative w-full rounded-xl border border-white/20 shadow-lg bg-black/20 backdrop-blur-sm p-2">
      <video ref={videoRef} className="absolute w-full h-full rounded-xl hidden" />
      <canvas ref={canvasRef} className="w-full rounded-xl max-h-[480px] mx-auto" />
      <div className="flex gap-2 mt-2 justify-center">
        <button
          onClick={startCamera}
          disabled={isDetecting}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
        >
          Iniciar Cámara
        </button>
        <button
          onClick={stopCamera}
          disabled={!isDetecting}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
        >
          Detener Cámara
        </button>
      </div>
    </div>
  );
}
