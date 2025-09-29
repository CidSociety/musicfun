"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsContent } from "@/components/settings-content"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <SettingsContent />
      </div>
    </DashboardLayout>
  )
}
