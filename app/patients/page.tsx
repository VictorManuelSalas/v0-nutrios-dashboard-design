"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PatientsStats } from "@/components/patients/patients-stats"
import { PatientsFilters } from "@/components/patients/patients-filters"
import { PatientsView } from "@/components/patients/patients-view"
import { PatientsAiInsights } from "@/components/patients/patients-ai-insights"
import { PatientProfileDrawer } from "@/components/patients/patient-profile-drawer"
import { mockPatients, type Patient } from "@/components/patients/mock-data"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default function PatientsPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  function openProfile(patient: Patient) {
    setSelectedPatient(patient)
    setDrawerOpen(true)
  }

  const filteredPatients = useMemo(() => {
    let patients = mockPatients

    if (search.trim()) {
      const q = search.toLowerCase()
      patients = patients.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.goals.some((g) => g.toLowerCase().includes(q)) ||
          p.conditions.some((c) => c.toLowerCase().includes(q))
      )
    }

    switch (activeFilter) {
      case "active":
        return patients.filter((p) => p.status === "active")
      case "inactive":
        return patients.filter((p) => p.status === "inactive")
      case "high-risk":
        return patients.filter((p) => p.risk === "high")
      case "weight-loss":
        return patients.filter((p) => p.goals.includes("Weight Loss"))
      case "muscle-gain":
        return patients.filter((p) => p.goals.includes("Muscle Gain"))
      case "diabetes":
        return patients.filter((p) => p.goals.includes("Diabetes"))
      case "hypertension":
        return patients.filter((p) => p.goals.includes("Hypertension"))
      case "new":
        return patients.filter((p) => p.joinedDate.includes("2026"))
      case "upcoming":
        return patients.filter((p) => p.nextAppointment !== "Not scheduled")
      default:
        return patients
    }
  }, [search, activeFilter])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Patients</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Manage, monitor, and track all patient progress.
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            <UserPlus className="h-4 w-4" />
            New Patient
          </Button>
        </div>

        {/* Stats */}
        <PatientsStats />

        {/* Filters */}
        <PatientsFilters
          search={search}
          onSearchChange={setSearch}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Main content: patient list + AI insights */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="xl:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredPatients.length}</span> patients
              </span>
            </div>
            <PatientsView
              patients={filteredPatients}
              viewMode={viewMode}
              onOpenProfile={openProfile}
            />
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)]">
              <PatientsAiInsights />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Drawer */}
      <PatientProfileDrawer
        patient={selectedPatient}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </DashboardLayout>
  )
}
