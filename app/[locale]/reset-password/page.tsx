'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle, Loader2, Lock } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { apiClient } from '@/lib/api-client'
import Image from 'next/image'
import LogoHorizontal from '@/components/Logos/LogoHorizontal.png'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const isValid = password.length >= 8 && password === confirm

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || !token) return

    setState('loading')
    setErrorMsg('')

    try {
      await apiClient.post('/auth/reset-password', { token, password })
      setState('success')
    } catch (err: any) {
      setErrorMsg(err?.message || 'No se pudo restablecer la contraseña. El enlace puede haber expirado.')
      setState('error')
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">Enlace inválido</h1>
        <p className="text-sm text-[#666] mb-6">
          El enlace de recuperación no es válido o ha expirado.
        </p>
        <Link href="/forgot-password" className="text-[#A3FF00] text-sm hover:underline">
          Solicitar un nuevo enlace
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="relative w-48 h-14 mx-auto mb-6">
            <Image src={LogoHorizontal} alt="Yeison" fill className="object-contain" priority />
          </div>
          <h1 className="text-2xl font-black text-white">Nueva contraseña</h1>
          <p className="text-sm text-[#666] mt-2">
            Ingresa tu nueva contraseña. Debe tener al menos 8 caracteres.
          </p>
        </div>

        {state === 'success' ? (
          <div className="bg-[#0A0A0A] border border-[#A3FF00]/30 rounded-2xl p-6 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-[#A3FF00] mx-auto" />
            <h2 className="text-lg font-bold text-white">Contraseña actualizada</h2>
            <p className="text-sm text-[#666]">
              Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión.
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 px-8 py-3 bg-[#A3FF00] text-black font-bold rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              Ir al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#ADADAD]">Nueva contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={state === 'loading'}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-10 pr-12 py-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-white placeholder-[#444] outline-none focus:border-[#A3FF00]/40 transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#ADADAD] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#ADADAD]">Confirmar contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  disabled={state === 'loading'}
                  placeholder="Repite la contraseña"
                  className={`w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border rounded-xl text-white placeholder-[#444] outline-none transition-colors disabled:opacity-50 ${
                    confirm && password !== confirm
                      ? 'border-red-500/40 focus:border-red-500/60'
                      : 'border-[#1A1A1A] focus:border-[#A3FF00]/40'
                  }`}
                />
              </div>
              {confirm && password !== confirm && (
                <p className="text-xs text-red-400">Las contraseñas no coinciden</p>
              )}
            </div>

            {state === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={state === 'loading' || !isValid}
              className="w-full py-3 bg-[#A3FF00] text-black font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {state === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                'Restablecer contraseña'
              )}
            </button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-[#555] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio de sesión
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
