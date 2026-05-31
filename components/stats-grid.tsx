import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, DollarSign, UserCheck, LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  description?: string
}

function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="mt-1 flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-medium",
              changeType === "positive" && "text-primary",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground"
            )}
          >
            {change}
          </span>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsGrid() {
  const stats: StatCardProps[] = [
    {
      title: "Active Patients",
      value: "124",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      description: "from last month",
    },
    {
      title: "Upcoming Appointments",
      value: "8",
      change: "Today",
      changeType: "neutral",
      icon: Calendar,
      description: "3 this morning",
    },
    {
      title: "Monthly Revenue",
      value: "$12,450",
      change: "+18%",
      changeType: "positive",
      icon: DollarSign,
      description: "from last month",
    },
    {
      title: "Patient Retention",
      value: "94%",
      change: "+2.5%",
      changeType: "positive",
      icon: UserCheck,
      description: "avg. satisfaction",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
