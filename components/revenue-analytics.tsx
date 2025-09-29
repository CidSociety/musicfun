"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Percent } from "lucide-react"

const revenueData = [
  { month: "Jul", streaming: 450, live: 2400, merchandise: 200, total: 3050 },
  { month: "Aug", streaming: 520, live: 1800, merchandise: 150, total: 2470 },
  { month: "Sep", streaming: 680, live: 3200, merchandise: 300, total: 4180 },
  { month: "Oct", streaming: 750, live: 2800, merchandise: 250, total: 3800 },
  { month: "Nov", streaming: 890, live: 4100, merchandise: 400, total: 5390 },
  { month: "Dec", streaming: 1200, live: 3600, merchandise: 350, total: 5150 },
]

const revenueBreakdown = [
  { name: "Live Performances", value: 18100, percentage: 68, color: "hsl(var(--chart-1))" },
  { name: "Streaming", value: 4490, percentage: 17, color: "hsl(var(--chart-2))" },
  { name: "Merchandise", value: 1650, percentage: 6, color: "hsl(var(--chart-3))" },
  { name: "Licensing", value: 1200, percentage: 5, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 960, percentage: 4, color: "hsl(var(--chart-5))" },
]

const chartConfig = {
  streaming: {
    label: "Streaming",
    color: "hsl(var(--chart-2))",
  },
  live: {
    label: "Live Shows",
    color: "hsl(var(--chart-1))",
  },
  merchandise: {
    label: "Merchandise",
    color: "hsl(var(--chart-3))",
  },
  total: {
    label: "Total Revenue",
    color: "hsl(var(--primary))",
  },
}

export function RevenueAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Trends */}
      <Card className="glass-effect border-border/50 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Revenue Trends
          </CardTitle>
          <CardDescription>Monthly revenue breakdown by source</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="live"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="streaming"
                  stackId="1"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="merchandise"
                  stackId="1"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Revenue Sources
          </CardTitle>
          <CardDescription>Distribution of total revenue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="glass-effect border border-border/50 p-3 rounded-lg">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${data.value.toLocaleString()} ({data.percentage}%)
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {revenueBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">${item.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Revenue</span>
              <span className="text-lg font-bold text-primary">
                ${revenueBreakdown.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
