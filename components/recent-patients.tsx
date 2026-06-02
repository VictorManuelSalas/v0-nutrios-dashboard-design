"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, Users } from "lucide-react"
import Link from "next/link"

interface Patient {
  id: string
  name: string
  avatar?: string
  initials: string
  plan: string
  progress: number
  lastActivity: string
}

const recentPatients: Patient[] = [
  {
    id: "1",
    name: "Emma Thompson",
    initials: "ET",
    plan: "Weight Loss Program",
    progress: 75,
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    initials: "MC",
    plan: "Muscle Gain Diet",
    progress: 60,
    lastActivity: "5 hours ago",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    initials: "SJ",
    plan: "Diabetes Management",
    progress: 85,
    lastActivity: "1 day ago",
  },
  {
    id: "4",
    name: "David Park",
    initials: "DP",
    plan: "Heart Healthy Diet",
    progress: 45,
    lastActivity: "2 days ago",
  },
  {
    id: "5",
    name: "Lisa Williams",
    initials: "LW",
    plan: "Vegan Transition",
    progress: 90,
    lastActivity: "3 days ago",
  },
]

export function RecentPatients() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base font-semibold">Recent Patients</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" asChild>
          <Link href="/patients">
            View All
            <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPatients.map((patient) => (
            <div
              key={patient.id}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={patient.avatar} alt={patient.name} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  {patient.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">
                    {patient.name}
                  </p>
                  <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                    {patient.lastActivity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground truncate flex-1">
                    {patient.plan}
                  </p>
                  <span className="text-[10px] font-medium text-primary shrink-0">
                    {patient.progress}%
                  </span>
                </div>
                <Progress value={patient.progress} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
