import { motion } from "motion/react"
import { Clock, Presentation, CalendarDays, ShieldCheck, Target, CheckCircle2 } from "lucide-react"
import { Message, Team } from "./types"

interface ChatBubbleProps {
    msg: Message
    activeTeam: Team
}

export default function ChatBubble({ msg, activeTeam }: ChatBubbleProps) {
    if (msg.type === "summary" && msg.summaryData) {
        return (
            <div className="w-full flex justify-center my-6 fade-in-up">
                <div className="max-w-2xl w-full bg-card/80 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-2xl hover:border-primary/30 transition-colors">
                    <div className={`h-2 bg-gradient-to-r ${activeTeam.bgGradient}`} />
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeTeam.bgGradient} flex items-center justify-center`}>
                                <Presentation className={`w-6 h-6 ${activeTeam.color}`} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black">{msg.summaryData.title}</h4>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4" /> 
                                    {msg.timestamp.toLocaleDateString()} - Resumen Automático
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-xl p-4">
                                <h5 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Acuerdos Clave
                                </h5>
                                <ul className="space-y-2">
                                    {msg.summaryData.agreements.map((item, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-1.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="bg-white/5 rounded-xl p-4">
                                <h5 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
                                    <Target className="w-4 h-4 text-blue-500" /> Próximos Pasos
                                </h5>
                                <ul className="space-y-2">
                                    {msg.summaryData.nextSteps.map((item, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-blue-500/50 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const isUser = msg.type === "user"

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}
        >
            {!isUser && (
                <div className="relative">
                    <div className={`w-10 h-10 rounded-full overflow-hidden border-2 ${activeTeam.borderColor} flex items-center justify-center flex-shrink-0 shadow-lg shadow-${activeTeam.color.replace('text-', '')}/20`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={activeTeam.avatarImage} alt={activeTeam.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full"></div>
                </div>
            )}
            <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                    isUser
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-br-sm shadow-lg shadow-primary/20"
                        : "bg-card/80 backdrop-blur-sm border border-border rounded-bl-sm shadow-sm"
                }`}
            >
                <div className={`text-sm leading-relaxed whitespace-pre-wrap ${isUser ? "text-primary-foreground font-medium" : "text-foreground"}`}>
                    {msg.content}
                </div>
                <div className={`text-[10px] mt-2 flex items-center gap-1 ${isUser ? "opacity-70 justify-end" : "text-muted-foreground justify-start"}`}>
                    <Clock className="w-3 h-3" />
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </motion.div>
    )
}
