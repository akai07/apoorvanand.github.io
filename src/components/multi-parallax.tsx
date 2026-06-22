"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface LayerDef {
  src: string
  speed: number
  speedX?: number
  opacity?: number
  className?: string
}

interface MultiParallaxProps {
  layers: LayerDef[]
  className?: string
  mode?: "cover" | "panoramic"
}

export default function MultiParallax({ layers, className = "", mode = "panoramic" }: MultiParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {layers.map((layer, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [layer.speed * 120, -layer.speed * 120])
        const x = useTransform(
          scrollYProgress,
          [0, 1],
          [-(layer.speedX || 0) * 150, (layer.speedX || 0) * 150]
        )

        return (
          <motion.div
            key={i}
            style={{ y, x }}
            className={
              mode === "panoramic"
                ? "absolute top-0 h-full w-[260%] left-1/2 -translate-x-1/2"
                : "absolute inset-[-15%]"
            }
          >
            <img
              src={layer.src}
              alt=""
              className={`h-full w-full object-cover object-center ${layer.className || ""}`}
              style={{ opacity: layer.opacity ?? 0.6 }}
              loading="eager"
            />
          </motion.div>
        )
      })}
    </div>
  )
}
