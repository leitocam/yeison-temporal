'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wand2, ImagePlay } from 'lucide-react'

const TABS = [
  { label: 'Wizard de Campaña', icon: Wand2, suffix: '' },
  { label: 'Estudio de Contenido', icon: ImagePlay, suffix: '/studio' },
]

export function MarketingSubNav() {
  const pathname = usePathname()
  // Extract locale prefix — pathname is like /es/dashboard/marketing or /es/dashboard/marketing/studio
  const localeMatch = pathname.match(/^\/([a-z]{2})\//)
  const locale = localeMatch ? localeMatch[1] : 'es'

  const isStudio = pathname.includes('/marketing/studio')

  return (
    <div className="flex items-center gap-2 mb-8 p-1 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl w-fit">
      {TABS.map((tab) => {
        const isActive = tab.suffix === '/studio' ? isStudio : !isStudio
        const href = `/${locale}/dashboard/marketing${tab.suffix}`
        return (
          <Link
            key={tab.suffix}
            href={href}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-[#A3FF00] text-black shadow-[0_0_15px_rgba(163,255,0,0.25)]'
                : 'text-[#666] hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
