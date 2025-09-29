"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Music } from "lucide-react"

const streamingData = [
  { month: "Jul", streams: 8500, listeners: 1200 },
  { month: "Aug", streams: 12300, listeners: 1800 },
  { month: "Sep", streams: 15600, listeners: 2100 },
  { month: "Oct", streams: 18900, listeners: 2400 },
  { month: "Nov", streams: 22100, listeners: 2800 },
  { month: "Dec", streams: 25400, listeners: 3200 },
]

const performanceData = [
  { venue: "Blue Note", attendance: 180, rating: 4.8 },
  { venue: "Mercury", attendance: 220, rating: 4.6 },
  { venue: "Brooklyn Bowl", attendance: 450, rating: 4.7 },
  { venue: "Rockwood", attendance: 120, rating: 4.4 },
  { venue: "Bowery", attendance: 280, rating: 4.5 },
]

const chartConfig = {
  streams: {
    label: "Streams",
    color: "hsl(var(--chart-1))",
  },
  listeners: {
    label: "Listeners",
    color: "hsl(var(--chart-2))",
  },
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-3))",
  },
}

export function PerformanceCharts() {
  return (
    <div className="space-y-6">
      {/* Streaming Growth */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Streaming Growth
          </CardTitle>
          <CardDescription>Monthly streams and unique listeners over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={streamingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="streams"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))" }}
                />
                <Line
                  type="monotone"
                  dataKey="listeners"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Live Performance Stats */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Live Performance Stats
          </CardTitle>
          <CardDescription>Attendance at recent venues</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="venue" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="attendance" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
