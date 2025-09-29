"use client"
import {
  Home,
  MapPin,
  Bot,
  Users,
  BarChart3,
  Calendar,
  Music,
  Mic,
  Guitar,
  Radio,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", icon: Home, href: "/", current: false },
  { name: "Venue Search", icon: MapPin, href: "/venues", current: false },
  { name: "AI Assistant", icon: Bot, href: "/ai-assistant", current: false },
  { name: "Band Management", icon: Users, href: "/band", current: false },
  { name: "Analytics", icon: BarChart3, href: "/analytics", current: false },
  { name: "Calendar", icon: Calendar, href: "/calendar", current: false },
  { name: "Music Library", icon: Music, href: "/library", current: false },
  { name: "Recordings", icon: Mic, href: "/recordings", current: false },
]

const quickActions = [
  { name: "Find Venues", icon: MapPin, color: "text-accent", href: "/venues" },
  { name: "Book Studio", icon: Guitar, color: "text-chart-3", href: "/studio" },
  { name: "Live Stream", icon: Radio, color: "text-chart-4", href: "/stream" },
]

interface DashboardSidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

export function DashboardSidebar({ isCollapsed = true, onToggle }: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "glass-effect border-r border-border/50 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className={cn("p-4", !isCollapsed && "p-6")}>
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Music className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Music.Fun</span>
            </Link>
          )}

          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn("h-8 w-8 p-0 hover:bg-secondary/80", isCollapsed && "mx-auto mt-4")}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full gap-3 h-11 transition-all duration-200",
                  isCollapsed ? "justify-center px-0" : "justify-start",
                  item.href === "/venues" && "bg-primary/10 text-primary border border-primary/20",
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {!isCollapsed && (
        <div className="mt-auto p-6">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link key={action.name} href={action.href}>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-9">
                    <action.icon className={cn("h-4 w-4", action.color)} />
                    {action.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">AI Assistant</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Ready to help you find venues and manage your music career
            </p>
            <Link href="/ai-assistant">
              <Button size="sm" className="w-full">
                Start Chat
              </Button>
            </Link>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="mt-auto p-2 space-y-2">
          {quickActions.slice(0, 2).map((action) => (
            <Link key={action.name} href={action.href}>
              <Button variant="ghost" size="sm" className="w-full h-10 p-0 justify-center" title={action.name}>
                <action.icon className={cn("h-4 w-4", action.color)} />
              </Button>
            </Link>
          ))}
          <Link href="/ai-assistant">
            <Button size="sm" className="w-full h-10 p-0 justify-center" title="AI Assistant">
              <Bot className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </aside>
  )
}
