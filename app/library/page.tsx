"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { LibraryHeader } from "@/components/library-header"
import { LibraryContent } from "@/components/library-content"

export default function LibraryPage() {
  return (
    <DashboardLayout>
      <LibraryHeader />
      <LibraryContent />
    </DashboardLayout>
  )
}
