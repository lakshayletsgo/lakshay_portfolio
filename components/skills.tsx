"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInView } from "react-intersection-observer"
import { useTheme } from "next-themes"

const skillCategories = [
  {
    id: "frontend",
    name: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 85 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Docker", level: 75 },
    ],
  },
  {
    id: "aiml",
    name: "AI/ML",
    skills: [
      { name: "Python", level: 90 },
      { name: "Scikit-learn", level: 85 },
      { name: "TensorFlow", level: 75 },
      { name: "GNNs", level: 80 },
      { name: "Data Analysis", level: 85 },
    ],
  },
  {
    id: "other",
    name: "Other",
    skills: [
      { name: "Git", level: 90 },
      { name: "WebSockets", level: 85 },
      { name: "Google Auth", level: 80 },
      { name: "RESTful APIs", level: 90 },
      { name: "CI/CD", level: 75 },
    ],
  },
]

// Custom skill bar component
function SkillBar({ name, level, index, inView }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Generate a gradient color based on the skill level
  const getGradient = () => {
    if (level >= 90) return "from-primary to-purple-500"
    if (level >= 80) return "from-blue-500 to-primary"
    if (level >= 70) return "from-cyan-500 to-blue-500"
    return "from-sky-500 to-cyan-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-medium">{name}</span>
        <span className="text-sm font-semibold text-primary">{level}%</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-primary/10 border border-primary/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{
            duration: 1.2 + index * 0.1,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2 + index * 0.1,
          }}
          className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getGradient()}`}
        />

        {/* Animated glow effect */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: inView ? [0, 1, 0] : 0,
            x: inView ? ["0%", "100%"] : "0%",
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1,
          }}
          className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>
    </div>
  )
}

// Circular skill indicator as an alternative visualization
function CircularSkill({ name, level, index, inView }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Calculate the circle's circumference
  const size = 80
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Calculate the dash offset based on the skill level
  const offset = circumference - (level / 100) * circumference

  // Generate a color based on the skill level
  const getColor = () => {
    if (level >= 90) return "text-purple-500"
    if (level >= 80) return "text-primary"
    if (level >= 70) return "text-blue-500"
    return "text-cyan-500"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="flex flex-col items-center justify-center"
    >
      <div className="relative h-20 w-20">
        {/* Background circle */}
        <svg className="h-full w-full" viewBox={`0 0 ${size} ${size}`}>
          <circle
            className="text-primary/10"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Foreground circle that shows the progress */}
          <motion.circle
            className={getColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: inView ? offset : circumference }}
            transition={{ duration: 1.5, delay: 0.2 * index, ease: "easeOut" }}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            strokeLinecap="round"
            style={{
              transformOrigin: "center",
              transform: "rotate(-90deg)",
            }}
          />
        </svg>
        {/* Percentage in the middle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 + 0.1 * index }}
            className="text-lg font-bold"
          >
            {level}%
          </motion.span>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
        transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
        className="mt-2 text-center font-medium"
      >
        {name}
      </motion.p>
    </motion.div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/50 dark:bg-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]" />

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-primary to-purple-500" />
          <p className="mt-4 max-w-[700px] text-muted-foreground">My technical skills and proficiency levels.</p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Card className="backdrop-blur-sm bg-card/80 border-primary/10">
            <CardContent className="p-6">
              <Tabs defaultValue="frontend" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  {skillCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Bar Style Skills */}
                {skillCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-6 space-y-6">
                    {category.skills.map((skill, index) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} inView={inView} />
                    ))}
                  </TabsContent>
                ))}

                {/* Circular Style Skills - Uncomment to use this style instead
                {skillCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {category.skills.map((skill, index) => (
                        <CircularSkill 
                          key={skill.name} 
                          name={skill.name} 
                          level={skill.level} 
                          index={index}
                          inView={inView}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
                */}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="backdrop-blur-sm bg-card/80 border-primary/10 text-center p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">5+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Programming Languages</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/80 border-primary/10 text-center p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">10+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Frameworks & Libraries</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/80 border-primary/10 text-center p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">15+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Projects Completed</p>
            </CardContent>
          </Card>

          {/* <Card className="backdrop-blur-sm bg-card/80 border-primary/10 text-center p-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold text-primary">2+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Years of Experience</p>
            </CardContent>
          </Card> */}
        </motion.div>
      </div>
    </section>
  )
}
