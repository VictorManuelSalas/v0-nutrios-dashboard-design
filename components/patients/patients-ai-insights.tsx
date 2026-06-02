import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { aiInsights } from "./mock-data"
import { Sparkles, AlertTriangle, CheckCircle2, Bell, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

type InsightType = "warning" | "alert" | "positive" | "recommendation"

function InsightIcon({ type }: { type: InsightType }) {
  const config = {
    warning: { icon: AlertTriangle, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10" },
    alert: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
    positive: { icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
    recommendation: { icon: Bell, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
  }
  const { icon: Icon, color, bg } = config[type]
  return (
    <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", bg)}>
      <Icon className={cn("h-4 w-4", color)} />
    </div>
  )
}

function InsightDot({ type }: { type: InsightType }) {
  return (
    <span
      className={cn(
        "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full",
        type === "warning" && "bg-[#F59E0B]",
        type === "alert" && "bg-destructive",
        type === "positive" && "bg-primary",
        type === "recommendation" && "bg-[#3B82F6]"
      )}
    />
  )
}

export function PatientsAiInsights() {
  return (
    <Card className="flex flex-col h-full shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">AI Insights</CardTitle>
            <p className="text-xs text-muted-foreground">{aiInsights.length} active alerts</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4 pb-4">
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className={cn(
                  "relative flex gap-3 rounded-xl border p-3 transition-colors",
                  insight.type === "alert" && "border-destructive/20 bg-destructive/5",
                  insight.type === "warning" && "border-[#F59E0B]/20 bg-[#F59E0B]/5",
                  insight.type === "positive" && "border-primary/20 bg-primary/5",
                  insight.type === "recommendation" && "border-[#3B82F6]/20 bg-[#3B82F6]/5"
                )}
              >
                <InsightIcon type={insight.type} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground truncate">{insight.patientName}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{insight.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary footer */}
          <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground">Weekly Summary</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">High risk patients</span>
                <span className="text-xs font-semibold text-destructive">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Need follow-up</span>
                <span className="text-xs font-semibold text-[#F59E0B]">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Excellent progress</span>
                <span className="text-xs font-semibold text-primary">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Avg. adherence</span>
                <span className="text-xs font-semibold text-[#3B82F6]">76.4%</span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
