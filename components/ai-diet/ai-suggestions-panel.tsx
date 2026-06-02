"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Lightbulb,
  TrendingUp,
  Droplets,
  DollarSign,
  Utensils,
  ArrowRight,
} from "lucide-react"

interface Suggestion {
  id: string
  type: "improvement" | "hydration" | "cost" | "alternative"
  title: string
  description: string
  impact: string
  icon: React.ComponentType<{ className?: string }>
}

const suggestions: Suggestion[] = [
  {
    id: "1",
    type: "improvement",
    title: "Increase protein intake",
    description:
      "Current protein levels are slightly below optimal for muscle gain goal. Consider adding an extra egg or 50g of Greek yogurt to breakfast.",
    impact: "+15g protein daily",
    icon: TrendingUp,
  },
  {
    id: "2",
    type: "hydration",
    title: "Improve hydration",
    description:
      "Based on activity level and weight, recommend increasing water intake. Consider adding herbal teas or infused water for variety.",
    impact: "Target: 3L/day",
    icon: Droplets,
  },
  {
    id: "3",
    type: "cost",
    title: "Replace high-cost ingredients",
    description:
      "Salmon can be replaced with mackerel 2x/week without significant nutritional loss. Saves approximately $25/week.",
    impact: "Save $100/month",
    icon: DollarSign,
  },
  {
    id: "4",
    type: "alternative",
    title: "Alternative food suggestions",
    description:
      "For better fiber intake, consider swapping white rice with cauliflower rice twice a week. Adds variety and reduces carbs.",
    impact: "-20g carbs/meal",
    icon: Utensils,
  },
]

interface AiSuggestionsPanelProps {
  isVisible: boolean
}

export function AiSuggestionsPanel({ isVisible }: AiSuggestionsPanelProps) {
  if (!isVisible) return null

  const getTypeStyles = (type: Suggestion["type"]) => {
    switch (type) {
      case "improvement":
        return "bg-green-500/10 text-green-600 dark:text-green-400"
      case "hydration":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      case "cost":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      case "alternative":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  const getIconStyles = (type: Suggestion["type"]) => {
    switch (type) {
      case "improvement":
        return "text-green-500"
      case "hydration":
        return "text-blue-500"
      case "cost":
        return "text-amber-500"
      case "alternative":
        return "text-purple-500"
      default:
        return "text-primary"
    }
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="group rounded-lg border border-border/50 p-4 transition-all hover:border-primary/30 hover:bg-muted/30"
          >
            <div className="flex items-start gap-3">
              <div
                className={`rounded-lg p-2 ${getTypeStyles(suggestion.type)}`}
              >
                <suggestion.icon
                  className={`h-4 w-4 ${getIconStyles(suggestion.type)}`}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-foreground">
                    {suggestion.title}
                  </h4>
                  <Badge
                    variant="secondary"
                    className={`shrink-0 text-xs ${getTypeStyles(suggestion.type)}`}
                  >
                    {suggestion.impact}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {suggestion.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1 px-0 text-primary hover:bg-transparent hover:text-primary/80"
                >
                  Apply suggestion
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
