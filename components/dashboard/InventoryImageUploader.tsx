"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Upload, AlertCircle, ImageIcon } from "lucide-react"
import { apiClient } from "@/lib/api-client"

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"]
const MAX_BYTES = 4 * 1024 * 1024 // 4 MB

interface InventoryImageUploaderProps {
    itemId: string | number
    onUploaded?: () => void
}

export default function InventoryImageUploader({ itemId, onUploaded }: InventoryImageUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [hasObjectKey, setHasObjectKey] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [loadingPreview, setLoadingPreview] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const refreshPreview = async () => {
        try {
            const { url, object_key } = await apiClient.getInventoryImageUrl(itemId)
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
    }, [itemId])

    const handleFile = async (file: File) => {
        setError(null)

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError("Solo se aceptan imágenes PNG o JPG.")
            return
        }
        if (file.size > MAX_BYTES) {
            setError("La imagen supera el límite de 4 MB.")
            return
        }

        setUploading(true)
        try {
            await apiClient.uploadInventoryImage(itemId, file)
            await refreshPreview()
            onUploaded?.()
        } catch (err: any) {
            setError(err?.message || "Error al subir la imagen.")
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
                    e.target.value = ""
                }}
            />

            <div className="flex items-start gap-4">
                <div className="w-20 h-20 shrink-0 rounded-xl bg-white/5 border border-primary/20 overflow-hidden flex items-center justify-center">
                    {loadingPreview ? (
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    ) : previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Product"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    )}
                </div>

                <div className="flex-1 space-y-2">
                    <button
                        type="button"
                        onClick={handleClick}
                        disabled={uploading}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed border border-primary/20 rounded-lg transition-colors text-xs"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Subiendo...
                            </>
                        ) : (
                            <>
                                <Upload className="w-3.5 h-3.5" />
                                {hasObjectKey ? "Cambiar imagen" : "Subir imagen"}
                            </>
                        )}
                    </button>

                    <p className="text-xs text-muted-foreground">PNG o JPG, máx. 4 MB</p>

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
