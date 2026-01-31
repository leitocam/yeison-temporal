import { LucideIcon } from 'lucide-react'

// API Response Types
export interface TenantConfiguration {
    id: number
    tenant_id: number
    business: BusinessData | null
    contact: ContactData | null
    products: Record<string, any> | null
    operations: OperationsData | null
    active: boolean
    is_completed: boolean
    created_at: string
    last_update: string
}

export interface BusinessData {
    company_name: string
    industry: string
    company_size: string
    website: string
    location: string
    year_founded: string
    description: string
}

export interface ContactData {
    contact_name: string
    contact_role: string
    contact_email: string
    contact_phone: string
}

export interface OperationsData {
    sales_process: string
    common_questions: string
    objections: string
    closing_techniques: string
    business_hours: string
    response_time: string
    languages: string
    competitors: string
    additional_context: string
    unique_selling_points: string
    target_audience: string
    payment_methods: string
}

// Product interface
export interface Product {
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

export interface FormData {
    // Company info
    companyName: string
    industry: string
    companySize: string
    website: string
    location: string
    yearFounded: string
    description: string

    // Contact info
    contactName: string
    contactRole: string
    contactEmail: string
    contactPhone: string

    // Products
    products: Product[]
    uniqueSellingPoints: string
    targetAudience: string
    paymentMethods: string

    // Sales process
    salesProcess: string
    commonQuestions: string
    objections: string
    closingTechniques: string

    // Operations
    businessHours: string
    responseTime: string
    languages: string
    competitors: string
    additionalContext: string
}

export interface StepInfo {
    id: number
    title: string
    icon: LucideIcon
    description: string
}

export interface StepProps {
    formData: FormData
    updateField: (field: keyof FormData, value: string | Product[]) => void
    isSaving: boolean
    saveSuccess: string | null
    saveError: string | null
    onSave: (section: 'business' | 'contact' | 'operations') => void
}

export interface ProductFormProps {
    product: Omit<Product, 'id'>
    isEditing: boolean
    onUpdateField: (field: keyof Omit<Product, 'id'>, value: string | number) => void
    onSave: () => void
    onCancel: () => void
}

export interface ProductCardProps {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (productId: string) => void
}

export const emptyProduct: Omit<Product, 'id'> = {
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

export const initialFormData: FormData = {
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
}
