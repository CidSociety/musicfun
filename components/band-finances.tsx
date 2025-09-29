import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, TrendingDown, Calendar, MapPin, Plus, Download } from "lucide-react"

const financialSummary = {
  totalRevenue: 8400,
  totalExpenses: 3200,
  netProfit: 5200,
  monthlyChange: 15,
}

const recentTransactions = [
  {
    id: 1,
    type: "income",
    description: "The Blue Note - Live Performance",
    amount: 1200,
    date: "Dec 8, 2024",
    status: "completed",
    venue: "The Blue Note",
  },
  {
    id: 2,
    type: "expense",
    description: "Studio Rental - Recording Session",
    amount: -400,
    date: "Dec 5, 2024",
    status: "completed",
    category: "Recording",
  },
  {
    id: 3,
    type: "income",
    description: "Mercury Lounge - Live Performance",
    amount: 800,
    date: "Dec 1, 2024",
    status: "completed",
    venue: "Mercury Lounge",
  },
  {
    id: 4,
    type: "expense",
    description: "Equipment Maintenance",
    amount: -250,
    date: "Nov 28, 2024",
    status: "completed",
    category: "Equipment",
  },
  {
    id: 5,
    type: "income",
    description: "Brooklyn Bowl - Live Performance",
    amount: 1500,
    date: "Nov 25, 2024",
    status: "completed",
    venue: "Brooklyn Bowl",
  },
]

const upcomingPayments = [
  {
    id: 1,
    description: "Sunset Strip - Performance Fee",
    amount: 900,
    dueDate: "Dec 22, 2024",
    status: "pending",
  },
  {
    id: 2,
    description: "Red Rocks - Performance Fee",
    amount: 5000,
    dueDate: "Jan 5, 2025",
    status: "confirmed",
  },
]

export function BandFinances() {
  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-effect border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialSummary.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-chart-3" />+{financialSummary.monthlyChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialSummary.totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Equipment, studio, travel</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">${financialSummary.netProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">After all expenses</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Gig</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(financialSummary.totalRevenue / 28).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Based on 28 gigs</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Latest income and expenses</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{transaction.description}</h4>
                    <Badge variant="outline" className="text-xs">
                      {transaction.venue || transaction.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {transaction.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${transaction.type === "income" ? "text-chart-3" : "text-destructive"}`}>
                    {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Payments
            </CardTitle>
            <CardDescription>Expected income from confirmed gigs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingPayments.map((payment) => (
              <div key={payment.id} className="p-4 bg-secondary/20 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{payment.description}</h4>
                  <Badge variant={payment.status === "confirmed" ? "default" : "secondary"} className="text-xs">
                    {payment.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Due: {payment.dueDate}
                  </div>
                  <div className="text-lg font-bold text-chart-3">+${payment.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}

            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Expected</span>
                <span className="text-xl font-bold text-primary">
                  +${upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
