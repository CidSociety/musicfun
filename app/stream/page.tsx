"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StreamHeader } from "@/components/stream-header"
import { StreamContent } from "@/components/stream-content"

export default function StreamPage() {
  return (
    <DashboardLayout>
      <StreamHeader />
      <StreamContent />
    </DashboardLayout>
  )
}
