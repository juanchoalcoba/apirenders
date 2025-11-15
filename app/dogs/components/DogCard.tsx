import Image from "next/image";
import Link from "next/link";
import { Dog } from "@/app/types/types";

interface Props {
  dog: Dog;
}

export default function DogCard({ dog }: Props) {
  return (
    <Link
      href={`/dogs/${dog.id}`}
      className="group flex flex-col items-center text-center bg-white/90 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all rounded-2xl p-5 cursor-pointer hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-blue-500/50 outline-none"
    >
      {dog.image && (
        <div className="w-32 h-32 mb-3 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all">
          <Image
            width={130}
            height={130}
            src={dog.image.url}
            alt={dog.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>
      )}

      <p className="capitalize font-bold text-gray-800 dark:text-gray-100 text-lg mb-1 tracking-wide">
        {dog.name}
      </p>

      {dog.temperament && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 line-clamp-2 max-w-[200px]">
          {dog.temperament}
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
        {dog.life_span}
      </p>
    </Link>
  );
}