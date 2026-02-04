"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"

const projects = [
  
  {
    title: "Quick Court",
    description:
      "Designed and Deployed a full stack web application that enables users to book local sports facilities and join or host matches. It uses a role-based modules for users, owners and admins with features like venue search, bookings and analytics dashboard..",
    image: "/QuickCourt.png",
    tags: ["NextJs", "NodeJS", "PostgreSQL", "PrismaORM","RAG"],
    github: "https://github.com/lakshayletsgo/odoo-hackathon",
    demo: "https://odoo-hackathon-virid.vercel.app/",
    featured: true,
  },
  {
    title: "Loan Fraud Detection using GNN",
    description:
      "This project leverages Artificial Neural Networks (ANN), Autoencoders, and Graph Neural Networks (GNN) to detect fraudulent loan applications.It combines tabular learning with graph-based relationships to enhance prediction accuracy and uncover hidden fraud patterns..",
    image: "/LoanFraudDetection.jpg",
    tags: ["Machine Learning", "GNN", "Autoencoder", "Python"],
    github: "https://github.com/lakshayletsgo/Loan-Fraud-Detection-Using-GNN",
    demo: "https://drive.google.com/file/d/1kYgYzwTfLNiicEy_ndQZlkEQAdJ8utga/view",
    featured: true,
  },
  {
    title: "TalentMatch AI",
    description:
      "Multi-agent recruitment tool developed for Accenture Hackathon. Streamlines the hiring process using AI to match candidates with job requirements.",
    image: "/TalentMatchAi.jpg",
    tags: ["AI/ML", "Multi-agent", "Recruitment", "Python"],
    github: "https://github.com/lakshayletsgo/TalentMatch-AI",
    demo: "https://talent-match-ai-blond.vercel.app/",
    featured: true,
  },
 
  {
    title: "SaaS Video Queue Platform",
    description:
      "Real-time video queue platform with voting functionality. Allows users to collaboratively create and manage video playlists.",
    image: "/queueTunes1.png",
    tags: ["WebSockets", "React", "Node.js", "MongoDB"],
    github: "https://github.com/lakshayletsgo/QueueTunes",
    demo: "https://www.linkedin.com/posts/-lakshay-goel_saas-videostreaming-interactiveplaylists-activity-7282363324317478912-jmQ6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD2JO7ABKxPPrz2-mof3xB-ca6Ud85xxywM",
  },
  {
    title: "Distributed File Storage System",
    description:
      "P2P and fault-tolerant design for distributed file storage. Implements redundancy and efficient file retrieval mechanisms.",
    image: "/FileStorageDistribuited.png",
    tags: ["P2P", "Distributed Systems", "Fault Tolerance", "Go"],
    github: "https://github.com/lakshayletsgo/Distributed-File-Storage-System",
    demo: "https://www.linkedin.com/posts/-lakshay-goel_greetings-connections-i-wanted-to-share-activity-7274868421534621696-qJgX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD2JO7ABKxPPrz2-mof3xB-ca6Ud85xxywM",
  },
  {
    title: "File Encryption Application",
    description:
      "Java-based CLI application for secure file encryption and OTP-authenticated access with MySQL integration and JavaMail support.",
    image: "/image.png",
    tags: ["Machine Learning", "GNN", "Python", "Fraud Detection"],
    github: "https://github.com/lakshayletsgo/File-Hidder",
    demo: "https://www.linkedin.com/posts/-lakshay-goel_java-encryption-softwaredevelopment-activity-7305910447650615296-d1KW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD2JO7ABKxPPrz2-mof3xB-ca6Ud85xxywM",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const [activeFilter, setActiveFilter] = useState("All")
  const filters = ["All", "AI/ML", "Web", "Backend", "Frontend"]

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase())))

  return (
    <section id="projects" ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/50 dark:bg-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

      <motion.div style={{ y, opacity }} className="relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-primary to-purple-500" />
            <p className="mt-4 max-w-[700px] text-muted-foreground">
              Here are some of the projects I&apos;ve worked on that showcase my skills and interests.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? "bg-primary" : ""}
              >
                {filter}
              </Button>
            ))}
          </motion.div>

          {/* Featured Projects */}
          <div className="mt-12 space-y-12">
            {filteredProjects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="overflow-hidden border-primary/10 backdrop-blur-sm bg-card/80">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:opacity-0 transition-opacity duration-500" />
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-center">
                        <CardTitle className="text-2xl">{project.title}</CardTitle>
                        <CardDescription className="mt-2 text-base">{project.description}</CardDescription>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-primary/10">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-6 flex gap-4">
                          <Button asChild variant="outline" size="sm">
                            <Link href={project.github}>
                              <GithubIcon className="mr-2 h-4 w-4" />
                              Code
                            </Link>
                          </Button>
                          <Button
                            asChild
                            size="sm"
                            className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                          >
                            <Link href={project.demo}>
                              <ExternalLinkIcon className="mr-2 h-4 w-4" />
                              Demo
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>

          {/* Other Projects Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-primary/10 backdrop-blur-sm bg-card/80">
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:opacity-0 transition-opacity duration-500" />
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-primary/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.github}>
                          <GithubIcon className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                      >
                        <Link href={project.demo}>
                          <ExternalLinkIcon className="mr-2 h-4 w-4" />
                          Demo
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
