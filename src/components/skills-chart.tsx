"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"

gsap.registerPlugin(ScrollTrigger)

const data = [
  { skill: "Agentic AI", value: 95 },
  { skill: "Frontend", value: 90 },
  { skill: "Backend", value: 88 },
  { skill: "Infra", value: 82 },
  { skill: "AI/ML", value: 85 },
  { skill: "SaaS", value: 92 },
]

const stack = [
  { name: "React / Next.js", level: 95 },
  { name: "NestJS / FastAPI", level: 88 },
  { name: "PostgreSQL / Redis", level: 85 },
  { name: "Docker / DevOps", level: 82 },
  { name: "LLMs / AI Agents", level: 95 },
  { name: "System Architecture", level: 90 },
]

export default function SkillsChart() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-line",
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
      id="skills"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      style={{ background: "var(--section-bg-alt)" }}
    >

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-16 flex items-center gap-4">
            <div className="h-px w-12 bg-primary/40 skills-line origin-left" />
            <span className="text-[10px] tracking-[0.4em] text-primary/60 uppercase">
              Skills
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
          <span className="text-foreground">Technical </span>
          <span className="text-muted-foreground">proficiency</span>
        </motion.h2>

        <div className="mt-20 grid items-start gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-72 md:h-96"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="var(--primary)"
                  fill="var(--primary)"
                  fillOpacity={0.15}
                  strokeWidth={1.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Agentic AI orchestration, multi-agent system design, full-stack SaaS
              architecture, and cloud infrastructure.
            </p>
            <div className="space-y-3">
              {stack.map((item) => (
                <div key={item.name} className="group">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                    <span className="text-[10px] text-foreground/15 tabular-nums">{item.level}%</span>
                  </div>
                  <div className="h-px overflow-hidden bg-card/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
