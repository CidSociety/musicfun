"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { CalendarHeader } from "@/components/calendar-header"
import { CalendarView } from "@/components/calendar-view"

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <CalendarHeader />
      <CalendarView />
    </DashboardLayout>
  )
}
