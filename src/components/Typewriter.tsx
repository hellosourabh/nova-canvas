'use client'

import { useEffect, useState, useRef } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
}

export function Typewriter({ text, speed = 30, onComplete, className = '' }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
  }, [text])

  return <span className={className}>{displayedText}</span>
}

interface CodeTypewriterProps {
  lines: string[]
  lineDelay?: number
  charSpeed?: number
  onComplete?: () => void
}

export function CodeTypewriter({ lines, lineDelay = 100, charSpeed = 10, onComplete }: CodeTypewriterProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const containerRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (onComplete) onComplete()
      return
    }

    const currentLine = lines[currentLineIndex]

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          if (newLines.length <= currentLineIndex) {
            newLines.push('')
          }
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1)
          return newLines
        })
        setCurrentCharIndex(prev => prev + 1)
      }, charSpeed)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, lineDelay)
      return () => clearTimeout(timeout)
    }
  }, [currentLineIndex, currentCharIndex, lines, lineDelay, charSpeed, onComplete])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayedLines])

  // Reset when lines change
  useEffect(() => {
    setDisplayedLines([])
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
  }, [lines])

  return (
    <pre ref={containerRef} className="text-sm font-mono overflow-auto h-full">
      {displayedLines.map((line, index) => (
        <div key={index} className="leading-6">
          <span className="text-zinc-600 select-none mr-4">{String(index + 1).padStart(2, ' ')}</span>
          <SyntaxHighlight line={line} />
        </div>
      ))}
      {currentLineIndex < lines.length && (
        <span className="inline-block w-2 h-4 bg-kimi-accent animate-pulse ml-1" />
      )}
    </pre>
  )
}

function SyntaxHighlight({ line }: { line: string }) {
  // Simple syntax highlighting
  const keywords = ['class', 'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'new', 'this', 'true', 'false', 'null', 'undefined', 'async', 'await', 'import', 'export', 'default', 'from']
  
  let highlighted = line
  
  // Comments
  if (line.trim().startsWith('//')) {
    return <span className="text-zinc-500">{line}</span>
  }
  
  // Strings
  highlighted = line.replace(/(["'`])(.*?)\1/g, '<span class="text-amber-400">$1$2$1</span>')
  
  // Keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g')
    highlighted = highlighted.replace(regex, '<span class="text-purple-400">$1</span>')
  })
  
  // Numbers
  highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-cyan-400">$1</span>')
  
  // Function names
  highlighted = highlighted.replace(/(\w+)\(/g, '<span class="text-blue-400">$1</span>(')
  
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />
}
