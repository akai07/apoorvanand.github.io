"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-purple-500 to-cyan-500"
    />
  )
}
