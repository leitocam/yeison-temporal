"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const { login, isLoading, error, clearError } = useAuth()

  // Clear error when inputs change
  useEffect(() => {
    if (error) {
      clearError()
    }
  }, [email, password]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      return
    }

    await login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 fade-in-up stagger-1">
      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2.5 text-foreground">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={isLoading}
          className="w-full px-4 py-3 glass border-2 border-primary/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="tu@empresa.com"
        />
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-2.5 text-foreground">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={isLoading}
            className="w-full px-4 py-3 glass border-2 border-primary/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="••••••••"
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
            Recordarme
          </span>
        </label>
        <a href="#" className="text-sm text-accent hover:text-primary transition font-medium">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !email || !password}
        className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 hover-lift btn-premium group"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Ingresando...</span>
          </>
        ) : (
          <>
            <span>Ingresar al panel</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">O continúa con</span>
        </div>
      </div>

      {/* Google Sign In */}
      <button
        type="button"
        disabled={isLoading}
        className="w-full py-3 glass border-2 border-primary/20 rounded-lg font-semibold text-foreground hover:bg-white/20 hover:border-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continuar con Google
      </button>

      {/* Development Mode Indicator */}
      {process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === 'true' && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <CheckCircle className="w-4 h-4" />
          <p className="text-xs">Modo desarrollo: Cualquier email/contraseña funcionará</p>
        </div>
      )}
    </form>
  )
}
