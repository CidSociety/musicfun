"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Plus, Filter, Download } from "lucide-react"

export function CalendarHeader() {
  return (
    <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-balance">Calendar</h1>
              <p className="text-muted-foreground">Manage your gigs, rehearsals, and events</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>
    </div>
  )
}
