import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Mail, Phone, Calendar, Music, Plus, MoreHorizontal } from "lucide-react"

const members = [
  {
    id: 1,
    name: "Alex Rodriguez",
    role: "Lead Vocalist & Rhythm Guitar",
    email: "alex@midnightechoes.com",
    phone: "(555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    availability: "Available",
    joinDate: "Jan 2022",
    instruments: ["Vocals", "Guitar"],
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Lead Guitar",
    email: "sarah@midnightechoes.com",
    phone: "(555) 234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    availability: "Busy until Dec 20",
    joinDate: "Mar 2022",
    instruments: ["Electric Guitar", "Bass"],
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Drummer",
    email: "marcus@midnightechoes.com",
    phone: "(555) 345-6789",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    availability: "Available",
    joinDate: "Jan 2022",
    instruments: ["Drums", "Percussion"],
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Bass Guitar & Backing Vocals",
    email: "emma@midnightechoes.com",
    phone: "(555) 456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    availability: "Available weekends",
    joinDate: "Jun 2022",
    instruments: ["Bass Guitar", "Vocals"],
  },
]

export function BandMembers() {
  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Band Members
            </CardTitle>
            <CardDescription>Manage your band roster and member details</CardDescription>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="p-4 bg-secondary/20 rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                      member.status === "online"
                        ? "bg-chart-3"
                        : member.status === "away"
                          ? "bg-yellow-500"
                          : "bg-muted-foreground"
                    }`}
                  ></div>
                </div>
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Availability:</span>
                <Badge variant={member.availability === "Available" ? "default" : "secondary"} className="text-xs">
                  {member.availability}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Music className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Instruments:</span>
                <div className="flex gap-1">
                  {member.instruments.map((instrument) => (
                    <Badge key={instrument} variant="outline" className="text-xs">
                      {instrument}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {member.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {member.phone}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                Message
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
