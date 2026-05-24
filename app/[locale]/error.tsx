'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[AppError]', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center p-8 bg-background">
      <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <span className="text-3xl">⚠️</span>
      </div>
      <div>
        <h1 className="text-2xl font-black text-red-400 mb-2">Algo salió mal</h1>
        <p className="text-sm text-[#666] max-w-md">
          {error.message || 'Ocurrió un error inesperado. Por favor intenta de nuevo.'}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-[#A3FF00] text-black rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/dashboard"
          className="px-6 py-2.5 bg-[#111] text-[#ADADAD] border border-[#1A1A1A] rounded-xl text-sm hover:text-white transition-colors"
        >
          Ir al Dashboard
        </Link>
      </div>
    </div>
  )
}
