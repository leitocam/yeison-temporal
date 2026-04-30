import type { ReactNode } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function SectionHeader({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn("text-center mb-16", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={cn("text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-balance leading-[1.1] tracking-[-0.02em]", titleClassName)}>
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed", subtitleClassName)}>
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  )
}
