import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Music, Plus, Users } from "lucide-react"

const upcomingEvents = [
  {
    id: 1,
    title: "Practice Session",
    type: "practice",
    date: "Dec 10, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Studio B, Music Complex",
    attendees: ["Alex", "Sarah", "Marcus", "Emma"],
    status: "confirmed",
    notes: "Work on new song arrangements",
  },
  {
    id: 2,
    title: "The Blue Note Performance",
    type: "gig",
    date: "Dec 15, 2024",
    time: "8:00 PM - 11:00 PM",
    location: "The Blue Note, NYC",
    attendees: ["Alex", "Sarah", "Marcus", "Emma"],
    status: "confirmed",
    notes: "Sound check at 6:30 PM",
  },
  {
    id: 3,
    title: "Recording Session",
    type: "recording",
    date: "Dec 18, 2024",
    time: "2:00 PM - 8:00 PM",
    location: "Sunset Studios",
    attendees: ["Alex", "Sarah", "Marcus"],
    status: "pending",
    notes: "Recording 'Midnight Dreams' - Emma unavailable",
  },
  {
    id: 4,
    title: "Band Meeting",
    type: "meeting",
    date: "Dec 22, 2024",
    time: "6:00 PM - 7:30 PM",
    location: "Alex's Place",
    attendees: ["Alex", "Sarah", "Marcus", "Emma"],
    status: "confirmed",
    notes: "Discuss 2025 tour plans",
  },
]

const eventTypeColors = {
  practice: "bg-accent/10 text-accent border-accent/20",
  gig: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  recording: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  meeting: "bg-chart-5/10 text-chart-5 border-chart-5/20",
}

const eventTypeIcons = {
  practice: Music,
  gig: MapPin,
  recording: Music,
  meeting: Users,
}

export function BandSchedule() {
  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Band Schedule
            </CardTitle>
            <CardDescription>Upcoming practices, gigs, and events</CardDescription>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingEvents.map((event) => {
          const IconComponent = eventTypeIcons[event.type as keyof typeof eventTypeIcons]
          return (
            <div key={event.id} className="p-4 bg-secondary/20 rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${eventTypeColors[event.type as keyof typeof eventTypeColors]}`}
                    >
                      {event.type}
                    </Badge>
                    <Badge variant={event.status === "confirmed" ? "default" : "secondary"} className="text-xs">
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </div>
                </div>
                <IconComponent className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Attendees:</span>
                  <div className="flex gap-1">
                    {event.attendees.map((attendee) => (
                      <Badge key={attendee} variant="secondary" className="text-xs">
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>
                {event.notes && (
                  <p className="text-sm text-muted-foreground bg-secondary/30 p-2 rounded">
                    <strong>Notes:</strong> {event.notes}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Share
                </Button>
                {event.status === "pending" && (
                  <Button size="sm" className="flex-1">
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          )
        })}

        <Button variant="outline" className="w-full bg-transparent">
          View Full Calendar
        </Button>
      </CardContent>
    </Card>
  )
}
