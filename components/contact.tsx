"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MailIcon, PhoneIcon, LinkedinIcon, GithubIcon, SendIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useInView } from "react-intersection-observer"

export default function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const { ref: formRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/50 dark:bg-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary-rgb),0.15),transparent_70%)]" />

      <motion.div style={{ y, opacity }} className="relative">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Me</h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-primary to-purple-500" />
            <p className="mt-4 max-w-[700px] text-muted-foreground">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full backdrop-blur-sm bg-card/80 border-primary/10">
                <CardHeader>
                  <CardTitle>Get In Touch</CardTitle>
                  <CardDescription>I&apos;m always open to new opportunities and collaborations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center group"
                  >
                    <div className="mr-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <MailIcon className="h-5 w-5 text-primary" />
                    </div>
                    <a href="mailto:lakshaygoel911@gmail.com" className="hover:text-primary transition-colors">
                      lakshaygoel911@gmail.com
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center group"
                  >
                    <div className="mr-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <PhoneIcon className="h-5 w-5 text-primary" />
                    </div>
                    <a href="tel:+917404783133" className="hover:text-primary transition-colors">
                      +91 7404783133
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center group"
                  >
                    <div className="mr-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <LinkedinIcon className="h-5 w-5 text-primary" />
                    </div>
                    <a
                      href="https://linkedin.com/in/-lakshay-goel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      linkedin.com/in/-lakshay-goel
                    </a>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center group"
                  >
                    <div className="mr-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <GithubIcon className="h-5 w-5 text-primary" />
                    </div>
                    <a
                      href="https://github.com/lakshayletsgo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      github.com/lakshayletsgo
                    </a>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="backdrop-blur-sm bg-card/80 border-primary/10">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="space-y-2"
                      >
                        <Input
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-background/50 border-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="space-y-2"
                      >
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-background/50 border-primary/20 focus:border-primary"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="space-y-2"
                    >
                      <Input
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-primary/20 focus:border-primary"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="space-y-2"
                    >
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="bg-background/50 border-primary/20 focus:border-primary"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <SendIcon className="mr-2 h-4 w-4" /> Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
