"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import {
    Boxes,
    Plus,
    Search,
    RefreshCw,
    AlertCircle,
    Trash2,
    Pencil,
    PackagePlus,
    Minus,
    PlusCircle,
    TrendingUp,
    ImageIcon,
    Upload,
} from "lucide-react"
import { apiClient, InventoryItem } from "@/lib/api-client"
import InventoryImageUploader from "@/components/dashboard/InventoryImageUploader"
import { useApi, useMutation } from "@/hooks/useApi"
import * as Dialog from '@radix-ui/react-dialog'

interface InventoryForm {
    product_name: string
    price: number
    quantity: number | null
    description: string
    track_stock: boolean
}

const emptyForm: InventoryForm = {
    product_name: "",
    price: 0,
    quantity: 0,
    description: "",
    track_stock: true,
}

export default function InventoryTab() {
    const t = useTranslations("dashboard")
    const [search, setSearch] = useState("")
    const [showLowStock, setShowLowStock] = useState(false)
    const [threshold, setThreshold] = useState(10)
    const [form, setForm] = useState<InventoryForm>(emptyForm)
    const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
    const [savedItemId, setSavedItemId] = useState<number | null>(null)
    const [pendingFile, setPendingFile] = useState<File | null>(null)
    const [pendingPreview, setPendingPreview] = useState<string | null>(null)
    const [adjustments, setAdjustments] = useState<Record<number, number>>({})
    const [deleteTarget, setDeleteTarget] = useState<InventoryItem | null>(null)
    const pendingFileInputRef = useRef<HTMLInputElement | null>(null)

    const uploaderItemId = editingItem?.id ?? savedItemId

    const fetchInventory = async (): Promise<InventoryItem[]> => {
        if (showLowStock) {
            const response = await apiClient.get<InventoryItem[]>(`/inventory/low-stock?threshold=${threshold}`)
            return Array.isArray(response) ? response : []
        }

        const params = new URLSearchParams({
            skip: "0",
            limit: "100",
        })

        if (search.trim()) {
            params.set("search", search.trim())
        }

        const response = await apiClient.get<InventoryItem[] | { items: InventoryItem[] }>(`/inventory?${params.toString()}`)
        return Array.isArray(response) ? response : response.items || []
    }

    const { data: items, isLoading, error, execute } = useApi<InventoryItem[]>(fetchInventory)

    const { mutate: createItem, isLoading: isCreating, error: createError } = useMutation<InventoryItem, InventoryForm>(
        (payload) => apiClient.post("/inventory", payload)
    )

    const { mutate: updateItem, isLoading: isUpdating, error: updateError } = useMutation<InventoryItem, { id: number; data: InventoryForm }>(
        (payload) => apiClient.put(`/inventory/${payload.id}`, payload.data)
    )

    const { mutate: deleteItem, isLoading: isDeleting, error: deleteError } = useMutation<void, number>(
        (id) => apiClient.delete(`/inventory/${id}`)
    )

    const { mutate: adjustItem, isLoading: isAdjusting, error: adjustError } = useMutation<InventoryItem, { id: number; adjustment: number }>(
        (payload) => apiClient.post(`/inventory/${payload.id}/adjust?adjustment=${payload.adjustment}`)
    )

    useEffect(() => {
        execute()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, showLowStock, threshold])

    const isSaving = isCreating || isUpdating
    const hasErrors = error || createError || updateError || deleteError || adjustError

    const filteredItems = useMemo(() => items || [], [items])
    const summary = useMemo(() => {
        const totalItems = filteredItems.length
        const activeItems = filteredItems.filter((item) => item.active).length
        const totalUnits = filteredItems.reduce((sum, item) => {
            if (!item.track_stock || item.quantity === null) return sum
            return sum + item.quantity
        }, 0)
        const lowStock = filteredItems.filter((item) => {
            if (!item.track_stock || item.quantity === null) return false
            return item.quantity <= threshold
        }).length

        return { totalItems, activeItems, totalUnits, lowStock }
    }, [filteredItems, threshold])

    const handleEdit = (item: InventoryItem) => {
        setEditingItem(item)
        setForm({
            product_name: item.product_name,
            price: item.price,
            quantity: item.quantity,
            description: item.description,
            track_stock: item.track_stock,
        })
    }

    const resetForm = () => {
        setEditingItem(null)
        setSavedItemId(null)
        setPendingFile(null)
        setPendingPreview(null)
        setForm(emptyForm)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload: InventoryForm = {
            ...form,
            quantity: form.track_stock ? (form.quantity ?? 0) : null,
        }

        if (editingItem) {
            const result = await updateItem({ id: editingItem.id, data: payload })
            if (result) {
                resetForm()
                execute()
            }
            return
        }

        const result = await createItem(payload)
        if (result) {
            setForm(emptyForm)
            setSavedItemId(result.id)
            if (pendingFile) {
                try {
                    await apiClient.uploadInventoryImage(result.id, pendingFile)
                } catch {
                    // upload failure is non-fatal; user can retry via the uploader
                }
                setPendingFile(null)
                setPendingPreview(null)
            }
            execute()
        }
    }

    const handleDelete = async (id: number) => {
        await deleteItem(id)
        setDeleteTarget(null)
        execute()
    }

    const handleAdjust = async (id: number) => {
        const adjustment = adjustments[id]
        if (!adjustment || Number.isNaN(adjustment)) return

        const result = await adjustItem({ id, adjustment })
        if (result) {
            setAdjustments((prev) => ({ ...prev, [id]: 0 }))
            execute()
        }
    }

    return (
        <>
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-3xl font-black mb-1">{t("inventory.title")}</h2>
                    <p className="text-muted-foreground">{t("inventory.subtitle")}</p>
                </div>
                <button
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-all"
                >
                    <Plus className="h-4 w-4" />
                    {t("inventory.newItem")}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr]">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                        {t("inventory.stats.totalItems")}
                                    </p>
                                    <p className="text-2xl font-black mt-1">{summary.totalItems}</p>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Boxes className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                        {t("inventory.stats.activeItems")}
                                    </p>
                                    <p className="text-2xl font-black mt-1">{summary.activeItems}</p>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <PackagePlus className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                        {t("inventory.stats.totalUnits")}
                                    </p>
                                    <p className="text-2xl font-black mt-1">{summary.totalUnits}</p>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                                        {t("inventory.stats.lowStock")}
                                    </p>
                                    <p className="text-2xl font-black mt-1">{summary.lowStock}</p>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <AlertCircle className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-primary/5 p-4 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t("inventory.searchPlaceholder")}
                                className="w-full rounded-xl border border-primary/10 bg-background/70 py-2.5 pl-10 pr-4 text-sm focus:border-primary/30 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowLowStock((prev) => !prev)}
                                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                                    showLowStock
                                        ? "border-amber-500/40 bg-amber-500/10 text-amber-500"
                                        : "border-primary/20 bg-background/80 text-muted-foreground"
                                }`}
                            >
                                {t("inventory.lowStock")}
                            </button>
                            {showLowStock && (
                                <input
                                    type="number"
                                    min={1}
                                    value={threshold}
                                    onChange={(e) => setThreshold(Number(e.target.value))}
                                    className="w-20 rounded-xl border border-primary/10 bg-background/70 px-2 py-2 text-xs focus:border-primary/30 focus:outline-none"
                                />
                            )}
                            <button
                                onClick={() => execute()}
                                className="rounded-xl border border-primary/20 bg-background/80 p-2 text-muted-foreground hover:text-foreground"
                            >
                                <RefreshCw className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center rounded-2xl border border-primary/10 bg-background/60 p-8 text-sm text-muted-foreground">
                            {t("inventory.loading")}
                        </div>
                    )}

                    {hasErrors && (
                        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {t("inventory.fetchError")}
                        </div>
                    )}

                    {!isLoading && filteredItems.length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/10 bg-background/60 p-10 text-center">
                            <Boxes className="h-10 w-10 text-muted-foreground mb-3" />
                            <p className="text-sm font-semibold">{t("inventory.empty")}</p>
                            <p className="text-xs text-muted-foreground">{t("inventory.emptyHint")}</p>
                        </div>
                    )}

                    {!isLoading && filteredItems.length > 0 && (
                        <div className="space-y-3">
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-primary/10 bg-background/70 p-4 transition-all hover:border-primary/30"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.product_name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <Boxes className="h-5 w-5 text-primary" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="text-sm font-semibold">{item.product_name}</p>
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                            item.active
                                                                ? "bg-emerald-500/10 text-emerald-500"
                                                                : "bg-muted/30 text-muted-foreground"
                                                        }`}
                                                    >
                                                        {item.active ? t("inventory.active") : t("inventory.inactive")}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-2 max-w-xl">
                                                    {item.description || t("inventory.noDescription")}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">{t("inventory.table.price")}</p>
                                                <p className="text-sm font-semibold">${item.price.toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">{t("inventory.table.quantity")}</p>
                                                <p className="text-sm font-semibold">{item.quantity ?? "-"}</p>
                                            </div>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                    item.track_stock
                                                        ? "bg-blue-500/10 text-blue-500"
                                                        : "bg-muted/30 text-muted-foreground"
                                                }`}
                                            >
                                                {item.track_stock ? t("inventory.trackStockOn") : t("inventory.trackStockOff")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="inline-flex items-center gap-1 rounded-lg border border-primary/20 px-2.5 py-1.5 text-xs hover:bg-primary/10"
                                            >
                                                <Pencil className="h-3 w-3" />
                                                {t("inventory.edit")}
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(item)}
                                                disabled={isDeleting}
                                                className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs text-red-500 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                                {t("inventory.delete")}
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 rounded-xl border border-primary/10 bg-background/60 px-2 py-1.5 text-xs">
                                            <span className="text-muted-foreground">{t("inventory.adjust")}</span>
                                            <button
                                                onClick={() =>
                                                    setAdjustments((prev) => ({
                                                        ...prev,
                                                        [item.id]: (prev[item.id] || 0) - 1,
                                                    }))
                                                }
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <input
                                                type="number"
                                                value={adjustments[item.id] ?? 0}
                                                onChange={(e) =>
                                                    setAdjustments((prev) => ({
                                                        ...prev,
                                                        [item.id]: Number(e.target.value),
                                                    }))
                                                }
                                                className="w-16 bg-transparent text-center text-xs focus:outline-none"
                                                disabled={!item.track_stock}
                                            />
                                            <button
                                                onClick={() =>
                                                    setAdjustments((prev) => ({
                                                        ...prev,
                                                        [item.id]: (prev[item.id] || 0) + 1,
                                                    }))
                                                }
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <PlusCircle className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={() => handleAdjust(item.id)}
                                                disabled={isAdjusting || !item.track_stock}
                                                className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary"
                                            >
                                                <PackagePlus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-primary/10 bg-background/70 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Boxes className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold">
                                {editingItem ? t("inventory.editItem") : t("inventory.newItem")}
                            </h3>
                        </div>
                        {editingItem && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                {t("inventory.cancel")}
                            </button>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                            {t("inventory.form.name")}
                        </label>
                        <input
                            value={form.product_name}
                            onChange={(e) => setForm((prev) => ({ ...prev, product_name: e.target.value }))}
                            className="w-full rounded-xl border border-primary/10 bg-background/80 px-3 py-2 text-sm focus:border-primary/30 focus:outline-none"
                            placeholder={t("inventory.form.namePlaceholder")}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                                {t("inventory.form.price")}
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={form.price}
                                onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                                className="w-full rounded-xl border border-primary/10 bg-background/80 px-3 py-2 text-sm focus:border-primary/30 focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground">
                                {t("inventory.form.quantity")}
                            </label>
                            <input
                                type="number"
                                value={form.quantity ?? 0}
                                onChange={(e) => setForm((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
                                className="w-full rounded-xl border border-primary/10 bg-background/80 px-3 py-2 text-sm focus:border-primary/30 focus:outline-none"
                                disabled={!form.track_stock}
                            />
                        </div>
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={form.track_stock}
                            onChange={(e) => setForm((prev) => ({
                                ...prev,
                                track_stock: e.target.checked,
                                quantity: e.target.checked ? (prev.quantity ?? 0) : null,
                            }))}
                        />
                        {t("inventory.form.trackStock")}
                    </label>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                            {t("inventory.form.description")}
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                            className="w-full rounded-xl border border-primary/10 bg-background/80 px-3 py-2 text-sm focus:border-primary/30 focus:outline-none"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">
                            {t("inventory.form.image")}
                        </label>
                        {uploaderItemId ? (
                            <InventoryImageUploader
                                itemId={uploaderItemId}
                                onUploaded={() => execute()}
                            />
                        ) : (
                            <>
                                <input
                                    ref={pendingFileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (!file) return
                                        setPendingFile(file)
                                        setPendingPreview(URL.createObjectURL(file))
                                        e.target.value = ""
                                    }}
                                />
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-20 shrink-0 rounded-xl bg-white/5 border border-primary/20 overflow-hidden flex items-center justify-center">
                                        {pendingPreview ? (
                                            <img src={pendingPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <button
                                            type="button"
                                            onClick={() => pendingFileInputRef.current?.click()}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg transition-colors text-xs"
                                        >
                                            <Upload className="w-3.5 h-3.5" />
                                            {pendingFile ? "Cambiar imagen" : "Seleccionar imagen"}
                                        </button>
                                        <p className="text-xs text-muted-foreground">PNG o JPG, máx. 4 MB · se subirá al guardar</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full rounded-xl bg-primary/20 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/30 transition-all"
                    >
                        {editingItem ? t("inventory.update") : t("inventory.create")}
                    </button>
                </form>
            </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog.Root open={!!deleteTarget} onOpenChange={(open: boolean) => { if (!open) setDeleteTarget(null) }}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-500/10 rounded-xl">
                            <Trash2 className="w-5 h-5 text-red-500" />
                        </div>
                        <Dialog.Title className="text-base font-bold text-white">
                            Eliminar producto
                        </Dialog.Title>
                    </div>
                    <Dialog.Description className="text-sm text-[#666] mb-6">
                        ¿Estás seguro de que quieres eliminar <span className="text-[#ADADAD] font-medium">"{deleteTarget?.product_name}"</span>? Esta acción no se puede deshacer.
                    </Dialog.Description>
                    <div className="flex gap-3">
                        <Dialog.Close asChild>
                            <button className="flex-1 py-2.5 bg-[#111] border border-[#1A1A1A] text-[#ADADAD] rounded-xl text-sm font-medium hover:text-white transition-colors">
                                Cancelar
                            </button>
                        </Dialog.Close>
                        <button
                            onClick={() => deleteTarget && handleDelete(deleteTarget.id)}
                            disabled={isDeleting}
                            className="flex-1 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                            {isDeleting ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
        </>
    )
}
