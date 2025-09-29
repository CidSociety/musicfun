"use client"

import { Button } from "@/components/ui/button"
import { Radio, Settings, Share } from "lucide-react"

export function StreamHeader() {
  return (
    <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Radio className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-balance">Live Stream</h1>
              <p className="text-muted-foreground">Broadcast your music to the world</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-700">
            <Radio className="h-4 w-4 mr-2" />
            Go Live
          </Button>
        </div>
      </div>
    </div>
  )
}
