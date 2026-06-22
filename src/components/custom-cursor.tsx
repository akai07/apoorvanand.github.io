"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const inner = innerRef.current
    if (!cursor || !inner) return

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 })
      gsap.to(inner, { x: e.clientX, y: e.clientY, duration: 0.3 })
    }

    const onHover = () => gsap.to(cursor, { scale: 2, duration: 0.3 })
    const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.3 })

    window.addEventListener("mousemove", onMove)
    document.querySelectorAll("a, button, [role=button]").forEach((el) => {
      el.addEventListener("mouseenter", onHover)
      el.addEventListener("mouseleave", onLeave)
    })

    return () => {
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed z-[9999] hidden md:block">
      <div
        ref={innerRef}
        className="fixed -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-4 w-4 rounded-full border-2 border-[#2D628C]" />
      </div>
      <div
        ref={cursorRef}
        className="fixed -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#2D628C]" />
      </div>
    </div>
  )
}
