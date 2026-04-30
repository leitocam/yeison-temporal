import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionWidth = "landing" | "section" | "narrow"

const WIDTH_CLASSES: Record<SectionWidth, string> = {
  landing: "max-w-7xl",
  section: "max-w-6xl",
  narrow: "max-w-4xl",
}

interface SectionContainerProps {
  children: ReactNode
  width?: SectionWidth
  className?: string
}

export default function SectionContainer({
  children,
  width = "section",
  className,
}: SectionContainerProps) {
  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", WIDTH_CLASSES[width], className)}>
      {children}
    </div>
  )
}
