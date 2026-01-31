'use client'

import { Users, Save } from 'lucide-react'
import { useTranslations } from 'next-intl'
import GradientButton from '@/components/ui/GradientButton'
import { StepProps } from '../types'

export default function ContactStep({ formData, updateField, isSaving, saveSuccess, saveError, onSave }: StepProps) {
    const t = useTranslations('onboarding.contact')

    return (
        <div className="form-section fade-in-up">
            <div className="section-header">
                <Users className="section-icon" />
                <div>
                    <h2>{t('title')}</h2>
                    <p>{t('subtitle')}</p>
                </div>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="contactName">{t('contactName')} *</label>
                    <input
                        id="contactName"
                        type="text"
                        placeholder={t('contactNamePlaceholder')}
                        value={formData.contactName}
                        onChange={(e) => updateField('contactName', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contactRole">{t('contactRole')}</label>
                    <input
                        id="contactRole"
                        type="text"
                        placeholder={t('contactRolePlaceholder')}
                        value={formData.contactRole}
                        onChange={(e) => updateField('contactRole', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contactEmail">{t('email')} *</label>
                    <input
                        id="contactEmail"
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        value={formData.contactEmail}
                        onChange={(e) => updateField('contactEmail', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contactPhone">{t('phone')}</label>
                    <input
                        id="contactPhone"
                        type="tel"
                        placeholder={t('phonePlaceholder')}
                        value={formData.contactPhone}
                        onChange={(e) => updateField('contactPhone', e.target.value)}
                    />
                </div>
            </div>

            <div className="save-section-container" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <GradientButton onClick={() => onSave('contact')} disabled={isSaving}>
                    <Save className="btn-icon" />
                    {isSaving ? t('saving') : t('saveProgress')}
                </GradientButton>
                {saveSuccess && <span style={{ color: '#10b981', fontWeight: '500' }}>{saveSuccess}</span>}
                {saveError && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{saveError}</span>}
            </div>
        </div>
    )
}
