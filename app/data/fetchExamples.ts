export const codeExamples = {
  next: `import { Dog } from "../types/types";
const API_KEY = process.env.NEXT_PUBLIC_DOG_API_KEY;
const BASE_URL = "https://api.thedogapi.com/v1";

interface GetDogsOptions {
  limit?: number;
  page?: number;
  breed_ids?: string; // opcional: filtrar por razas específicas
}

export async function getDogs(options: GetDogsOptions = {}): Promise<Dog[]> {
  const { limit = 10, page = 0, breed_ids } = options;
  const params = new URLSearchParams({ limit: limit.toString(), page: page.toString() });
  if (breed_ids) params.append("breed_ids", breed_ids);

  const url = \`\${BASE_URL}/breeds?\${params.toString()}\`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": API_KEY || "",
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(\`Dog API error: \${res.status} - \${errorText}\`);
    }

    return (await res.json()) as Dog[];
  } catch (error: unknown) {
    console.error("Failed to fetch dogs:", error);
    return [];
  }
}`,
  react: `import { useState, useEffect } from "react";
import { Post } from "../types/fetch";

const useFetchPosts = (limit: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(\`https://jsonplaceholder.typicode.com/posts?_limit=\${limit}\`);
        if (!res.ok) throw new Error("Error fetching data");
        const data = await res.json();
        setPosts(data);
      } catch {
        setError("Ha ocurrido algo malo");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [limit]);

  return { posts, loading, error };
};

export default useFetchPosts;`,
};
