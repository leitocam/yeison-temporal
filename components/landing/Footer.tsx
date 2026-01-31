"use client"

import { Link } from "@/i18n/routing"
import { Zap } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Footer() {
    const t = useTranslations('footer')

    return (
        <footer className="border-t border-border/50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-5 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-lg">Yeison</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            {t('description')}
                        </p>
                        <div className="flex gap-3">
                            <Link href="#" className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </Link>
                            <Link href="#" className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </Link>
                            <Link href="#" className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t('product')}</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#features" className="hover:text-accent transition">{t('features')}</Link></li>
                            <li><Link href="#pricing" className="hover:text-accent transition">{t('pricing')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('security')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('integrations')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t('company')}</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-accent transition">{t('about')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('blog')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('careers')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('press')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t('resources')}</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-accent transition">{t('docs')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('api')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('status')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('help')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{t('legal')}</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-accent transition">{t('privacy')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('terms')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('cookies')}</Link></li>
                            <li><Link href="#" className="hover:text-accent transition">{t('contact')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
                    <p>{t('copyright')}</p>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>{t('systemStatus')}</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
