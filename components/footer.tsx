"use client"

import Link from "next/link"
import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 pt-16 px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            &copy; {new Date().getFullYear()} Lakshay Goel. All rights reserved.
          </motion.p>
        </div>
        <div className="flex items-center gap-4">
          {[
            { icon: <GithubIcon className="h-5 w-5" />, href: "https://github.com/lakshayletsgo", label: "GitHub" },
            {
              icon: <LinkedinIcon className="h-5 w-5" />,
              href: "https://linkedin.com/in/-lakshay-goel",
              label: "LinkedIn",
            },
            { icon: <MailIcon className="h-5 w-5" />, href: "mailto:lakshaygoel911@gmail.com", label: "Email" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Link
                href={item.href}
                target={item.label !== "Email" ? "_blank" : undefined}
                rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.icon}
                <span className="sr-only">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  )
}
