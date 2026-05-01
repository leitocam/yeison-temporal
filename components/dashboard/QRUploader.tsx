"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Loader2, Upload, AlertCircle } from "lucide-react"
import { apiClient } from "@/lib/api-client"

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"]
const MAX_BYTES = 2 * 1024 * 1024 // 2 MB

interface QRUploaderProps {
    agentId: string | number
    onUploaded?: () => void
}

export default function QRUploader({ agentId, onUploaded }: QRUploaderProps) {
    const t = useTranslations("dashboard")
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [hasObjectKey, setHasObjectKey] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [loadingPreview, setLoadingPreview] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refreshPreview = async () => {
        try {
            const { url, object_key } = await apiClient.getAgentQRUrl(agentId)
            setPreviewUrl(url)
            setHasObjectKey(!!object_key)
        } catch {
            setPreviewUrl(null)
            setHasObjectKey(false)
        } finally {
            setLoadingPreview(false)
        }
    }

    useEffect(() => {
        setLoadingPreview(true)
        refreshPreview()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agentId])

    const handleFile = async (file: File) => {
        setError(null)

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError(t("agents.config.qrUploadInvalidType"))
            return
        }
        if (file.size > MAX_BYTES) {
            setError(t("agents.config.qrUploadTooLarge"))
            return
        }

        setUploading(true)
        try {
            await apiClient.uploadAgentQR(agentId, file)
            await refreshPreview()
            onUploaded?.()
        } catch (err: any) {
            setError(err?.message || t("agents.config.qrUploadError"))
        } finally {
            setUploading(false)
        }
    }

    const handleClick = () => fileInputRef.current?.click()

    return (
        <div className="space-y-2">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFile(file)
                    // reset so re-uploading the same file fires onChange
                    e.target.value = ""
                }}
            />

            <div className="flex items-start gap-4">
                <div className="w-32 h-32 shrink-0 rounded-lg bg-white/5 border border-primary/20 overflow-hidden flex items-center justify-center">
                    {loadingPreview ? (
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    ) : previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="QR code"
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        <span className="text-xs text-muted-foreground px-2 text-center">
                            {t("agents.config.qrNoneYet")}
                        </span>
                    )}
                </div>

                <div className="flex-1 space-y-2">
                    <button
                        type="button"
                        onClick={handleClick}
                        disabled={uploading}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed border border-primary/20 rounded-lg transition-colors text-sm"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {t("agents.config.qrUploading")}
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4" />
                                {hasObjectKey
                                    ? t("agents.config.qrChange")
                                    : t("agents.config.qrUpload")}
                            </>
                        )}
                    </button>

                    <p className="text-xs text-muted-foreground">
                        {t("agents.config.qrUploadHint")}
                    </p>

                    {error && (
                        <div className="flex items-center gap-2 text-xs text-red-500">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
