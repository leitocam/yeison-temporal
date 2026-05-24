import { cn } from '@/lib/utils'

interface NeonBadgeProps {
  children: React.ReactNode
  className?: string
}

export function NeonBadge({ children, className }: NeonBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center bg-[rgba(163,255,0,0.1)] text-[#A3FF00] border border-[rgba(163,255,0,0.3)]',
        'rounded-full font-mono text-[0.625rem] tracking-[0.15em] uppercase px-3 py-1',
        className
      )}
    >
      {children}
    </span>
  )
}
