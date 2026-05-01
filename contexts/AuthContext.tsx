'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { apiClient, LoginCredentials, User, ApiError, tokenStorage } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

// ============================================
// Types
// ============================================

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => Promise<void>;
    clearError: () => void;
}

// ============================================
// Context
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// Provider Component
// ============================================

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedUser = tokenStorage.getUser();
                const token = tokenStorage.getAccessToken();

                if (token && storedUser) {
                    setUser(storedUser);
                }
            } catch (err) {
                console.error('Auth initialization error:', err);
                tokenStorage.clearAll();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Login function
    const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await apiClient.login(credentials);
            setUser(response.user);
            
            // Check onboarding status
            try {
                const config = await apiClient.get<any>('/configurations/current-or-create');
                if (config && config.is_completed === false) {
                    router.push('/onboarding');
                } else {
                    router.push('/dashboard');
                }
            } catch (configErr) {
                console.error("Error checking configuration:", configErr);
                // Fallback to dashboard if config check fails
                router.push('/dashboard');
            }
            
            return true;
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Login failed. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    // Logout function
    const logout = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        try {
            await apiClient.logout();
        } catch (err) {
            // Logout errors are already handled in api-client
            // Just log for debugging if needed
            console.debug('Logout completed with warnings:', err);
        } finally {
            setUser(null);
            setIsLoading(false);
            router.push('/login');
        }
    }, [router]);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// ============================================
// Hook
// ============================================

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
