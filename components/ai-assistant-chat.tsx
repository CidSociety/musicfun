"use client"

import type React from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Bot, User, MapPin, Users, TrendingUp, Loader2 } from "lucide-react"
import { useState } from "react"

export function AIAssistantChat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai-assistant" }),
  })

  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage({ text: input })
      setInput("")
    }
  }

  const quickActions = [
    {
      icon: MapPin,
      text: "Find venues in my area",
      color: "text-accent",
    },
    {
      icon: Users,
      text: "Help with band management",
      color: "text-chart-3",
    },
    {
      icon: TrendingUp,
      text: "Career growth strategies",
      color: "text-chart-4",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                <Bot className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Welcome to your AI Music Assistant</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  I'm here to help you discover venues, grow your career, and navigate the music industry. What would
                  you like to know?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  className="glass-effect border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => sendMessage({ text: action.text })}
                >
                  <CardContent className="p-4 text-center space-y-2">
                    <action.icon className={`h-6 w-6 mx-auto ${action.color}`} />
                    <p className="text-sm font-medium">{action.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                <div className={`max-w-2xl ${message.role === "user" ? "order-first" : ""}`}>
                  <Card
                    className={`glass-effect border-border/50 ${
                      message.role === "user" ? "bg-primary/10 border-primary/20" : "bg-secondary/30"
                    }`}
                  >
                    <CardContent className="p-4">
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <div key={index} className="prose prose-sm max-w-none dark:prose-invert">
                              {part.text}
                            </div>
                          )
                        }

                        // Handle tool results more simply
                        if (part.type.startsWith("tool-") && part.state === "output-available") {
                          return (
                            <div key={index} className="mt-3 p-3 bg-secondary/20 rounded-lg">
                              <div className="text-sm font-medium mb-2">Tool Result</div>
                              <pre className="text-xs text-muted-foreground overflow-auto">
                                {JSON.stringify(part.output, null, 2)}
                              </pre>
                            </div>
                          )
                        }

                        return null
                      })}
                    </CardContent>
                  </Card>
                </div>

                {message.role === "user" && (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {status === "in_progress" && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <Card className="glass-effect border-border/50 bg-secondary/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border/50 p-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about venues, career advice, or anything music-related..."
            className="flex-1 bg-secondary/50 border-border/50 focus:border-primary/50"
            disabled={status === "in_progress"}
          />
          <Button type="submit" disabled={!input.trim() || status === "in_progress"} className="gap-2">
            {status === "in_progress" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI can make mistakes. Verify important information with official sources.
        </p>
      </div>
    </div>
  )
}
