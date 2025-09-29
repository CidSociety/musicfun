import { ArrowLeft, Users, Settings, Share, Plus, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function BandHeader() {
  return (
    <header className="glass-effect border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-chart-3 to-chart-4 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                The Midnight Echoes
                <Badge variant="secondary" className="text-xs">
                  4 members
                </Badge>
              </h1>
              <p className="text-sm text-muted-foreground">Indie Rock Band • Est. 2022</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Invite Member
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
