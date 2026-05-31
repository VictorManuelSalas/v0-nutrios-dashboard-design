"use client"

import { User, Calendar, MessageSquare, Utensils, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  age: number
  gender: "Male" | "Female" | "Other"
  currentWeight: number
  goalWeight: number
  bmi: number
  bodyFat: number
  lastCheckIn: string
  dietAdherence: number
  goalCompletion: number
  status: "active" | "at-risk" | "excellent" | "needs-follow-up" | "inactive"
  goal: string
}

interface PatientCardProps {
  patient: Patient
  onOpenProfile: (patient: Patient) => void
}

const statusConfig = {
  active: { label: "Active", className: "bg-primary/10 text-primary border-primary/20" },
  "at-risk": { label: "At Risk", className: "bg-destructive/10 text-destructive border-destructive/20" },
  excellent: { label: "Excellent Progress", className: "bg-primary/10 text-primary border-primary/20" },
  "needs-follow-up": { label: "Needs Follow Up", className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground border-border" },
}

export function PatientCard({ patient, onOpenProfile }: PatientCardProps) {
  const status = statusConfig[patient.status]

  return (
    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={patient.avatar} alt={patient.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {patient.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">
              {patient.age}y, {patient.gender} | {patient.goal}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onOpenProfile(patient)}>
                <User className="h-4 w-4 mr-2" /> Open Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="h-4 w-4 mr-2" /> Schedule Appointment
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Utensils className="h-4 w-4 mr-2" /> Generate Diet
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" /> Send Message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Current Weight</p>
            <p className="font-semibold text-foreground">{patient.currentWeight} kg</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Goal Weight</p>
            <p className="font-semibold text-foreground">{patient.goalWeight} kg</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-xs text-muted-foreground">BMI</p>
            <p className="font-semibold text-foreground">{patient.bmi}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-xs text-muted-foreground">Body Fat</p>
            <p className="font-semibold text-foreground">{patient.bodyFat}%</p>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Diet Adherence</span>
              <span className="font-medium text-foreground">{patient.dietAdherence}%</span>
            </div>
            <Progress 
              value={patient.dietAdherence} 
              className="h-2 bg-muted" 
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Goal Completion</span>
              <span className="font-medium text-foreground">{patient.goalCompletion}%</span>
            </div>
            <Progress 
              value={patient.goalCompletion} 
              className="h-2 bg-muted" 
            />
          </div>
        </div>

        {/* Status & Last Check-in */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={status.className}>
            {status.label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Last: {patient.lastCheckIn}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
            onClick={() => onOpenProfile(patient)}
          >
            <User className="h-3 w-3 mr-1" /> Profile
          </Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <Calendar className="h-3 w-3 mr-1" /> Appt
          </Button>
          <Button size="sm" className="flex-1 text-xs bg-primary text-primary-foreground">
            <Utensils className="h-3 w-3 mr-1" /> Diet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
