"use client"

import React, { useRef, useEffect, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

interface ShineTextProps {
  children: React.ReactNode
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div'
  fontSize?: string
  fontWeight?: number
  duration?: number
  baseColor?: string
  shineColor?: string
}

const ShineText: React.FC<ShineTextProps> = ({
  children,
  className = '',
  as = 'span',
  fontSize = 'inherit',
  fontWeight = 900,
  duration = 5, // Más lento por defecto (5 segundos base)
  baseColor = '#6b6b6b',
  shineColor = '#ffffff'
}) => {
  const textRef = useRef<HTMLElement>(null)
  const [textWidth, setTextWidth] = useState(300)

  useEffect(() => {
    if (textRef.current) {
      const updateWidth = () => {
        const width = textRef.current?.offsetWidth || 300
        setTextWidth(width)
      }
      updateWidth()

      // Observer para cambios de tamaño
      const resizeObserver = new ResizeObserver(updateWidth)
      resizeObserver.observe(textRef.current)

      return () => resizeObserver.disconnect()
    }
  }, [children])

  const renderText = () => {
    const props = {
      ref: textRef as any,
      className: "shine-text"
    }

    switch (as) {
      case 'h1': return <h1 {...props}>{children}</h1>
      case 'h2': return <h2 {...props}>{children}</h2>
      case 'h3': return <h3 {...props}>{children}</h3>
      case 'p': return <p {...props}>{children}</p>
      case 'div': return <div {...props}>{children}</div>
      default: return <span {...props}>{children}</span>
    }
  }

  return (
    <StyledWrapper
      className={className}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $duration={duration}
      $baseColor={baseColor}
      $shineColor={shineColor}
      $textWidth={textWidth}
    >
      {renderText()}
    </StyledWrapper>
  )
}

interface StyledWrapperProps {
  $fontSize: string
  $fontWeight: number
  $duration: number
  $baseColor: string
  $shineColor: string
  $textWidth: number
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  display: inline;

  .shine-text {
    display: inline;
    background: ${props => `linear-gradient(
      90deg,
      ${props.$baseColor} 0%,
      ${props.$baseColor} 35%,
      ${props.$shineColor} 50%,
      ${props.$baseColor} 65%,
      ${props.$baseColor} 100%
    )`};
    background-size: ${props => props.$textWidth * 3}px 100%;
    background-position: ${props => props.$textWidth * 3}px 0;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${props => css`shine-animation ${props.$duration}s ease-in-out infinite`};
    -webkit-text-size-adjust: none;
    font-weight: ${props => props.$fontWeight};
    font-size: ${props => props.$fontSize};
    font-family: inherit;
    margin: 0;
    padding: 0;
    line-height: inherit;
    white-space: normal;
    word-wrap: break-word;
  }

  @keyframes shine-animation {
    0% {
      background-position: ${props => props.$textWidth * 3}px 0;
    }
    100% {
      background-position: ${props => -props.$textWidth}px 0;
    }
  }
`

export default ShineText
