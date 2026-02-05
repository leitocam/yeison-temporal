"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "motion/react"
import { Clock, CheckCircle, AlertCircle, RefreshCw, QrCode, Building2, ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import GradientButton from "@/components/ui/GradientButton"
import type { SelectedPlan, PaymentStatus } from "./types"

interface PaymentQRProps {
    plan: SelectedPlan
    onConfirm: () => void
    onBack: () => void
}

const EXPIRATION_TIME = 15 * 60 // 15 minutes in seconds

// Sample QR code SVG - in production this would be generated from backend
const QRCodePlaceholder = () => (
    <svg
        viewBox="0 0 256 256"
        className="w-44 h-44 sm:w-48 sm:h-48"
        fill="currentColor"
    >
        <rect x="0" y="0" width="256" height="256" fill="white" />
        <g fill="black">
            {/* This is a simplified QR pattern - replace with actual QR generation */}
            <rect x="16" y="16" width="64" height="64" />
            <rect x="176" y="16" width="64" height="64" />
            <rect x="16" y="176" width="64" height="64" />
            <rect x="32" y="32" width="32" height="32" fill="white" />
            <rect x="192" y="32" width="32" height="32" fill="white" />
            <rect x="32" y="192" width="32" height="32" fill="white" />
            <rect x="40" y="40" width="16" height="16" fill="black" />
            <rect x="200" y="40" width="16" height="16" fill="black" />
            <rect x="40" y="200" width="16" height="16" fill="black" />
            {/* Random pattern in center */}
            <rect x="96" y="16" width="16" height="16" />
            <rect x="128" y="16" width="16" height="16" />
            <rect x="96" y="48" width="16" height="16" />
            <rect x="144" y="48" width="16" height="16" />
            <rect x="112" y="80" width="16" height="16" />
            <rect x="16" y="96" width="16" height="16" />
            <rect x="48" y="112" width="16" height="16" />
            <rect x="96" y="96" width="16" height="16" />
            <rect x="128" y="112" width="16" height="16" />
            <rect x="160" y="96" width="16" height="16" />
            <rect x="192" y="112" width="16" height="16" />
            <rect x="224" y="96" width="16" height="16" />
            <rect x="16" y="144" width="16" height="16" />
            <rect x="48" y="144" width="16" height="16" />
            <rect x="96" y="128" width="16" height="16" />
            <rect x="144" y="144" width="16" height="16" />
            <rect x="176" y="144" width="16" height="16" />
            <rect x="224" y="144" width="16" height="16" />
            <rect x="96" y="176" width="16" height="16" />
            <rect x="128" y="192" width="16" height="16" />
            <rect x="160" y="176" width="16" height="16" />
            <rect x="192" y="176" width="16" height="16" />
            <rect x="176" y="208" width="16" height="16" />
            <rect x="208" y="224" width="16" height="16" />
            <rect x="224" y="192" width="16" height="16" />
        </g>
    </svg>
)

export default function PaymentQR({ plan, onConfirm, onBack }: PaymentQRProps) {
    const t = useTranslations('register.payment')

    const [timeLeft, setTimeLeft] = useState(EXPIRATION_TIME)
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus['status']>('pending')
    const [isVerifying, setIsVerifying] = useState(false)

    // Countdown timer
    useEffect(() => {
        if (paymentStatus !== 'pending' || timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setPaymentStatus('expired')
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [paymentStatus, timeLeft])

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }, [])

    const handleVerifyPayment = async () => {
        setIsVerifying(true)
        setPaymentStatus('verifying')

        // Simulate payment verification - in production this would call the backend
        await new Promise(resolve => setTimeout(resolve, 2000))

        // For demo purposes, always confirm
        setPaymentStatus('confirmed')
        setIsVerifying(false)

        // Wait a moment to show confirmation, then proceed
        setTimeout(() => {
            onConfirm()
        }, 1500)
    }

    const handleRefreshQR = () => {
        setTimeLeft(EXPIRATION_TIME)
        setPaymentStatus('pending')
    }

    const banks = [
        { name: "BCP", color: "#0066B3" },
        { name: "Banco Unión", color: "#004B87" },
        { name: "Banco Mercantil", color: "#E31837" },
        { name: "Banco Nacional", color: "#00A651" },
    ]

    return (
        <motion.div
            className="w-full max-w-lg mx-auto space-y-5 sm:space-y-6 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <QrCode className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{t('title')}</h2>
                <p className="text-muted-foreground text-sm sm:text-base">{t('subtitle')}</p>
            </div>

            {/* Plan Summary */}
            <div className="glass rounded-xl p-3 sm:p-4 border border-primary/20">
                <div className="flex justify-between items-center gap-4">
                    <div className="text-left">
                        <p className="text-xs sm:text-sm text-muted-foreground">{t('selectedPlan')}</p>
                        <p className="font-bold text-base sm:text-lg">{plan.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs sm:text-sm text-muted-foreground">{t('amount')}</p>
                        <p className="font-bold text-base sm:text-lg text-primary">{plan.price}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{plan.period}</p>
                    </div>
                </div>
            </div>

            {/* QR Code Section */}
            <div className="glass rounded-2xl p-4 sm:p-6 border border-primary/20">
                <div className="flex flex-col items-center">
                    {/* QR Code */}
                    <motion.div
                        className={`relative rounded-xl p-3 sm:p-4 bg-white mb-3 sm:mb-4 shadow-lg ${paymentStatus === 'expired' ? 'opacity-30' : ''
                            }`}
                        animate={paymentStatus === 'verifying' ? { scale: [1, 0.98, 1] } : {}}
                        transition={{ duration: 1, repeat: paymentStatus === 'verifying' ? Infinity : 0 }}
                    >
                        <QRCodePlaceholder />

                        {/* Status Overlay */}
                        {paymentStatus !== 'pending' && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {paymentStatus === 'verifying' && (
                                    <div className="text-center text-white">
                                        <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                                        <p className="text-sm font-medium">{t('verifying')}</p>
                                    </div>
                                )}
                                {paymentStatus === 'confirmed' && (
                                    <motion.div
                                        className="text-center text-green-400"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                                        <p className="text-sm font-medium">{t('confirmed')}</p>
                                    </motion.div>
                                )}
                                {paymentStatus === 'expired' && (
                                    <div className="text-center text-red-400">
                                        <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                                        <p className="text-sm font-medium">{t('expired')}</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Timer */}
                    {paymentStatus === 'pending' && (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-3 sm:mb-4">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                                {t('expiresIn')}: <span className="font-mono font-bold text-foreground">{formatTime(timeLeft)}</span>
                            </span>
                        </div>
                    )}

                    {/* Expired - Refresh Button */}
                    {paymentStatus === 'expired' && (
                        <button
                            onClick={handleRefreshQR}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-primary hover:text-accent transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            {t('refreshQR')}
                        </button>
                    )}
                </div>
            </div>

            {/* Instructions */}
            <div className="glass rounded-xl p-3 sm:p-4 border border-primary/20">
                <h3 className="font-semibold mb-2 sm:mb-3 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    {t('instructions')}
                </h3>
                <ol className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-[10px] sm:text-xs font-bold text-primary">1</span>
                        <span>{t('step1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-[10px] sm:text-xs font-bold text-primary">2</span>
                        <span>{t('step2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-[10px] sm:text-xs font-bold text-primary">3</span>
                        <span>{t('step3')}</span>
                    </li>
                </ol>
            </div>

            {/* Accepted Banks */}
            <div className="text-center">
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">{t('acceptedBanks')}</p>
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                    {banks.map((bank) => (
                        <div
                            key={bank.name}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full glass border border-white/10 text-[10px] sm:text-xs font-medium"
                        >
                            {bank.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                    onClick={onBack}
                    className="order-2 sm:order-1 flex-1 py-3 glass border-2 border-primary/20 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('back')}
                </button>
                <div className="order-1 sm:order-2 flex-1">
                    <GradientButton
                        onClick={handleVerifyPayment}
                        disabled={paymentStatus !== 'pending' || isVerifying}
                        fullWidth
                    >
                        {isVerifying ? (
                            <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                {t('verifying')}
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                {t('confirmPayment')}
                            </>
                        )}
                    </GradientButton>
                </div>
            </div>
        </motion.div>
    )
}
