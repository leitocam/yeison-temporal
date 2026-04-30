"use client"

import { useEffect, useMemo, useState } from "react"
import { Link } from "@/i18n/routing"
import { Play, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

interface HeroDemoButtonProps {
  label: string
  timeLabel: string
  modalTitle: string
  modalUnavailable: string
  modalActionLabel: string
  modalCloseLabel: string
  videoUrl?: string
}

function getYouTubeEmbedUrl(url: string) {
  if (url.includes("youtube.com/watch?v=")) {
    return url.replace("watch?v=", "embed/")
  }

  if (url.includes("youtu.be/")) {
    const parts = url.split("youtu.be/")
    const videoId = parts[1]?.split("?")[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  return url
}

export default function HeroDemoButton({
  label,
  timeLabel,
  modalTitle,
  modalUnavailable,
  modalActionLabel,
  modalCloseLabel,
  videoUrl,
}: HeroDemoButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen])

  const hasVideo = Boolean(videoUrl?.trim())
  const normalizedUrl = videoUrl?.trim() ?? ""
  const isDirectVideo = normalizedUrl.endsWith(".mp4") || normalizedUrl.endsWith(".webm") || normalizedUrl.endsWith(".ogg")
  const iframeUrl = useMemo(() => {
    if (!normalizedUrl) {
      return ""
    }

    if (normalizedUrl.includes("youtube.com") || normalizedUrl.includes("youtu.be")) {
      return getYouTubeEmbedUrl(normalizedUrl)
    }

    return normalizedUrl
  }, [normalizedUrl])

  return (
    <>
      <motion.button
        className="relative overflow-hidden rounded-xl p-[1px] group"
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span
          className="absolute -inset-1 rounded-2xl opacity-50 blur-xl transition-opacity duration-300 group-hover:opacity-80"
          style={{
            background: "linear-gradient(90deg, var(--brand-cyan), var(--brand-magenta))",
          }}
        />
        <span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(var(--brand-cyan-rgb),0.9), rgba(var(--brand-magenta-rgb),0.9), rgba(var(--brand-cyan-rgb),0.9))",
            backgroundSize: "220% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        />
        <span className="relative flex items-center gap-3 px-6 py-3 rounded-[11px] glass-soft border border-white/10">
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg, rgba(var(--brand-cyan-rgb),0.2), rgba(var(--brand-magenta-rgb),0.2), rgba(var(--brand-cyan-rgb),0.2))",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
          }}
        />
        <span
          className="relative flex items-center justify-center w-10 h-10 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(var(--brand-cyan-rgb),0.2) 0%, rgba(var(--brand-magenta-rgb),0.2) 100%)",
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        >
          <span
            className="absolute -inset-1 rounded-full opacity-40 group-hover:opacity-70 blur-sm transition-opacity"
            style={{
              background: "linear-gradient(135deg, var(--brand-cyan) 0%, var(--brand-magenta) 100%)",
            }}
          />
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: "linear-gradient(135deg, var(--brand-cyan) 0%, var(--brand-magenta) 100%)",
            }}
          />
          <Play className="w-4 h-4 text-white ml-0.5 relative z-10" fill="white" />
        </span>
        <span className="relative z-10 flex flex-col items-start">
          <span className="text-white font-semibold text-sm">{label}</span>
          <span className="text-white/50 text-xs">{timeLabel}</span>
        </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[120]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-label={modalCloseLabel}
              type="button"
            />

            <motion.div
              className="relative mx-auto mt-[8vh] w-[min(92vw,960px)] overflow-hidden rounded-2xl border border-primary/30 glass-soft"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <h3 className="text-sm sm:text-base font-semibold text-foreground">{modalTitle}</h3>
                <button
                  className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/50"
                  onClick={() => setIsOpen(false)}
                  aria-label={modalCloseLabel}
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {hasVideo ? (
                <div className="bg-black aspect-video">
                  {isDirectVideo ? (
                    <video className="w-full h-full" controls autoPlay preload="metadata">
                      <source src={normalizedUrl} />
                    </video>
                  ) : (
                    <iframe
                      className="w-full h-full"
                      src={iframeUrl}
                      title={modalTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </div>
              ) : (
                <div className="aspect-video flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <p className="text-muted-foreground max-w-xl">{modalUnavailable}</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold border border-primary/30 hover:border-primary/60"
                  >
                    {modalActionLabel}
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
