"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AwardIcon, ExternalLinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"

const certifications = [
  {
    title: "Microsoft Azure AI-900",
    issuer: "Microsoft",
    date: "2025",
    description:
      "The Microsoft Azure AI-900 course provides a foundational understanding of artificial intelligence (AI) and machine learning (ML) concepts. It covers Azure services related to AI, including computer vision, natural language processing, and responsible AI.",
    link: "https://drive.google.com/file/d/1xW9yyjxIumQrcMOBjH_kT4F0M3fVn4yg/view?usp=drive_link",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Intel Data Centric AI",
    issuer: "Intel",
    date: "2024",
    description: "This course by Intel focuses on the importance of high-quality data in building effective AI models. Conducted in collaboration with Swayam Plus and the Ministry of Education, it introduces participants to the core principles of AI development with a data-first mindset.",
    link: "https://drive.google.com/file/d/1PhXbqE1atAJ-ijob2NKE4xaMyMPssZug/view?usp=drive_link",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "NPTEL Artificial Intelligence",
    issuer: "NPTEL",
    date: "2022",
    description:
      "Comprehensive course covering AI fundamentals, search algorithms, knowledge representation, and machine learning.",
    link: "https://drive.google.com/file/d/1LDlPeccMWktv4jX6rwelad5skBNkJ5SH/view?usp=drive_link",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "NPTEL Machine Learning",
    issuer: "NPTEL",
    date: "2022",
    description: "In-depth study of machine learning algorithms, neural networks, and practical applications.",
    link: "https://drive.google.com/file/d/17YafvU28TbINFvavLXInyZO2kgQSc8Zm/view?usp=drive_link",
    color: "from-purple-500 to-pink-500",
  },
  
]

export default function Certifications() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  return (
    <section id="certifications" ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

      <motion.div style={{ y, opacity }} className="relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Certifications</h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-primary to-purple-500" />
            <p className="mt-4 max-w-[700px] text-muted-foreground">
              Professional certifications and courses I&apos;ve completed.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certification, index) => (
              <motion.div
                key={certification.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full overflow-hidden border-primary/10 backdrop-blur-sm bg-card/80 relative">
                  {/* <div className={`absolute inset-0 bg-gradient-to-br ${certification.color} opacity-10`} /> */}
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${certification.color} opacity-10`} />

                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-bl-full" />

                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AwardIcon className="mr-2 h-5 w-5 text-primary" />
                      {certification.title}
                    </CardTitle>
                    <CardDescription>
                      {certification.issuer} • {certification.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full">
                    <p className="text-muted-foreground flex-grow">{certification.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-4 self-start bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 border-primary/20"
                    >
                      <a
                        href={certification.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Certificate
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
