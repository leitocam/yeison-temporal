import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================
// Route Configuration
// ============================================

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/settings', '/profile', '/agents'];

// Routes only accessible when NOT authenticated
const authRoutes = ['/login', '/register'];

// ============================================
// Middleware
// ============================================

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookies (for SSR/middleware)
    // Note: localStorage isn't available in middleware, so we check cookies
    const token = request.cookies.get('yeison_auth_token')?.value;

    // Check if this is a protected route
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if this is an auth route (login/register)
    const isAuthRoute = authRoutes.some(route =>
        pathname === route || pathname.startsWith(route)
    );

    // If trying to access protected route without token
    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If authenticated user tries to access auth routes, redirect to dashboard
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// ============================================
// Matcher Configuration
// ============================================

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes
         * - static files
         * - images
         * - favicon
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
