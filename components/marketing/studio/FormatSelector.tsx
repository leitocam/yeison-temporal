'use client'

import { motion } from 'motion/react'
import { Instagram, Film, Youtube, Video } from 'lucide-react'
import { NeonCard } from '../shared/NeonCard'
import type { ContentFormat } from '../shared/types'

interface FormatOption {
  key: ContentFormat
  label: string
  platform: string
  icon: React.ComponentType<{ className?: string }>
  aspectRatio: string
  cssRatio: string
  width: number
  height: number
}

const FORMATS: FormatOption[] = [
  {
    key: 'post_square',
    label: 'Post cuadrado',
    platform: 'Instagram Feed',
    icon: Instagram,
    aspectRatio: '1:1',
    cssRatio: '1 / 1',
    width: 1080,
    height: 1080,
  },
  {
    key: 'story_vertical',
    label: 'Story / Reel',
    platform: 'Instagram · TikTok',
    icon: Film,
    aspectRatio: '9:16',
    cssRatio: '9 / 16',
    width: 1080,
    height: 1920,
  },
  {
    key: 'banner_horizontal',
    label: 'Banner',
    platform: 'Facebook · YouTube',
    icon: Youtube,
    aspectRatio: '16:9',
    cssRatio: '16 / 9',
    width: 1920,
    height: 1080,
  },
  {
    key: 'video_short',
    label: 'Video corto',
    platform: 'Reels · TikTok · Shorts',
    icon: Video,
    aspectRatio: '9:16',
    cssRatio: '9 / 16',
    width: 1080,
    height: 1920,
  },
]

interface FormatSelectorProps {
  selected: ContentFormat
  onSelect: (format: ContentFormat) => void
}

export function FormatSelector({ selected, onSelect }: FormatSelectorProps) {
  return (
    <div>
      <p className="text-white font-semibold mb-4">2. Formato del contenido</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FORMATS.map((fmt, i) => (
          <motion.div
            key={fmt.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <NeonCard
              isSelected={selected === fmt.key}
              onClick={() => onSelect(fmt.key)}
              className="flex flex-col items-center gap-3 p-4 text-center"
            >
              {/* Aspect ratio preview */}
              <div className="w-full flex items-center justify-center h-14">
                <div
                  className={`bg-gradient-to-br rounded-lg flex items-center justify-center ${
                    selected === fmt.key
                      ? 'from-[#A3FF00]/30 to-[#A3FF00]/10 border border-[#A3FF00]/50'
                      : 'from-[#1A1A1A] to-[#111] border border-[#222]'
                  }`}
                  style={{
                    aspectRatio: fmt.cssRatio,
                    maxHeight: '56px',
                    maxWidth: fmt.key === 'banner_horizontal' ? '100%' : undefined,
                  }}
                >
                  <fmt.icon
                    className={`w-3.5 h-3.5 ${selected === fmt.key ? 'text-[#A3FF00]' : 'text-[#444]'}`}
                  />
                </div>
              </div>

              <div>
                <p className={`text-xs font-semibold ${selected === fmt.key ? 'text-[#A3FF00]' : 'text-white'}`}>
                  {fmt.label}
                </p>
                <p className="text-[#444] text-[10px] font-mono mt-0.5">{fmt.aspectRatio}</p>
                <p className="text-[#555] text-[10px] mt-0.5 leading-tight">{fmt.platform}</p>
              </div>
            </NeonCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { FORMATS }
export type { FormatOption }
