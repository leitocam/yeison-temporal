"use client"

import { Link } from "@/i18n/routing"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import styled from "styled-components"
import { useTranslations } from "next-intl"
import Image from "next/image"
import GradientButton from "@/components/ui/GradientButton"
import LanguageSwitcher from "@/components/ui/LanguageSwitcher"
import { NAV_LINKS } from "@/components/landing/theme"
import LogoHorizontal from "@/components/Logos/LogoHorizontal.png"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = useTranslations('nav')

  return (
    <StyledNavbar>
      <nav className="navbar">
        {/* Background with blur and gradient */}
        <div className="navbar-bg" />

        {/* Animated border bottom */}
        <div className="navbar-border" />

        <div className="navbar-content">
          {/* Logo */}
          <Link href="/" className="logo-container">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Image
                src={LogoHorizontal}
                alt="Yeison AI"
                className="logo-image"
                priority
                sizes="(max-width: 768px) 160px, 200px"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {NAV_LINKS.map((link, i) => (
              <Link key={i} href={link.href} className="nav-link">
                <span className="nav-link-text">{t(link.key)}</span>
                <span className="nav-link-indicator" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="nav-cta">
            <LanguageSwitcher />
            <Link href="/login" className="login-btn">
              {t('login')}
            </Link>
            <GradientButton href="/register">
              {t('tryFree')}
            </GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
              <div className="mobile-cta">
                <div className="mobile-lang-switcher">
                  <LanguageSwitcher />
                </div>
                <GradientButton href="/register">
                  {t('tryFree')}
                </GradientButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </StyledNavbar>
  )
}

const StyledNavbar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  .navbar {
    position: relative;
  }

  .navbar-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10, 10, 15, 0.95) 0%,
      rgba(10, 10, 15, 0.85) 100%
    );
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
  }

  .navbar-border {
    position: absolute;
    bottom: 0;
    left: 5%;
    right: 5%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(var(--brand-cyan-rgb), 0.3) 20%,
      rgba(var(--brand-magenta-rgb), 0.3) 50%,
      rgba(var(--brand-cyan-rgb), 0.3) 80%,
      transparent 100%
    );
  }

  .navbar-content {
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Logo */
  .logo-container {
    display: flex;
    align-items: center;
    text-decoration: none;
    min-width: 0;
    flex-shrink: 0;
  }

  .logo-image {
    width: 158px;
    height: auto;
    display: block;

    @media (max-width: 640px) {
      width: 142px;
    }
  }

  /* Nav Links */
  .nav-links {
    display: none;
    align-items: center;
    gap: 8px;
    flex: 1;
    justify-content: center;
    margin: 0 20px 0 24px;

    @media (min-width: 768px) {
      display: flex;
    }
  }

  .nav-link {
    position: relative;
    padding: 10px 16px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s ease;
    border-radius: 8px;

    &:hover {
      color: white;
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .nav-link-text {
    position: relative;
    z-index: 1;
  }

  .nav-link-indicator {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--brand-cyan), var(--brand-magenta));
    border-radius: 1px;
    transition: width 0.3s ease;
  }

  .nav-link:hover .nav-link-indicator {
    width: calc(100% - 32px);
  }

  /* CTA Buttons */
  .nav-cta {
    display: none;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;

    @media (min-width: 768px) {
      display: flex;
    }
  }

  .login-btn {
    position: relative;
    padding: 10px 24px;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid transparent;
    background-image: 
      linear-gradient(rgba(15, 15, 20, 0.9), rgba(15, 15, 20, 0.9)),
      linear-gradient(
        135deg,
        rgba(var(--brand-cyan-rgb), 0.4) 0%,
        rgba(var(--brand-magenta-rgb), 0.4) 100%
      );
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: all 0.3s ease;
    box-shadow: 0 0 0 0 rgba(var(--brand-cyan-rgb), 0);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 10px;
      background: linear-gradient(
        135deg,
        rgba(var(--brand-cyan-rgb), 0.1) 0%,
        rgba(var(--brand-magenta-rgb), 0.1) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      color: white;
      background-image: 
        linear-gradient(rgba(20, 20, 30, 0.95), rgba(20, 20, 30, 0.95)),
        linear-gradient(
          135deg,
          rgba(var(--brand-cyan-rgb), 0.7) 0%,
          rgba(var(--brand-magenta-rgb), 0.7) 100%
        );
      box-shadow: 
        0 0 20px rgba(var(--brand-cyan-rgb), 0.2),
        0 0 40px rgba(var(--brand-magenta-rgb), 0.1);
      transform: translateY(-1px);
    }

    &:hover::before {
      opacity: 1;
    }

    &:active {
      transform: translateY(0);
    }
  }

  /* Mobile Menu Button */
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (min-width: 768px) {
      display: none;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  /* Mobile Menu */
  .mobile-menu {
    position: relative;
    background: rgba(10, 10, 15, 0.98);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 16px 24px 24px;
    overflow: hidden;

    @media (min-width: 768px) {
      display: none;
    }
  }

  .mobile-link {
    display: block;
    padding: 14px 0;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: color 0.2s ease;

    &:hover {
      color: var(--brand-cyan);
    }
  }

  .mobile-cta {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .mobile-lang-switcher {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }
`
