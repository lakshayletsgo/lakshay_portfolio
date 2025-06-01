"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import '../app/globals.css'
export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const personalTraits = [
    "Problem Solver",
    "Quick Learner",
    "Team Player",
    "Detail-Oriented",
    "Creative Thinker",
    "Adaptable",
    "Analytical",
  ]

  return (
    <section id="about" ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-primary to-purple-500" />
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center"
          >
            <motion.div
              style={{ y, opacity }}
              className="relative h-64 w-64 overflow-hidden rounded-full md:h-80 md:w-80"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-500 opacity-70" />
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-background">
                <Image
                  src="/selfImage.png"
                  alt="Lakshay Goel"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <Card className="backdrop-blur-sm bg-card/80 border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold">Lakshay Goel</h3>
                <p className="mt-2 text-muted-foreground">BTech Computer Science Student</p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-muted-foreground"
                >
                  I&apos;m a passionate software engineer and AI/ML enthusiast currently pursuing my BTech in Computer
                  Science at The NorthCap University. My journey in tech is driven by a desire to create impactful
                  solutions that solve real-world problems.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-muted-foreground"
                >
                  With a strong foundation in both full-stack development and artificial intelligence, I enjoy building
                  innovative applications that leverage cutting-edge technologies. I believe in continuous learning and
                  pushing the boundaries of what&apos;s possible through code and curiosity.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {personalTraits.map((trait) => (
                    <Badge key={trait} variant="outline" className="bg-primary/10 text-primary">
                      {trait}
                    </Badge>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-6 grid grid-cols-2 gap-4"
                >
                  <div>
                    <h4 className="font-medium">Education</h4>
                    <p className="text-sm text-muted-foreground">
                      BTech Computer Science
                      <br />
                      The NorthCap University
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">India</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
