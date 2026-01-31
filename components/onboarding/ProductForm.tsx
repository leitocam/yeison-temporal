'use client'

import { CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import GradientButton from '@/components/ui/GradientButton'
import { Product } from './types'

interface ProductFormProps {
    product: Omit<Product, 'id'>
    isEditing: boolean
    onUpdateField: (field: keyof Omit<Product, 'id'>, value: string | number) => void
    onSave: () => void
    onCancel: () => void
}

export default function ProductForm({ product, isEditing, onUpdateField, onSave, onCancel }: ProductFormProps) {
    const t = useTranslations('onboarding.products')

    return (
        <div className="product-form">
            <h3 className="product-form-title">
                {isEditing ? `✏️ ${t('editProduct')}` : `➕ ${t('newProduct')}`}
            </h3>

            <div className="form-grid">
                <div className="form-group">
                    <label>{t('productName')} *</label>
                    <input
                        type="text"
                        placeholder={t('productNamePlaceholder')}
                        value={product.name}
                        onChange={(e) => onUpdateField('name', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>{t('category')}</label>
                    <input
                        type="text"
                        placeholder={t('categoryPlaceholder')}
                        value={product.category}
                        onChange={(e) => onUpdateField('category', e.target.value)}
                    />
                </div>

                <div className="form-group full-width">
                    <label>{t('description')}</label>
                    <textarea
                        placeholder={t('descriptionPlaceholder')}
                        value={product.description}
                        onChange={(e) => onUpdateField('description', e.target.value)}
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label>{t('price')}</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        value={product.price || ''}
                        onChange={(e) => onUpdateField('price', parseFloat(e.target.value) || 0)}
                    />
                </div>

                <div className="form-group">
                    <label>{t('unit')}</label>
                    <select
                        value={product.unit}
                        onChange={(e) => onUpdateField('unit', e.target.value)}
                    >
                        <option value="unidad">{t('units.unit')}</option>
                        <option value="kg">{t('units.kg')}</option>
                        <option value="litro">{t('units.liter')}</option>
                        <option value="metro">{t('units.meter')}</option>
                        <option value="caja">{t('units.box')}</option>
                        <option value="paquete">{t('units.package')}</option>
                        <option value="servicio">{t('units.service')}</option>
                        <option value="hora">{t('units.hour')}</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>{t('sku')}</label>
                    <input
                        type="text"
                        placeholder={t('skuPlaceholder')}
                        value={product.sku}
                        onChange={(e) => onUpdateField('sku', e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>{t('stockLabel')} *</label>
                    <input
                        type="number"
                        placeholder="0"
                        value={product.stock || ''}
                        onChange={(e) => onUpdateField('stock', parseInt(e.target.value) || 0)}
                    />
                </div>

                <div className="form-group full-width">
                    <label>{t('variants')}</label>
                    <input
                        type="text"
                        placeholder={t('variantsPlaceholder')}
                        value={product.variants}
                        onChange={(e) => onUpdateField('variants', e.target.value)}
                    />
                </div>

                <div className="form-group full-width">
                    <label>{t('features')}</label>
                    <textarea
                        placeholder={t('featuresPlaceholder')}
                        value={product.features}
                        onChange={(e) => onUpdateField('features', e.target.value)}
                        rows={2}
                    />
                </div>
            </div>

            <div className="product-form-actions">
                <button className="btn-cancel" onClick={onCancel}>
                    {t('cancel')}
                </button>
                <GradientButton onClick={onSave}>
                    <CheckCircle className="btn-icon" />
                    {isEditing ? t('update') : t('addProduct')}
                </GradientButton>
            </div>
        </div>
    )
}
