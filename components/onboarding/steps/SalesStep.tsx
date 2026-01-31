'use client'

import { Target, Save } from 'lucide-react'
import { useTranslations } from 'next-intl'
import GradientButton from '@/components/ui/GradientButton'
import { StepProps } from '../types'

export default function SalesStep({ formData, updateField, isSaving, saveSuccess, saveError, onSave }: StepProps) {
    const t = useTranslations('onboarding.sales')

    return (
        <div className="form-section fade-in-up">
            <div className="section-header">
                <Target className="section-icon" />
                <div>
                    <h2>{t('title')}</h2>
                    <p>{t('subtitle')}</p>
                </div>
            </div>

            <div className="form-grid">
                <div className="form-group full-width">
                    <label htmlFor="salesProcess">{t('salesProcess')}</label>
                    <textarea
                        id="salesProcess"
                        placeholder={t('salesProcessPlaceholder')}
                        value={formData.salesProcess}
                        onChange={(e) => updateField('salesProcess', e.target.value)}
                        rows={4}
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="commonQuestions">{t('commonQuestions')} *</label>
                    <textarea
                        id="commonQuestions"
                        placeholder={t('commonQuestionsPlaceholder')}
                        value={formData.commonQuestions}
                        onChange={(e) => updateField('commonQuestions', e.target.value)}
                        rows={4}
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="objections">{t('objections')}</label>
                    <textarea
                        id="objections"
                        placeholder={t('objectionsPlaceholder')}
                        value={formData.objections}
                        onChange={(e) => updateField('objections', e.target.value)}
                        rows={4}
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="closingTechniques">{t('closingTechniques')}</label>
                    <textarea
                        id="closingTechniques"
                        placeholder={t('closingTechniquesPlaceholder')}
                        value={formData.closingTechniques}
                        onChange={(e) => updateField('closingTechniques', e.target.value)}
                        rows={3}
                    />
                </div>
            </div>

            <div className="save-section-container" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <GradientButton onClick={() => onSave('operations')} disabled={isSaving}>
                    <Save className="btn-icon" />
                    {isSaving ? t('saving') : t('saveProgress')}
                </GradientButton>
                {saveSuccess && <span style={{ color: '#10b981', fontWeight: '500' }}>{saveSuccess}</span>}
                {saveError && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{saveError}</span>}
            </div>
        </div>
    )
}
