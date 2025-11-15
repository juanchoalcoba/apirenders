import { UserSolo } from "../types/users";

export async function getUsersSolo(): Promise<UserSolo[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Error leyendo los datos");
    const data: UserSolo[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error al hacer la peticion", error);
    throw error;
  }
}
