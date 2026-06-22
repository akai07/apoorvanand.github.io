import SectionNav from "@/components/section-nav"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Summary from "@/components/summary"
import SkillsChart from "@/components/skills-chart"
import ExperienceTimeline from "@/components/experience-timeline"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <>
      <SectionNav />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Summary />
        <SkillsChart />
        <ExperienceTimeline />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  )
}
