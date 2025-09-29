import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, MapPin, Music, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Gigs",
    value: "28",
    change: "+4 this month",
    icon: Calendar,
  },
  {
    title: "Revenue",
    value: "$8,400",
    change: "+15% from last month",
    icon: DollarSign,
  },
  {
    title: "Active Venues",
    value: "12",
    change: "3 new partnerships",
    icon: MapPin,
  },
  {
    title: "Songs",
    value: "24",
    change: "2 new releases",
    icon: Music,
  },
]

const recentActivity = [
  {
    type: "gig",
    message: "Confirmed gig at The Blue Note for Dec 15",
    time: "2 hours ago",
    status: "success",
  },
  {
    type: "member",
    message: "Sarah updated her availability for next week",
    time: "4 hours ago",
    status: "info",
  },
  {
    type: "finance",
    message: "Payment received from Mercury Lounge ($800)",
    time: "1 day ago",
    status: "success",
  },
  {
    type: "practice",
    message: "Practice session scheduled for tomorrow 7 PM",
    time: "2 days ago",
    status: "info",
  },
]

export function BandOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-effect border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates from your band</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${activity.status === "success" ? "bg-chart-3" : "bg-accent"}`}
              ></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full bg-transparent">
            View All Activity
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
