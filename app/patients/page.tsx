"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PatientStatsCards } from "@/components/patients/patient-stats-cards"
import { PatientSearchFilter } from "@/components/patients/patient-search-filter"
import { PatientsView } from "@/components/patients/patients-view"
import { PatientsAiInsights } from "@/components/patients/patients-ai-insights"
import { PatientProfileDrawer } from "@/components/patients/patient-profile-drawer"
import { mockPatients, type PatientDetail } from "@/components/patients/mock-data"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

export default function PatientsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [selectedPatient, setSelectedPatient] = useState<PatientDetail | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  function openProfile(patient: PatientDetail) {
    setSelectedPatient(patient)
    setDrawerOpen(true)
  }

  const filteredPatients = useMemo(() => {
    let patients = mockPatients

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      patients = patients.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.phone.toLowerCase().includes(q) ||
          p.goal.toLowerCase().includes(q)
      )
    }

    if (activeFilters.length > 0) {
      patients = patients.filter((p) => {
        return activeFilters.every((filter) => {
          switch (filter) {
            case "active":        return p.status === "active"
            case "inactive":      return p.status === "inactive"
            case "high-risk":     return p.status === "at-risk"
            case "weight-loss":   return p.goal.toLowerCase().includes("weight")
            case "muscle-gain":   return p.goal.toLowerCase().includes("muscle")
            case "diabetes":      return p.goal.toLowerCase().includes("diabetes") || p.conditions.some((c) => c.toLowerCase().includes("diabetes"))
            case "hypertension":  return p.goal.toLowerCase().includes("hypertension") || p.conditions.some((c) => c.toLowerCase().includes("hypertension"))
            case "new-patients":  return p.joinedDate.includes("2026")
            case "upcoming-appointment": return p.nextAppointment !== "Not scheduled"
            default:              return true
          }
        })
      })
    }

    return patients
  }, [searchQuery, activeFilters])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Patients</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Manage, monitor, and track all patient progress.
            </p>
          </div>
          <Button className="gap-2 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
            <UserPlus className="h-4 w-4" />
            New Patient
          </Button>
        </div>

        {/* Stats */}
        <PatientStatsCards />

        {/* Search + filters */}
        <PatientSearchFilter
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />

        {/* Content: patient list + AI insights */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="xl:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredPatients.length}</span> of{" "}
                <span className="font-semibold text-foreground">{mockPatients.length}</span> patients
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

      <PatientProfileDrawer
        patient={selectedPatient}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </DashboardLayout>
  )
}
