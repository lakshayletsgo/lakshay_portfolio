"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BriefcaseIcon, MapPinIcon } from "lucide-react"
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import { useTheme } from "next-themes"

const experiences = [
  {
    title: "Software Development Intern",
    company: "EGS Pvt. Ltd.",
    period: "May 2023 - Aug 2023",
    location: "Remote",
    description:
      "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to implement new features and improve existing functionality.",
    icon: <BriefcaseIcon />,
    skills: ["React", "Node.js", "MongoDB", "Git", "Agile"],
  },
  {
    title: "Web Development Intern",
    company: "Octanet",
    period: "Jan 2023 - Apr 2023",
    location: "Remote",
    description:
      "Worked on front-end development using HTML, CSS, and JavaScript. Designed responsive user interfaces and implemented client-side functionality.",
    icon: <BriefcaseIcon />,
    skills: ["HTML/CSS", "JavaScript", "Responsive Design", "UI/UX"],
  },
]

export default function Experience() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent theme mismatch on first render

  const isDark = theme === "dark"

  return (
    <section id="experience" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-primary to-purple-500" />
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            My professional journey and internship experiences.
          </p>
        </motion.div>

        <div className="mt-12">
          <VerticalTimeline lineColor={isDark ? "#1e293b" : "#e2e8f0"}>
            {experiences.map((experience) => (
              <VerticalTimelineElement
                key={experience.title}
                className="vertical-timeline-element"
                contentStyle={{
                  background: isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
                  boxShadow: isDark ? "0 3px 10px rgba(0, 0, 0, 0.2)" : "0 3px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.75rem",
                  border: isDark ? "1px solid rgba(59, 130, 246, 0.2)" : "1px solid rgba(59, 130, 246, 0.1)",
                  padding: "1.5rem",
                  backdropFilter: "blur(10px)",
                }}
                contentArrowStyle={{
                  borderRight: isDark
                    ? "7px solid rgba(30, 41, 59, 0.8)"
                    : "7px solid rgba(255, 255, 255, 0.8)",
                }}
                date={experience.period}
                iconStyle={{
                  background: isDark ? "#3b82f6" : "#1877f2",
                  color: "#fff",
                  boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.3)",
                }}
                icon={experience.icon}
              >
                <h3 className="text-xl font-bold">
                  {experience.title} at {experience.company}
                </h3>
                <h4 className="text-muted-foreground flex items-center mt-1">
                  <MapPinIcon className="h-4 w-4 mr-1" /> {experience.location}
                </h4>
                <p className="mt-3">{experience.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  )
}
