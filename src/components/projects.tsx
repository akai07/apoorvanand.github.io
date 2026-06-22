"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "KaiSchool",
    tag: "Multi-Tenant School Management SaaS",
    status: "Private Beta",
    description:
      "25+ integrated modules built end-to-end using OpenCode and OpenClaw — deploying 20+ specialized AI agents in parallel across backend, frontend, QA, DevOps, and design. Features RBAC, subdomain-based isolation, and a 6-phase autonomous dev pipeline.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker", "OpenCode", "OpenClaw"],
    live: null,
  },
  {
    title: "KaiBot",
    tag: "AI-Powered Conversational CRM",
    status: "Live: kaibot.app",
    description:
      "Production multi-tenant SaaS for LLM-powered customer engagement. WhatsApp-based lead capture with AI-driven conversation flows, automated responses, and intelligent routing. Integrated Stripe subscription billing with tenant-aware plan management.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Docker", "OpenAI", "Anthropic"],
    live: "https://kaibot.app",
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-line",
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
      id="projects"
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
            <div className="h-px w-12 bg-primary/40 projects-line origin-left" />
            <span className="text-[10px] tracking-[0.4em] text-primary/60 uppercase">
              Projects
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
          <span className="text-foreground">What I&apos;ve </span>
          <span className="text-muted-foreground">built</span>
        </motion.h2>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="group"
            >
              <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/20 hover:bg-accent">
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                    <span className="shrink-0 rounded-full border border-border bg-card/[0.02] px-3 py-1 text-[10px] text-muted-foreground">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-primary/50">{project.tag}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="border-border bg-muted text-muted-foreground text-[11px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex h-9 items-center gap-2 self-start rounded-lg border border-border bg-muted px-4 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
