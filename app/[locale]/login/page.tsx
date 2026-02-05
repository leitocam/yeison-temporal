"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import LoginForm from "@/components/login-form"
import { Zap, Bot, MessageCircle, MapPin, Settings, CreditCard, Headphones } from "lucide-react"
import GradientText from "@/components/ui/GradientText"
import LanguageSwitcher from "@/components/ui/LanguageSwitcher"

export default function LoginPage() {
    const t = useTranslations('login')

    const features = [
        { icon: Bot, title: t('feature1Title'), desc: t('feature1Desc'), gradient: 'from-blue-500 to-cyan-400' },
        { icon: MessageCircle, title: t('feature2Title'), desc: t('feature2Desc'), gradient: 'from-green-500 to-emerald-400' },
        { icon: MapPin, title: t('feature3Title'), desc: t('feature3Desc'), gradient: 'from-orange-500 to-amber-400' },
    ]

    const highlights = [
        { icon: Settings, title: t('highlight1Title') || 'Fácil configuración', desc: t('highlight1Desc') || 'Configura tu agente en menos de 5 minutos' },
        { icon: CreditCard, title: t('highlight2Title') || 'Sin tarjeta requerida', desc: t('highlight2Desc') || 'Prueba gratis por 14 días, sin compromisos' },
        { icon: Headphones, title: t('highlight3Title') || 'Soporte en español', desc: t('highlight3Desc') || 'Equipo local listo para ayudarte' },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground flex overflow-hidden relative">
            {/* Tech Pattern Background */}
            <div className="fixed inset-0 pointer-events-none opacity-30">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />
                {/* Radial gradient overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background" />
            </div>

            {/* Animated Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse" />
                <div
                    className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            {/* Circuit Pattern - Decorative Lines */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 0 50 L 30 50 L 35 45 L 65 45 L 70 50 L 100 50" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-primary/30" />
                            <circle cx="50" cy="45" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
            </div>

            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-6 xl:p-10 border-r border-border/50 bg-gradient-to-br from-card/40 via-background to-background relative z-10">
                <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 mb-4 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/40 group-hover:shadow-xl group-hover:shadow-primary/50 transition-all">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tight">Yeison</span>
                    </Link>
                </div>

                <div className="relative z-10 space-y-6">
                    {/* Main Heading */}
                    <div className="fade-in-up">
                        <h2 className="text-3xl xl:text-4xl font-black mb-3 tracking-tight leading-tight">
                            <GradientText>{t('brandTitle')}</GradientText>
                        </h2>
                        <p className="text-sm xl:text-base text-muted-foreground leading-relaxed max-w-md">
                            {t('brandSubtitle')}
                        </p>
                    </div>

                    {/* Feature Cards - Premium Design */}
                    <div className="space-y-3 pt-4">
                        {features.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={i}
                                    className="fade-in-up group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm hover:border-primary/40 transition-all duration-500"
                                    style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                                >
                                    {/* Shine effect on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </div>

                                    <div className="relative p-4 flex items-center gap-4">
                                        {/* Icon with gradient background */}
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-bold text-base mb-0.5 text-foreground">{item.title}</h3>
                                            <p className="text-xs xl:text-sm text-muted-foreground line-clamp-2">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Highlights - Compact Pills */}
                    <div className="pt-4 border-t border-white/10">
                        <div className="grid grid-cols-1 gap-2">
                            {highlights.map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <div
                                        key={i}
                                        className="fade-in-up flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-300"
                                        style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-sm font-semibold text-foreground">{item.title}</span>
                                            <span className="text-xs text-muted-foreground ml-2 hidden xl:inline">• {item.desc}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">{t('tagline')}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex -space-x-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background" />
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background" />
                            <div className="w-7 h-7 rounded-full bg-primary/50 border-2 border-background flex items-center justify-center text-white font-bold text-[10px]">
                                +
                            </div>
                        </div>
                        <span>{t('trustedBy')}</span>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col relative z-10">
                {/* Header with Language Switcher */}
                <div className="flex items-center justify-between p-4 sm:p-6">
                    <Link href="/" className="flex items-center gap-2 lg:hidden">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black">Yeison</span>
                    </Link>
                    <div className="ml-auto">
                        <LanguageSwitcher />
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    <div className="w-full max-w-md">
                        <div className="fade-in-up stagger-1 mb-8 sm:mb-10 text-center lg:text-left">
                            <h1 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">
                                <GradientText>{t('title')}</GradientText>
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{t('subtitle')}</p>
                        </div>

                        <LoginForm />

                        <div className="fade-in-up stagger-2 mt-8 sm:mt-10 text-center text-sm text-muted-foreground">
                            <p>
                                {t('noAccount')}{" "}
                                <Link href="/register" className="text-accent font-bold hover:text-primary transition">
                                    {t('startTrial')}
                                </Link>
                            </p>
                            <p className="mt-4 text-xs">{t('trialInfo')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
