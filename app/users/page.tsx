import FilterBar from "./components/FilterBar";
import { User } from "../types/types";
import { getUsers } from "../utils/useUsers";
import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "../characters/components/ThemeToogle";

export default async function UsersPage() {
  const users: User[] = await getUsers();

  return (
    <section className="flex flex-col   max-w-6xl mx-auto px-6 py-12 sm:px-10 sm:py-16 rounded-3xl shadow-md bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      {/* Header */}
      <div className="flex flex-col gap-y-4 md:gap-0 md:flex-row items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            Usuarios
          </h1>
        </div>

        <div className="flex gap-12">
          <ThemeToggle />
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8" />

      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 hover:scrollbar-thumb-blue-500 rounded-xl">
        <FilterBar users={users} />
      </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8" />

    </section>
  );
}
