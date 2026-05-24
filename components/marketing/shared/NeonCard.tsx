'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface NeonCardProps {
  children: React.ReactNode
  isSelected?: boolean
  onClick?: () => void
  className?: string
  glow?: boolean
}

export function NeonCard({ children, isSelected, onClick, className, glow }: NeonCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={cn(
        'relative rounded-2xl border bg-[#0A0A0A] p-5 transition-all duration-300',
        isSelected
          ? 'border-[#A3FF00] shadow-[0_0_20px_rgba(163,255,0,0.25)]'
          : glow
          ? 'border-[#1A1A1A] hover:border-[#A3FF00]/40 hover:shadow-[0_0_15px_rgba(163,255,0,0.12)]'
          : 'border-[#1A1A1A] hover:border-[#A3FF00]/30',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl bg-[#A3FF00]/5 pointer-events-none" />
      )}
      {children}
    </motion.div>
  )
}
