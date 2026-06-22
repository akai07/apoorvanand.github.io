"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const ref = useRef(null)

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  )
}
