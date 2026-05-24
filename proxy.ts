import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// ============================================
// Route Configuration
// ============================================

const protectedRoutes = ['/dashboard', '/settings', '/profile', '/agents', '/onboarding'];
const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

// ============================================
// i18n Middleware
// ============================================

const intlMiddleware = createMiddleware(routing);

// ============================================
// Proxy Handler
// ============================================

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    // Get the locale from the pathname or use default
    const pathnameLocale = routing.locales.find(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // Remove locale prefix to check the actual path
    const pathnameWithoutLocale = pathnameLocale
        ? pathname.replace(`/${pathnameLocale}`, '') || '/'
        : pathname;

    // Get token from cookies
    const token = request.cookies.get('yeison_auth_token')?.value;

    // Check if this is a protected route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathnameWithoutLocale.startsWith(route)
    );

    // Check if this is an auth route (login/register)
    const isAuthRoute = authRoutes.some(route =>
        pathnameWithoutLocale === route || pathnameWithoutLocale.startsWith(route)
    );

    // If trying to access protected route without token
    if (isProtectedRoute && !token) {
        const locale = pathnameLocale || routing.defaultLocale;
        const loginUrl = new URL(
            locale === routing.defaultLocale ? '/login' : `/${locale}/login`,
            request.url
        );
        loginUrl.searchParams.set('redirect', pathnameWithoutLocale);
        return NextResponse.redirect(loginUrl);
    }

    // If authenticated user tries to access auth routes, redirect to dashboard
    if (isAuthRoute && token) {
        const locale = pathnameLocale || routing.defaultLocale;
        const dashboardUrl = new URL(
            locale === routing.defaultLocale ? '/dashboard' : `/${locale}/dashboard`,
            request.url
        );
        return NextResponse.redirect(dashboardUrl);
    }

    // Apply i18n middleware
    return intlMiddleware(request);
}

// ============================================
// Matcher Configuration
// ============================================

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
