import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Music, MapPin, DollarSign, Play, Heart } from "lucide-react"

const metrics = [
  {
    title: "Total Streams",
    value: "124,567",
    change: "+12.5%",
    trend: "up",
    icon: Play,
    description: "Across all platforms",
  },
  {
    title: "Monthly Listeners",
    value: "8,432",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    description: "Unique listeners this month",
  },
  {
    title: "Live Performances",
    value: "28",
    change: "+4",
    trend: "up",
    icon: MapPin,
    description: "Gigs completed",
  },
  {
    title: "Revenue",
    value: "$8,400",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    description: "Total earnings",
  },
  {
    title: "Song Releases",
    value: "6",
    change: "+2",
    trend: "up",
    icon: Music,
    description: "New tracks this quarter",
  },
  {
    title: "Fan Engagement",
    value: "94.2%",
    change: "-2.1%",
    trend: "down",
    icon: Heart,
    description: "Average engagement rate",
  },
]

export function AnalyticsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="glass-effect border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-1 text-xs">
              {metric.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-chart-3" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={metric.trend === "up" ? "text-chart-3" : "text-destructive"}>{metric.change}</span>
              <span className="text-muted-foreground">from last period</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
