export type ExperienceLevel = 'principiante' | 'intermedio' | 'experto'
export type CreativeTab = 'hooks' | 'copys' | 'guiones' | 'angulos'
export type GenerationPhase =
  | 'idle'
  | 'analizando'
  | 'entendiendo'
  | 'generando'
  | 'creando'
  | 'optimizando'
  | 'done'

export interface BusinessContext {
  whatYouSell: string
  averagePrice: string
  whereSell: string
  targetAudience: string
  differentiator: string
  businessUrl: string
}

export interface CreativeCard {
  id: string
  tab: CreativeTab
  text: string
  isFavorite: boolean
  isDiscarded: boolean
}

export interface RecommendedStrategy {
  businessSummary: string
  channels: string[]
  budget: string
  mainMessage: string
  expectedLeads: number
  expectedROI: string
  duration: string
}

export interface FunnelSliders {
  budget: number
  durationDays: number
  ctr: number
  conversionRate: number
}

export interface FunnelOutput {
  impressions: number
  clicks: number
  leads: number
  sales: [number, number]
}

export interface ExecutionTask {
  id: string
  title: string
  description: string
  isCompleted: boolean
}

export interface AutomationRow {
  id: string
  name: string
  trigger: string
  status: 'active' | 'paused' | 'draft'
  leads: number
  lastRun: string
}

export interface CampaignSummary {
  objective: string
  platform: string
  budget: string
  audience: string
  creatives: number
  duration: string
}

export interface FacebookConnection {
  isConnected: boolean
  adAccountId?: string
  pageId?: string
  igUserId?: string
  accessTokenExpiry?: string
}

export interface FacebookInsightsMetric {
  totalCampaigns: number
  avgROI: string
  totalLeads: number
  historicalCTR: number
  historicalConversionRate: number
}

export interface MarketingWizardState {
  currentStep: number
  experienceLevel: ExperienceLevel | null
  businessContext: BusinessContext | null
  generationPhase: GenerationPhase
  creatives: CreativeCard[]
  strategy: RecommendedStrategy | null
  funnelSliders: FunnelSliders
  executionTasks: ExecutionTask[]
  campaignSummary: CampaignSummary | null
  facebookConnection: FacebookConnection
  facebookInsights: FacebookInsightsMetric | null
  // Actions
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setExperienceLevel: (level: ExperienceLevel) => void
  setBusinessContext: (ctx: BusinessContext) => void
  setGenerationPhase: (phase: GenerationPhase) => void
  setCreatives: (creatives: CreativeCard[]) => void
  appendCreative: (creative: CreativeCard) => void
  toggleFavorite: (id: string) => void
  discardCreative: (id: string) => void
  setStrategy: (strategy: RecommendedStrategy) => void
  updateFunnelSlider: (key: keyof FunnelSliders, value: number) => void
  toggleTask: (id: string) => void
  setCampaignSummary: (summary: CampaignSummary) => void
  setFacebookInsights: (insights: FacebookInsightsMetric) => void
  reset: () => void
}
