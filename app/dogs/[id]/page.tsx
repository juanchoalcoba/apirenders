import { getDogs } from "@/app/utils/getDog";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function DogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ Esperamos la promesa

  const allDogs = await getDogs({ limit: 100 });
  const dog = allDogs.find((d) => d.id.toString() === id);

  if (!dog) {
    return (
      <div className="text-center mt-12 text-gray-600 dark:text-gray-300">
        <p>No se encontró la raza.</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/dogs "
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a la lista
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {dog.image && (
          <div className="border border-black p-3 rounded-lg shadow-md dark:shadow-amber-50">
          <Image
            src={dog.image.url}
            alt={dog.name}
            width={300}
            height={295}
            className="rounded-lg shadow-md object-cover hover:scale-110 transition- duration-700"
          />
          </div>
        )}

        <div className="flex flex-col gap-3 max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            {dog.name}
          </h1>

          {dog.bred_for && (
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Usado para:</strong> {dog.bred_for}
            </p>
          )}

          {dog.breed_group && (
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Grupo:</strong> {dog.breed_group}
            </p>
          )}

          {dog.temperament && (
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Temperamento:</strong> {dog.temperament}
            </p>
          )}

          {dog.life_span && (
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Esperanza de vida:</strong> {dog.life_span}
            </p>
          )}

          {dog.weight?.metric && (
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Peso:</strong> {dog.weight.metric} kg
            </p>
          )}

          {dog.height?.metric && (
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Altura:</strong> {dog.height.metric} cm
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
