"use client"

import Link from "next/link"
import { Zap, Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import styled from "styled-components"
import GradientButton from "@/components/ui/GradientButton"

const NavLinks = [
    { href: "#features", label: "Producto" },
    { href: "#pricing", label: "Precios" },
    { href: "#testimonials", label: "Testimonios" },
    { href: "#", label: "Documentación" },
]

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
                            className="logo-icon"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <div className="logo-glow" />
                            <Zap className="logo-zap" />
                        </motion.div>
                        <span className="logo-text">Yeison</span>
                        <span className="logo-badge">AI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="nav-links">
                        {NavLinks.map((link, i) => (
                            <Link key={i} href={link.href} className="nav-link">
                                <span className="nav-link-text">{link.label}</span>
                                <span className="nav-link-indicator" />
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="nav-cta">
                        <Link href="/login" className="login-btn">
                            Ingresar
                        </Link>
                        <GradientButton href="/login">
                            Probar Gratis
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
                            {NavLinks.map((link, i) => (
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
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="mobile-cta">
                                <GradientButton href="/login">
                                    Probar Gratis
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
      rgba(3, 169, 244, 0.3) 20%,
      rgba(244, 65, 165, 0.3) 50%,
      rgba(3, 169, 244, 0.3) 80%,
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
    gap: 10px;
    text-decoration: none;
  }

  .logo-icon {
    position: relative;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #03a9f4 0%, #f441a5 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 
      0 4px 15px rgba(3, 169, 244, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .logo-glow {
    position: absolute;
    inset: -4px;
    background: linear-gradient(135deg, #03a9f4 0%, #f441a5 100%);
    border-radius: 14px;
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.3s ease;
  }

  .logo-container:hover .logo-glow {
    opacity: 0.5;
  }

  .logo-zap {
    width: 22px;
    height: 22px;
    color: white;
    position: relative;
    z-index: 1;
  }

  .logo-text {
    font-size: 22px;
    font-weight: 800;
    color: white;
    letter-spacing: -0.5px;
  }

  .logo-badge {
    font-size: 10px;
    font-weight: 700;
    color: #03a9f4;
    background: rgba(3, 169, 244, 0.15);
    padding: 3px 6px;
    border-radius: 4px;
    border: 1px solid rgba(3, 169, 244, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Nav Links */
  .nav-links {
    display: none;
    align-items: center;
    gap: 8px;

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
    background: linear-gradient(90deg, #03a9f4, #f441a5);
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

    @media (min-width: 768px) {
      display: flex;
    }
  }

  .login-btn {
    padding: 10px 20px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    transition: all 0.2s ease;

    &:hover {
      color: white;
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
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
      color: #03a9f4;
    }
  }

  .mobile-cta {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`
