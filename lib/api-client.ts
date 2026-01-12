/**
 * API Client - Secure HTTP client for backend communication
 * Handles authentication, tokens, errors, and retry logic
 */

// ============================================
// Types
// ============================================

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  created_at?: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}

// ============================================
// Configuration
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000;

// Mock auth is enabled when:
// 1. NEXT_PUBLIC_ENABLE_MOCK_AUTH is explicitly 'true', OR
// 2. No real API URL is configured (defaults to localhost)
// This ensures demos work without backend configuration
const isMockAuthEnabled = (): boolean => {
  const envValue = process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH;

  // If explicitly set, use that value
  if (envValue !== undefined) {
    console.log('[Auth] NEXT_PUBLIC_ENABLE_MOCK_AUTH =', envValue);
    return envValue === 'true';
  }

  // Default: enable mock if API URL is localhost (no real backend)
  const isLocalhost = API_BASE_URL.includes('localhost') || API_BASE_URL.includes('127.0.0.1');
  console.log('[Auth] Mock auth auto-enabled (no backend configured):', isLocalhost);
  return isLocalhost;
};

// ============================================
// Token Management
// ============================================

const TOKEN_KEY = 'yeison_access_token';
const REFRESH_TOKEN_KEY = 'yeison_refresh_token';
const USER_KEY = 'yeison_user';
// Cookie name that middleware expects
const AUTH_COOKIE_NAME = 'yeison_auth_token';

// Helper to set a cookie
const setCookie = (name: string, value: string, days: number = 7): void => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Helper to delete a cookie
const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
};

export const tokenStorage = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setAccessToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
    // Also set cookie for middleware to read
    setCookie(AUTH_COOKIE_NAME, token, 7);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: User): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // Also clear the auth cookie
    deleteCookie(AUTH_COOKIE_NAME);
  },

  isAuthenticated: (): boolean => {
    return !!tokenStorage.getAccessToken();
  }
};

// ============================================
// API Client Class
// ============================================

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.timeout = API_TIMEOUT;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = tokenStorage.getAccessToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: ApiError = {
          message: errorData.message || errorData.detail || `HTTP ${response.status}`,
          status: response.status,
          code: errorData.code,
          details: errorData.details,
        };

        // Handle 401 Unauthorized - clear tokens and redirect
        if (response.status === 401) {
          tokenStorage.clearAll();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }

        throw error;
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === 'AbortError') {
        throw {
          message: 'Request timeout',
          status: 408,
          code: 'TIMEOUT',
        } as ApiError;
      }

      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // ============================================
  // Auth Endpoints
  // ============================================

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Mock authentication for development
    if (isMockAuthEnabled()) {
      return this.mockLogin(credentials);
    }

    return this.post<LoginResponse>('/auth/login', credentials);
  }

  async logout(): Promise<void> {
    try {
      if (!isMockAuthEnabled()) {
        await this.post('/auth/logout');
      }
    } finally {
      tokenStorage.clearAll();
    }
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw { message: 'No refresh token', status: 401 } as ApiError;
    }

    return this.post<RefreshTokenResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
  }

  async getCurrentUser(): Promise<User> {
    if (isMockAuthEnabled()) {
      const user = tokenStorage.getUser();
      if (user) return user;
      throw { message: 'Not authenticated', status: 401 } as ApiError;
    }

    return this.get<User>('/auth/me');
  }

  // ============================================
  // Mock Authentication (Development Only)
  // ============================================

  private async mockLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo credentials check
    if (credentials.email && credentials.password) {
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'admin',
        avatar: undefined,
        created_at: new Date().toISOString(),
      };

      const response: LoginResponse = {
        access_token: 'mock_access_token_' + Date.now(),
        refresh_token: 'mock_refresh_token_' + Date.now(),
        token_type: 'Bearer',
        expires_in: 3600,
        user: mockUser,
      };

      // Store tokens
      tokenStorage.setAccessToken(response.access_token);
      if (response.refresh_token) {
        tokenStorage.setRefreshToken(response.refresh_token);
      }
      tokenStorage.setUser(mockUser);

      return response;
    }

    throw {
      message: 'Invalid email or password',
      status: 401,
      code: 'INVALID_CREDENTIALS',
    } as ApiError;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
