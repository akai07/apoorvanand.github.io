"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function FloatingParticles() {
  const ref = useRef(null)

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => {
        const size = 2 + Math.random() * 4
        const left = Math.random() * 100
        const animDuration = 8 + Math.random() * 12
        const delay = Math.random() * 10
        const drift = 20 + Math.random() * 40

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: "-5%",
            }}
            animate={{
              y: [0, -(100 + drift)],
              x: [0, (Math.random() - 0.5) * drift * 0.5],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: animDuration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}
