'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Boxes, Search, Loader2, AlertCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useApi } from '@/hooks/useApi'
import { apiClient, type InventoryItem } from '@/lib/api-client'
import { NeonCard } from '../shared/NeonCard'

interface ProductPickerProps {
  selected: InventoryItem | null
  onSelect: (product: InventoryItem | null) => void
}

export function ProductPicker({ selected, onSelect }: ProductPickerProps) {
  const [search, setSearch] = useState('')

  const { data: rawInventory, isLoading, error, execute } = useApi<InventoryItem[] | { items: InventoryItem[] }>(
    () => apiClient.get('/inventory?skip=0&limit=50')
  )

  useEffect(() => { execute() }, [])

  const inventory: InventoryItem[] = Array.isArray(rawInventory)
    ? rawInventory
    : (rawInventory as any)?.items ?? []

  const filtered = inventory.filter(
    (item) =>
      item.active &&
      item.product_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <p className="text-white font-semibold">1. Elige el producto</p>
        {selected && (
          <span className="text-xs font-mono text-[#A3FF00] border border-[#A3FF00]/30 bg-[#A3FF00]/10 rounded-full px-2 py-0.5">
            {selected.product_name}
          </span>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto..."
          className="w-full bg-[#0F0F0F] border border-[#1A1A1A] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-[#333] text-sm focus:outline-none focus:border-[#A3FF00]/50 transition-all"
        />
      </div>

      {/* States */}
      {isLoading && (
        <div className="flex items-center justify-center py-10 gap-3 text-[#444]">
          <Loader2 className="w-5 h-5 animate-spin text-[#A3FF00]" />
          <span className="text-sm">Cargando productos...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">Error al cargar inventario. Verifica tu conexión.</p>
        </div>
      )}

      {!isLoading && !error && inventory.length === 0 && (
        <div className="text-center py-10 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl">
          <Boxes className="w-10 h-10 text-[#333] mx-auto mb-3" />
          <p className="text-[#666] text-sm mb-4">No tienes productos en el inventario.</p>
          <Link
            href="../inventory"
            className="inline-flex items-center gap-2 text-[#A3FF00] text-sm font-medium hover:underline"
          >
            Agregar productos <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {!isLoading && !error && filtered.length === 0 && inventory.length > 0 && (
        <p className="text-center text-[#444] text-sm py-6">Sin resultados para "{search}"</p>
      )}

      {/* Product Grid */}
      {!isLoading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <NeonCard
                isSelected={selected?.id === item.id}
                onClick={() => onSelect(selected?.id === item.id ? null : item)}
                className="p-3 flex flex-col gap-2"
              >
                {/* Product image */}
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#111] flex items-center justify-center">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Boxes className="w-8 h-8 text-[#333]" />
                  )}
                </div>
                {/* Info */}
                <div>
                  <p className="text-white text-xs font-semibold line-clamp-2 leading-tight">
                    {item.product_name}
                  </p>
                  <p className="text-[#A3FF00] text-xs font-mono mt-0.5">
                    ${item.price.toLocaleString('es-CO')}
                  </p>
                  {item.track_stock && item.quantity !== null && (
                    <p className="text-[#444] text-[10px] mt-0.5">{item.quantity} en stock</p>
                  )}
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
