'use client'

import { useState, useEffect } from 'react'

interface Props {
  onFilter: (query: string) => void
  placeholder?: string
}

export default function FilterBar({ onFilter, placeholder = "Buscar..." }: Props) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => onFilter(query), 300)
    return () => clearTimeout(timer)
  }, [query, onFilter])

  return (
    <input
      type="text"
      placeholder={placeholder} 
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="p-2 border rounded-2xl mb-4 w-full"
    />
  )
}
