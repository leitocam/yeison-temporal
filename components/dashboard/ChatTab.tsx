"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { ChatMessage } from "@/lib/api-client"
import { useChatbot } from "@/hooks/useChatbot"
import {
    Bot,
    Send,
    Sparkles,
    TrendingUp,
    MessageSquare,
    BarChart3,
    Users,
    Zap,
    Mic,
    Paperclip,
    Image as ImageIcon,
    MoreHorizontal,
    MessageCircle,
    RefreshCw
} from "lucide-react"

interface Message {
    id: string
    type: "user" | "assistant"
    content: string
    timestamp: Date
}

interface ChatTabProps {
    onTabChange?: (tab: "executive" | "agents" | "metrics" | "chat") => void
}

export default function ChatTab({ onTabChange }: ChatTabProps) {
    const t = useTranslations("dashboard")
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [isLoadingHistory, setIsLoadingHistory] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    
    const { sendMessage, getConversationHistory, listConversations, error: apiError } = useChatbot()

    const suggestions = [
        { icon: TrendingUp, text: t("suggestions.items.0"), keyword: "ventas", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20" },
        { icon: MessageSquare, text: t("suggestions.items.1"), keyword: "agente", color: "from-blue-500/20 to-cyan-500/20 border-blue-500/20" },
        { icon: Sparkles, text: t("suggestions.items.2"), keyword: "marketing", color: "from-purple-500/20 to-pink-500/20 border-purple-500/20" },
        { icon: BarChart3, text: t("suggestions.items.3"), keyword: "metricas", color: "from-orange-500/20 to-red-500/20 border-orange-500/20" },
        { icon: Users, text: t("suggestions.items.4"), keyword: "agentes", color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/20" },
        { icon: Zap, text: t("suggestions.items.5"), keyword: "clientes", color: "from-amber-500/20 to-yellow-500/20 border-amber-500/20" },
    ]

    // Quick stats for context
    const quickStats = [
        { label: "Leads hoy", value: "47", change: "+23%", positive: true },
        { label: "Activas", value: "23", change: "+4", positive: true },
        { label: "Pipeline", value: "$84.5k", change: "+17%", positive: true },
    ]

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Load conversation history on mount
    useEffect(() => {
        loadExistingConversation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadExistingConversation = async () => {
        setIsLoadingHistory(true)
        try {
            // Get the tenant's conversation (single conversation per tenant)
            const conversations = await listConversations()
            if (conversations && conversations.length > 0) {
                const conversation = conversations[0]
                setSessionId(conversation.session_id)
                
                // Load conversation history
                const historyData = await getConversationHistory(conversation.session_id)
                
                // Handle the response - it could be an array or an object with messages
                const messagesArray = Array.isArray(historyData) 
                    ? historyData 
                    : (historyData.messages || [])
                
                const loadedMessages: Message[] = messagesArray.map((msg: ChatMessage, idx: number) => ({
                    id: `${conversation.session_id}-${idx}`,
                    type: msg.role === 'user' ? 'user' : 'assistant',
                    content: msg.content,
                    timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
                }))
                setMessages(loadedMessages)
            }
        } catch (err) {
            console.error('Error loading conversation:', err)
            // No conversation exists yet, that's ok
        } finally {
            setIsLoadingHistory(false)
        }
    }

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            type: "user",
            content: inputValue.trim(),
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        const messageContent = inputValue.trim()
        setInputValue("")
        setIsTyping(true)

        try {
            const response = await sendMessage(messageContent, sessionId || undefined)

            // Store session ID for future messages
            if (!sessionId && response.session_id) {
                setSessionId(response.session_id)
            }

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: "assistant",
                content: response.response,
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiResponse])
        } catch (err: any) {
            // Add error message to chat
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: "assistant",
                content: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta nuevamente.",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsTyping(false)
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion)
        inputRef.current?.focus()
    }

    const handleNewConversation = () => {
        setMessages([])
        setSessionId(null)
        // Optionally could delete the conversation from backend here
    }

    const loadConversationHistory = async () => {
        if (!sessionId) {
            // If no session ID, try to load existing conversation
            await loadExistingConversation()
            return
        }
        
        setIsLoadingHistory(true)
        try {
            const historyData = await getConversationHistory(sessionId)
            
            // Handle the response - it could be an array or an object with messages
            const messagesArray = Array.isArray(historyData) 
                ? historyData 
                : (historyData.messages || [])
            
            const loadedMessages: Message[] = messagesArray.map((msg: ChatMessage, idx: number) => ({
                id: `${sessionId}-${idx}`,
                type: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content,
                timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
            }))
            setMessages(loadedMessages)
        } catch (err) {
            console.error('Error loading conversation history:', err)
        } finally {
            setIsLoadingHistory(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const formatMessage = (content: string) => {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
            .replace(/\n/g, '<br />')
            .replace(/• /g, '<span class="text-primary">•</span> ')
    }

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)]">
                {/* Quick Stats Bar */}
                <div className="flex-shrink-0 flex items-center gap-4 p-4 mb-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-muted-foreground">Contexto en tiempo real</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-6">
                        {quickStats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{stat.label}:</span>
                                <span className="text-sm font-bold">{stat.value}</span>
                                <span className={`text-[10px] font-medium ${stat.positive ? "text-emerald-500" : "text-red-500"}`}>
                                    {stat.change}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        {sessionId && (
                            <>
                                <button
                                    onClick={loadConversationHistory}
                                    disabled={isLoadingHistory}
                                    className="text-[10px] text-primary hover:underline font-medium flex items-center gap-1 disabled:opacity-50"
                                    title="Recargar historial"
                                >
                                    <RefreshCw className={`w-3 h-3 ${isLoadingHistory ? 'animate-spin' : ''}`} />
                                    Recargar
                                </button>
                                <button
                                    onClick={handleNewConversation}
                                    className="text-[10px] text-primary hover:underline font-medium flex items-center gap-1"
                                    title="Nueva conversación"
                                >
                                    <MessageCircle className="w-3 h-3" />
                                    Nueva
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => onTabChange?.("executive")}
                            className="text-[10px] text-primary hover:underline font-medium"
                        >
                            Ver dashboard
                        </button>
                    </div>
                </div>

                {/* Error Display */}
                {apiError && (
                    <div className="flex-shrink-0 mx-4 mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500">
                        {apiError}
                    </div>
                )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                {messages.length === 0 ? (
                    /* Welcome State */
                    <div className="flex flex-col items-center justify-center min-h-full text-center px-4 py-8">
                        {/* Avatar */}
                        <div className="relative mb-10 mt-4">
                            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl shadow-primary/40">
                                <Bot className="w-14 h-14 text-white" />
                            </div>
                            <div className="absolute inset-0 w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-accent blur-2xl opacity-40 -z-10" />
                            <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                            {t("welcome")}
                        </h1>
                        <p className="text-lg text-muted-foreground mb-2">{t("subtitle")}</p>
                        <p className="text-base text-muted-foreground/70 max-w-lg mb-12">
                            {t("greeting")}
                        </p>

                        {/* Suggestions Grid */}
                        <div className="w-full max-w-3xl">
                            <p className="text-sm text-muted-foreground mb-5 font-medium">
                                {t("suggestions.title")}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {suggestions.map((suggestion, index) => {
                                    const Icon = suggestion.icon
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion.text)}
                                            className={`group flex items-center gap-3 p-4 rounded-2xl border bg-gradient-to-r ${suggestion.color}
                                                     hover:scale-[1.02] transition-all duration-300
                                                     text-left hover:shadow-lg hover:shadow-primary/10`}
                                        >
                                            <div className="w-11 h-11 rounded-xl bg-background/50 backdrop-blur-sm
                                                          flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-foreground" />
                                            </div>
                                            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors line-clamp-2">
                                                {suggestion.text}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Chat Messages */
                    <>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {message.type === "assistant" && (
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[70%] rounded-2xl px-5 py-4 ${message.type === "user"
                                        ? "bg-gradient-to-br from-primary to-accent text-white rounded-br-md"
                                        : "bg-primary/5 border border-primary/20 rounded-bl-md"
                                        }`}
                                >
                                    <div
                                        className="text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-4 justify-start">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="bg-primary/5 border border-primary/20 rounded-2xl rounded-bl-md px-5 py-4">
                                    <div className="flex gap-1.5">
                                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area - Premium Design */}
            <div className="flex-shrink-0 p-4 lg:p-6">
                <div className="max-w-3xl mx-auto">
                    <div className="relative rounded-2xl border border-primary/20 bg-primary/5 
                                  focus-within:border-primary/40 focus-within:bg-primary/10 transition-all duration-300
                                  shadow-lg shadow-black/5">
                        {/* Input Row */}
                        <div className="flex items-end gap-3 p-3">
                            {/* Attachment buttons */}
                            <div className="flex items-center gap-1 pb-2">
                                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
                                    <Paperclip className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
                                    <ImageIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <textarea
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={t("inputPlaceholder")}
                                rows={1}
                                className="flex-1 bg-transparent border-none outline-none resize-none text-foreground 
                                         placeholder:text-muted-foreground/50 py-2.5 min-h-[48px] max-h-[120px]"
                                style={{ scrollbarWidth: "none" }}
                            />

                            {/* Action buttons */}
                            <div className="flex items-center gap-2 pb-2">
                                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground">
                                    <Mic className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent 
                                             flex items-center justify-center flex-shrink-0
                                             hover:shadow-lg hover:shadow-primary/40 hover:scale-105
                                             disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none
                                             transition-all duration-300"
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground/50 text-center mt-3">
                        Yeison puede cometer errores. Verifica la información importante.
                    </p>
                </div>
            </div>
        </div>
    )
}
