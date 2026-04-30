"use client"

import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'motion/react'
import { LucideIcon } from 'lucide-react'

interface FeatureCard3DProps {
    icon: LucideIcon
    title: string
    description: string
    gradientFrom?: string
    gradientTo?: string
    index?: number
}

const FeatureCard3D: React.FC<FeatureCard3DProps> = ({
    icon: Icon,
    title,
    description,
    gradientFrom = 'var(--brand-cyan)',
    gradientTo = 'var(--brand-magenta)',
    index = 0
}) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const mouseX = e.clientX - centerX
        const mouseY = e.clientY - centerY

        const rotateXValue = (mouseY / (rect.height / 2)) * -10
        const rotateYValue = (mouseX / (rect.width / 2)) * 10

        setRotateX(rotateXValue)
        setRotateY(rotateYValue)
    }

    const handleMouseLeave = () => {
        setRotateX(0)
        setRotateY(0)
        setIsHovered(false)
    }

    return (
        <StyledWrapper
            $gradientFrom={gradientFrom}
            $gradientTo={gradientTo}
            $isHovered={isHovered}
        >
            <motion.div
                ref={cardRef}
                className="feature-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
            >
                <div className="glow-effect" />
                <div className="card-content">
                    <div className="icon-wrapper">
                        <Icon className="icon" />
                    </div>
                    <h3 className="title">{title}</h3>
                    <p className="description">{description}</p>
                </div>
            </motion.div>
        </StyledWrapper>
    )
}

interface StyledWrapperProps {
    $gradientFrom: string
    $gradientTo: string
    $isHovered: boolean
}

const StyledWrapper = styled.div<StyledWrapperProps>`
  .feature-card {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    transition: transform 0.1s ease-out;
    transform-style: preserve-3d;
  }

  .glow-effect {
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      135deg,
      ${props => props.$gradientFrom},
      ${props => props.$gradientTo}
    );
    opacity: ${props => props.$isHovered ? 1 : 0};
    transition: opacity 0.3s ease;
    border-radius: 26px;
    z-index: 0;
  }

  .card-content {
    position: relative;
    z-index: 1;
    background: rgba(10, 10, 10, 0.96);
    backdrop-filter: blur(20px);
    padding: 32px;
    border-radius: 24px;
    border: 1px solid rgba(163, 255, 0, 0.14);
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    transition: all 0.3s ease;
  }

  .feature-card:hover .card-content {
    background: rgba(15, 15, 15, 0.98);
    border-color: transparent;
  }

  .icon-wrapper {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(
      135deg,
      ${props => props.$gradientFrom}20,
      ${props => props.$gradientTo}20
    );
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .feature-card:hover .icon-wrapper {
    transform: scale(1.1) translateZ(20px);
    background: linear-gradient(
      135deg,
      ${props => props.$gradientFrom},
      ${props => props.$gradientTo}
    );
  }

  .icon {
    width: 28px;
    height: 28px;
    color: ${props => props.$gradientFrom};
    transition: color 0.3s ease;
  }

  .feature-card:hover .icon {
    color: white;
  }

  .title {
    font-size: 21px;
    font-weight: 700;
    color: white;
    margin: 0;
    transform: translateZ(10px);
    line-height: 1.25;
  }

  .description {
    font-size: 15px;
    line-height: 1.6;
    color: #adadad;
    margin: 0;
    transform: translateZ(5px);
  }

  .feature-card:hover .description {
    color: #d1d1d1;
  }
`

export default FeatureCard3D
