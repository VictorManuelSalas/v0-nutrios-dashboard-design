"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type Patient } from "./mock-data"
import {
  User,
  Calendar,
  Utensils,
  MessageSquare,
  Clock,
} from "lucide-react"

interface PatientCardProps {
  patient: Patient
  onOpenProfile: (patient: Patient) => void
}

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

function StatusBadge({ patient }: { patient: Patient }) {
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
  if (patient.dietAdherence >= 85 && patient.goalCompletion >= 70) {
    return (
      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-xs">
        Excellent Progress
      </Badge>
    )
  }
  if (patient.risk === "medium" || patient.dietAdherence < 60) {
    return (
      <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20 hover:bg-[#F59E0B]/10 text-xs">
        Needs Follow Up
      </Badge>
    )
  }
  return (
    <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-xs">
      Active
    </Badge>
  )
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-muted/50 px-2 py-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  )
}

function ProgressBar({ label, value, color }: { label: string; value: number; color: "green" | "blue" }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span
          className={cn(
            "text-xs font-semibold",
            color === "green" ? "text-primary" : "text-[#3B82F6]"
          )}
        >
          {value}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            color === "green" ? "bg-primary" : "bg-[#3B82F6]"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function RiskIndicator({ risk }: { risk: Patient["risk"] }) {
  return (
    <div
      className={cn(
        "h-2.5 w-2.5 rounded-full flex-shrink-0",
        risk === "low" && "bg-primary",
        risk === "medium" && "bg-[#F59E0B]",
        risk === "high" && "bg-destructive"
      )}
    />
  )
}

export function PatientCard({ patient, onOpenProfile }: PatientCardProps) {
  return (
    <div className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-11 w-11">
              <AvatarImage src={patient.avatar} alt={patient.name} />
              <AvatarFallback className={cn("text-sm font-semibold", getAvatarColor(patient.id))}>
                {getInitials(patient.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5">
              <RiskIndicator risk={patient.risk} />
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{patient.name}</p>
            <p className="text-xs text-muted-foreground">
              {patient.age} · {patient.gender}
            </p>
          </div>
        </div>
        <StatusBadge patient={patient} />
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-4 gap-1.5">
        <MetricCell label="Weight" value={`${patient.currentWeight}kg`} />
        <MetricCell label="Goal" value={`${patient.goalWeight}kg`} />
        <MetricCell label="BMI" value={patient.bmi.toString()} />
        <MetricCell label="Body Fat" value={`${patient.bodyFat}%`} />
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <ProgressBar label="Diet Adherence" value={patient.dietAdherence} color="green" />
        <ProgressBar label="Goal Completion" value={patient.goalCompletion} color="blue" />
      </div>

      {/* Last Check-in */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>Last check-in: {patient.lastCheckin}</span>
      </div>

      {/* Goals */}
      <div className="flex flex-wrap gap-1">
        {patient.goals.map((goal) => (
          <span
            key={goal}
            className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {goal}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-1.5 pt-1 border-t border-border">
        <button
          onClick={() => onOpenProfile(patient)}
          className="flex flex-col items-center gap-1 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          title="Open Profile"
        >
          <User className="h-4 w-4" />
          <span className="text-[10px]">Profile</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]"
          title="Schedule Appointment"
        >
          <Calendar className="h-4 w-4" />
          <span className="text-[10px]">Schedule</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]"
          title="Generate Diet"
        >
          <Utensils className="h-4 w-4" />
          <span className="text-[10px]">Diet</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-[#F59E0B]/10 hover:text-[#F59E0B]"
          title="Send Message"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="text-[10px]">Message</span>
        </button>
      </div>
    </div>
  )
}
