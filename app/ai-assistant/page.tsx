"use client"

import { useState } from "react"
import { AIAssistantSidebar } from "@/components/ai-assistant-sidebar"
import { AIAssistantHeader } from "@/components/ai-assistant-header"
import { AIAssistantChat } from "@/components/ai-assistant-chat"

export default function AIAssistantPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-background">
      <AIAssistantSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <AIAssistantHeader />
        <main className="flex-1 overflow-hidden">
          <AIAssistantChat />
        </main>
      </div>
    </div>
  )
}
