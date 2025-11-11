import Image from "next/image";
import Link from "next/link";
import { Dog } from "@/app/types/types";

interface Props {
  dog: Dog;
}

export default function DogCard({ dog }: Props) {
  return (
    <Link
      href={`/dogs/${dog.id}`} // 👈 cada perro tiene su página dinámica
      className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition rounded-xl p-4 cursor-pointer"
    >
      {dog.image && (
        <Image
          width={125}
          height={125}
          src={dog.image.url}
          alt={dog.name}
          className="w-32 h-32 object-cover rounded-md mb-2"
        />
      )}
      <p className="capitalize font-semibold text-gray-700 dark:text-gray-200">
        {dog.name}
      </p>
      {dog.temperament && (
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {dog.temperament}
        </p>
      )}
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {dog.life_span}
      </p>
    </Link>
  );
}
