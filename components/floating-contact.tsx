"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircleIcon, XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-64 rounded-lg bg-card/90 backdrop-blur-md p-4 shadow-lg border border-primary/10"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get in touch</h3>
              <p className="text-sm text-muted-foreground">Have a question or want to work together?</p>
              <div className="flex flex-col space-y-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary/20 bg-primary/5 hover:bg-primary/10"
                >
                  <Link href="mailto:lakshaygoel911@gmail.com">Send Email</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                >
                  <Link href="#contact">Contact Form</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XIcon className="h-6 w-6" /> : <MessageCircleIcon className="h-6 w-6" />}
          <span className="sr-only">{isOpen ? "Close contact menu" : "Open contact menu"}</span>
        </Button>
      </motion.div>
    </div>
  )
}
