'use client'

import { 
  MessageSquarePlus, 
  Monitor, 
  Search, 
  Presentation, 
  Code, 
  Clock, 
  Info, 
  Languages, 
  Mail, 
  ChevronDown,
  Copy,
  Smartphone
} from 'lucide-react'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  shortcut?: string
  active?: boolean
  muted?: boolean
  onClick?: () => void
}

function SidebarItem({ icon, label, shortcut, active, muted, onClick }: SidebarItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
        ${active ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'}
        ${muted ? 'text-kimi-text-muted' : 'text-kimi-text'}`}
    >
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      <span className="flex-1 text-sm">{label}</span>
      {shortcut && (
        <span className="text-xs text-kimi-text-muted bg-zinc-800 px-1.5 py-0.5 rounded">
          {shortcut}
        </span>
      )}
    </div>
  )
}

interface ChatHistoryItem {
  id: string
  name: string
  active?: boolean
}

interface SidebarProps {
  chatHistory?: ChatHistoryItem[]
  onNewChat?: () => void
  onSelectChat?: (id: string) => void
}

export default function Sidebar({ chatHistory = [], onNewChat, onSelectChat }: SidebarProps) {
  return (
    <aside className="w-56 bg-kimi-sidebar flex flex-col h-full border-r border-zinc-800 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center justify-between px-3 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-lg">N</span>
          </div>
        </div>
        <button className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors">
          <Copy className="w-4 h-4 text-kimi-text-muted" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-auto">
        <SidebarItem 
          icon={<MessageSquarePlus className="w-5 h-5" />} 
          label="New Chat" 
          shortcut="Ctrl K"
          onClick={onNewChat}
        />
        <SidebarItem
          icon={
            <svg width="20" height="20" viewBox="0 0 16 16" className="w-5 h-5">
              {/* Pixel smiley face */}
              <rect x="3" y="4" width="2" height="2" fill="currentColor" />
              <rect x="5" y="4" width="2" height="2" fill="currentColor" />
              <rect x="9" y="4" width="2" height="2" fill="currentColor" />
              <rect x="11" y="4" width="2" height="2" fill="currentColor" />
              <rect x="3" y="6" width="2" height="2" fill="currentColor" />
              <rect x="11" y="6" width="2" height="2" fill="currentColor" />
              <rect x="3" y="10" width="2" height="2" fill="currentColor" />
              <rect x="5" y="11" width="2" height="2" fill="currentColor" />
              <rect x="7" y="11" width="2" height="2" fill="currentColor" />
              <rect x="9" y="11" width="2" height="2" fill="currentColor" />
              <rect x="11" y="10" width="2" height="2" fill="currentColor" />
            </svg>
          }
          label="Neural Canvas"
          active
        />
        <SidebarItem
          icon={<Search className="w-5 h-5" />}
          label="Researcher"
        />
        <SidebarItem
          icon={<Presentation className="w-5 h-5" />}
          label="Slides"
        />
        <SidebarItem
          icon={<Code className="w-5 h-5" />}
          label="Nova Code"
        />
        
        <div className="pt-2">
          <SidebarItem 
            icon={<Clock className="w-5 h-5" />} 
            label="Chat History" 
          />
          
          {/* Chat History Items */}
          {chatHistory.length > 0 ? (
            <div className="ml-8 space-y-1 mt-1">
              {chatHistory.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => onSelectChat?.(chat.id)}
                  className={`text-sm py-1.5 px-2 rounded cursor-pointer truncate transition-colors
                    ${chat.active ? 'bg-zinc-800 text-white' : 'text-kimi-text-muted hover:text-white hover:bg-zinc-800/50'}`}
                >
                  {chat.name}
                </div>
              ))}
              <div className="text-sm py-1.5 px-2 text-kimi-text-muted hover:text-white cursor-pointer">
                All Chats
              </div>
            </div>
          ) : (
            <p className="text-xs text-kimi-text-muted px-3 py-2 ml-8">
              Log in to sync chat history
            </p>
          )}
        </div>

        <div className="pt-4">
          <SidebarItem 
            icon={<Smartphone className="w-5 h-5" />} 
            label="Mobile App" 
          />
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-2 py-4 space-y-1 border-t border-zinc-800">
        <SidebarItem 
          icon={<Info className="w-5 h-5" />} 
          label="About Us" 
        />
        <SidebarItem 
          icon={<Languages className="w-5 h-5" />} 
          label="Language" 
        />
        <SidebarItem 
          icon={<Mail className="w-5 h-5" />} 
          label="User Feedback" 
        />
        
        {/* Login button */}
        <div className="flex items-center gap-3 px-3 py-3 mt-4 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">U</span>
          </div>
          <div className="flex-1">
            <span className="text-sm text-white">User Account</span>
            <span className="ml-2 text-xs bg-amber-600 text-white px-1.5 py-0.5 rounded">Upgrade</span>
          </div>
          <ChevronDown className="w-4 h-4 text-kimi-text-muted" />
        </div>
      </div>
    </aside>
  )
}
