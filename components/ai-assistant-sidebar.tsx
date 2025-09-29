"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Star, MapPin, Users, TrendingUp, Music, ChevronLeft, ChevronRight } from "lucide-react"

const quickPrompts = [
  {
    icon: MapPin,
    title: "Find Venues",
    prompt: "Help me find venues in my area that match my music style",
    color: "text-accent",
  },
  {
    icon: Users,
    title: "Band Advice",
    prompt: "Give me tips for managing my band and improving our performance",
    color: "text-chart-3",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    prompt: "What are the best strategies to grow my music career in 2024?",
    color: "text-chart-4",
  },
  {
    icon: Music,
    title: "Industry Insights",
    prompt: "Tell me about current trends in the music industry",
    color: "text-chart-5",
  },
]

interface AIAssistantSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function AIAssistantSidebar({ isCollapsed, onToggle }: AIAssistantSidebarProps) {
  return (
    <aside
      className={`${isCollapsed ? "w-16" : "w-64"} glass-effect border-r border-border/50 flex flex-col transition-all duration-300 ease-in-out`}
    >
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        {!isCollapsed && (
          <Button className="flex-1 gap-2 mr-2">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onToggle} className="flex-shrink-0">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {isCollapsed ? (
        <div className="flex-1 p-2 space-y-2">
          {quickPrompts.map((prompt, index) => (
            <Button key={index} variant="ghost" size="sm" className="w-full p-2 h-10">
              <prompt.icon className={`h-4 w-4 ${prompt.color}`} />
            </Button>
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <Card className="glass-effect border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Star className="h-4 w-4" />
                Quick Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 h-auto p-3 text-left"
                >
                  <prompt.icon className={`h-4 w-4 ${prompt.color} flex-shrink-0`} />
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{prompt.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{prompt.prompt}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-effect border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  Venue Discovery
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Career Advice
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Marketing Tips
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Industry Insights
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Booking Help
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Band Management
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </aside>
  )
}
