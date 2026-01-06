"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, ArrowRight } from "lucide-react"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 fade-in-up stagger-1">
      <div>
        <label className="block text-sm font-semibold mb-2.5 text-foreground">Email address</label>
        <input
          type="email"
          required
          className="w-full px-4 py-3 glass border-2 border-primary/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-white/20 transition-all duration-300"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2.5 text-foreground">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            className="w-full px-4 py-3 glass border-2 border-primary/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-white/20 transition-all duration-300"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded bg-input border border-primary/20 cursor-pointer accent-primary transition-all group-hover:border-primary/60"
          />
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
        </label>
        <a href="#" className="text-sm text-accent hover:text-primary transition font-medium">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 hover-lift btn-premium group"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign in to dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full py-3 glass border-2 border-primary/20 rounded-lg font-semibold text-foreground hover:bg-white/20 hover:border-primary/40 transition-all duration-300"
      >
        Continue with Google
      </button>
    </form>
  )
}
