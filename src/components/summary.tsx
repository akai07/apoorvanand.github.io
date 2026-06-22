"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  {
    num: "01",
    title: "KaiSchool",
    desc: "25-module multi-tenant School Management System built with OpenCode + OpenClaw — 20+ AI agents in parallel",
  },
  {
    num: "02",
    title: "KaiBot",
    desc: "LLM-powered conversational CRM with Stripe billing and WhatsApp integration",
  },
  {
    num: "03",
    title: "Enterprise Scale",
    desc: "HP infrastructure background with automation, monitoring, and RCA expertise across 200+ deployments",
  },
]

export default function Summary() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-line",
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
      id="about"
      ref={ref}
      className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden -mt-[10vh] md:-mt-[10vh]"
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
            <div className="h-px w-12 bg-primary/40 about-line origin-left" />
            <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
              About
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
          <span className="text-foreground">Building AI-powered </span>
          <span className="text-muted-foreground">systems at scale</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          Agentic AI engineer specializing in autonomous multi-agent coding systems and
          production SaaS platforms. Designing the future of AI-first development workflows.
        </motion.p>

        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-border md:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
              className="group relative bg-card p-8 transition-colors hover:bg-accent"
            >
              <span className="text-5xl font-bold text-muted-foreground/10 transition-colors group-hover:text-primary/10">
                {item.num}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
