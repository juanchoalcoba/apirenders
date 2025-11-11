import { notFound } from 'next/navigation'

export default async function UserPage({ params }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)

  // Si la API devuelve 404, disparamos el 404 de Next
  if (!res.ok) {
    notFound() // 🔹 Esto hace que Next.js renderice automáticamente not-found.tsx
  }

  const user = await res.json()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}
