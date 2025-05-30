"use client"

import { useCallback } from "react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import { Engine } from "tsparticles-engine"

// Dynamically import Particles to avoid SSR issues
const Particles = dynamic(() => import("react-tsparticles").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10"></div>,
})

// Dynamically import the slim version of tsparticles
const loadSlim = async (engine: Engine) => {
  const { loadSlim } = await import("tsparticles-slim")
  await loadSlim(engine)
}

export default function ParticleBackground() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: isDark ? "#3b82f6" : "#1877f2",
            },
            links: {
              color: isDark ? "#3b82f6" : "#1877f2",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}
