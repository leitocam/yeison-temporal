"use client"

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface GradientButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false
}) => {
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', pointerEvents: disabled ? 'none' : 'auto', width: fullWidth ? '100%' : 'auto', display: fullWidth ? 'block' : 'inline-block' }}>
        <StyledWrapper $fullWidth={fullWidth}>
          <div className="container">
            <button className="button" type={type} disabled={disabled}>
              {children}
            </button>
          </div>
        </StyledWrapper>
      </Link>
    )
  }

  return (
    <StyledWrapper $fullWidth={fullWidth}>
      <div className="container">
        <button className="button" type={type} onClick={onClick} disabled={disabled}>
          {children}
        </button>
      </div>
    </StyledWrapper>
  )
}

interface StyledWrapperProps {
  $fullWidth: boolean
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  display: ${props => props.$fullWidth ? 'block' : 'inline-block'};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};

  button {
    font-size: 1em;
    padding: 0.75em 1.25em;
    border-radius: 0.75em;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    box-shadow: 2px 2px 3px #000000b4;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    transition: all 0.3s ease;
    width: 100%;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:not(:disabled):hover {
    transform: translateY(-1px);
  }

  .container {
    position: relative;
    padding: 3px;
    background: linear-gradient(90deg, #03a9f4, #f441a5);
    border-radius: 1em;
    transition: all 0.4s ease;
    width: 100%;
  }

  .container::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    border-radius: 1em;
    z-index: -10;
    filter: blur(0);
    transition: filter 0.4s ease;
  }

  .container:hover::before {
    background: linear-gradient(90deg, #03a9f4, #f441a5);
    filter: blur(1.2em);
  }

  .container:active::before {
    filter: blur(0.2em);
  }
`

export default GradientButton
