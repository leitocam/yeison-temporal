'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Settings, User, Bell, Palette, Loader2, Check, AlertCircle } from 'lucide-react'
import { apiClient } from '@/lib/api-client'
import { tokenStorage } from '@/lib/api-client'
import * as Switch from '@radix-ui/react-switch'

const profileSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo inválido'),
})

type ProfileForm = z.infer<typeof profileSchema>

type SaveState = 'idle' | 'loading' | 'success' | 'error'

export default function SettingsPage() {
  const [profileState, setProfileState] = useState<SaveState>('idle')
  const [profileError, setProfileError] = useState('')
  const [notifLeads, setNotifLeads] = useState(true)
  const [notifReports, setNotifReports] = useState(false)
  const [notifState, setNotifState] = useState<SaveState>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', email: '' },
  })

  // Pre-fill with stored user data
  useEffect(() => {
    const user = tokenStorage.getUser()
    if (user) {
      reset({ name: user.name ?? '', email: user.email ?? '' })
    }
  }, [reset])

  const onProfileSubmit = async (data: ProfileForm) => {
    setProfileState('loading')
    setProfileError('')
    try {
      const updated = await apiClient.patch<{ name: string; email: string }>('/users/me', data)
      // Update stored user
      const user = tokenStorage.getUser()
      if (user) tokenStorage.setUser({ ...user, ...updated })
      reset(data)
      setProfileState('success')
      setTimeout(() => setProfileState('idle'), 3000)
    } catch (err: any) {
      setProfileError(err?.message || 'No se pudieron guardar los cambios.')
      setProfileState('error')
      setTimeout(() => setProfileState('idle'), 4000)
    }
  }

  const saveNotifications = async (leads: boolean, reports: boolean) => {
    setNotifState('loading')
    try {
      await apiClient.patch('/users/me/notifications', {
        lead_alerts: leads,
        daily_reports: reports,
      })
      setNotifState('success')
      setTimeout(() => setNotifState('idle'), 2000)
    } catch {
      setNotifState('idle')
    }
  }

  const handleNotifChange = (key: 'leads' | 'reports', value: boolean) => {
    const newLeads = key === 'leads' ? value : notifLeads
    const newReports = key === 'reports' ? value : notifReports
    if (key === 'leads') setNotifLeads(value)
    else setNotifReports(value)
    saveNotifications(newLeads, newReports)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground mt-1">Gestiona las preferencias de tu cuenta y el comportamiento de Yeison.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Card */}
        <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Perfil de Usuario</h2>
              <p className="text-sm text-muted-foreground">Actualiza tu información personal</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre Completo</label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 transition-colors"
                  placeholder="Tu Nombre"
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Correo Electrónico</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 outline-none focus:border-primary/50 transition-colors"
                  placeholder="correo@ejemplo.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            {profileState === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {profileError}
              </div>
            )}

            <button
              type="submit"
              disabled={profileState === 'loading' || !isDirty}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 font-medium rounded-xl transition-colors disabled:opacity-40"
            >
              {profileState === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
              {profileState === 'success' && <Check className="w-4 h-4" />}
              {profileState === 'success' ? 'Guardado' : 'Guardar Cambios'}
            </button>
          </form>
        </div>

        {/* Notifications & Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                <Bell className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Notificaciones</h2>
                {notifState === 'success' && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Guardado
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Alertas de Leads</span>
                <Switch.Root
                  checked={notifLeads}
                  onCheckedChange={(v) => handleNotifChange('leads', v)}
                  className="w-10 h-6 bg-primary/20 data-[state=checked]:bg-primary rounded-full relative cursor-pointer transition-colors outline-none"
                >
                  <Switch.Thumb className="block w-4 h-4 bg-background rounded-full transition-transform translate-x-1 data-[state=checked]:translate-x-5" />
                </Switch.Root>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Reportes Diarios</span>
                <Switch.Root
                  checked={notifReports}
                  onCheckedChange={(v) => handleNotifChange('reports', v)}
                  className="w-10 h-6 bg-primary/20 data-[state=checked]:bg-primary rounded-full relative cursor-pointer transition-colors outline-none"
                >
                  <Switch.Thumb className="block w-4 h-4 bg-background rounded-full transition-transform translate-x-1 data-[state=checked]:translate-x-5" />
                </Switch.Root>
              </div>
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-md border border-primary/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Apariencia</h2>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Modo Oscuro</p>
                  <p className="text-xs text-muted-foreground">La plataforma siempre usa modo oscuro</p>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full relative flex items-center justify-end pr-1">
                  <div className="w-4 h-4 bg-background rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Animaciones</p>
                  <p className="text-xs text-muted-foreground">Desactivar si prefieres menos movimiento</p>
                </div>
                <div className="w-10 h-6 bg-primary/20 rounded-full relative flex items-center justify-start pl-1">
                  <div className="w-4 h-4 bg-muted-foreground rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
