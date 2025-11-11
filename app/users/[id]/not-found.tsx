import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">🌀 Usuario no encontrado</h1>
      <p className="mb-6 text-gray-600">Parece que este usuario no existe o fue eliminado.</p>
      <Link href="/users" className="text-blue-500 hover:underline">
        Volver a la lista de usuarios
      </Link>
    </div>
  )
}
