"use client"

import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, Building2, Users, MessageCircle, Target, Package, Clock, CheckCircle, Sparkles, Save, Plus, Trash2, Edit2 } from 'lucide-react'
import GradientButton from '@/components/ui/GradientButton'
import './onboarding.css'

// Interface para productos individuales
interface Product {
    id: string
    name: string
    description: string
    category: string
    price: number
    unit: string
    sku: string
    variants: string
    features: string
    stock: number
}

interface FormData {
    // Información básica de la empresa
    companyName: string
    industry: string
    companySize: string
    website: string
    location: string
    yearFounded: string
    description: string

    // Contacto principal
    contactName: string
    contactRole: string
    contactEmail: string
    contactPhone: string

    // Productos y servicios (ahora es una lista)
    products: Product[]
    uniqueSellingPoints: string
    targetAudience: string
    paymentMethods: string

    // Proceso de ventas
    salesProcess: string
    commonQuestions: string
    objections: string
    closingTechniques: string

    // Horarios y disponibilidad
    businessHours: string
    responseTime: string
    languages: string

    // Información adicional
    competitors: string
    additionalContext: string
}

const steps = [
    { id: 1, title: 'Empresa', icon: Building2, description: 'Información básica' },
    { id: 2, title: 'Contacto', icon: Users, description: 'Datos del responsable' },
    { id: 3, title: 'Productos', icon: Package, description: 'Catálogo e inventario' },
    { id: 4, title: 'Ventas', icon: Target, description: 'Tu proceso comercial' },
    { id: 5, title: 'Operaciones', icon: Clock, description: 'Horarios y más' },
]

