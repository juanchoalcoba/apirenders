"use client";

import { ArrowLeft } from "lucide-react";
import AnimatedCode from "./components/AnimatedCode";
import { ThemeToggle } from "../characters/components/ThemeToogle";
import Link from "next/link";
import { useState } from "react";

export default function ExampleFetchingPage() {
  const codeNext = `import { Dog } from "../types/types";

const API_KEY = process.env.NEXT_PUBLIC_DOG_API_KEY;
const BASE_URL = "https://api.thedogapi.com/v1";

interface GetDogsOptions {
  limit?: number;
  page?: number;
  breed_ids?: string; // opcional: filtrar por razas específicas
}

export async function getDogs(options: GetDogsOptions = {}): Promise<Dog[]> {
  const { limit = 10, page = 0, breed_ids } = options;

  // Construcción de parámetros de URL
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
  });

  if (breed_ids) params.append("breed_ids", breed_ids);

  const url = \`\${BASE_URL}/breeds?\${params.toString()}\`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": API_KEY || "",
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // ISR opcional
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(\`Dog API error: \${res.status} - \${errorText}\`);
    }

    const data: Dog[] = await res.json();
    return data;
  } catch (error: unknown) {
    // Manejo seguro de errores sin usar 'any'
    if (error instanceof Error) {
      console.error("Failed to fetch dogs:", error.message);
    } else {
      console.error("Failed to fetch dogs:", error);
    }
    // Retorno seguro para no romper la app
    return [];
  }
}`;

  const codeReact = `import { useState, useEffect } from "react";
import { Post } from "../types/fetch";

const useFetchPosts = (limit: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/posts?_limit=\${limit}\`
        );
        if (!res.ok) throw new Error("Error fetching data");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        setError("Ha ocurrido algo malo");
        console.error("Ocurrió un error al hacer fetch", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [limit]);

  return { posts, loading, error };
};

export default useFetchPosts;`;

  const [selectedCode, setSelectedCode] = useState<"next" | "react">("next");

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-800 text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="flex justify-between w-full pb-8 items-center">
        <ThemeToggle />
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium  dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
        🚀 Ejemplo de Fetching en Next.js y React
      </h1>

      <p className="text-lg text-gray-300 text-center max-w-2xl mb-8">
        Elegí el ejemplo que querés ver animado 👇
      </p>

      {/* Botones de selección */}
      <div className="flex gap-4 mb-12">
        <button
          onClick={() => setSelectedCode("next")}
          className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-colors ${
            selectedCode === "next"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-300"
          }`}
        >
          Next.js
        </button>
        <button
          onClick={() => setSelectedCode("react")}
          className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-colors ${
            selectedCode === "react"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-300"
          }`}
        >
          React.js
        </button>
      </div>

      <div className="w-full max-w-3xl transition-all duration-500">
        <AnimatedCode code={selectedCode === "next" ? codeNext : codeReact} />
      </div>
    </main>
  );
}
