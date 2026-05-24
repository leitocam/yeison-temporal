'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Shield, Key, Eye, EyeOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { apiClient } from '@/lib/api-client'

const passwordSchema = z
  .object({
    current: z.string().min(1, 'Ingresa tu contraseña actual'),
    newPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirm: z.string().min(1, 'Confirma tu contraseña'),
  })
  .refine((d) => d.newPassword === d.confirm, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm'],
  })

type PasswordForm = z.infer<typeof passwordSchema>
type SaveState = 'idle' | 'loading' | 'success' | 'error'

export default function SecurityPage() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [passwordState, setPasswordState] = useState<SaveState>('idle')
  const [passwordError, setPasswordError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { current: '', newPassword: '', confirm: '' },
  })

  const onPasswordSubmit = async (data: PasswordForm) => {
    setPasswordState('loading')
    setPasswordError('')
    try {
      await apiClient.post('/auth/change-password', {
        current_password: data.current,
        new_password: data.newPassword,
      })
      reset()
      setPasswordState('success')
      setTimeout(() => setPasswordState('idle'), 4000)
    } catch (err: any) {
      setPasswordError(err?.message || 'No se pudo actualizar la contraseña. Verifica que la contraseña actual sea correcta.')
      setPasswordState('error')
      setTimeout(() => setPasswordState('idle'), 5000)
    }
  }

  const inputClass = `w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 pr-12 outline-none focus:border-primary/50 transition-colors`

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Seguridad y Privacidad</h1>
        <p className="text-muted-foreground mt-1">Protege tu cuenta y gestiona tus métodos de acceso.</p>
      </div>

      <div className="grid gap-6">
        {/* 2FA Card */}
        <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Autenticación de Dos Factores</h2>
              <p className="text-sm text-muted-foreground">Protección adicional para tu cuenta</p>
            </div>
          </div>

          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-400">2FA no configurado</p>
              <p className="text-xs text-muted-foreground mt-1">
                La autenticación de dos factores agrega una capa extra de seguridad. Próximamente disponible.
              </p>
            </div>
            <span className="text-xs font-mono text-[#555] border border-[#1A1A1A] rounded-full px-2 py-0.5 whitespace-nowrap">
              Próximamente
            </span>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Cambiar Contraseña</h2>
            </div>
          </div>

          {passwordState === 'success' ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">Contraseña actualizada correctamente.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4 max-w-md">
              {/* Current password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Contraseña Actual</label>
                <div className="relative">
                  <input
                    {...register('current')}
                    type={showCurrent ? 'text' : 'password'}
                    className={inputClass}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.current && <p className="text-xs text-red-400">{errors.current.message}</p>}
              </div>

              {/* New password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Nueva Contraseña</label>
                <div className="relative">
                  <input
                    {...register('newPassword')}
                    type={showNew ? 'text' : 'password'}
                    className={inputClass}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.newPassword && <p className="text-xs text-red-400">{errors.newPassword.message}</p>}
              </div>

              {/* Confirm */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirmar Nueva Contraseña</label>
                <input
                  {...register('confirm')}
                  type={showNew ? 'text' : 'password'}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 transition-colors"
                  placeholder="Repite la contraseña"
                />
                {errors.confirm && <p className="text-xs text-red-400">{errors.confirm.message}</p>}
              </div>

              {passwordState === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {passwordError}
                </div>
              )}

              <button
                type="submit"
                disabled={passwordState === 'loading' || !isDirty}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 font-medium rounded-xl transition-colors disabled:opacity-40"
              >
                {passwordState === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
                Actualizar Contraseña
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
