import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center p-8 bg-background">
      <div className="w-24 h-24 rounded-3xl bg-[#A3FF00]/10 border border-[#A3FF00]/20 flex items-center justify-center">
        <span className="text-4xl font-black text-[#A3FF00]">404</span>
      </div>
      <div>
        <h1 className="text-2xl font-black text-white mb-2">Página no encontrada</h1>
        <p className="text-sm text-[#666] max-w-md">
          La página que buscas no existe o fue movida.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="px-8 py-3 bg-[#A3FF00] text-black rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
      >
        Volver al Dashboard
      </Link>
    </div>
  )
}
