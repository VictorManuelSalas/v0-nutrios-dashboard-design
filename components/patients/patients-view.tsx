"use client"

import { type Patient } from "./mock-data"
import { PatientCard } from "./patient-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronRight, User } from "lucide-react"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function getAvatarColor(id: string) {
  const colors = [
    "bg-primary/20 text-primary",
    "bg-[#3B82F6]/20 text-[#3B82F6]",
    "bg-[#8B5CF6]/20 text-[#8B5CF6]",
    "bg-[#F59E0B]/20 text-[#F59E0B]",
    "bg-[#EC4899]/20 text-[#EC4899]",
  ]
  const index = parseInt(id.replace("p", "")) % colors.length
  return colors[index]
}

function RiskDot({ risk }: { risk: Patient["risk"] }) {
  return (
    <span
      className={cn(
        "inline-flex h-2 w-2 rounded-full",
        risk === "low" && "bg-primary",
        risk === "medium" && "bg-[#F59E0B]",
        risk === "high" && "bg-destructive"
      )}
    />
  )
}

function StatusCell({ patient }: { patient: Patient }) {
  if (patient.risk === "high") {
    return (
      <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/10 text-xs">
        At Risk
      </Badge>
    )
  }
  if (patient.status === "inactive") {
    return (
      <Badge variant="outline" className="text-muted-foreground text-xs">
        Inactive
      </Badge>
    )
  }
  if (patient.dietAdherence >= 85) {
    return (
      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-xs">
        Excellent
      </Badge>
    )
  }
  if (patient.risk === "medium" || patient.dietAdherence < 60) {
    return (
      <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20 hover:bg-[#F59E0B]/10 text-xs">
        Follow Up
      </Badge>
    )
  }
  return (
    <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-xs">
      Active
    </Badge>
  )
}

interface PatientsViewProps {
  patients: Patient[]
  viewMode: "grid" | "table"
  onOpenProfile: (patient: Patient) => void
}

export function PatientsView({ patients, viewMode, onOpenProfile }: PatientsViewProps) {
  if (patients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="mt-4 text-base font-semibold text-foreground">No patients found</p>
        <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  if (viewMode === "grid") {
    console.log("Rendering grid view with patients:", patients) // Debug log
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
              Goals
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
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="group transition-colors hover:bg-muted/30 cursor-pointer"
              onClick={() => onOpenProfile(patient)}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                      <AvatarFallback className={cn("text-xs font-semibold", getAvatarColor(patient.id))}>
                        {getInitials(patient.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5">
                      <RiskDot risk={patient.risk} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {patient.age} · {patient.gender}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {patient.goals.slice(0, 2).map((goal) => (
                    <span
                      key={goal}
                      className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-sm font-medium text-foreground">{patient.currentWeight}kg</span>
                <span className="text-xs text-muted-foreground"> / {patient.goalWeight}kg</span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-sm font-medium text-foreground">{patient.bmi}</span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        patient.dietAdherence >= 70 ? "bg-primary" :
                        patient.dietAdherence >= 40 ? "bg-[#F59E0B]" : "bg-destructive"
                      )}
                      style={{ width: `${patient.dietAdherence}%` }}
                    />
                  </div>
                  <span className={cn(
                    "text-xs font-semibold w-8 text-right",
                    patient.dietAdherence >= 70 ? "text-primary" :
                    patient.dietAdherence >= 40 ? "text-[#F59E0B]" : "text-destructive"
                  )}>
                    {patient.dietAdherence}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">
                <StatusCell patient={patient} />
              </td>
              <td className="px-4 py-3">
                <span className="text-xs text-muted-foreground">{patient.lastCheckin}</span>
              </td>
              <td className="px-4 py-3">
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
