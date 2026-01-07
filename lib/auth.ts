/**
 * Authentication Utilities
 * Helper functions for auth state management
 */

import { tokenStorage, User } from './api-client';

// ============================================
// Auth State Helpers
// ============================================

/**
 * Check if user is currently authenticated
 */
export function isAuthenticated(): boolean {
    return tokenStorage.isAuthenticated();
}

/**
 * Get the current user from storage
 */
export function getCurrentUser(): User | null {
    return tokenStorage.getUser();
}

/**
 * Clear all auth data (logout)
 */
export function clearAuth(): void {
    tokenStorage.clearAll();
}

/**
 * Check if a token is expired
 * Note: This is a simple check, real implementation would decode JWT
 */
export function isTokenExpired(token: string): boolean {
    try {
        // For JWT tokens, decode and check exp claim
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000; // Convert to milliseconds
        return Date.now() > exp;
    } catch {
        // If we can't decode, assume it's valid (mock tokens, etc.)
        return false;
    }
}

/**
 * Get auth headers for external requests
 */
export function getAuthHeaders(): Record<string, string> {
    const token = tokenStorage.getAccessToken();
    if (!token) return {};

    return {
        'Authorization': `Bearer ${token}`,
    };
}

// ============================================
// Route Protection Helpers
// ============================================

/**
 * Protected routes configuration
 */
export const protectedRoutes = [
    '/dashboard',
    '/settings',
    '/profile',
    '/agents',
];

/**
 * Public routes (accessible without auth)
 */
export const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
];

/**
 * Check if a path requires authentication
 */
export function requiresAuth(pathname: string): boolean {
    return protectedRoutes.some(route => pathname.startsWith(route));
}

/**
 * Check if a path is public only (should redirect if authenticated)
 */
export function isAuthRoute(pathname: string): boolean {
    return ['/login', '/register'].includes(pathname);
}
