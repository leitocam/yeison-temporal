'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown } from 'lucide-react';
import styled from 'styled-components';

const locales = [
  { code: 'es', label: 'Español', flag: '🇧🇴' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // next-intl's usePathname returns the path WITHOUT the locale prefix
    // so we can directly use router.replace with the locale option
    router.replace(pathname, { locale: newLocale as 'es' | 'en' });
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <StyledSwitcher ref={dropdownRef}>
      <button
        className="switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="globe-icon" />
        <span className="current-flag">{currentLocale.flag}</span>
        <ChevronDown className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            role="listbox"
          >
            {locales.map((loc) => (
              <button
                key={loc.code}
                className={`dropdown-item ${loc.code === locale ? 'active' : ''}`}
                onClick={() => switchLocale(loc.code)}
                role="option"
                aria-selected={loc.code === locale}
              >
                <span className="flag">{loc.flag}</span>
                <span className="label">{loc.label}</span>
                {loc.code === locale && (
                  <motion.div
                    className="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    ✓
                  </motion.div>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </StyledSwitcher>
  );
}

const StyledSwitcher = styled.div`
  position: relative;

  .switcher-button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .globe-icon {
      width: 16px;
      height: 16px;
      opacity: 0.7;
    }

    .current-flag {
      font-size: 16px;
    }

    .chevron {
      width: 14px;
      height: 14px;
      opacity: 0.5;
      transition: transform 0.2s ease;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 150px;
    padding: 6px;
    background: rgba(15, 15, 20, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    box-shadow: 
      0 10px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    z-index: 50;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    background: transparent;
    border: none;
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: white;
    }

    &.active {
      background: linear-gradient(135deg, rgba(3, 169, 244, 0.15) 0%, rgba(244, 65, 165, 0.15) 100%);
      color: white;
    }

    .flag {
      font-size: 18px;
    }

    .label {
      flex: 1;
      text-align: left;
    }

    .check {
      color: #03a9f4;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;
