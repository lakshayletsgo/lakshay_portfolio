"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowDownIcon } from "lucide-react"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Sparkles } from "@react-three/drei"
import { useTheme } from "next-themes"
import { Suspense, useRef } from "react"
import type * as THREE from "three"

// Enhanced Rocket Model component using basic Three.js geometries
function RocketModel(props) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const primaryColor = isDark ? "#4e7bff" : "#1877f2"
  const secondaryColor = isDark ? "#a855f7" : "#9333ea"

  // References for animations
  const rocketRef = useRef<THREE.Group>(null)
  const flameRef = useRef<THREE.Mesh>(null)

  // Animate the rocket
  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Gentle floating motion
    if (rocketRef.current) {
      rocketRef.current.position.y = Math.sin(t * 0.5) * 0.2
      rocketRef.current.rotation.y = t * 0.1
    }

    // Animate flame
    if (flameRef.current) {
      // Pulsing flame size
      const scale = 0.8 + Math.sin(t * 10) * 0.2
      flameRef.current.scale.set(scale, 1 + Math.sin(t * 15) * 0.3, scale)

      // Changing flame color intensity
      const material = flameRef.current.material as THREE.MeshStandardMaterial
      if (material) {
        material.emissiveIntensity = 1 + Math.sin(t * 12) * 0.5
      }
    }
  })

  return (
    <group ref={rocketRef} {...props}>
      {/* Rocket body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial
          color={primaryColor}
          metalness={0.8}
          roughness={0.2}
          emissive={primaryColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Rocket nose cone */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial
          color={primaryColor}
          metalness={0.8}
          roughness={0.2}
          emissive={primaryColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Rocket fins with gradient colors */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rotation, i) => (
        <group key={i} position={[0, -0.5, 0]} rotation={[0, rotation, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.8, 1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? secondaryColor : primaryColor}
              metalness={0.5}
              roughness={0.5}
              emissive={i % 2 === 0 ? secondaryColor : primaryColor}
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Fin details */}
          <mesh position={[0, -0.2, 0.4]} castShadow>
            <boxGeometry args={[0.12, 0.3, 0.1]} />
            <meshStandardMaterial color={i % 2 === 0 ? primaryColor : secondaryColor} metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Rocket windows - multiple portholes */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rotation, i) => (
        <mesh key={`window-${i}`} position={[0, 0.5, 0]} rotation={[0, rotation, 0]}>
          <mesh position={[0, 0, 0.51]} castShadow>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Window frame */}
          <mesh position={[0, 0, 0.52]} castShadow>
            <ringGeometry args={[0.12, 0.15, 32]} />
            <meshStandardMaterial color={secondaryColor} metalness={0.8} roughness={0.2} />
          </mesh>
        </mesh>
      ))}

      {/* Rocket engine */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Rocket flames - animated */}
      <group position={[0, -1.5, 0]}>
        <mesh ref={flameRef}>
          <coneGeometry args={[0.4, 1.5, 32]} />
          <meshStandardMaterial color="#ff3d00" emissive="#ff3d00" emissiveIntensity={1.5} transparent opacity={0.9} />
        </mesh>

        {/* Inner flame */}
        <mesh position={[0, -0.2, 0]}>
          <coneGeometry args={[0.2, 1, 32]} />
          <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>
      </group>

      {/* Rocket details - panels and rivets */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`panel-${i}`}
          position={[Math.sin((i * Math.PI) / 4) * 0.52, 0, Math.cos((i * Math.PI) / 4) * 0.52]}
          rotation={[0, (i * Math.PI) / 4, 0]}
        >
          <planeGeometry args={[0.3, 1.8]} />
          <meshStandardMaterial
            color={primaryColor}
            metalness={0.9}
            roughness={0.3}
            side={2} // Double-sided
          />
        </mesh>
      ))}

      {/* Small lights around the rocket */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = -0.8 + (i % 4) * 0.5
        const angle = (i % 3) * ((Math.PI * 2) / 3)
        return (
          <mesh key={`light-${i}`} position={[Math.sin(angle) * 0.53, y, Math.cos(angle) * 0.53]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#ff3d00" : i % 3 === 1 ? "#ffcc00" : "#00ff00"}
              emissive={i % 3 === 0 ? "#ff3d00" : i % 3 === 1 ? "#ffcc00" : "#00ff00"}
              emissiveIntensity={1}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Hero() {
  const { theme } = useTheme()

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

      <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start text-left"
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-[#7d5fff] to-purple-500 bg-clip-text text-transparent">
                Lakshay Goel
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl"
          >
            <TypeAnimation
              sequence={[
                "Building Real-World Solutions",
                1000,
                "AI/ML Enthusiast",
                1000,
                "Full Stack Developer",
                1000,
                "Problem Solver",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Number.POSITIVE_INFINITY}
              className="text-muted-foreground"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 max-w-[500px] text-muted-foreground"
          >
            BTech Computer Science student specializing in AI/ML and Full Stack Development, passionate about creating
            impactful technology solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
            >
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="h-[400px] w-full hidden md:block"
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <RocketModel scale={1} position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} />
              <Sparkles count={100} scale={10} size={1} speed={0.4} />
              <Environment preset="sunset" />
            </Suspense>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <Link href="#about">
            <Button variant="ghost" size="icon" className="rounded-full border border-primary/20">
              <ArrowDownIcon className="h-6 w-6" />
              <span className="sr-only">Scroll down</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
