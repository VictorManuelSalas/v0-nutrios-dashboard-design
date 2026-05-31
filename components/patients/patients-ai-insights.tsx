import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { aiInsights } from "./mock-data"
import { Sparkles, AlertTriangle, CheckCircle2, Bell, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

type InsightType = "warning" | "alert" | "positive" | "recommendation"

const insightConfig: Record<InsightType, { icon: typeof AlertTriangle; color: string; bg: string; border: string }> = {
  alert: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20 bg-destructive/5" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20 bg-amber-500/5" },
  positive: { icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20 bg-primary/5" },
  recommendation: { icon: Bell, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10", border: "border-[#3B82F6]/20 bg-[#3B82F6]/5" },
}

export function PatientsAiInsights() {
  return (
    <Card className="flex flex-col shadow-sm h-full">
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
          <div className="space-y-2.5">
            {aiInsights.map((insight) => {
              const config = insightConfig[insight.type]
              const Icon = config.icon
              return (
                <div
                  key={insight.id}
                  className={cn("flex gap-3 rounded-xl border p-3 transition-colors", config.border)}
                >
                  <div className={cn("flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground truncate">{insight.patientName}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{insight.message}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Weekly summary */}
          <div className="mt-4 rounded-xl border border-border bg-muted/30 p-3">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-foreground">Weekly Summary</span>
            </div>
            <div className="space-y-2">
              {[
                { label: "High risk patients", value: "2", color: "text-destructive" },
                { label: "Need follow-up", value: "3", color: "text-amber-500" },
                { label: "Excellent progress", value: "5", color: "text-primary" },
                { label: "Avg. adherence", value: "87%", color: "text-[#3B82F6]" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className={cn("text-xs font-semibold", item.color)}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
