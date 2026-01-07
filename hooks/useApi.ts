'use client';

import { useState, useCallback } from 'react';
import { apiClient, ApiError } from '@/lib/api-client';

// ============================================
// Types
// ============================================

interface UseApiState<T> {
    data: T | null;
    isLoading: boolean;
    error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
    execute: () => Promise<T | null>;
    reset: () => void;
}

// ============================================
// Hook
// ============================================

/**
 * Hook for making API requests with loading and error states
 * 
 * @example
 * const { data, isLoading, error, execute } = useApi<User[]>(() => apiClient.get('/users'));
 * 
 * useEffect(() => {
 *   execute();
 * }, [execute]);
 */
export function useApi<T>(
    apiCall: () => Promise<T>
): UseApiReturn<T> {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        isLoading: false,
        error: null,
    });

    const execute = useCallback(async (): Promise<T | null> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const data = await apiCall();
            setState({ data, isLoading: false, error: null });
            return data;
        } catch (err) {
            const error = err as ApiError;
            setState(prev => ({ ...prev, isLoading: false, error }));
            return null;
        }
    }, [apiCall]);

    const reset = useCallback(() => {
        setState({ data: null, isLoading: false, error: null });
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
}

// ============================================
// Mutation Hook
// ============================================

interface UseMutationReturn<T, V> {
    data: T | null;
    isLoading: boolean;
    error: ApiError | null;
    mutate: (variables: V) => Promise<T | null>;
    reset: () => void;
}

/**
 * Hook for making mutations (POST, PUT, DELETE) with loading and error states
 * 
 * @example
 * const { mutate, isLoading } = useMutation<User, CreateUserData>(
 *   (data) => apiClient.post('/users', data)
 * );
 * 
 * const handleSubmit = async (data: CreateUserData) => {
 *   const user = await mutate(data);
 *   if (user) router.push('/users');
 * };
 */
export function useMutation<T, V = unknown>(
    mutationFn: (variables: V) => Promise<T>
): UseMutationReturn<T, V> {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        isLoading: false,
        error: null,
    });

    const mutate = useCallback(async (variables: V): Promise<T | null> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const data = await mutationFn(variables);
            setState({ data, isLoading: false, error: null });
            return data;
        } catch (err) {
            const error = err as ApiError;
            setState(prev => ({ ...prev, isLoading: false, error }));
            return null;
        }
    }, [mutationFn]);

    const reset = useCallback(() => {
        setState({ data: null, isLoading: false, error: null });
    }, []);

    return {
        ...state,
        mutate,
        reset,
    };
}

export default useApi;
