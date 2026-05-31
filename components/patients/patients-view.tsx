"use client"

import { PatientCard } from "./patient-card"
import { type PatientDetail } from "./mock-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronRight, Users } from "lucide-react"

const statusConfig = {
  active: { label: "Active", className: "bg-primary/10 text-primary border-primary/20" },
  "at-risk": { label: "At Risk", className: "bg-destructive/10 text-destructive border-destructive/20" },
  excellent: { label: "Excellent Progress", className: "bg-primary/10 text-primary border-primary/20" },
  "needs-follow-up": { label: "Needs Follow Up", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground border-border" },
}

interface PatientsViewProps {
  patients: PatientDetail[]
  viewMode: "grid" | "list"
  onOpenProfile: (patient: PatientDetail) => void
}

export function PatientsView({ patients, viewMode, onOpenProfile }: PatientsViewProps) {
  if (patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="mt-4 text-base font-semibold text-foreground">No patients found</p>
        <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  if (viewMode === "grid") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} onOpenProfile={onOpenProfile} />
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Patient
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Goal
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Weight / Goal
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              BMI
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Adherence
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Last Check-in
            </th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {patients.map((patient) => {
            const status = statusConfig[patient.status]
            return (
              <tr
                key={patient.id}
                className="group cursor-pointer transition-colors hover:bg-muted/30"
                onClick={() => onOpenProfile(patient)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {patient.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">{patient.age}y · {patient.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {patient.goal}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-medium text-foreground">{patient.currentWeight} kg</span>
                  <span className="text-xs text-muted-foreground"> / {patient.goalWeight} kg</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-medium text-foreground">{patient.bmi}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          patient.dietAdherence >= 70 ? "bg-primary" :
                          patient.dietAdherence >= 40 ? "bg-amber-500" : "bg-destructive"
                        )}
                        style={{ width: `${patient.dietAdherence}%` }}
                      />
                    </div>
                    <span className={cn(
                      "w-8 text-right text-xs font-semibold",
                      patient.dietAdherence >= 70 ? "text-primary" :
                      patient.dietAdherence >= 40 ? "text-amber-500" : "text-destructive"
                    )}>
                      {patient.dietAdherence}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={cn("text-xs", status.className)}>
                    {status.label}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-muted-foreground">{patient.lastCheckIn}</span>
                </td>
                <td className="px-4 py-3">
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
