// app/users/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-3 p-4">
      <div className="h-6 w-48 bg-gray-300 rounded animate-pulse" />
      <ul className="space-y-2">
        {[...Array(8)].map((_, i) => (
          <li
            key={i}
            className="h-4 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </ul>
    </div>
  );
}
