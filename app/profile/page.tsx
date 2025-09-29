"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileContent } from "@/components/profile-content"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <ProfileContent />
      </div>
    </DashboardLayout>
  )
}
