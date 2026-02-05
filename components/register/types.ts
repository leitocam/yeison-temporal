// Types for registration flow

export interface RegisterFormData {
    fullName: string
    email: string
    password: string
    confirmPassword: string
    phone: string
}

export interface SelectedPlan {
    id: string
    name: string
    price: string
    period: string
    billingCycle: 'monthly' | 'annual'
}

export interface PaymentStatus {
    status: 'pending' | 'verifying' | 'confirmed' | 'expired'
    qrCode?: string
    expiresAt?: Date
}

export type RegisterStep = 'form' | 'plan' | 'payment' | 'confirmation'
