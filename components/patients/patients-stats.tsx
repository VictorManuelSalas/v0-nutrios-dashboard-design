import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Users, UserCheck, UserPlus, AlertTriangle, Activity, LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
  description?: string
  iconColor?: string
  iconBg?: string
}

function StatCard({ title, value, change, changeType, icon: Icon, description, iconColor, iconBg }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", iconBg ?? "bg-primary/10")}>
          <Icon className={cn("h-5 w-5", iconColor ?? "text-primary")} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="mt-1 flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs font-semibold",
              changeType === "positive" && "text-primary",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground"
            )}
          >
            {change}
          </span>
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      </CardContent>
    </Card>
  )
}

export function PatientsStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Total Patients"
        value="247"
        change="+14"
        changeType="positive"
        icon={Users}
        description="this month"
        iconBg="bg-primary/10"
        iconColor="text-primary"
      />
      <StatCard
        title="Active Patients"
        value="198"
        change="+8.3%"
        changeType="positive"
        icon={UserCheck}
        description="vs last month"
        iconBg="bg-[#3B82F6]/10"
        iconColor="text-[#3B82F6]"
      />
      <StatCard
        title="New This Month"
        value="14"
        change="+2"
        changeType="positive"
        icon={UserPlus}
        description="vs last month"
        iconBg="bg-[#8B5CF6]/10"
        iconColor="text-[#8B5CF6]"
      />
      <StatCard
        title="Patients At Risk"
        value="12"
        change="-3"
        changeType="positive"
        icon={AlertTriangle}
        description="from last week"
        iconBg="bg-destructive/10"
        iconColor="text-destructive"
      />
      <StatCard
        title="Avg. Adherence"
        value="76.4%"
        change="+2.1%"
        changeType="positive"
        icon={Activity}
        description="diet compliance"
        iconBg="bg-[#F59E0B]/10"
        iconColor="text-[#F59E0B]"
      />
    </div>
  )
}
