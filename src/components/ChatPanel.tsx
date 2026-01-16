'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, ArrowUp, Monitor, ChevronRight, ChevronDown, FileText, ListTodo, Sparkles, Rocket } from 'lucide-react'
import { Typewriter } from './Typewriter'
import { DemoProject, TaskStep, ChatMessage } from '@/data/demos'

interface ChatPanelProps {
  activeDemo: DemoProject | null
  isSimulating: boolean
  simulationTime: number
  onSendMessage: (query: string) => void
  chatMessages: ChatMessage[]
  visibleTasks: TaskStep[]
}

// Demo showcase cards
const showcaseCards = [
  { id: 1, title: 'Pacman Game', query: 'Create pacman game', color: '#f5f5f5' },
  { id: 2, title: 'Calculator', query: 'Create calculator', color: '#e8e8e8', dot: true },
  { id: 3, title: 'Tic Tac Toe', query: 'Create xoxo game', color: '#e8e8e8', dot: true },
]

const categories = ['Inspiration', 'Web App', 'Mobile App', 'Data visualization', 'Creativity']

export default function ChatPanel({
  activeDemo,
  isSimulating,
  simulationTime,
  onSendMessage,
  chatMessages,
  visibleTasks
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Inspiration')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSubmit = () => {
    if (!inputValue.trim() || isSimulating) return
    onSendMessage(inputValue)
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleCardClick = (query: string) => {
    onSendMessage(query)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, visibleTasks])

  const getTaskIcon = (type: TaskStep['type']) => {
    switch (type) {
      case 'read_todo':
      case 'write_todo':
        return <ListTodo className="w-4 h-4" />
      case 'create_file':
        return <FileText className="w-4 h-4" />
      case 'thinking':
        return <Sparkles className="w-4 h-4" />
      case 'deploy':
        return <Rocket className="w-4 h-4" />
    }
  }

  // Show initial homepage when no demo is active
  const showHomepage = !activeDemo && chatMessages.length === 0

  return (
    <div className="flex flex-col h-full bg-kimi-dark">
      {/* Header - Only show when demo is active */}
      {activeDemo && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{activeDemo.query}</span>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </div>
          <button className="text-zinc-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {showHomepage ? (
          /* Homepage Layout */
          <div className="flex flex-col items-center justify-center min-h-full px-4 py-8">
            {/* Logo and Title - Calculator/Digital Style */}
            <div className="flex items-center gap-4 mb-12">
              {/* Digital Face Icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="8" height="16" fill="white" rx="1"/>
                <rect x="32" y="8" width="8" height="16" fill="white" rx="1"/>
                <path d="M8 32 L16 32 L16 36 L8 40 L8 32Z" fill="white"/>
                <rect x="20" y="32" width="8" height="8" fill="white" rx="1"/>
                <path d="M32 32 L40 32 L40 40 L32 36 L32 32Z" fill="white"/>
              </svg>
              {/* OK Computer Text - Calculator Style */}
              <h1 className="text-3xl tracking-widest text-white" style={{ fontFamily: "'Courier New', 'Lucida Console', monospace", fontWeight: 400, letterSpacing: '0.15em' }}>
                OK Computer
              </h1>
            </div>

            {/* Chat Input Box */}
            <div className="w-full max-w-2xl mb-8">
              <div className="bg-kimi-input border border-kimi-border rounded-2xl p-4">
                <textarea
                  className="w-full bg-transparent resize-none outline-none text-white placeholder-kimi-text-muted min-h-[60px]"
                  placeholder="Ask Anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                      <Plus className="w-5 h-5 text-kimi-text-muted" />
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-kimi-accent text-kimi-accent rounded-full text-sm hover:bg-kimi-accent/10 transition-colors">
                      <Monitor className="w-4 h-4" />
                      OK Computer
                    </button>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!inputValue.trim()}
                    className="p-2 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-not-allowed rounded-full transition-colors"
                  >
                    <ArrowUp className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors border
                    ${selectedCategory === category 
                      ? 'bg-zinc-800 border-zinc-600 text-white' 
                      : 'bg-transparent border-zinc-700 text-kimi-text-muted hover:border-zinc-600 hover:text-white'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Showcase Cards */}
            <div className="flex justify-center gap-4 mb-8">
              {showcaseCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.query)}
                  className="w-56 h-32 rounded-xl bg-zinc-200 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform group"
                  style={{ backgroundColor: card.color }}
                >
                  {card.dot && (
                    <div className="absolute top-3 left-3 w-4 h-4 bg-zinc-400 rounded-full" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-transparent group-hover:text-white font-medium text-sm transition-colors">
                      {card.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* More Cases Link */}
            <button className="flex items-center gap-1 text-kimi-text-muted hover:text-white transition-colors text-sm">
              More cases
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Chat/Conversation Layout */
          <div className="px-4 py-6 space-y-6">
            {/* User and Assistant Messages */}
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                {msg.type === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">😊</span>
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.type === 'user' ? 'bg-zinc-700 rounded-2xl px-4 py-2' : ''}`}>
                  {msg.type === 'user' ? (
                    <p className="text-white">{msg.content}</p>
                  ) : (
                    <p className="text-zinc-300 leading-relaxed">
                      <Typewriter text={msg.content} speed={15} />
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Task Steps */}
            {visibleTasks.length > 0 && (
              <div className="space-y-2">
                {visibleTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 bg-zinc-800/50 rounded-xl px-4 py-3 hover:bg-zinc-800 transition-colors cursor-pointer group"
                  >
                    <span className="text-zinc-400">{getTaskIcon(task.type)}</span>
                    <span className="flex-1 text-zinc-300 text-sm">{task.label}</span>
                    {task.fileName && (
                      <span className="text-zinc-500 text-sm">{task.fileName}</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                ))}
              </div>
            )}

            {/* Simulation in progress indicator */}
            {isSimulating && (
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Working on your project...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area - Only show when in conversation mode */}
      {!showHomepage && (
        <div className="p-4 border-t border-zinc-800">
          <div className="bg-kimi-input border border-kimi-border rounded-2xl p-3">
            <textarea
              className="w-full bg-transparent resize-none outline-none text-white placeholder-kimi-text-muted min-h-[40px] max-h-[120px]"
              placeholder="Send message to OK Computer"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSimulating}
              rows={1}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                  <Plus className="w-5 h-5 text-kimi-text-muted" />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-kimi-accent text-kimi-accent rounded-full text-sm hover:bg-kimi-accent/10 transition-colors">
                  <Monitor className="w-4 h-4" />
                  OK Computer
                </button>
                {isSimulating && (
                  <span className="text-xs text-zinc-500">
                    {Math.ceil((activeDemo?.totalDuration || 0 - simulationTime) / 1000)}s left
                  </span>
                )}
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSimulating || !inputValue.trim()}
                className="p-2 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:cursor-not-allowed rounded-full transition-colors"
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
