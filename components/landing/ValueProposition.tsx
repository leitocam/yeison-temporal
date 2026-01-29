"use client"

import { motion } from "motion/react"
import ShineText from "@/components/ui/ShineText"

export default function ValueProposition() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl font-black mb-6">
                        Automatización empresarial{" "}
                        <ShineText
                            as="span"
                            fontSize="inherit"
                            fontWeight={900}
                            baseColor="#c026d3"
                            shineColor="#f0abfc"
                            duration={4}
                        >
                            sin complejidad
                        </ShineText>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Yeison fue diseñado para <strong className="text-foreground">PYMEs bolivianas</strong> que necesitan vender más, atender mejor y gastar menos.
                        Tecnología de clase mundial adaptada a tu realidad.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
