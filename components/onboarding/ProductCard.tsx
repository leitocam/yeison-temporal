'use client'

import { Edit2, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Product } from './types'

interface ProductCardProps {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (productId: string) => void
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    const t = useTranslations('onboarding.products')

    return (
        <div className="product-card">
            <div className="product-info">
                <div className="product-header">
                    <span className="product-name">{product.name}</span>
                    <span className="product-category">{product.category}</span>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                    <span className="product-price">
                        Bs. {product.price.toLocaleString()} / {product.unit}
                    </span>
                    {product.sku && <span className="product-sku">SKU: {product.sku}</span>}
                    <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                        {t('stock')}: {product.stock}
                    </span>
                </div>
            </div>
            <div className="product-actions">
                <button
                    className="btn-icon-action edit"
                    onClick={() => onEdit(product)}
                    title={t('edit')}
                >
                    <Edit2 className="icon" />
                </button>
                <button
                    className="btn-icon-action delete"
                    onClick={() => onDelete(product.id)}
                    title={t('delete')}
                >
                    <Trash2 className="icon" />
                </button>
            </div>
        </div>
    )
}
