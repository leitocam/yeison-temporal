'use client'

import { useState } from 'react'
import { ArrowLeft, Mail, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { apiClient } from '@/lib/api-client'
import Image from 'next/image'
import LogoHorizontal from '@/components/Logos/LogoHorizontal.png'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setState('loading')
    setErrorMsg('')

    try {
      await apiClient.post('/auth/forgot-password', { email })
      setState('success')
    } catch (err: any) {
      setErrorMsg(err?.message || 'No se pudo enviar el correo. Intenta de nuevo.')
      setState('error')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="relative w-48 h-14 mx-auto mb-6">
            <Image src={LogoHorizontal} alt="Yeison" fill className="object-contain" priority />
          </div>
          <h1 className="text-2xl font-black text-white">Recuperar contraseña</h1>
          <p className="text-sm text-[#666] mt-2">
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        {state === 'success' ? (
          <div className="bg-[#0A0A0A] border border-[#A3FF00]/30 rounded-2xl p-6 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-[#A3FF00] mx-auto" />
            <h2 className="text-lg font-bold text-white">Revisa tu correo</h2>
            <p className="text-sm text-[#666]">
              Si el correo <span className="text-[#ADADAD]">{email}</span> está registrado, recibirás un enlace para restablecer tu contraseña en los próximos minutos.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 mt-4 text-sm text-[#A3FF00] hover:underline font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#ADADAD]">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={state === 'loading'}
                  placeholder="correo@ejemplo.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl text-white placeholder-[#444] outline-none focus:border-[#A3FF00]/40 transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {state === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={state === 'loading' || !email.trim()}
              className="w-full py-3 bg-[#A3FF00] text-black font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {state === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar enlace de recuperación'
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
