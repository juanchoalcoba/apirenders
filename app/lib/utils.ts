import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind de forma inteligente.
 * - Usa clsx() para manejar condiciones y arrays.
 * - Usa twMerge() para resolver conflictos (por ejemplo, "p-2" y "p-4").
 *
 * Ejemplo:
 * cn("p-2", condition && "bg-blue-500", ["text-sm", "font-bold"])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
