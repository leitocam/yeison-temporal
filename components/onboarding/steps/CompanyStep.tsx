'use client'

import { Building2, Save } from 'lucide-react'
import { useTranslations } from 'next-intl'
import GradientButton from '@/components/ui/GradientButton'
import { StepProps } from '../types'

export default function CompanyStep({ formData, updateField, isSaving, saveSuccess, saveError, onSave }: StepProps) {
    const t = useTranslations('onboarding.company')

    return (
        <div className="form-section fade-in-up">
            <div className="section-header">
                <Building2 className="section-icon" />
                <div>
                    <h2>{t('title')}</h2>
                    <p>{t('subtitle')}</p>
                </div>
            </div>

            <div className="form-grid">
                <div className="form-group full-width">
                    <label htmlFor="companyName">{t('companyName')} *</label>
                    <input
                        id="companyName"
                        type="text"
                        placeholder={t('companyNamePlaceholder')}
                        value={formData.companyName}
                        onChange={(e) => updateField('companyName', e.target.value)}
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="companyDescription">{t('description')} *</label>
                    <input
                        id="companyDescription"
                        type="text"
                        placeholder={t('descriptionPlaceholder')}
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="industry">{t('industry')} *</label>
                    <select
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => updateField('industry', e.target.value)}
                    >
                        <option value="">{t('selectOption')}</option>
                        <option value="retail">{t('industries.retail')}</option>
                        <option value="services">{t('industries.services')}</option>
                        <option value="technology">{t('industries.technology')}</option>
                        <option value="food">{t('industries.food')}</option>
                        <option value="health">{t('industries.health')}</option>
                        <option value="education">{t('industries.education')}</option>
                        <option value="construction">{t('industries.construction')}</option>
                        <option value="automotive">{t('industries.automotive')}</option>
                        <option value="real-estate">{t('industries.realEstate')}</option>
                        <option value="tourism">{t('industries.tourism')}</option>
                        <option value="other">{t('industries.other')}</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="companySize">{t('companySize')}</label>
                    <select
                        id="companySize"
                        value={formData.companySize}
                        onChange={(e) => updateField('companySize', e.target.value)}
                    >
                        <option value="">{t('selectOption')}</option>
                        <option value="1-5">{t('sizes.1-5')}</option>
                        <option value="6-20">{t('sizes.6-20')}</option>
                        <option value="21-50">{t('sizes.21-50')}</option>
                        <option value="51-200">{t('sizes.51-200')}</option>
                        <option value="200+">{t('sizes.200+')}</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="website">{t('website')}</label>
                    <input
                        id="website"
                        type="url"
                        placeholder={t('websitePlaceholder')}
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">{t('location')}</label>
                    <input
                        id="location"
                        type="text"
                        placeholder={t('locationPlaceholder')}
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="yearFounded">{t('yearFounded')}</label>
                    <input
                        id="yearFounded"
                        type="text"
                        placeholder={t('yearFoundedPlaceholder')}
                        value={formData.yearFounded}
                        onChange={(e) => updateField('yearFounded', e.target.value)}
                    />
                </div>
            </div>

            <div className="save-section-container" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <GradientButton onClick={() => onSave('business')} disabled={isSaving}>
                    <Save className="btn-icon" />
                    {isSaving ? t('saving') : t('saveProgress')}
                </GradientButton>
                {saveSuccess && <span style={{ color: '#10b981', fontWeight: '500' }}>{saveSuccess}</span>}
                {saveError && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{saveError}</span>}
            </div>
        </div>
    )
}
