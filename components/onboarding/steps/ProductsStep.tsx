'use client'

import { useState } from 'react'
import { Package, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { StepProps, Product, emptyProduct } from '../types'
import ProductCard from '../ProductCard'
import ProductForm from '../ProductForm'

export default function ProductsStep({ formData, updateField }: StepProps) {
    const t = useTranslations('onboarding.products')
    const [showProductForm, setShowProductForm] = useState(false)
    const [editingProductId, setEditingProductId] = useState<string | null>(null)
    const [currentProduct, setCurrentProduct] = useState<Omit<Product, 'id'>>(emptyProduct)

    const updateProductField = (field: keyof Omit<Product, 'id'>, value: string | number) => {
        setCurrentProduct(prev => ({ ...prev, [field]: value }))
    }

    const addProduct = () => {
        if (!currentProduct.name.trim()) return

        const newProduct: Product = {
            ...currentProduct,
            id: Date.now().toString()
        }

        if (editingProductId) {
            const updatedProducts = formData.products.map(p =>
                p.id === editingProductId ? { ...newProduct, id: editingProductId } : p
            )
            updateField('products', updatedProducts)
            setEditingProductId(null)
        } else {
            updateField('products', [...formData.products, newProduct])
        }

        setCurrentProduct(emptyProduct)
        setShowProductForm(false)
    }

    const editProduct = (product: Product) => {
        setCurrentProduct({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            unit: product.unit,
            sku: product.sku,
            variants: product.variants,
            features: product.features,
            stock: product.stock
        })
        setEditingProductId(product.id)
        setShowProductForm(true)
    }

    const deleteProduct = (productId: string) => {
        const updatedProducts = formData.products.filter(p => p.id !== productId)
        updateField('products', updatedProducts)
    }

    const cancelProductForm = () => {
        setCurrentProduct(emptyProduct)
        setEditingProductId(null)
        setShowProductForm(false)
    }

    return (
        <div className="form-section fade-in-up">
            <div className="section-header">
                <Package className="section-icon" />
                <div>
                    <h2>{t('title')}</h2>
                    <p>{t('subtitle')}</p>
                    <p style={{ fontSize: '0.875rem', color: '#f59e0b', marginTop: '0.5rem' }}>
                        ⚠️ {t('devNote')}
                    </p>
                </div>
            </div>

            {/* Product list */}
            {formData.products.length > 0 && (
                <div className="products-list">
                    <h3 className="products-list-title">
                        📦 {t('productsAdded')} ({formData.products.length})
                    </h3>
                    {formData.products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={editProduct}
                            onDelete={deleteProduct}
                        />
                    ))}
                </div>
            )}

            {/* Product form */}
            {showProductForm ? (
                <ProductForm
                    product={currentProduct}
                    isEditing={!!editingProductId}
                    onUpdateField={updateProductField}
                    onSave={addProduct}
                    onCancel={cancelProductForm}
                />
            ) : (
                <button
                    className="add-product-btn"
                    onClick={() => setShowProductForm(true)}
                >
                    <Plus className="icon" />
                    {t('addProductBtn')}
                </button>
            )}

            {/* Additional info */}
            <div className="form-grid" style={{ marginTop: '2rem' }}>
                <div className="form-group full-width">
                    <label htmlFor="uniqueSellingPoints">{t('uniqueSellingPoints')}</label>
                    <textarea
                        id="uniqueSellingPoints"
                        placeholder={t('uniqueSellingPointsPlaceholder')}
                        value={formData.uniqueSellingPoints}
                        onChange={(e) => updateField('uniqueSellingPoints', e.target.value)}
                        rows={3}
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="targetAudience">{t('targetAudience')}</label>
                    <textarea
                        id="targetAudience"
                        placeholder={t('targetAudiencePlaceholder')}
                        value={formData.targetAudience}
                        onChange={(e) => updateField('targetAudience', e.target.value)}
                        rows={2}
                    />
                </div>

                <div className="form-group full-width">
                    <label htmlFor="paymentMethods">{t('paymentMethods')}</label>
                    <input
                        id="paymentMethods"
                        type="text"
                        placeholder={t('paymentMethodsPlaceholder')}
                        value={formData.paymentMethods}
                        onChange={(e) => updateField('paymentMethods', e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
