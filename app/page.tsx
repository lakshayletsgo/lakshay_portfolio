"use client";

import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import FloatingContact from "@/components/floating-contact"
import ScrollProgress from "@/components/scroll-progress"
import dynamic from "next/dynamic"
import './globals.css'

// Dynamically import components that might cause hydration issues
const ParticleBackground = dynamic(() => import("@/components/particle-background"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      <CustomCursor />
      <ScrollProgress />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Certifications />
      <Contact />
      <FloatingContact />
    </main>
  )
}
