import { useEffect, useState } from 'react'

// Un hook de almacenamiento clave-valor simple con localStorage como backend.
// Firma compatible mínima con `useKV<T>(key: string, initial: T)` -> [value, setValue]
export function useKV<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // noop: almacenamiento puede fallar (modo privado, espacio lleno, etc.)
    }
  }, [key, value])

  return [value, setValue] as const
}

// Espacio para futuros hooks relacionados con Spark si se necesitan.
export default { useKV }
