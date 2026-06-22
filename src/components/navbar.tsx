"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b backdrop-blur-xl"
          : "bg-transparent"
      }`}
      style={{
        borderColor: scrolled
          ? isDark ? "rgba(255,255,255,0.04)" : "rgba(9,75,101,0.08)"
          : "transparent",
        background: scrolled
          ? isDark ? "rgba(10,3,23,0.85)" : "rgba(255,255,255,0.92)"
          : "transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="text-lg font-bold tracking-tight" style={{ color: isDark ? "#fff" : "#094b65" }}>
          AA
          <span style={{ color: isDark ? "#a78bfa" : "#2d6a4f" }}>.</span>
        </a>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(9,75,101,0.4)",
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(9,75,101,0.08)",
              color: isDark ? "rgba(255,255,255,0.8)" : "#094b65",
            }}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-xs tracking-wider uppercase transition-colors"
              style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(9,75,101,0.85)" }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors md:hidden"
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(9,75,101,0.3)",
            color: isDark ? "rgba(255,255,255,0.6)" : "#094b65",
          }}
          onClick={() => setOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 backdrop-blur-xl md:hidden"
              style={{ background: isDark ? "rgba(10,3,23,0.98)" : "rgba(255,255,255,0.98)" }}
            >
              <div className="flex h-16 items-center justify-end px-6">
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                  style={{
                    borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.4)",
                    color: isDark ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.8)",
                  }}
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex flex-col items-center justify-center gap-8 pt-20">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="text-2xl font-medium tracking-wider uppercase transition-colors"
                    style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(9,75,101,0.85)" }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
