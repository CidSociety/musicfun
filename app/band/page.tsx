import { DashboardLayout } from "@/components/dashboard-layout"
import { BandHeader } from "@/components/band-header"
import { BandOverview } from "@/components/band-overview"
import { BandMembers } from "@/components/band-members"
import { BandSchedule } from "@/components/band-schedule"
import { BandFinances } from "@/components/band-finances"

export default function BandPage() {
  return (
    <DashboardLayout>
      <BandHeader />
      <div className="p-6 space-y-6">
        <BandOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BandMembers />
          <BandSchedule />
        </div>
        <BandFinances />
      </div>
    </DashboardLayout>
  )
}
