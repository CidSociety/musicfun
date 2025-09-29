import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalyticsHeader } from "@/components/analytics-header"
import { AnalyticsOverview } from "@/components/analytics-overview"
import { PerformanceCharts } from "@/components/performance-charts"
import { AudienceInsights } from "@/components/audience-insights"
import { RevenueAnalytics } from "@/components/revenue-analytics"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <AnalyticsHeader />
      <div className="p-6 space-y-6">
        <AnalyticsOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceCharts />
          <AudienceInsights />
        </div>
        <RevenueAnalytics />
      </div>
    </DashboardLayout>
  )
}
