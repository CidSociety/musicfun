import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, MapPin, Clock, Headphones } from "lucide-react"

const demographicData = [
  { ageGroup: "18-24", percentage: 35, count: "2,951" },
  { ageGroup: "25-34", percentage: 42, count: "3,541" },
  { ageGroup: "35-44", percentage: 18, count: "1,518" },
  { ageGroup: "45+", percentage: 5, count: "422" },
]

const locationData = [
  { city: "New York, NY", percentage: 28, listeners: "2,361" },
  { city: "Los Angeles, CA", percentage: 22, listeners: "1,855" },
  { city: "Chicago, IL", percentage: 15, listeners: "1,265" },
  { city: "Boston, MA", percentage: 12, listeners: "1,012" },
  { city: "Other", percentage: 23, listeners: "1,939" },
]

const listeningHabits = [
  { platform: "Spotify", percentage: 45, color: "bg-chart-3" },
  { platform: "Apple Music", percentage: 28, color: "bg-chart-1" },
  { platform: "YouTube Music", percentage: 18, color: "bg-chart-2" },
  { platform: "Other", percentage: 9, color: "bg-chart-4" },
]

const topSongs = [
  { title: "Midnight Dreams", plays: "18,432", percentage: 22 },
  { title: "City Lights", plays: "15,678", percentage: 19 },
  { title: "Echoes in Time", plays: "12,945", percentage: 16 },
  { title: "Neon Nights", plays: "11,234", percentage: 14 },
  { title: "Electric Soul", plays: "9,876", percentage: 12 },
]

export function AudienceInsights() {
  return (
    <div className="space-y-6">
      {/* Demographics */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Audience Demographics
          </CardTitle>
          <CardDescription>Age distribution of your listeners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {demographicData.map((demo, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{demo.ageGroup}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{demo.count}</span>
                  <Badge variant="secondary">{demo.percentage}%</Badge>
                </div>
              </div>
              <Progress value={demo.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Geographic Distribution
          </CardTitle>
          <CardDescription>Where your listeners are located</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {locationData.map((location, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{location.city}</h4>
                <p className="text-xs text-muted-foreground">{location.listeners} listeners</p>
              </div>
              <Badge variant="outline">{location.percentage}%</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Listening Platforms */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Listening Platforms
          </CardTitle>
          <CardDescription>Platform distribution of your streams</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {listeningHabits.map((platform, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
              <div className="flex-1 flex items-center justify-between">
                <span className="text-sm font-medium">{platform.platform}</span>
                <Badge variant="secondary">{platform.percentage}%</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Songs */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Top Performing Songs
          </CardTitle>
          <CardDescription>Your most popular tracks this month</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {topSongs.map((song, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{song.title}</h4>
                  <p className="text-xs text-muted-foreground">{song.plays} plays</p>
                </div>
                <Badge variant="outline">{song.percentage}%</Badge>
              </div>
              <Progress value={song.percentage} className="h-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
