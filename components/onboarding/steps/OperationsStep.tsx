'use client'

import { Clock, Save } from 'lucide-react'
import { useTranslations } from 'next-intl'
import GradientButton from '@/components/ui/GradientButton'
import { StepProps } from '../types'

export default function OperationsStep({ formData, updateField, isSaving, saveSuccess, saveError, onSave }: StepProps) {
    const t = useTranslations('onboarding.operations')

    return (
        <div className="form-section fade-in-up">
            <div className="section-header">
                <Clock className="section-icon" />
                <div>
                    <h2>{t('title')}</h2>
                    <p>{t('subtitle')}</p>
                </div>
            </div>

            <div className="form-grid">
                <div className="form-group full-width">
                    <label htmlFor="businessHours">{t('businessHours')}</label>
                    <input
                        id="businessHours"
                        type="text"
                        placeholder={t('businessHoursPlaceholder')}
                        value={formData.businessHours}
                        onChange={(e) => updateField('businessHours', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="responseTime">{t('responseTime')}</label>
                    <select
                        id="responseTime"
                        value={formData.responseTime}
                        onChange={(e) => updateField('responseTime', e.target.value)}
                    >
                        <option value="">{t('select')}</option>
                        <option value="immediate">{t('responseTimes.immediate')}</option>
                        <option value="1hour">{t('responseTimes.1hour')}</option>
                        <option value="same-day">{t('responseTimes.sameDay')}</option>
                        <option value="business-hours">{t('responseTimes.businessHours')}</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="languages">{t('languages')}</label>
                    <input
                        id="languages"
                        type="text"
                        placeholder={t('languagesPlaceholder')}
                        value={formData.languages}
                        onChange={(e) => updateField('languages', e.target.value)}
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="competitors">{t('competitors')}</label>
                    <textarea
                        id="competitors"
                        placeholder={t('competitorsPlaceholder')}
                        value={formData.competitors}
                        onChange={(e) => updateField('competitors', e.target.value)}
                        rows={2}
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="additionalContext">{t('additionalContext')}</label>
                    <textarea
                        id="additionalContext"
                        placeholder={t('additionalContextPlaceholder')}
                        value={formData.additionalContext}
                        onChange={(e) => updateField('additionalContext', e.target.value)}
                        rows={4}
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
