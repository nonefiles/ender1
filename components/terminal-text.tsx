"use client"

import { useState, useEffect } from "react"

interface TerminalTextProps {
  text: string
  onComplete?: () => void
}

export function TerminalText({ text, onComplete }: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return (
    <div className="font-mono text-lg md:text-xl leading-relaxed">
      {displayedText}
      <span className="terminal-cursor">|</span>
    </div>
  )
}
