"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Clock, Video, MapPin } from "lucide-react"

interface Appointment {
  id: string
  patient: {
    name: string
    avatar?: string
    initials: string
  }
  time: string
  type: "video" | "in-person"
  status: "confirmed" | "pending" | "completed"
  reason: string
}

const appointments: Appointment[] = [
  {
    id: "1",
    patient: {
      name: "Emma Thompson",
      initials: "ET",
    },
    time: "9:00 AM",
    type: "video",
    status: "confirmed",
    reason: "Weekly check-in",
  },
  {
    id: "2",
    patient: {
      name: "Michael Chen",
      initials: "MC",
    },
    time: "10:30 AM",
    type: "in-person",
    status: "confirmed",
    reason: "Diet plan review",
  },
  {
    id: "3",
    patient: {
      name: "Sarah Johnson",
      initials: "SJ",
    },
    time: "11:30 AM",
    type: "video",
    status: "pending",
    reason: "Initial consultation",
  },
  {
    id: "4",
    patient: {
      name: "David Park",
      initials: "DP",
    },
    time: "2:00 PM",
    type: "in-person",
    status: "confirmed",
    reason: "Progress assessment",
  },
]

const statusColors = {
  confirmed: "bg-primary/10 text-primary border-primary/20",
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  completed: "bg-muted text-muted-foreground border-muted",
}

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base font-semibold">
            Today&apos;s Appointments
          </CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          View All
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={appointment.patient.avatar}
                  alt={appointment.patient.name}
                />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  {appointment.patient.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {appointment.patient.name}
                  </p>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-medium ${statusColors[appointment.status]}`}
                  >
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">
                    {appointment.time}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    {appointment.type === "video" ? (
                      <Video className="h-3 w-3" />
                    ) : (
                      <MapPin className="h-3 w-3" />
                    )}
                    {appointment.type === "video" ? "Video Call" : "In-Person"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {appointment.reason}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
