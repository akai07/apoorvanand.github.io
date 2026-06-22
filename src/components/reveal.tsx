"use client"

import { motion, type Variants } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export default function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
