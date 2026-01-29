"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'motion/react'

interface AnimatedCounterProps {
    value: number
    duration?: number
    prefix?: string
    suffix?: string
    decimals?: number
    className?: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    duration = 2,
    prefix = '',
    suffix = '',
    decimals = 0,
    className = ''
}) => {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [hasAnimated, setHasAnimated] = useState(false)

    const springValue = useSpring(0, {
        damping: 30,
        stiffness: 100,
        duration: duration * 1000
    })

    const displayValue = useTransform(springValue, (latest) => {
        return `${prefix}${latest.toFixed(decimals)}${suffix}`
    })

    useEffect(() => {
        if (isInView && !hasAnimated) {
            springValue.set(value)
            setHasAnimated(true)
        }
    }, [isInView, value, springValue, hasAnimated])

    return (
        <motion.span
            ref={ref}
            className={className}
        >
            {displayValue}
        </motion.span>
    )
}

export default AnimatedCounter
