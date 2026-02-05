"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Building2, Users, Package, Target, Clock, Save, X, AlertTriangle, SkipForward } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'motion/react'
import GradientButton from '@/components/ui/GradientButton'
import { apiClient } from '@/lib/api-client'
import {
    OnboardingHeader,
    OnboardingProgress,
    OnboardingTips,
    CompanyStep,
    ContactStep,
    ProductsStep,
    SalesStep,
    OperationsStep,
    FormData,
    Product,
    StepInfo,
    TenantConfiguration,
    initialFormData
} from '@/components/onboarding'
import './onboarding.css'

const steps: StepInfo[] = [
    { id: 1, title: 'Empresa', icon: Building2, description: 'Información básica' },
    { id: 2, title: 'Contacto', icon: Users, description: 'Datos del responsable' },
    { id: 3, title: 'Productos', icon: Package, description: 'Catálogo e inventario' },
    { id: 4, title: 'Ventas', icon: Target, description: 'Tu proceso comercial' },
    { id: 5, title: 'Operaciones', icon: Clock, description: 'Horarios y más' },
]

export default function OnboardingPage() {
    const router = useRouter()
    const t = useTranslations('onboarding')
    const [currentStep, setCurrentStep] = useState(1)
    const [configId, setConfigId] = useState<number | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [saveError, setSaveError] = useState<string | null>(null)
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null)
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [showSkipModal, setShowSkipModal] = useState(false)

    // Load existing configuration on mount
    useEffect(() => {
        loadConfiguration()
    }, [])

    const loadConfiguration = async () => {
        try {
            const config = await apiClient.get<TenantConfiguration>('/configurations/current-or-create')
            setConfigId(config.id)

            // Populate form with existing data
            setFormData({
                companyName: config.business?.company_name || '',
                industry: config.business?.industry || '',
                companySize: config.business?.company_size || '',
                website: config.business?.website || '',
                location: config.business?.location || '',
                yearFounded: config.business?.year_founded || '',
                description: config.business?.description || '',
                contactName: config.contact?.contact_name || '',
                contactRole: config.contact?.contact_role || '',
                contactEmail: config.contact?.contact_email || '',
                contactPhone: config.contact?.contact_phone || '',
                products: [],
                uniqueSellingPoints: config.operations?.unique_selling_points || '',
                targetAudience: config.operations?.target_audience || '',
                paymentMethods: config.operations?.payment_methods || '',
                salesProcess: config.operations?.sales_process || '',
                commonQuestions: config.operations?.common_questions || '',
                objections: config.operations?.objections || '',
                closingTechniques: config.operations?.closing_techniques || '',
                businessHours: config.operations?.business_hours || '',
                responseTime: config.operations?.response_time || '',
                languages: config.operations?.languages || '',
                competitors: config.operations?.competitors || '',
                additionalContext: config.operations?.additional_context || '',
            })
        } catch (error: any) {
            console.error('Error loading configuration:', error)
            setSaveError('Error loading configuration. Please reload the page.')
        }
    }

    const updateField = (field: keyof FormData, value: string | Product[]) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const saveSection = async (section: 'business' | 'contact' | 'operations') => {
        if (!configId) {
            setSaveError('Configuration not found. Please reload the page.')
            return
        }

        setSaveError(null)
        setSaveSuccess(null)
        setIsSaving(true)

        try {
            let sectionData: any

            switch (section) {
                case 'business':
                    sectionData = {
                        company_name: formData.companyName,
                        industry: formData.industry,
                        company_size: formData.companySize,
                        website: formData.website,
                        location: formData.location,
                        year_founded: formData.yearFounded,
                        description: formData.description,
                    }
                    break
                case 'contact':
                    sectionData = {
                        contact_name: formData.contactName,
                        contact_role: formData.contactRole,
                        contact_email: formData.contactEmail,
                        contact_phone: formData.contactPhone,
                    }
                    break
                case 'operations':
                    sectionData = {
                        sales_process: formData.salesProcess,
                        common_questions: formData.commonQuestions,
                        objections: formData.objections,
                        closing_techniques: formData.closingTechniques,
                        business_hours: formData.businessHours,
                        response_time: formData.responseTime,
                        languages: formData.languages,
                        competitors: formData.competitors,
                        additional_context: formData.additionalContext,
                        unique_selling_points: formData.uniqueSellingPoints,
                        target_audience: formData.targetAudience,
                        payment_methods: formData.paymentMethods,
                    }
                    break
            }

            await apiClient.patch(`/configurations/${configId}/section?section=${section}`, sectionData)
            setSaveSuccess('✓ Saved successfully')
            setTimeout(() => setSaveSuccess(null), 3000)
        } catch (error: any) {
            console.error('Error saving section:', error)
            let errorMessage = 'Error saving. Please try again.'
            if (error.message && typeof error.message === 'string') {
                errorMessage = error.message
            } else if (error.details) {
                const detailMessages = Object.entries(error.details)
                    .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
                    .join('; ')
                errorMessage = detailMessages || errorMessage
            }
            setSaveError(errorMessage)
        } finally {
            setIsSaving(false)
        }
    }

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const handleSubmit = async () => {
        if (!configId) {
            setSaveError('Configuration not found. Please reload the page.')
            return
        }

        setSaveError(null)
        setIsSaving(true)

        try {
            await saveSection('operations')
            await apiClient.post(`/configurations/${configId}/complete`, {})
            alert(t('successMessage'))
            router.push('/dashboard')
        } catch (error: any) {
            console.error('Error completing onboarding:', error)
            let errorMessage = 'Error finishing. Please try again.'
            if (error.message && typeof error.message === 'string') {
                errorMessage = error.message
            } else if (error.details) {
                const detailMessages = Object.entries(error.details)
                    .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
                    .join('; ')
                errorMessage = detailMessages || errorMessage
            }
            setSaveError(errorMessage)
        } finally {
            setIsSaving(false)
        }
    }

    const handleSkip = () => {
        setShowSkipModal(true)
    }

    const handleSkipConfirm = () => {
        setShowSkipModal(false)
        router.push('/dashboard')
    }

    const renderStepContent = () => {
        const stepProps = {
            formData,
            updateField,
            isSaving,
            saveSuccess,
            saveError,
            onSave: saveSection
        }

        switch (currentStep) {
            case 1:
                return <CompanyStep {...stepProps} />
            case 2:
                return <ContactStep {...stepProps} />
            case 3:
                return <ProductsStep {...stepProps} />
            case 4:
                return <SalesStep {...stepProps} />
            case 5:
                return <OperationsStep {...stepProps} />
            default:
                return null
        }
    }

    return (
        <div className="onboarding-page">
            {/* Animated Background */}
            <div className="background-effects">
                <div className="bg-gradient-1"></div>
                <div className="bg-gradient-2"></div>
            </div>

            {/* Header with Language Switcher */}
            <OnboardingHeader currentStep={currentStep} totalSteps={steps.length} />

            {/* Progress Steps */}
            <OnboardingProgress
                steps={steps}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
            />

            {/* Form Content */}
            <main className="form-container">
                <div className="form-card">
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="form-navigation">
                        {currentStep > 1 && (
                            <GradientButton onClick={prevStep} disabled={isSaving}>
                                <ArrowLeft className="btn-icon" />
                                {t('previous')}
                            </GradientButton>
                        )}

                        <div className="spacer"></div>

                        {/* Skip Button */}
                        <button
                            onClick={handleSkip}
                            className="skip-button"
                            disabled={isSaving}
                        >
                            <SkipForward className="w-4 h-4" />
                            {t('skip') || 'Omitir'}
                        </button>

                        {currentStep < steps.length ? (
                            <GradientButton onClick={nextStep} disabled={isSaving}>
                                {t('next')}
                                <ArrowRight className="btn-icon" />
                            </GradientButton>
                        ) : (
                            <GradientButton onClick={handleSubmit} disabled={isSaving}>
                                <Save className="btn-icon" />
                                {isSaving ? t('finishing') : t('saveAndFinish')}
                            </GradientButton>
                        )}
                    </div>
                </div>
            </main>

            {/* Tips Section */}
            <OnboardingTips currentStep={currentStep} />

            {/* Skip Warning Modal */}
            <AnimatePresence>
                {showSkipModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSkipModal(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            className="relative w-full max-w-md bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setShowSkipModal(false)}
                                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content */}
                            <div className="p-6">
                                {/* Warning Icon */}
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-center mb-2">
                                    {t('skipModal.title') || '¿Omitir configuración?'}
                                </h3>

                                {/* Description */}
                                <p className="text-center text-muted-foreground mb-6 text-sm leading-relaxed">
                                    {t('skipModal.description') || 'El agente de IA requiere esta información para funcionar correctamente. Sin ella, las respuestas automáticas pueden no ser precisas ni personalizadas para tu negocio.'}
                                </p>

                                {/* Info Box */}
                                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
                                    <p className="text-xs text-amber-200 text-center">
                                        {t('skipModal.info') || 'Podrás completar esta información más tarde desde el panel de configuración.'}
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col gap-3">
                                    <GradientButton onClick={() => setShowSkipModal(false)} fullWidth>
                                        <ArrowLeft className="w-4 h-4" />
                                        {t('skipModal.continue') || 'Continuar configurando'}
                                    </GradientButton>

                                    <button
                                        onClick={handleSkipConfirm}
                                        className="w-full py-3 px-4 rounded-xl border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <SkipForward className="w-4 h-4" />
                                        {t('skipModal.skipAnyway') || 'Completar luego e ir al panel'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
