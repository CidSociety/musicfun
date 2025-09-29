"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { RecordingsHeader } from "@/components/recordings-header"
import { RecordingsContent } from "@/components/recordings-content"

export default function RecordingsPage() {
  return (
    <DashboardLayout>
      <RecordingsHeader />
      <RecordingsContent />
    </DashboardLayout>
  )
}
