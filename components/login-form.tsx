"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { apiClient } from "@/lib/api-client"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import GradientButton from "@/components/ui/GradientButton"

export default function LoginForm() {
  const t = useTranslations('login')

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const { login, isLoading, error, clearError } = useAuth()

  // Clear error when inputs change
  useEffect(() => {
    if (error) clearError()
    if (emailError && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setEmailError("")
    if (passwordError && password.length > 0) setPasswordError("")
  }, [email, password]) // eslint-disable-line react-hooks/exhaustive-deps

  const validateForm = () => {
    let isValid = true
    if (!email.trim()) {
        setEmailError(t('emailRequired') || 'El correo es obligatorio')
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError(t('emailInvalid') || 'Formato de correo inválido')
        isValid = false
    }

    if (!password) {
        setPasswordError(t('passwordRequired') || 'La contraseña es obligatoria')
        isValid = false
    }
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await login({ email, password })
  }

  const handleGoogleSignIn = () => {
    apiClient.initiateGoogleOAuth()
  }

  const inputClasses = (hasError: boolean) => `
    w-full px-4 py-3.5 glass border-2 rounded-xl text-foreground 
    placeholder-muted-foreground focus:outline-none transition-all duration-300
    ${hasError
      ? 'border-red-500/50 focus:border-red-500'
      : 'border-primary/20 focus:border-primary/60 focus:bg-white/10'
    }
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  return (
    <form onSubmit={handleSubmit} className="space-y-5 fade-in-up stagger-1">
      {/* Error Alert from Server */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2.5 text-foreground">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className={inputClasses(!!emailError)}
          placeholder={t('emailPlaceholder')}
        />
        {emailError && (
          <div className="mt-2 flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="text-xs font-medium">{emailError}</p>
          </div>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-2.5 text-foreground">
          {t('password')}
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className={`${inputClasses(!!passwordError)} pr-12`}
            placeholder={t('passwordPlaceholder')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors disabled:opacity-50"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {passwordError && (
          <div className="mt-2 flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="text-xs font-medium">{passwordError}</p>
          </div>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm cursor-pointer group">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
            className="w-4 h-4 rounded bg-input border border-primary/20 cursor-pointer accent-primary transition-all group-hover:border-primary/60"
          />
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            {t('rememberMe') || 'Recordarme'}
          </span>
        </label>
        <Link href="/forgot-password" className="text-sm text-accent hover:text-primary transition font-medium">
          {t('forgotPassword') || '¿Olvidaste tu contraseña?'}
        </Link>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <GradientButton type="submit" disabled={isLoading || !email || !password} fullWidth>
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{t('submitting')}</span>
            </>
          ) : (
            <>
              <span>{t('submit')}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </GradientButton>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-background text-muted-foreground">
            {t('orContinueWith') || 'O continúa con'}
          </span>
        </div>
      </div>

      {/* Google Sign In */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full py-3.5 glass border-2 border-primary/20 rounded-xl font-semibold text-foreground hover:bg-white/10 hover:border-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {t('googleSignIn') || 'Continuar con Google'}
      </button>

      {/* Development Mode Indicator */}
      {process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === 'true' && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <CheckCircle className="w-4 h-4" />
          <p className="text-xs">{t('devMode') || 'Modo desarrollo: Cualquier email/contraseña funcionará'}</p>
        </div>
      )}
    </form>
  )
}
