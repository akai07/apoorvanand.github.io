"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GraduationCap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="education"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      style={{ background: "var(--section-bg)" }}
    >

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-16 flex items-center gap-4">
            <div className="h-px w-12 bg-primary/40 edu-line origin-left" />
            <span className="text-[10px] tracking-[0.4em] text-primary/60 uppercase">
              Education
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-foreground">Academic </span>
          <span className="text-muted-foreground">background</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="rounded-2xl border border-border bg-card p-10">
            <div className="flex gap-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
                <GraduationCap className="h-7 w-7 text-primary/60" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  B.Tech — Computer Science Engineering
                </h3>
                <p className="mt-2 text-muted-foreground">
                  MIT-World Peace University, Pune
                </p>
                <p className="mt-2 text-sm text-muted-foreground/60">Pune, India</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Coursework: Data Structures, Algorithms, Operating Systems, Computer Networks,
                  Database Systems, Web Technologies
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
