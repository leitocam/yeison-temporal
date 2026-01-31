"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { apiClient } from '@/lib/api-client'

export default function GoogleCallbackPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get token from URL query parameters
                // FastAPI will redirect with token as query param or in hash
                const token = searchParams.get('token') || searchParams.get('access_token')

                if (!token) {
                    setError('No se recibió token de autenticación')
                    return
                }

                // Process the OAuth callback
                await apiClient.handleOAuthCallback(token)

                // Redirect to dashboard
                router.push('/dashboard')
            } catch (err) {
                console.error('OAuth callback error:', err)
                setError(err instanceof Error ? err.message : 'Error al procesar autenticación')

                // Redirect to login after showing error
                setTimeout(() => {
                    router.push('/login')
                }, 3000)
            }
        }

        handleCallback()
    }, [searchParams, router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
            <div className="text-center space-y-4">
                {error ? (
                    <>
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-red-400">Error de autenticación</h2>
                        <p className="text-muted-foreground">{error}</p>
                        <p className="text-sm text-muted-foreground">Redirigiendo al login...</p>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <h2 className="text-xl font-bold text-foreground">Procesando autenticación...</h2>
                        <p className="text-muted-foreground">Por favor espera mientras completamos tu inicio de sesión</p>
                    </>
                )}
            </div>
        </div>
    )
}
