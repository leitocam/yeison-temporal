import { z } from 'zod'

export const businessContextSchema = z.object({
  whatYouSell: z.string().min(3, 'Describe qué vendes (mín. 3 caracteres)'),
  averagePrice: z.string().min(1, 'Indica el precio promedio'),
  whereSell: z.string().min(2, 'Indica dónde vendes'),
  targetAudience: z.string().min(5, 'Describe tu audiencia (mín. 5 caracteres)'),
  differentiator: z.string().min(5, 'Describe tu diferenciador (mín. 5 caracteres)'),
  businessUrl: z.string().url('URL inválida').or(z.string().max(0)).optional(),
})

export type BusinessContextSchema = z.infer<typeof businessContextSchema>
