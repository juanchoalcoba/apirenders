//getUsers Funcion asincrona reutilizable que obtiene usuarios del servidor

import { User } from "../types/types";

export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 60 },
    });

    if (!res.ok)
      throw new Error(`Error ${res.status}: al obtener los usuarios`);

    const data: User[] = await res.json();
    return data as User[];
  } catch (error) {
    console.error("Error en getUsers:", error);
    throw error;
  }
}
