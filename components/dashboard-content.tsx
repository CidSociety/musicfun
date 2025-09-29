import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, TrendingUp, Users, Clock, DollarSign, Bot } from "lucide-react"

const upcomingGigs = [
  {
    venue: "The Blue Note",
    date: "Dec 15, 2024",
    time: "8:00 PM",
    location: "New York, NY",
    status: "confirmed",
    payout: "$1,200",
  },
  {
    venue: "Sunset Strip",
    date: "Dec 22, 2024",
    time: "9:30 PM",
    location: "Los Angeles, CA",
    status: "pending",
    payout: "$800",
  },
  {
    venue: "Red Rocks",
    date: "Jan 5, 2025",
    time: "7:00 PM",
    location: "Morrison, CO",
    status: "confirmed",
    payout: "$5,000",
  },
]

const recentActivity = [
  {
    type: "venue_match",
    message: "AI found 3 new venues matching your style",
    time: "2 hours ago",
    icon: Bot,
  },
  {
    type: "booking",
    message: "Booking confirmed at The Blue Note",
    time: "1 day ago",
    icon: Calendar,
  },
  {
    type: "analytics",
    message: "Your Spotify streams increased by 15%",
    time: "2 days ago",
    icon: TrendingUp,
  },
]

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,400</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Venues Found</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">AI-powered matches</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fan Growth</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Gigs */}
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Gigs
            </CardTitle>
            <CardDescription>Your confirmed and pending performances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingGigs.map((gig, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{gig.venue}</h4>
                    <Badge variant={gig.status === "confirmed" ? "default" : "secondary"}>{gig.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {gig.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {gig.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {gig.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-accent">{gig.payout}</div>
                </div>
              </div>
            ))}
            <Button className="w-full bg-transparent" variant="outline">
              View All Bookings
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and AI insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button className="w-full bg-transparent" variant="outline">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Find Venues</CardTitle>
            <CardDescription>
              AI-powered venue discovery based on your music style and location preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Search Venues</Button>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50 hover:border-accent/50 transition-colors cursor-pointer">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-2">
              <Bot className="h-6 w-6 text-accent" />
            </div>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>
              Get personalized recommendations for venues, booking strategies, and career growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-transparent" variant="outline">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50 hover:border-chart-3/50 transition-colors cursor-pointer">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-chart-3" />
            </div>
            <CardTitle>Band Hub</CardTitle>
            <CardDescription>Manage your band members, share schedules, and coordinate performances</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-transparent" variant="outline">
              Manage Band
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
