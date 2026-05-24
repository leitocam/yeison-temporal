import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handleI18nRouting = createMiddleware(routing)

// Segments that require authentication
const PROTECTED_SEGMENTS = ['/dashboard', '/onboarding']
// Segments only accessible when NOT authenticated
const AUTH_ONLY_SEGMENTS = ['/login', '/register', '/forgot-password', '/reset-password']

// Cookie name must match what tokenStorage.setAccessToken writes in lib/api-client.ts
const AUTH_COOKIE = 'yeison_auth_token'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value
  const { pathname } = request.nextUrl

  // Detect locale from path — routing uses localePrefix: 'as-needed',
  // so English has /en/ prefix and Spanish has none (default).
  const isEnglish = pathname.startsWith('/en')
  const loginPath = isEnglish ? '/en/login' : '/login'
  const dashboardPath = isEnglish ? '/en/dashboard' : '/dashboard'

  const isProtected = PROTECTED_SEGMENTS.some((s) => pathname.includes(s))
  const isAuthOnly = AUTH_ONLY_SEGMENTS.some((s) => pathname.includes(s))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(loginPath, request.url))
  }

  if (isAuthOnly && token) {
    return NextResponse.redirect(new URL(dashboardPath, request.url))
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
