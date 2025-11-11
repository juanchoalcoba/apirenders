import { Dog } from "../types/types";

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

  const url = `${BASE_URL}/breeds?${params.toString()}`;

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
      throw new Error(`Dog API error: ${res.status} - ${errorText}`);
    }

    const data: Dog[] = await res.json();
    return data;
  } catch (error: unknown) {
    // Manejo seguro de errores sin usar `any`
    if (error instanceof Error) {
      console.error("Failed to fetch dogs:", error.message);
    } else {
      console.error("Failed to fetch dogs:", error);
    }
    // Retorno seguro para no romper la app
    return [];
  }
}
