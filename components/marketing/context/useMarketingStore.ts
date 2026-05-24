'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  MarketingWizardState,
  ExperienceLevel,
  BusinessContext,
  GenerationPhase,
  CreativeCard,
  RecommendedStrategy,
  FunnelSliders,
  CampaignSummary,
  FacebookInsightsMetric,
  ExecutionTask,
} from '../shared/types'

const DEFAULT_TASKS: ExecutionTask[] = [
  {
    id: 'task-1',
    title: 'Configurar cuenta publicitaria',
    description: 'Crea o conecta tu cuenta en Meta Ads Manager y define el método de pago.',
    isCompleted: false,
  },
  {
    id: 'task-2',
    title: 'Crear audiencias personalizadas',
    description: 'Sube listas de clientes existentes y configura audiencias similares (lookalike).',
    isCompleted: false,
  },
  {
    id: 'task-3',
    title: 'Subir creativos aprobados',
    description: 'Carga las imágenes y videos seleccionados en la biblioteca de medios.',
    isCompleted: false,
  },
  {
    id: 'task-4',
    title: 'Revisar y aprobar copys',
    description: 'Revisa los textos generados por IA y aprueba los que usarás en los anuncios.',
    isCompleted: false,
  },
  {
    id: 'task-5',
    title: 'Activar y monitorear campaña',
    description: 'Publica la campaña y programa revisiones diarias los primeros 3 días.',
    isCompleted: false,
  },
]

const DEFAULT_SLIDERS: FunnelSliders = {
  budget: 500,
  durationDays: 30,
  ctr: 2.5,
  conversionRate: 3.0,
}

type PersistedState = Pick<
  MarketingWizardState,
  | 'currentStep'
  | 'experienceLevel'
  | 'businessContext'
  | 'funnelSliders'
  | 'executionTasks'
  | 'campaignSummary'
  | 'facebookConnection'
>

export const useMarketingStore = create<MarketingWizardState>()(
  persist(
    (set) => ({
      // State
      currentStep: 1,
      experienceLevel: null,
      businessContext: null,
      generationPhase: 'idle' as GenerationPhase,
      creatives: [],
      strategy: null,
      funnelSliders: DEFAULT_SLIDERS,
      executionTasks: DEFAULT_TASKS,
      campaignSummary: null,
      facebookConnection: { isConnected: false },
      facebookInsights: null,

      // Navigation
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 9) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

      // Setters
      setExperienceLevel: (level: ExperienceLevel) => set({ experienceLevel: level }),
      setBusinessContext: (ctx: BusinessContext) => set({ businessContext: ctx }),
      setGenerationPhase: (phase: GenerationPhase) => set({ generationPhase: phase }),
      setCreatives: (creatives: CreativeCard[]) => set({ creatives }),
      appendCreative: (creative: CreativeCard) =>
        set((s) => ({ creatives: [...s.creatives, creative] })),
      toggleFavorite: (id: string) =>
        set((s) => ({
          creatives: s.creatives.map((c) =>
            c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
          ),
        })),
      discardCreative: (id: string) =>
        set((s) => ({
          creatives: s.creatives.map((c) =>
            c.id === id ? { ...c, isDiscarded: true } : c
          ),
        })),
      setStrategy: (strategy: RecommendedStrategy) => set({ strategy }),
      updateFunnelSlider: (key: keyof FunnelSliders, value: number) =>
        set((s) => ({ funnelSliders: { ...s.funnelSliders, [key]: value } })),
      toggleTask: (id: string) =>
        set((s) => ({
          executionTasks: s.executionTasks.map((t) =>
            t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
          ),
        })),
      setCampaignSummary: (summary: CampaignSummary) => set({ campaignSummary: summary }),
      setFacebookInsights: (insights: FacebookInsightsMetric) =>
        set({ facebookInsights: insights }),
      reset: () =>
        set({
          currentStep: 1,
          experienceLevel: null,
          businessContext: null,
          generationPhase: 'idle',
          creatives: [],
          strategy: null,
          funnelSliders: DEFAULT_SLIDERS,
          executionTasks: DEFAULT_TASKS,
          campaignSummary: null,
        }),
    }),
    {
      name: 'yeison-marketing-wizard',
      partialize: (state): PersistedState => ({
        currentStep: state.currentStep,
        experienceLevel: state.experienceLevel,
        businessContext: state.businessContext,
        funnelSliders: state.funnelSliders,
        executionTasks: state.executionTasks,
        campaignSummary: state.campaignSummary,
        facebookConnection: state.facebookConnection,
      }),
    }
  )
)
