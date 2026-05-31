"use client"

import { Users, UserCheck, UserPlus, AlertTriangle, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Total Patients",
    value: "248",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    description: "All registered patients",
  },
  {
    title: "Active Patients",
    value: "186",
    change: "+8%",
    changeType: "positive" as const,
    icon: UserCheck,
    description: "Currently on treatment",
  },
  {
    title: "New This Month",
    value: "24",
    change: "+18%",
    changeType: "positive" as const,
    icon: UserPlus,
    description: "Joined in May 2026",
  },
  {
    title: "Patients At Risk",
    value: "12",
    change: "-4%",
    changeType: "negative" as const,
    icon: AlertTriangle,
    description: "Requires attention",
  },
  {
    title: "Avg Adherence Rate",
    value: "87%",
    change: "+3%",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Diet plan compliance",
  },
]

export function PatientStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs font-medium ${
                      stat.changeType === "positive" ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.description}</span>
                </div>
              </div>
              <div className={`p-2 rounded-lg ${
                stat.title === "Patients At Risk" 
                  ? "bg-destructive/10 text-destructive" 
                  : "bg-primary/10 text-primary"
              }`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
