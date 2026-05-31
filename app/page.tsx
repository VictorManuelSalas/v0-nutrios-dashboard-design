"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsGrid } from "@/components/stats-grid"
import { AiSuggestions } from "@/components/ai-suggestions"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { RecentPatients } from "@/components/recent-patients"
import { RevenueChart } from "@/components/revenue-chart"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Overview */}
        <StatsGrid />

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Chart - Takes 2 columns */}
          <RevenueChart />

          {/* AI Suggestions - Takes 1 column */}
          <AiSuggestions />
        </div>

        {/* Bottom Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Upcoming Appointments */}
          <UpcomingAppointments />

          {/* Recent Patients */}
          <RecentPatients />
        </div>
      </div>
    </DashboardLayout>
  )
}
