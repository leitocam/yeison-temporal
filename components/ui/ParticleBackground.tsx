"use client"

import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

interface ParticleBackgroundProps {
    particleCount?: number
    className?: string
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
    particleCount = 50,
    className = ''
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number
        let particles: Particle[] = []

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            opacity: number
            hue: number

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.size = Math.random() * 2 + 0.5
                this.speedX = (Math.random() - 0.5) * 0.5
                this.speedY = (Math.random() - 0.5) * 0.5
                this.opacity = Math.random() * 0.5 + 0.2
                this.hue = Math.random() > 0.5 ? 195 : 315 // Cyan or Magenta
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > canvas!.width) this.x = 0
                if (this.x < 0) this.x = canvas!.width
                if (this.y > canvas!.height) this.y = 0
                if (this.y < 0) this.y = canvas!.height
            }

            draw() {
                ctx!.beginPath()
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx!.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`
                ctx!.fill()
            }
        }

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        const init = () => {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120) {
                        const opacity = (1 - distance / 120) * 0.15
                        ctx!.beginPath()
                        ctx!.strokeStyle = `rgba(3, 169, 244, ${opacity})`
                        ctx!.lineWidth = 0.5
                        ctx!.moveTo(particles[i].x, particles[i].y)
                        ctx!.lineTo(particles[j].x, particles[j].y)
                        ctx!.stroke()
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach(particle => {
                particle.update()
                particle.draw()
            })

            connectParticles()
            animationId = requestAnimationFrame(animate)
        }

        resize()
        init()
        animate()

        window.addEventListener('resize', () => {
            resize()
            init()
        })

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
        }
    }, [particleCount])

    return (
        <StyledWrapper className={className}>
            <canvas ref={canvasRef} />
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  canvas {
    width: 100%;
    height: 100%;
  }
`

export default ParticleBackground
