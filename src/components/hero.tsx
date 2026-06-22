"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Download, ArrowDown } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const layers = {
  dark: [
    { src: "/moon/stars.png", speed: 0.5, speedAxis: "x", z: 1, mix: undefined },
    { src: "/moon/moon.png", speed: -1.05, speedAxis: "y", z: 2, mix: "screen" as const },
    { src: "/moon/mountains_behind.png", speed: -0.35, speedAxis: "y", z: 3, mix: undefined },
    { src: "/moon/mountains_front.png", speed: 0, speedAxis: "y", z: 10, mix: undefined },
  ],
  light: [
    { src: "/jungle/bird1.png", speed: 2.0, speedAxis: "x", z: 4, mix: undefined },
    { src: "/jungle/bird2.png", speed: -1.5, speedAxis: "x", z: 3, mix: undefined },
    { src: "/jungle/forest.png", speed: -0.2, speedAxis: "y", z: 5, mix: undefined },
    { src: "/jungle/rocks.png", speed: 0, speedAxis: "y", z: 9, mix: undefined },
    { src: "/jungle/water.png", speed: 0, speedAxis: "y", z: 10, mix: undefined },
  ],
}

export default function Hero() {
  const { theme } = useTheme()
  const refs = useRef<(HTMLImageElement | null)[]>([])
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const value = window.scrollY
      const isMobile = window.innerWidth < 768
      refs.current.forEach((el, i) => {
        if (!el) return
        const layer = layers[theme][i]
        if (!layer) return
        if (isMobile) {
          el.style.transform = "none"
          return
        }
        const offset = layer.speed * value
        if (layer.speedAxis === "x") {
          el.style.transform = `translateX(${offset}px)`
        } else {
          el.style.transform = `translateY(${offset}px)`
        }
      })
      if (textRef.current) {
        textRef.current.style.transform = isMobile ? "none" : `translateY(${-value * 0.5}px)`
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [theme])

  const isDark = theme === "dark"

  return (
    <section
      className="relative z-0 min-h-screen w-full overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(to bottom, #1a0a3e 0%, #2d1b69 40%, #1a0a3e 70%, #0a0317 100%)"
          : "#ffffff",
      }}
    >
      {/* Background solid for gap prevention */}
      <div
        className="absolute inset-0"
        style={{ background: isDark ? "#0a0317" : "#ffffff" }}
      />

      {/* Parallax layers */}
      {layers[theme].map((layer, i) => (
        <img
          key={`${theme}-${i}`}
          ref={(el) => { refs.current[i] = el }}
          src={layer.src}
          alt=""
          className="absolute left-0 pointer-events-none"
          style={{
            zIndex: layer.z,
            width: "100%",
            height: i >= layers[theme].length - 2 ? "115vh" : "100vh",
            bottom: i >= layers[theme].length - 2 ? "0" : undefined,
            top: i < layers[theme].length - 2 ? "0" : undefined,
            objectFit: "cover",
            objectPosition: i >= layers[theme].length - 2 ? "bottom" : "center",
            mixBlendMode: layer.mix,
          }}
        />
      ))}

      {/* Text */}
      <div
        className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-center"
        style={{ zIndex: 20, top: "22%" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl font-bold leading-none tracking-tight md:text-7xl lg:text-8xl xl:text-9xl"
          style={{
            color: isDark ? "#fff" : "#fff",
            textShadow: isDark
              ? "0 0 80px rgba(139,92,246,0.3)"
              : "0 4px 20px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.4)",
          }}
        >
          APOORV
          <br />
          <span style={{ color: isDark ? "#a78bfa" : "#4ade80" }}>ANAND</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 max-w-md text-sm md:text-base"
          style={{ color: isDark ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.85)", fontWeight: isDark ? 400 : 500 }}
        >
          Agentic AI Engineer & Full-Stack SaaS Builder
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              const el = document.getElementById("projects")
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" })
            }}
            className="inline-flex h-11 cursor-pointer items-center rounded-full px-6 text-sm font-medium transition-all hover:scale-105"
            style={{
              background: isDark ? "#a78bfa" : "#fff",
              color: isDark ? "#fff" : "#094b65",
              boxShadow: isDark ? "0 0 30px rgba(167,139,250,0.4)" : "0 4px 20px rgba(0,0,0,0.15)",
              fontWeight: 600,
            }}
          >
            View My Work
          </button>
          <a
            href="/resume.pdf"
            download
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-5 text-sm transition-all hover:scale-105"
            style={{
              borderColor: isDark ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.5)",
              color: isDark ? "rgba(255,255,255,0.9)" : "#fff",
              background: isDark ? "rgba(167,139,250,0.1)" : "rgba(255,255,255,0.15)",
              borderWidth: isDark ? "1px" : "2px",
            }}
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 z-[15] h-[30vh] w-full"
        style={{
          background: isDark
            ? "linear-gradient(to top, #0a0317 0%, #0a0317 10%, transparent 100%)"
            : "linear-gradient(to top, #ffffff 0%, #ffffff 20%, transparent 100%)",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.6)" }}>
          Scroll to discover
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.6)" }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
