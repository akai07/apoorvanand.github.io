"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

export default function SectionNav() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { threshold: 0.4 }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    const onScroll = () => setVisible(window.scrollY > 100)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      className="fixed right-8 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col items-center gap-3"
    >
      {sections.map((section, i) => (
        <button
          key={section.id}
          onClick={() =>
            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
          }
          className="group relative flex h-6 w-6 items-center justify-center"
        >
          <span
            className={`block h-2 w-2 rounded-full transition-all duration-300 ${
              i === active
                ? "bg-[#2D628C] scale-125"
                : "bg-white/20 group-hover:bg-white/40"
            }`}
          />
          <span className="absolute right-8 whitespace-nowrap rounded bg-[#0a0a0a]/90 px-2 py-1 text-xs text-white/60 opacity-0 transition-opacity group-hover:opacity-100">
            {section.label}
          </span>
        </button>
      ))}
      <div className="mt-3 h-16 w-px bg-white/10" />
    </motion.div>
  )
}
