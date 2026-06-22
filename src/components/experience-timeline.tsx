"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    title: "Senior Technical Support Engineer",
    company: "HP Inc",
    period: "Apr 2025 – Present",
    location: "Bengaluru, India",
    achievements: [
      "Built monitoring dashboards and Python automation reducing incident triage by 40%",
      "Developed log analysis pipelines processing 50K+ daily events",
      "Architected runbook automation adopted across 3 global support teams",
    ],
  },
  {
    title: "Technical Support Engineer II",
    company: "HP Inc",
    period: "Jul 2024 – Apr 2025",
    location: "Bengaluru, India",
    achievements: [
      "Engineered automation workflows increasing First Contact Resolution by 25%",
      "Built SLA tracking and predictive escalation tooling, reducing missed targets by 40%",
      "Mentored 6 junior engineers, improving team-wide SLA performance by 20%",
    ],
  },
  {
    title: "Technical Support Engineer I",
    company: "HP Inc",
    period: "Dec 2022 – Jul 2024",
    location: "Bengaluru, India",
    achievements: [
      "92% first-attempt resolution rate on complex enterprise escalations",
      "Created monitoring dashboards reducing mean time to detection by 25%",
      "Developed log pattern detection scripts improving RCA precision by 18%",
    ],
  },
  {
    title: "Web3 Full-Stack Developer",
    company: "Myriad",
    period: "Jul 2022 – Dec 2022",
    location: "Remote",
    achievements: [
      "Built React-based DApp UI with Web3.js, reducing rendering latency by 35%",
      "Implemented Solidity smart contract integration for marketplace features",
    ],
  },
]

export default function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-line",
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
      id="experience"
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
            <div className="h-px w-12 bg-primary/40 exp-line origin-left" />
            <span className="text-[10px] tracking-[0.4em] text-primary/60 uppercase">
              Experience
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
          <span className="text-foreground">Professional </span>
          <span className="text-muted-foreground">journey</span>
        </motion.h2>

        <div className="relative mt-20">
          <div className="absolute left-[15px] top-0 h-full w-px bg-card/[0.04]" />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
                  <span className="text-[10px] font-bold text-primary/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:bg-accent md:p-8">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                    <span className="text-[11px] text-foreground/15">{exp.period}</span>
                  </div>
                  <p className="mb-3 text-sm text-primary/50">
                    {exp.company} · {exp.location}
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((ach, j) => (
                      <li key={j} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-card/10" />
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
