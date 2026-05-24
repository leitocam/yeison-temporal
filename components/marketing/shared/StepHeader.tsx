import { NeonBadge } from './NeonBadge'

interface StepHeaderProps {
  step: number
  total?: number
  title: string
  subtitle?: string
}

export function StepHeader({ step, total = 9, title, subtitle }: StepHeaderProps) {
  return (
    <div className="mb-8">
      <NeonBadge className="mb-4">Paso {step} de {total}</NeonBadge>
      <h2 className="text-3xl font-black tracking-tight text-white mb-2">{title}</h2>
      {subtitle && <p className="text-[#ADADAD] text-base">{subtitle}</p>}
    </div>
  )
}
