"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxBgProps {
  src: string
  speed?: number
  speedX?: number
  className?: string
  overlay?: boolean
  mode?: "cover" | "panoramic"
  imgOpacity?: number
}

export default function ParallaxBg({ src, speed = 0.3, speedX = 0, className = "", overlay = true, mode = "cover", imgOpacity = 0.3 }: ParallaxBgProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, -speed * 120])
  const x = useTransform(scrollYProgress, [0, 1], [-speedX * 120, speedX * 120])

  const webp = src.replace(/\.(png|jpg|jpeg)$/, ".webp")

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        style={{ y, x }}
        className={
          mode === "panoramic"
            ? "absolute top-0 h-full w-[220%] left-1/2 -translate-x-1/2"
            : "absolute inset-[-15%]"
        }
      >
        <picture>
          <source srcSet={webp} type="image/webp" />
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover object-center"
            style={{ opacity: imgOpacity }}
            loading="eager"
          />
        </picture>
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      )}
    </div>
  )
}
