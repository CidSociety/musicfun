"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Music } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Live at The Blue Note",
    type: "gig",
    date: "Dec 15, 2024",
    time: "8:00 PM",
    venue: "The Blue Note, NYC",
    status: "confirmed",
    payment: "$1,200",
  },
  {
    id: 2,
    title: "Band Rehearsal",
    type: "rehearsal",
    date: "Dec 12, 2024",
    time: "7:00 PM",
    venue: "Studio A",
    status: "scheduled",
    payment: null,
  },
  {
    id: 3,
    title: "Recording Session",
    type: "recording",
    date: "Dec 18, 2024",
    time: "2:00 PM",
    venue: "Sound Factory",
    status: "confirmed",
    payment: "$800",
  },
  {
    id: 4,
    title: "Jazz Festival",
    type: "gig",
    date: "Dec 22, 2024",
    time: "6:00 PM",
    venue: "Central Park",
    status: "pending",
    payment: "$2,500",
  },
]

const getEventIcon = (type: string) => {
  switch (type) {
    case "gig":
      return Music
    case "rehearsal":
      return Users
    case "recording":
      return Calendar
    default:
      return Calendar
  }
}

const getEventColor = (type: string) => {
  switch (type) {
    case "gig":
      return "bg-primary/10 text-primary border-primary/20"
    case "rehearsal":
      return "bg-accent/10 text-accent border-accent/20"
    case "recording":
      return "bg-chart-3/10 text-chart-3 border-chart-3/20"
    default:
      return "bg-secondary/10 text-secondary-foreground border-secondary/20"
  }
}

export function CalendarView() {
  return (
    <div className="p-6 space-y-6">
      {/* Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                December 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`
                      aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer
                      hover:bg-secondary/50 transition-colors relative
                      ${day === 15 || day === 18 || day === 22 ? "bg-primary/20 text-primary font-semibold" : ""}
                      ${day === 12 ? "bg-accent/20 text-accent font-semibold" : ""}
                    `}
                  >
                    {day}
                    {(day === 15 || day === 18 || day === 22 || day === 12) && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.slice(0, 3).map((event) => {
                const Icon = getEventIcon(event.type)
                return (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getEventColor(event.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Events</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Confirmed Gigs</span>
                <span className="font-semibold text-primary">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Expected Revenue</span>
                <span className="font-semibold text-accent">$8,400</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Events List */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => {
              const Icon = getEventIcon(event.type)
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventColor(event.type)}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {event.payment && <span className="font-semibold text-accent">{event.payment}</span>}
                    <Badge
                      variant={
                        event.status === "confirmed" ? "default" : event.status === "pending" ? "secondary" : "outline"
                      }
                    >
                      {event.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
