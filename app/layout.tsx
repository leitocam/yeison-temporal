import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Favicon from "@/components/Logos/Favicon.png"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Yeison - Automatización de Ventas con IA para Bolivia",
  description:
    "Cierra más ventas sin contratar más personal. Agentes inteligentes que atienden por WhatsApp 24/7, hacen seguimiento automático y venden por ti. Diseñado para PYMES bolivianas.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: Favicon.src,
        type: "image/png",
      },
    ],
    apple: Favicon.src,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div id="fb-root" />
        {children}
      </body>
    </html>
  )
}
