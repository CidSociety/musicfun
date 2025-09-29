"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StudioHeader } from "@/components/studio-header"
import { StudioContent } from "@/components/studio-content"

export default function StudioPage() {
  return (
    <DashboardLayout>
      <StudioHeader />
      <StudioContent />
    </DashboardLayout>
  )
}
