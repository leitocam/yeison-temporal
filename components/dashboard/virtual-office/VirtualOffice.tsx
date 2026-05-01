"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "motion/react"
import {
    Send, Sparkles, Mic, Paperclip,
    Image as ImageIcon, CheckCircle2,
    Menu, X, ArrowRight, Loader2
} from "lucide-react"

import { TEAMS } from "./constants"
import { Message, SavedMeeting } from "./types"
import ChatBubble from "./ChatBubble"
import { useChatbot } from "@/hooks/useChatbot"

export default function VirtualOffice() {
    const t = useTranslations("dashboard")
    
    // API Hooks
    const { sendMessage, getConversationHistory, listConversations, isLoading: isApiLoading } = useChatbot()

    // State
    const [activeTeamId, setActiveTeamId] = useState<string>("yeison")
    const [messagesByTeam, setMessagesByTeam] = useState<Record<string, Message[]>>({})
    const [savedMeetings, setSavedMeetings] = useState<SavedMeeting[]>([])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const activeTeam = TEAMS[activeTeamId]
    const currentMessages = messagesByTeam[activeTeamId] || []

    // Fetch initial conversations from backend
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const convs = await listConversations()
                // Map API conversations to our frontend models if needed
                // For now, we will just rely on the API to give us the history when we click a team.
            } catch (e) {
                console.error("Failed to fetch conversations", e)
            }
        }
        fetchConversations()
    }, [listConversations])

    // Load history when switching teams
    useEffect(() => {
        const loadHistory = async () => {
            if (messagesByTeam[activeTeamId]) return // Already loaded locally

            try {
                // We use the sessionIdPrefix combined with a tenant or just the prefix if the backend handles tenant separation by auth token
                const history = await getConversationHistory(activeTeam.sessionIdPrefix)
                
                if (history && history.messages && history.messages.length > 0) {
                    const formattedMsgs: Message[] = history.messages.map((m: any) => ({
                        id: m.id || Math.random().toString(),
                        type: m.role === 'user' ? 'user' : 'assistant',
                        content: m.content,
                        timestamp: new Date(m.created_at || Date.now())
                    }))
                    
                    setMessagesByTeam(prev => ({
                        ...prev,
                        [activeTeamId]: formattedMsgs
                    }))
                } else {
                    // Start new conversation locally
                    setMessagesByTeam(prev => ({
                        ...prev,
                        [activeTeamId]: [{
                            id: Date.now().toString(),
                            type: "assistant",
                            content: activeTeam.greeting,
                            timestamp: new Date()
                        }]
                    }))
                }
            } catch (e) {
                console.error("Failed to load history, starting fresh", e)
                 // Start new conversation locally fallback
                 setMessagesByTeam(prev => ({
                    ...prev,
                    [activeTeamId]: [{
                        id: Date.now().toString(),
                        type: "assistant",
                        content: activeTeam.greeting,
                        timestamp: new Date()
                    }]
                }))
            }
        }
        loadHistory()
    }, [activeTeamId, activeTeam.greeting, activeTeam.sessionIdPrefix, getConversationHistory])

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [currentMessages, isTyping])

    // Handlers
    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            type: "user",
            content: inputValue.trim(),
            timestamp: new Date(),
        }

        setMessagesByTeam(prev => ({
            ...prev,
            [activeTeamId]: [...(prev[activeTeamId] || []), userMsg]
        }))
        
        const messageToSend = inputValue.trim()
        setInputValue("")
        setIsTyping(true)

        try {
            // Send to real backend
            const response = await sendMessage(messageToSend, activeTeam.sessionIdPrefix)
            
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: "assistant",
                content: response.response,
                timestamp: new Date(),
            }
            setMessagesByTeam(prev => ({
                ...prev,
                [activeTeamId]: [...(prev[activeTeamId] || []), aiMsg]
            }))
        } catch (error) {
            console.error("Error sending message", error)
            // Local fallback for demo if API fails
            setTimeout(() => {
                const aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    type: "assistant",
                    content: "Hubo un error de conexión con la IA. Modo demostración activado.",
                    timestamp: new Date(),
                }
                setMessagesByTeam(prev => ({
                    ...prev,
                    [activeTeamId]: [...(prev[activeTeamId] || []), aiMsg]
                }))
            }, 1000)
        } finally {
            setIsTyping(false)
        }
    }

    const handleEndMeeting = () => {
        if (currentMessages.length <= 1) return
        
        setIsTyping(true)
        setTimeout(() => {
            const summaryMsg: Message = {
                id: Date.now().toString(),
                type: "summary",
                content: "Resumen de la reunión",
                timestamp: new Date(),
                summaryData: {
                    title: `Reunión de Sincronización - ${activeTeam.name}`,
                    agreements: [
                        "Se revisaron las métricas de la sesión.",
                        "Identificamos áreas de mejora."
                    ],
                    nextSteps: [
                        "Aplicar ajustes recomendados",
                        "Monitorear resultados"
                    ]
                }
            }

            setMessagesByTeam(prev => ({
                ...prev,
                [activeTeamId]: [...(prev[activeTeamId] || []), summaryMsg]
            }))

            const newMeeting: SavedMeeting = {
                id: Date.now().toString(),
                teamId: activeTeamId,
                date: new Date(),
                title: `Reunión - ${activeTeam.name}`,
                preview: "Reunión de sincronización y ajustes...",
                sessionId: activeTeam.sessionIdPrefix
            }
            setSavedMeetings(prev => [newMeeting, ...prev])
            setIsTyping(false)
        }, 2000)
    }

    const handleSuggestionClick = (text: string) => {
        setInputValue(text)
    }

    return (
        <div className="flex h-[calc(100vh-10rem)] bg-background/50 rounded-3xl border border-border overflow-hidden relative shadow-2xl">
            
            {/* Background elements for depth */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[100px] opacity-20 bg-gradient-to-br ${activeTeam.bgGradient} transition-colors duration-1000`}></div>
                <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-[100px] opacity-10 bg-gradient-to-tr ${activeTeam.bgGradient} transition-colors duration-1000`}></div>
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </div>

            {/* Mobile Toggle */}
            <button 
                className="lg:hidden absolute top-4 left-4 z-50 p-2 glass-soft rounded-lg border border-border"
                onClick={() => setIsMobileSidebarOpen(true)}
            >
                <Menu className="w-5 h-5" />
            </button>

            {/* SIDEBAR */}
            <AnimatePresence>
                {(isMobileSidebarOpen || typeof window === 'undefined' || window.innerWidth >= 1024) && (
                    <motion.div 
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className={`absolute lg:relative z-40 w-72 h-full bg-card/60 backdrop-blur-2xl border-r border-border flex flex-col transition-all shadow-xl`}
                    >
                        <div className="lg:hidden p-4 flex justify-end border-b border-border">
                            <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 rounded-lg hover:bg-white/5">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-5 flex-1 overflow-y-auto space-y-8 scroll-premium">
                            {/* Teams Section */}
                            <div>
                                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 px-2">
                                    Departamentos IA
                                </h3>
                                <div className="space-y-2">
                                    {Object.values(TEAMS).map(team => {
                                        const isActive = activeTeamId === team.id
                                        return (
                                            <button
                                                key={team.id}
                                                onClick={() => {
                                                    setActiveTeamId(team.id)
                                                    setIsMobileSidebarOpen(false)
                                                }}
                                                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group ${
                                                    isActive 
                                                    ? `bg-gradient-to-r ${team.bgGradient} border border-transparent` 
                                                    : 'hover:bg-white/5 border border-transparent hover:border-border'
                                                }`}
                                            >
                                                <div className="relative">
                                                    <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'ring-2 ring-background' : 'opacity-70'}`}>
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={team.avatarImage} alt={team.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    {isActive && (
                                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full"></div>
                                                    )}
                                                </div>
                                                <div className="text-left flex-1 min-w-0">
                                                    <p className={`text-sm font-bold truncate transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                                                        {team.name}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground truncate">
                                                        {team.role}
                                                    </p>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* History Section */}
                            <div>
                                <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 px-2 flex items-center justify-between">
                                    Historial
                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[9px] font-bold">Local</span>
                                </h3>
                                <div className="space-y-2">
                                    {savedMeetings.map(meeting => {
                                        const team = TEAMS[meeting.teamId]
                                        return (
                                            <button key={meeting.id} className="w-full text-left p-3 rounded-2xl border border-transparent hover:border-border bg-black/10 hover:bg-black/30 transition-all group">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <team.icon className={`w-3.5 h-3.5 ${team.color}`} />
                                                    <span className="text-[10px] text-muted-foreground font-medium">
                                                        {meeting.date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                                    {meeting.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate mt-1">
                                                    {meeting.preview}
                                                </p>
                                            </button>
                                        )
                                    })}
                                    {savedMeetings.length === 0 && (
                                        <p className="text-xs text-muted-foreground text-center py-4">No hay reuniones previas.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
                <AnimatePresence>
                    <motion.div 
                        key={activeTeamId}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-1 flex flex-col h-full w-full absolute inset-0"
                    >
                        {/* Header */}
                        <header className={`flex-shrink-0 px-6 lg:px-10 py-5 border-b border-border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-card/40 backdrop-blur-md transition-colors duration-500`}>
                    <div className="flex items-center gap-4 pl-10 lg:pl-0">
                        <div className={`relative`}>
                            <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${activeTeam.borderColor} flex items-center justify-center shadow-[0_0_20px_rgba(var(--brand-cyan-rgb),0.15)]`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={activeTeam.avatarImage} alt={activeTeam.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 bg-background rounded-full">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-foreground flex items-center gap-2">
                                {activeTeam.name}
                            </h2>
                            <p className="text-sm text-muted-foreground">{activeTeam.role}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                        <div className="flex items-center gap-5 pr-5 border-r border-border">
                            {activeTeam.kpis.map((kpi, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{kpi.label}</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-black">{kpi.value}</span>
                                        {kpi.change && (
                                            <span className={`text-[10px] font-bold ${kpi.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {kpi.change}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            onClick={handleEndMeeting}
                            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-white/5 hover:bg-white/10 border ${activeTeam.borderColor} transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] btn-premium`}
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Finalizar Reunión
                        </button>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-premium">
                    {activeTeamId === "yeison" && currentMessages.length <= 1 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex justify-center mb-8 mt-4">
                            <div className="px-6 py-3 rounded-full border border-primary/20 bg-primary/5 flex items-center gap-3 backdrop-blur-sm shadow-[0_0_20px_rgba(var(--brand-cyan-rgb),0.1)]">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-foreground">Tip: Pídele a Yeison que analice las métricas globales o que te asigne a un equipo específico.</span>
                            </div>
                        </motion.div>
                    )}

                    {currentMessages.map(msg => <ChatBubble key={msg.id} msg={msg} activeTeam={activeTeam} />)}

                    {isTyping && (
                        <div className="flex gap-4 justify-start fade-in-up">
                            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${activeTeam.borderColor} flex items-center justify-center flex-shrink-0 opacity-70`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={activeTeam.avatarImage} alt="Escribiendo" className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-card/50 backdrop-blur-md border border-border rounded-2xl rounded-bl-sm px-5 py-4">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {currentMessages.length <= 2 && !isTyping && (
                    <div className="px-6 pb-2">
                        <div className="flex flex-wrap gap-2">
                            {activeTeam.suggestions.map((sug, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSuggestionClick(sug)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold border border-border bg-black/40 hover:bg-black/60 hover:border-primary/50 transition-all flex items-center gap-2 group shadow-sm`}
                                >
                                    {sug} <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="flex-shrink-0 p-6 pt-2">
                    <div className={`relative rounded-3xl border border-border bg-black/40 backdrop-blur-2xl focus-within:bg-black/60 focus-within:border-primary/50 focus-within:shadow-[0_0_30px_rgba(var(--brand-cyan-rgb),0.1)] transition-all duration-300`}>
                        <div className={`absolute inset-0 bg-gradient-to-r ${activeTeam.bgGradient} opacity-5 rounded-3xl pointer-events-none transition-opacity duration-500`} />
                        
                        <div className="flex items-end gap-3 p-3 relative z-10">
                            <div className="flex items-center gap-1 pb-1.5 text-muted-foreground">
                                <button className="p-2.5 rounded-xl hover:bg-white/10 hover:text-foreground transition-colors"><Paperclip className="w-4 h-4" /></button>
                                <button className="p-2.5 rounded-xl hover:bg-white/10 hover:text-foreground transition-colors"><ImageIcon className="w-4 h-4" /></button>
                            </div>

                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSend()
                                    }
                                }}
                                placeholder={`Conversa con ${activeTeam.name}...`}
                                rows={1}
                                className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground/40 py-3.5 min-h-[48px] max-h-[120px] font-medium"
                                style={{ scrollbarWidth: "none" }}
                            />

                            <div className="flex items-center gap-2 pb-1.5 pr-1.5">
                                <button className="p-2.5 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                                    <Mic className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isTyping}
                                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${activeTeam.bgGradient} border ${activeTeam.borderColor} flex items-center justify-center flex-shrink-0 disabled:opacity-50 transition-all duration-300 hover:scale-105 btn-premium shadow-lg`}
                                >
                                    {isApiLoading ? (
                                         <Loader2 className={`w-4 h-4 animate-spin ${activeTeam.color}`} />
                                    ) : (
                                        <Send className={`w-4 h-4 ${activeTeam.color}`} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    </div>

</div>
    )
}
