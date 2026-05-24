---
version: "2.0"
name: Yeison AI - Dealer de Tiempo
description: >
  Premium enterprise dark design system for Yeison AI.
  Estética: High-Tech Cyberpunk, Fotorealismo Cinematográfico, Motion-First.
  Built on Next.js 16, Tailwind CSS v4, styled-components v6, and motion/react v12.

colors:
  background:       "#050505" # Negro profundo base
  foreground:       "#FAFAFA" # Texto principal
  primary:          "#A3FF00" # Verde neón ácido / lima brillante
  primary-foreground: "#050505" # Texto sobre botones primarios
  accent:           "#C4FF4D" # Variante clara del neón para hovers
  accent-foreground: "#050505"
  secondary:        "#121212" # Gris muy oscuro para superficies
  secondary-foreground: "#FAFAFA"
  muted:            "#474747" # Gris oscuro para detalles y bordes
  muted-foreground: "#ADADAD" # Texto secundario
  card:             "#0A0A0A" # Ligeramente más claro que el fondo
  card-foreground:  "#FAFAFA"
  border:           "#1A1A1A"
  input:            "#0F0F0F"
  destructive:      "#E05252"
  destructive-foreground: "#FAFAFA"
  sidebar:          "#080808"
  brand-neon:       "#A3FF00" # Token principal de marca
  success:          "#A3FF00" # Alineado a la marca
  warning:          "#F59E0B"
  chart-1:          "#A3FF00"
  chart-2:          "#FAFAFA"
  chart-3:          "#474747"

typography:
  h1:
    fontFamily: Geist
    fontSize: 3.75rem
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: Geist
    fontSize: 3rem
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: -0.02em
  h3:
    fontFamily: Geist
    fontSize: 1.375rem
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: Geist
    fontSize: 0.625rem
    fontWeight: 700
    letterSpacing: 0.15em
    textTransform: uppercase
  mono:
    fontFamily: Geist Mono
    fontSize: 0.875rem
    letterSpacing: 0.05em

rounded:
  sm:   4px
  md:   8px
  lg:   12px
  xl:   16px
  2xl:  24px
  3xl:  32px
  full: 9999px

spacing:
  xs:      4px
  sm:      8px
  md:      16px
  lg:      24px
  xl:      32px
  2xl:     48px
  3xl:     64px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.brand-neon}"
    textColor: "{colors.background}"
    rounded: "{rounded.xl}"
    padding: "16px 28px"
    typography: "{typography.label-caps}"
    boxShadow: "0 0 15px rgba(163, 255, 0, 0.15)"

  button-primary-hover:
    backgroundColor: "{colors.accent}"
    filter: "drop-shadow(0 0 25px rgba(163, 255, 0, 0.4))"

  button-secondary:
    backgroundColor: "transparent"
    border: "1px solid {colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "14px 26px"

  card:
    backgroundColor: "{colors.card}"
    border: "1px solid {colors.border}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.xl}"

  card-highlight:
    backgroundColor: "{colors.card}"
    border: "1px solid rgba(163, 255, 0, 0.3)"
    boxShadow: "inset 0 0 40px rgba(163, 255, 0, 0.05)"
    rounded: "{rounded.2xl}"

  input:
    backgroundColor: "{colors.input}"
    border: "1px solid {colors.border}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "16px"

  input-focus:
    border: "1px solid {colors.brand-neon}"
    boxShadow: "0 0 0 1px rgba(163, 255, 0, 0.2)"

  badge-neon:
    backgroundColor: "rgba(163, 255, 0, 0.1)"
    textColor: "{colors.brand-neon}"
    border: "1px solid rgba(163, 255, 0, 0.3)"
    rounded: "{rounded.full}"
    padding: "6px 12px"
    typography: "{typography.mono}"
---

## Overview

**Yeison AI** es el "Dealer de Tiempo". La interfaz debe reflejar una estética cinematográfica, seria e inmersiva. Abandonamos los colores amigables por una paleta de **Negro Profundo** combinada con destellos de **Verde Neón Ácido**. 

El diseño se basa en tres pilares para componentes desarrollados en React/Next.js:

1. **Darkness First:** Fondos high-tech casi absolutos (`#050505`). No hay distracciones visuales.
2. **Neon Focal Points:** El verde lima es el único indicador de acción, inteligencia y éxito. Emula el *glow* del monoculo del isotipo.
3. **Motion Engineering:** Cada interacción tiene un peso físico y calculable utilizando `motion/react`.

El atributo `class="dark"` es mandatorio y permanente a nivel de `html`.

---

## Colors

La regla principal es el **Contraste Extremo**. Los agentes deben evitar escalas de grises intermedias y saltar directamente de superficies muy oscuras al brillo del neón.

- **background (`#050505`):** Negro profundo. Usado en el canvas principal, sidebars y backgrounds de modales.
- **brand-neon (`#A3FF00`):** Verde neón ácido. Usado en CTAs primarios, halos de luz (glows), partículas activas, texto de marca ("YEISON") y badges de estado.
- **muted (`#474747`):** Gris oscuro para bordes y separadores. Evita que la UI se vea plana sin recurrir a fondos claros.

---

## Typography

Se utilizan **Geist** (Sans) y **Geist Mono**, integradas nativamente vía `next/font/google` (`--font-geist` y `--font-geist-mono`).

- **Headings (h1–h2):** Uso estricto de `font-weight: 900` (`font-black`) con tracking negativo (`-0.02em`) para crear bloques de texto densos e industriales.
- **Label Caps:** Empleado en botones primarios y tags. `text-[0.625rem]`, `font-bold`, y `tracking-[0.15em]`.
- **Mono:** Exclusivo para contadores, IPs, códigos de agente y métricas crudas. 

---

## Elevation, Depth & Light

En lugar del glassmorphism tradicional pesado, usamos la luz neón para separar capas.

1. **Surface Layer:** `bg-[#0A0A0A]` con `border-[#1A1A1A]`.
2. **Glow Emulation:** En componentes activos, aplicamos un halo de luz verde usando CSS `box-shadow: 0 0 30px rgba(163,255,0,0.15)`.
3. **Overlay Layer:** Modales con `backdrop-filter: blur(24px)` y fondo `rgba(5,5,5,0.8)`.

```css
/* Utilidad global para componentes activos */
.neon-glow {
  box-shadow: 0 0 20px rgba(163, 255, 0, 0.15);
  border-color: rgba(163, 255, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.neon-glow:hover {
  box-shadow: 0 0 40px rgba(163, 255, 0, 0.3);
  border-color: #A3FF00;
}