"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, ExternalLink, ArrowUpRight, Download } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
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
      id="contact"
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
            <div className="h-px w-12 bg-primary/40 contact-line origin-left" />
            <span className="text-[10px] tracking-[0.4em] text-primary/60 uppercase">
              Contact
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl font-bold leading-[1.1] sm:text-5xl md:text-7xl lg:text-8xl"
        >
          <span className="text-foreground">Let&apos;s build </span>
          <span className="text-foreground/15">something together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 max-w-lg text-base text-muted-foreground md:text-lg"
        >
          Open to discussing AI agent systems, SaaS architecture, or new opportunities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a
            href="mailto:apoorv.anand7@icloud.com"
            className="group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-[1.02]"
          >
            <Mail className="h-4 w-4" />
            apoorv.anand7@icloud.com
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://linkedin.com/in/apoorv-anand-6190b818a"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href="https://github.com/akai07"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-border px-6 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
          <a
            href="/resume.pdf"
            download
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 text-sm text-primary transition-all hover:border-primary/60 hover:bg-primary/20"
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-sm text-foreground/10"
        >
          Bengaluru, India
        </motion.p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl border-t border-border px-6 py-8">
        <p className="text-center text-[11px] text-foreground/[0.06]">
          &copy; {new Date().getFullYear()} Apoorv Anand
        </p>
      </div>
    </section>
  )
}
