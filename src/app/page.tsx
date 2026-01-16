'use client'

import { useState, useEffect, useCallback } from 'react'
import ChatPanel from '@/components/ChatPanel'
import CodePreviewPanel from '@/components/CodePreviewPanel'
import Sidebar from '@/components/Sidebar'
import { DemoProject, TaskStep, ChatMessage, CodeChunk, findDemoByQuery, allDemos } from '@/data/demos'

export default function Home() {
  // Core state
  const [activeDemo, setActiveDemo] = useState<DemoProject | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationTime, setSimulationTime] = useState(0)
  const [showCodePanel, setShowCodePanel] = useState(false)
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [visibleTasks, setVisibleTasks] = useState<TaskStep[]>([])
  
  // Code preview state
  const [currentCodeChunk, setCurrentCodeChunk] = useState<CodeChunk | null>(null)
  const [visibleCodeLines, setVisibleCodeLines] = useState<string[]>([])
  const [codeLineIndex, setCodeLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  // Simulation timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isSimulating && activeDemo) {
      interval = setInterval(() => {
        setSimulationTime(prev => {
          const newTime = prev + 100
          if (newTime >= activeDemo.totalDuration) {
            setIsSimulating(false)
            setIsComplete(true)
            setProgress(10)
            return activeDemo.totalDuration
          }
          return newTime
        })
      }, 100)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSimulating, activeDemo])

  // Process chat messages based on simulation time
  useEffect(() => {
    if (!activeDemo || !isSimulating) return
    
    setChatMessages(prev => {
      const newMessages = activeDemo.chatMessages.filter(
        msg => simulationTime >= msg.delay && !prev.find(m => m.id === msg.id)
      )
      if (newMessages.length === 0) return prev
      return [...prev, ...newMessages]
    })
  }, [simulationTime, activeDemo, isSimulating])

  // Process task steps based on simulation time
  useEffect(() => {
    if (!activeDemo || !isSimulating) return
    
    setVisibleTasks(prev => {
      const newTasks = activeDemo.taskSteps.filter(
        task => simulationTime >= task.delay && !prev.find(t => t.id === task.id)
      )
      if (newTasks.length === 0) return prev
      // Update progress based on new tasks
      if (newTasks.length > 0) {
        setProgress(p => Math.min(p + newTasks.length, 9))
      }
      return [...prev, ...newTasks]
    })
  }, [simulationTime, activeDemo, isSimulating])

  // Process code chunks based on simulation time
  useEffect(() => {
    if (!activeDemo || !isSimulating) return
    
    const relevantChunk = activeDemo.codeChunks.find(chunk => simulationTime >= chunk.delay)
    if (relevantChunk && (!currentCodeChunk || currentCodeChunk.fileName !== relevantChunk.fileName)) {
      setCurrentCodeChunk(relevantChunk)
      setVisibleCodeLines([])
      setCodeLineIndex(0)
    }
  }, [simulationTime, activeDemo, isSimulating, currentCodeChunk])

  // Type out code lines
  useEffect(() => {
    if (!currentCodeChunk || !isSimulating) return
    
    if (codeLineIndex < currentCodeChunk.lines.length) {
      const timeout = setTimeout(() => {
        setVisibleCodeLines(prev => [...prev, currentCodeChunk.lines[codeLineIndex]])
        setCodeLineIndex(prev => prev + 1)
      }, 200) // 200ms per line
      
      return () => clearTimeout(timeout)
    }
  }, [codeLineIndex, currentCodeChunk, isSimulating])

  // Handle user sending a message
  const handleSendMessage = useCallback((query: string) => {
    // Find matching demo
    const demo = findDemoByQuery(query)
    
    if (demo) {
      // Reset state
      setChatMessages([])
      setVisibleTasks([])
      setCurrentCodeChunk(null)
      setVisibleCodeLines([])
      setCodeLineIndex(0)
      setProgress(0)
      setIsComplete(false)
      setSimulationTime(0)
      
      // Set active demo and show code panel
      setActiveDemo(demo)
      setShowCodePanel(true)
      
      // Add user message immediately
      setChatMessages([{
        id: 'user-' + Date.now(),
        type: 'user',
        content: query,
        delay: 0
      }])
      
      // Start simulation after brief delay
      setTimeout(() => {
        setIsSimulating(true)
      }, 300)
    } else {
      // No matching demo found
      setChatMessages(prev => [
        ...prev,
        {
          id: 'user-' + Date.now(),
          type: 'user',
          content: query,
          delay: 0
        },
        {
          id: 'assistant-' + Date.now(),
          type: 'assistant',
          content: `I can help you create: ${allDemos.map(d => d.name).join(', ')}. Try asking "Create pacman game" or "Create calculator"!`,
          delay: 0
        }
      ])
    }
  }, [])

  const handleShowPreview = useCallback(() => {
    // Preview is now shown in the CodePreviewPanel
  }, [])

  // Handle new chat - reset all state to initial
  const handleNewChat = useCallback(() => {
    setActiveDemo(null)
    setIsSimulating(false)
    setSimulationTime(0)
    setShowCodePanel(false)
    setChatMessages([])
    setVisibleTasks([])
    setCurrentCodeChunk(null)
    setVisibleCodeLines([])
    setCodeLineIndex(0)
    setProgress(0)
    setIsComplete(false)
  }, [])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onNewChat={handleNewChat} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto flex">
        {/* Chat Panel - Full width when no demo, half when demo active */}
        <div className={`${showCodePanel ? 'w-1/2 border-r border-zinc-800' : 'w-full'} transition-all duration-300`}>
          <ChatPanel
            activeDemo={activeDemo}
            isSimulating={isSimulating}
            simulationTime={simulationTime}
            onSendMessage={handleSendMessage}
            chatMessages={chatMessages}
            visibleTasks={visibleTasks}
          />
        </div>
        
        {/* Code Preview Panel - Only show when demo is active */}
        {showCodePanel && (
          <div className="w-1/2 animate-slide-in">
            <CodePreviewPanel
              activeDemo={activeDemo}
              isSimulating={isSimulating}
              simulationTime={simulationTime}
              currentCodeChunk={currentCodeChunk}
              visibleCodeLines={visibleCodeLines}
              progress={progress}
              isComplete={isComplete}
              onShowPreview={handleShowPreview}
            />
          </div>
        )}
      </main>
    </div>
  )
}
