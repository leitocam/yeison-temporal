"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Eye, EyeOff, ArrowRight, User, Mail, Phone, Lock, AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import GradientButton from "@/components/ui/GradientButton"
import { apiClient } from "@/lib/api-client"
import type { RegisterFormData } from "./types"

interface RegisterFormProps {
    onSubmit: (data: RegisterFormData) => void
    initialData?: Partial<RegisterFormData>
    isLoading?: boolean
}

export default function RegisterForm({ onSubmit, initialData, isLoading = false }: RegisterFormProps) {
    const t = useTranslations('register.form')

    const [formData, setFormData] = useState<RegisterFormData>({
        fullName: initialData?.fullName || '',
        email: initialData?.email || '',
        password: initialData?.password || '',
        confirmPassword: initialData?.confirmPassword || '',
        phone: initialData?.phone || '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [termsError, setTermsError] = useState(false)
    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({})

    const calculateStrength = (pass: string) => {
        let score = 0
        if (!pass) return 0
        if (pass.length >= 8) score += 1
        if (pass.match(/[A-Z]/)) score += 1
        if (pass.match(/[0-9]/)) score += 1
        if (pass.match(/[^A-Za-z0-9]/)) score += 1
        return Math.min(3, score)
    }
    const pwdStrength = calculateStrength(formData.password)

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof RegisterFormData, string>> = {}
        let isValid = true

        if (!formData.fullName.trim()) {
            newErrors.fullName = t('errors.fullNameRequired') || 'Nombre completo requerido'
            isValid = false
        }

        if (!formData.email.trim()) {
            newErrors.email = t('errors.emailRequired') || 'Correo requerido'
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('errors.emailInvalid') || 'Formato de correo inválido'
            isValid = false
        }

        if (!formData.password) {
            newErrors.password = t('errors.passwordRequired') || 'Contraseña requerida'
            isValid = false
        } else if (formData.password.length < 8) {
            newErrors.password = t('errors.passwordLength') || 'Mínimo 8 caracteres'
            isValid = false
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('errors.passwordMismatch') || 'Las contraseñas no coinciden'
            isValid = false
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('errors.phoneRequired') || 'Teléfono requerido'
            isValid = false
        }

        if (!acceptTerms) {
            setTermsError(true)
            isValid = false
        } else {
            setTermsError(false)
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(formData)
        }
    }

    const updateField = (field: keyof RegisterFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    const inputClasses = (hasError: boolean) => `
    w-full pl-11 pr-4 py-3.5 glass border-2 rounded-xl text-foreground 
    placeholder-muted-foreground focus:outline-none transition-all duration-300
    ${hasError
            ? 'border-red-500/50 focus:border-red-500'
            : 'border-primary/20 focus:border-primary/60 focus:bg-white/10'
        }
    disabled:opacity-50 disabled:cursor-not-allowed
  `

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Full Name */}
            <div>
                <label htmlFor="fullName" className="block text-sm font-semibold mb-2 text-foreground">
                    {t('fullName')}
                </label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        disabled={isLoading}
                        className={inputClasses(!!errors.fullName)}
                        placeholder={t('fullNamePlaceholder')}
                    />
                </div>
                {errors.fullName && (
                    <motion.div
                        className="mt-2 flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="text-xs font-medium">{errors.fullName}</p>
                    </motion.div>
                )}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-foreground">
                    {t('email')}
                </label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        disabled={isLoading}
                        className={inputClasses(!!errors.email)}
                        placeholder={t('emailPlaceholder')}
                    />
                </div>
                {errors.email && (
                    <motion.div
                        className="mt-2 flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="text-xs font-medium">{errors.email}</p>
                    </motion.div>
                )}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-foreground">
                    {t('phone')}
                </label>
                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        disabled={isLoading}
                        className={inputClasses(!!errors.phone)}
                        placeholder={t('phonePlaceholder')}
                    />
                </div>
                {errors.phone && (
                    <motion.div
                        className="mt-2 flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="text-xs font-medium">{errors.phone}</p>
                    </motion.div>
                )}
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2 text-foreground">
                    {t('password')}
                </label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => updateField('password', e.target.value)}
                        disabled={isLoading}
                        className={`${inputClasses(!!errors.password)} pr-11`}
                        placeholder={t('passwordPlaceholder')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                    <div className="mt-2 flex gap-1">
                        <div className={`h-1.5 flex-1 rounded-full ${pwdStrength >= 1 ? 'bg-red-400' : 'bg-white/10'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${pwdStrength >= 2 ? 'bg-amber-400' : 'bg-white/10'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${pwdStrength >= 3 ? 'bg-emerald-400' : 'bg-white/10'}`} />
                    </div>
                )}
                <div className="flex justify-between mt-1">
                    <p className="text-[10px] text-muted-foreground/60">
                        {formData.password && (
                            pwdStrength === 1 ? 'Débil' : pwdStrength === 2 ? 'Media' : pwdStrength === 3 ? 'Fuerte' : ''
                        )}
                    </p>
                </div>

                {errors.password && (
                    <motion.div
                        className="mt-2 flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="text-xs font-medium">{errors.password}</p>
                    </motion.div>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-foreground">
                    {t('confirmPassword')}
                </label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                        disabled={isLoading}
                        className={`${inputClasses(!!errors.confirmPassword)} pr-11`}
                        placeholder={t('confirmPasswordPlaceholder')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <motion.div
                        className="mt-2 flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="text-xs font-medium">{errors.confirmPassword}</p>
                    </motion.div>
                )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <GradientButton type="submit" disabled={isLoading} fullWidth>
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{t('submitting')}</span>
                        </>
                    ) : (
                        <>
                            <span>{t('continue')}</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </GradientButton>
            </div>

            {/* Terms Checkbox */}
            <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center pt-1">
                        <input
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => {
                                setAcceptTerms(e.target.checked)
                                if (e.target.checked) setTermsError(false)
                            }}
                            disabled={isLoading}
                            className={`w-4 h-4 rounded bg-input border cursor-pointer accent-primary transition-all group-hover:border-primary/60
                                ${termsError ? 'border-red-500' : 'border-primary/20'}
                            `}
                        />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                        {t('termsPrefix')}{' '}
                        <a href="#" className="text-accent hover:text-primary transition font-medium">{t('terms')}</a>
                        {' '}{t('and')}{' '}
                        <a href="#" className="text-accent hover:text-primary transition font-medium">{t('privacy')}</a>
                    </span>
                </label>
                {termsError && (
                    <motion.div
                        className="mt-3 flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="text-xs font-medium">Debes aceptar los términos y condiciones</p>
                    </motion.div>
                )}
            </div>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-background text-muted-foreground">
                        O regístrate con
                    </span>
                </div>
            </div>

            {/* Google Sign In */}
            <button
                type="button"
                onClick={() => apiClient.initiateGoogleOAuth()}
                disabled={isLoading}
                className="w-full py-3.5 glass border-2 border-primary/20 rounded-xl font-semibold text-foreground hover:bg-white/10 hover:border-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar con Google
            </button>
        </motion.form>
    )
}
