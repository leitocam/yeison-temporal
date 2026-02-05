"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Eye, EyeOff, ArrowRight, User, Mail, Phone, Lock, AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import GradientButton from "@/components/ui/GradientButton"
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
    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({})

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof RegisterFormData, string>> = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = t('errors.fullNameRequired')
        }

        if (!formData.email.trim()) {
            newErrors.email = t('errors.emailRequired')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t('errors.emailInvalid')
        }

        if (!formData.password) {
            newErrors.password = t('errors.passwordRequired')
        } else if (formData.password.length < 8) {
            newErrors.password = t('errors.passwordLength')
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('errors.passwordMismatch')
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('errors.phoneRequired')
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
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
                    <motion.p
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4" />
                        {errors.fullName}
                    </motion.p>
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
                    <motion.p
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                    </motion.p>
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
                    <motion.p
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                    </motion.p>
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
                {errors.password && (
                    <motion.p
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4" />
                        {errors.password}
                    </motion.p>
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
                    <motion.p
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword}
                    </motion.p>
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

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center">
                {t('termsPrefix')}{' '}
                <a href="#" className="text-accent hover:text-primary transition">{t('terms')}</a>
                {' '}{t('and')}{' '}
                <a href="#" className="text-accent hover:text-primary transition">{t('privacy')}</a>
            </p>
        </motion.form>
    )
}