const emptyProduct: Omit<Product, 'id'> = {
    name: '',
    description: '',
    category: '',
    price: 0,
    unit: 'unidad',
    sku: '',
    variants: '',
    features: '',
    stock: 0
}

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [showProductForm, setShowProductForm] = useState(false)
    const [editingProductId, setEditingProductId] = useState<string | null>(null)
    const [currentProduct, setCurrentProduct] = useState<Omit<Product, 'id'>>(emptyProduct)

    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        industry: '',
        companySize: '',
        website: '',
        location: '',
        yearFounded: '',
        description: '',
        contactName: '',
        contactRole: '',
        contactEmail: '',
        contactPhone: '',
        products: [],
        uniqueSellingPoints: '',
        targetAudience: '',
        paymentMethods: '',
        salesProcess: '',
        commonQuestions: '',
        objections: '',
        closingTechniques: '',
        businessHours: '',
        responseTime: '',
        languages: '',
        competitors: '',
        additionalContext: '',
    })

    const updateField = (field: keyof FormData, value: string | Product[]) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

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
            // Actualizar producto existente
            const updatedProducts = formData.products.map(p =>
                p.id === editingProductId ? { ...newProduct, id: editingProductId } : p
            )
            updateField('products', updatedProducts)
            setEditingProductId(null)
        } else {
            // Agregar nuevo producto
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

    const handleSubmit = () => {
        console.log('Form data submitted:', formData)
        // TODO: Enviar datos al backend
        alert('¡Información guardada correctamente! Tus agentes de IA ya tienen el contexto necesario.')
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="form-section fade-in-up">
                        <div className="section-header">
                            <Building2 className="section-icon" />
                            <div>
                                <h2>Información de la Empresa</h2>
                                <p>Cuéntanos sobre tu negocio para que nuestros agentes te representen correctamente</p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="companyName">Nombre de la empresa *</label>
                                <input
                                    id="companyName"
                                    type="text"
                                    placeholder="Ej: Comercial Santa Cruz S.R.L."
                                    value={formData.companyName}
                                    onChange={(e) => updateField('companyName', e.target.value)}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="companyName">Descripcion de la Empresa *</label>
                                <input
                                    id="companyDescription"
                                    type="text"
                                    placeholder="Breve descripcion: Quiénes somos, a qué nos dedicamos, cuál es nuestro objetivo."
                                    value={formData.description}
                                    onChange={(e) => updateField('description', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="industry">Industria / Rubro *</label>
                                <select
                                    id="industry"
                                    value={formData.industry}
                                    onChange={(e) => updateField('industry', e.target.value)}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="retail">Retail / Comercio</option>
                                    <option value="services">Servicios</option>
                                    <option value="technology">Tecnología</option>
                                    <option value="food">Alimentos y Bebidas</option>
                                    <option value="health">Salud</option>
                                    <option value="education">Educación</option>
                                    <option value="construction">Construcción</option>
                                    <option value="automotive">Automotriz</option>
                                    <option value="real-estate">Bienes Raíces</option>
                                    <option value="tourism">Turismo</option>
                                    <option value="other">Otro</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="companySize">Tamaño de empresa</label>
                                <select
                                    id="companySize"
                                    value={formData.companySize}
                                    onChange={(e) => updateField('companySize', e.target.value)}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="1-5">1-5 empleados</option>
                                    <option value="6-20">6-20 empleados</option>
                                    <option value="21-50">21-50 empleados</option>
                                    <option value="51-200">51-200 empleados</option>
                                    <option value="200+">Más de 200</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="website">Sitio web</label>
                                <input
                                    id="website"
                                    type="url"
                                    placeholder="https://www.tuempresa.com"
                                    value={formData.website}
                                    onChange={(e) => updateField('website', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Ubicación</label>
                                <input
                                    id="location"
                                    type="text"
                                    placeholder="Ej: Santa Cruz, Bolivia"
                                    value={formData.location}
                                    onChange={(e) => updateField('location', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="yearFounded">Año de fundación</label>
                                <input
                                    id="yearFounded"
                                    type="text"
                                    placeholder="Ej: 2015"
                                    value={formData.yearFounded}
                                    onChange={(e) => updateField('yearFounded', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )

            case 2:
                return (
                    <div className="form-section fade-in-up">
                        <div className="section-header">
                            <Users className="section-icon" />
                            <div>
                                <h2>Contacto Principal</h2>
                                <p>¿Quién será el responsable de gestionar los agentes?</p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="contactName">Nombre completo *</label>
                                <input
                                    id="contactName"
                                    type="text"
                                    placeholder="Ej: Juan Pérez Miranda"
                                    value={formData.contactName}
                                    onChange={(e) => updateField('contactName', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactRole">Cargo / Rol</label>
                                <input
                                    id="contactRole"
                                    type="text"
                                    placeholder="Ej: Gerente Comercial"
                                    value={formData.contactRole}
                                    onChange={(e) => updateField('contactRole', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactEmail">Email *</label>
                                <input
                                    id="contactEmail"
                                    type="email"
                                    placeholder="juan@empresa.com"
                                    value={formData.contactEmail}
                                    onChange={(e) => updateField('contactEmail', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contactPhone">Teléfono / WhatsApp</label>
                                <input
                                    id="contactPhone"
                                    type="tel"
                                    placeholder="+591 70000000"
                                    value={formData.contactPhone}
                                    onChange={(e) => updateField('contactPhone', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )

            case 3:
                return (
                    <div className="form-section fade-in-up">
                        <div className="section-header">
                            <Package className="section-icon" />
                            <div>
                                <h2>Catálogo de Productos</h2>
                                <p>Agrega tus productos con detalles. Esto servirá como base para tu inventario.</p>
                            </div>
                        </div>

                        {/* Lista de productos */}
                        {formData.products.length > 0 && (
                            <div className="products-list">
                                <h3 className="products-list-title">
                                    📦 Productos agregados ({formData.products.length})
                                </h3>
                                {formData.products.map((product) => (
                                    <div key={product.id} className="product-card">
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
                                                    Stock: {product.stock}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="product-actions">
                                            <button
                                                className="btn-icon-action edit"
                                                onClick={() => editProduct(product)}
                                                title="Editar"
                                            >
                                                <Edit2 className="icon" />
                                            </button>
                                            <button
                                                className="btn-icon-action delete"
                                                onClick={() => deleteProduct(product.id)}
                                                title="Eliminar"
                                            >
                                                <Trash2 className="icon" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Formulario de producto */}
                        {showProductForm ? (
                            <div className="product-form">
                                <h3 className="product-form-title">
                                    {editingProductId ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
                                </h3>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Nombre del producto *</label>
                                        <input
                                            type="text"
                                            placeholder="Ej: Silla Ergonómica Premium"
                                            value={currentProduct.name}
                                            onChange={(e) => updateProductField('name', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Categoría</label>
                                        <input
                                            type="text"
                                            placeholder="Ej: Muebles de oficina"
                                            value={currentProduct.category}
                                            onChange={(e) => updateProductField('category', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Descripción del producto</label>
                                        <textarea
                                            placeholder="Describe el producto con detalles que el agente pueda usar para vender..."
                                            value={currentProduct.description}
                                            onChange={(e) => updateProductField('description', e.target.value)}
                                            rows={3}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Precio (Bs.)</label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={currentProduct.price || ''}
                                            onChange={(e) => updateProductField('price', parseFloat(e.target.value) || 0)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Unidad de venta</label>
                                        <select
                                            value={currentProduct.unit}
                                            onChange={(e) => updateProductField('unit', e.target.value)}
                                        >
                                            <option value="unidad">Unidad</option>
                                            <option value="kg">Kilogramo</option>
                                            <option value="litro">Litro</option>
                                            <option value="metro">Metro</option>
                                            <option value="caja">Caja</option>
                                            <option value="paquete">Paquete</option>
                                            <option value="servicio">Servicio</option>
                                            <option value="hora">Hora</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Código/SKU (opcional)</label>
                                        <input
                                            type="text"
                                            placeholder="Ej: SILLA-PREM-001"
                                            value={currentProduct.sku}
                                            onChange={(e) => updateProductField('sku', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Stock disponible *</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={currentProduct.stock || ''}
                                            onChange={(e) => updateProductField('stock', parseInt(e.target.value) || 0)}
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Variantes (colores, tamaños, etc.)</label>
                                        <input
                                            type="text"
                                            placeholder="Ej: Negro, Blanco, Gris | Pequeño, Mediano, Grande"
                                            value={currentProduct.variants}
                                            onChange={(e) => updateProductField('variants', e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Características destacadas</label>
                                        <textarea
                                            placeholder="Ej: Respaldo ajustable, ruedas de goma, garantía 2 años, soporte lumbar..."
                                            value={currentProduct.features}
                                            onChange={(e) => updateProductField('features', e.target.value)}
                                            rows={2}
                                        />
                                    </div>
                                </div>

                                <div className="product-form-actions">
                                    <button className="btn-cancel" onClick={cancelProductForm}>
                                        Cancelar
                                    </button>
                                    <GradientButton onClick={addProduct}>
                                        <CheckCircle className="btn-icon" />
                                        {editingProductId ? 'Actualizar' : 'Agregar Producto'}
                                    </GradientButton>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="add-product-btn"
                                onClick={() => setShowProductForm(true)}
                            >
                                <Plus className="icon" />
                                Agregar Producto
                            </button>
                        )}

                        {/* Información adicional */}
                        <div className="form-grid" style={{ marginTop: '2rem' }}>
                            <div className="form-group full-width">
                                <label htmlFor="uniqueSellingPoints">¿Qué diferencia a tus productos de la competencia?</label>
                                <textarea
                                    id="uniqueSellingPoints"
                                    placeholder="Ej: Garantía extendida, entrega en 24h, instalación gratuita, mejores materiales..."
                                    value={formData.uniqueSellingPoints}
                                    onChange={(e) => updateField('uniqueSellingPoints', e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="targetAudience">¿Quién es tu cliente ideal?</label>
                                <textarea
                                    id="targetAudience"
                                    placeholder="Ej: Empresas medianas, profesionales independientes, familias..."
                                    value={formData.targetAudience}
                                    onChange={(e) => updateField('targetAudience', e.target.value)}
                                    rows={2}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="paymentMethods">Métodos de pago aceptados</label>
                                <input
                                    id="paymentMethods"
                                    type="text"
                                    placeholder="Ej: Efectivo, Transferencia, QR, Tarjetas, Financiamiento"
                                    value={formData.paymentMethods}
                                    onChange={(e) => updateField('paymentMethods', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )

            case 4:
                return (
                    <div className="form-section fade-in-up">
                        <div className="section-header">
                            <Target className="section-icon" />
                            <div>
                                <h2>Proceso de Ventas</h2>
                                <p>Ayúdanos a entender cómo vendes actualmente</p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="salesProcess">¿Cómo es tu proceso de venta típico?</label>
                                <textarea
                                    id="salesProcess"
                                    placeholder="Describe paso a paso. Ej: 1) Cliente pregunta por WhatsApp, 2) Le enviamos catálogo PDF, 3) Cotizamos según sus necesidades, 4) Agendamos visita a showroom, 5) Cerramos venta y coordinamos entrega..."
                                    value={formData.salesProcess}
                                    onChange={(e) => updateField('salesProcess', e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="commonQuestions">Preguntas frecuentes que hacen tus clientes *</label>
                                <textarea
                                    id="commonQuestions"
                                    placeholder="Lista las preguntas más comunes. Ej: ¿Tienen garantía? ¿Hacen entregas al interior? ¿Cuánto demora la entrega? ¿Tienen financiamiento? ¿Puedo personalizar colores?..."
                                    value={formData.commonQuestions}
                                    onChange={(e) => updateField('commonQuestions', e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="objections">Objeciones comunes y cómo las manejas</label>
                                <textarea
                                    id="objections"
                                    placeholder="Ej: 'Es muy caro' → Ofrecemos financiamiento y nuestros productos duran el doble. 'Necesito pensarlo' → Ofrecemos un 10% de descuento si decide hoy..."
                                    value={formData.objections}
                                    onChange={(e) => updateField('objections', e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="closingTechniques">Técnicas de cierre que funcionan</label>
                                <textarea
                                    id="closingTechniques"
                                    placeholder="Ej: Ofrecer descuento por tiempo limitado, agregar un producto gratis, mostrar testimonios de otros clientes..."
                                    value={formData.closingTechniques}
                                    onChange={(e) => updateField('closingTechniques', e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                )

            case 5:
                return (
                    <div className="form-section fade-in-up">
                        <div className="section-header">
                            <Clock className="section-icon" />
                            <div>
                                <h2>Operaciones y Contexto Adicional</h2>
                                <p>Información operativa y detalles finales</p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label htmlFor="businessHours">Horario de atención</label>
                                <input
                                    id="businessHours"
                                    type="text"
                                    placeholder="Ej: Lunes a Viernes 8:00-18:00, Sábados 9:00-13:00"
                                    value={formData.businessHours}
                                    onChange={(e) => updateField('businessHours', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="responseTime">Tiempo de respuesta esperado</label>
                                <select
                                    id="responseTime"
                                    value={formData.responseTime}
                                    onChange={(e) => updateField('responseTime', e.target.value)}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="immediate">Inmediato (24/7)</option>
                                    <option value="1hour">En menos de 1 hora</option>
                                    <option value="same-day">Mismo día</option>
                                    <option value="business-hours">Solo en horario laboral</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="languages">Idiomas de atención</label>
                                <input
                                    id="languages"
                                    type="text"
                                    placeholder="Ej: Español, un poco de inglés"
                                    value={formData.languages}
                                    onChange={(e) => updateField('languages', e.target.value)}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="competitors">Principales competidores (opcional)</label>
                                <textarea
                                    id="competitors"
                                    placeholder="Menciona tus principales competidores y qué te diferencia de ellos..."
                                    value={formData.competitors}
                                    onChange={(e) => updateField('competitors', e.target.value)}
                                    rows={2}
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="additionalContext">Cualquier otra información que deba saber el agente</label>
                                <textarea
                                    id="additionalContext"
                                    placeholder="Agrega cualquier contexto adicional que ayude al agente a representar mejor a tu empresa..."
                                    value={formData.additionalContext}
                                    onChange={(e) => updateField('additionalContext', e.target.value)}
                                    rows={4}
                                />
                            </div>
                        </div>
                    </div>
                )

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

            {/* Header */}
            <header className="onboarding-header">
                <div className="header-content">
                    <div className="logo">
                        <Sparkles className="logo-icon" />
                        <span>Yeison</span>
                    </div>
                    <div className="header-info">
                        <span className="step-indicator">Paso {currentStep} de {steps.length}</span>
                    </div>
                </div>
            </header>

            {/* Progress Steps */}
            <div className="progress-container">
                <div className="progress-steps">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
                            onClick={() => setCurrentStep(step.id)}
                        >
                            <div className="step-icon">
                                {currentStep > step.id ? (
                                    <CheckCircle className="icon" />
                                ) : (
                                    <step.icon className="icon" />
                                )}
                            </div>
                            <div className="step-text">
                                <span className="step-title">{step.title}</span>
                                <span className="step-description">{step.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Form Content */}
            <main className="form-container">
                <div className="form-card">
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="form-navigation">
                        {currentStep > 1 && (
                            <GradientButton onClick={prevStep}>
                                <ArrowLeft className="btn-icon" />
                                Anterior
                            </GradientButton>
                        )}

                        <div className="spacer"></div>

                        {currentStep < steps.length ? (
                            <GradientButton onClick={nextStep}>
                                Siguiente
                                <ArrowRight className="btn-icon" />
                            </GradientButton>
                        ) : (
                            <GradientButton onClick={handleSubmit}>
                                <Save className="btn-icon" />
                                Guardar y Finalizar
                            </GradientButton>
                        )}
                    </div>
                </div>
            </main>

            {/* Tips Section */}
            <aside className="tips-section">
                <div className="tip-card">
                    <h3>💡 Consejo</h3>
                    <p>
                        {currentStep === 1 && "Mientras más detallada sea la información de tu empresa, mejor podrá representarte nuestro agente de IA."}
                        {currentStep === 2 && "El contacto principal recibirá notificaciones importantes sobre las conversaciones del agente."}
                        {currentStep === 3 && "Agrega todos tus productos con stock. El agente verificará disponibilidad antes de ofrecer cada producto."}
                        {currentStep === 4 && "Las objeciones bien documentadas ayudan al agente a cerrar más ventas."}
                        {currentStep === 5 && "Esta información ayuda al agente a manejar expectativas y dar información precisa."}
                    </p>
                </div>
            </aside>
        </div>
    )
}
