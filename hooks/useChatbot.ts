'use client';

import { useState, useCallback } from 'react';
import { apiClient, SendMessageRequest, Conversation, ChatMessage, ConversationHistory } from '@/lib/api-client';

interface UseChatbotReturn {
    sendMessage: (message: string, sessionId?: string) => Promise<{ response: string; session_id: string }>;
    getConversationHistory: (sessionId: string) => Promise<ConversationHistory>;
    listConversations: () => Promise<Conversation[]>;
    deleteConversation: (sessionId: string) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

/**
 * Hook for chatbot operations
 */
export function useChatbot(): UseChatbotReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (message: string, sessionId?: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const data: SendMessageRequest = {
                message,
                session_id: sessionId,
            };
            const response = await apiClient.sendMessage(data);
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'Error al enviar mensaje';
            setError(errorMsg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getConversationHistory = useCallback(async (sessionId: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await apiClient.getConversationHistory(sessionId);
            return response;
        } catch (err: any) {
            const errorMsg = err.message || 'Error al cargar historial';
            setError(errorMsg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const listConversations = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            return await apiClient.listConversations();
        } catch (err: any) {
            const errorMsg = err.message || 'Error al cargar conversaciones';
            setError(errorMsg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteConversation = useCallback(async (sessionId: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            await apiClient.deleteConversation(sessionId);
        } catch (err: any) {
            const errorMsg = err.message || 'Error al eliminar conversación';
            setError(errorMsg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        sendMessage,
        getConversationHistory,
        listConversations,
        deleteConversation,
        isLoading,
        error,
    };
}
