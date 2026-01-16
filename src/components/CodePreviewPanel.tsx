'use client'

import { useState, useEffect, useRef } from 'react'
import { FileText, Plus, ChevronRight, Play } from 'lucide-react'
import { DemoProject, CodeChunk } from '@/data/demos'

interface CodePreviewPanelProps {
  activeDemo: DemoProject | null
  isSimulating: boolean
  simulationTime: number
  currentCodeChunk: CodeChunk | null
  visibleCodeLines: string[]
  progress: number
  isComplete: boolean
  onShowPreview: () => void
}

export default function CodePreviewPanel({
  activeDemo,
  isSimulating,
  simulationTime,
  currentCodeChunk,
  visibleCodeLines,
  progress,
  isComplete,
  onShowPreview
}: CodePreviewPanelProps) {
  const codeContainerRef = useRef<HTMLDivElement>(null)
  const [showPreviewFrame, setShowPreviewFrame] = useState(false)

  useEffect(() => {
    if (codeContainerRef.current) {
      codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight
    }
  }, [visibleCodeLines])

  useEffect(() => {
    setShowPreviewFrame(false)
  }, [activeDemo])

  if (!activeDemo) {
    return (
      <div className="flex flex-col h-full bg-[#1e1e1e] items-center justify-center">
        <div className="text-zinc-600 text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <p className="text-sm">Code preview will appear here</p>
        </div>
      </div>
    )
  }

  const handleViewPreview = () => {
    setShowPreviewFrame(true)
    onShowPreview()
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#252526]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-semibold text-white">OK Computer</span>
        </div>
        <button className="p-1.5 hover:bg-zinc-700 rounded-lg">
          <Plus className="w-4 h-4 text-zinc-400" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-[#252526]">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-3 h-3 rounded-full ${isComplete ? 'bg-green-500' : 'bg-green-500 animate-pulse'}`} />
          <span className="text-sm text-zinc-300">Task Progress {progress}/10</span>
        </div>
        {isComplete && (
          <div className="flex items-center gap-2 text-sm text-kimi-accent cursor-pointer hover:underline" onClick={handleViewPreview}>
            <span>Deploy completed {activeDemo.name}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* File Tab */}
      {currentCodeChunk && !showPreviewFrame && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-[#2d2d2d]">
          <FileText className="w-4 h-4 text-zinc-400" />
          <span className="text-sm text-zinc-300">Create</span>
          <span className="text-sm text-zinc-500">|</span>
          <span className="text-sm text-white">{currentCodeChunk.fileName}</span>
        </div>
      )}

      {/* Code Area or Preview */}
      <div className="flex-1 overflow-hidden">
        {showPreviewFrame ? (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-zinc-800">
              <span className="text-sm text-zinc-300">Preview: {activeDemo.name}</span>
              <button
                onClick={() => setShowPreviewFrame(false)}
                className="text-xs text-kimi-accent hover:underline"
              >
                View Code
              </button>
            </div>
            <iframe
              srcDoc={activeDemo.finalHtml}
              className="flex-1 w-full bg-white"
              title="Preview"
              sandbox="allow-scripts"
            />
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {currentCodeChunk && (
              <div className="px-4 py-2 text-xs text-zinc-600 bg-[#1e1e1e] border-b border-zinc-800">
                {currentCodeChunk.filePath}
              </div>
            )}
            <div ref={codeContainerRef} className="flex-1 overflow-auto p-4 font-mono text-sm">
              {visibleCodeLines.length > 0 ? (
                visibleCodeLines.map((line, index) => (
                  <div key={index} className="flex leading-6">
                    <span className="text-zinc-600 select-none w-8 text-right mr-4">
                      {index + 1}
                    </span>
                    <SyntaxHighlightLine line={line} />
                  </div>
                ))
              ) : (
                <div className="text-zinc-600 italic">Waiting for code...</div>
              )}
              {isSimulating && !isComplete && (
                <span className="inline-block w-2 h-4 bg-kimi-accent animate-pulse ml-12" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer with Preview Button */}
      {isComplete && !showPreviewFrame && (
        <div className="px-4 py-3 border-t border-zinc-800 bg-[#252526]">
          <button
            onClick={handleViewPreview}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
          >
            <Play className="w-4 h-4" />
            View Live Preview
          </button>
        </div>
      )}
    </div>
  )
}

function SyntaxHighlightLine({ line }: { line: string }) {
  // Simple syntax highlighting for display
  const keywords = ['class', 'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'new', 'this', 'true', 'false', 'null', 'undefined', 'async', 'await']
  
  // Comments
  if (line.trim().startsWith('//')) {
    return <span className="text-zinc-500">{line}</span>
  }
  
  // Empty line
  if (!line.trim()) {
    return <span>&nbsp;</span>
  }

  const tokens: { text: string; className: string }[] = []
  let remaining = line
  
  while (remaining.length > 0) {
    // Check for strings
    const stringMatch = remaining.match(/^(["'`])/)
    if (stringMatch) {
      const quote = stringMatch[1]
      const endIndex = remaining.indexOf(quote, 1)
      if (endIndex !== -1) {
        tokens.push({ text: remaining.substring(0, endIndex + 1), className: 'text-amber-400' })
        remaining = remaining.substring(endIndex + 1)
        continue
      }
    }
    
    // Check for keywords
    const keywordMatch = remaining.match(/^(\w+)/)
    if (keywordMatch) {
      const word = keywordMatch[1]
      if (keywords.includes(word)) {
        tokens.push({ text: word, className: 'text-purple-400' })
      } else if (/^\d+$/.test(word)) {
        tokens.push({ text: word, className: 'text-cyan-400' })
      } else if (remaining[word.length] === '(') {
        tokens.push({ text: word, className: 'text-blue-400' })
      } else {
        tokens.push({ text: word, className: 'text-zinc-300' })
      }
      remaining = remaining.substring(word.length)
      continue
    }
    
    // Other characters
    tokens.push({ text: remaining[0], className: 'text-zinc-300' })
    remaining = remaining.substring(1)
  }
  
  return (
    <span>
      {tokens.map((token, i) => (
        <span key={i} className={token.className}>{token.text}</span>
      ))}
    </span>
  )
}
