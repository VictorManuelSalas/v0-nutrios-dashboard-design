"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ChevronRight, Lightbulb, TrendingUp, AlertCircle } from "lucide-react"

interface Suggestion {
  id: string
  type: "insight" | "recommendation" | "alert"
  title: string
  description: string
  action?: string
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    type: "insight",
    title: "Protein intake trends",
    description:
      "15 patients are below recommended protein levels. Consider reviewing their meal plans.",
    action: "Review Patients",
  },
  {
    id: "2",
    type: "recommendation",
    title: "Meal plan optimization",
    description:
      "AI suggests adding more fiber-rich foods to 8 active diet plans for better results.",
    action: "View Plans",
  },
  {
    id: "3",
    type: "alert",
    title: "Follow-up needed",
    description:
      "3 patients have not logged their meals in 7+ days. Schedule check-ins.",
    action: "Send Reminders",
  },
]

const iconMap = {
  insight: TrendingUp,
  recommendation: Lightbulb,
  alert: AlertCircle,
}

const colorMap = {
  insight: "bg-chart-1/10 text-chart-1",
  recommendation: "bg-chart-2/10 text-chart-2",
  alert: "bg-destructive/10 text-destructive",
}

export function AiSuggestions() {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base font-semibold">AI Suggestions</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          View All
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion) => {
          const Icon = iconMap[suggestion.type]
          return (
            <div
              key={suggestion.id}
              className="group flex gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/50"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorMap[suggestion.type]}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {suggestion.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {suggestion.description}
                </p>
                {suggestion.action && (
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs text-primary"
                  >
                    {suggestion.action}
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
