"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Target } from "lucide-react"

const nutritionGoals = [
  { value: "weight-loss", label: "Weight Loss", description: "Caloric deficit with balanced macros" },
  { value: "muscle-gain", label: "Muscle Gain", description: "High protein, caloric surplus" },
  { value: "maintenance", label: "Maintenance", description: "Maintain current weight" },
  { value: "sports-performance", label: "Sports Performance", description: "Optimized for athletic goals" },
  { value: "diabetes-control", label: "Diabetes Control", description: "Low glycemic, controlled carbs" },
  { value: "hypertension", label: "Hypertension", description: "Low sodium, heart-healthy" },
  { value: "pregnancy", label: "Pregnancy", description: "Prenatal nutrition focus" },
  { value: "custom", label: "Custom Goal", description: "Define your own parameters" },
]

interface NutritionGoalSectionProps {
  selectedGoal: string
  onGoalChange: (goal: string) => void
}

export function NutritionGoalSection({
  selectedGoal,
  onGoalChange,
}: NutritionGoalSectionProps) {
  const selectedGoalInfo = nutritionGoals.find((g) => g.value === selectedGoal)

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-primary" />
          Nutrition Goal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goal">Select Primary Goal</Label>
          <Select value={selectedGoal} onValueChange={onGoalChange}>
            <SelectTrigger id="goal" className="w-full">
              <SelectValue placeholder="Choose a nutrition goal" />
            </SelectTrigger>
            <SelectContent>
              {nutritionGoals.map((goal) => (
                <SelectItem key={goal.value} value={goal.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{goal.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedGoalInfo && (
          <div className="rounded-lg bg-primary/5 p-3 dark:bg-primary/10">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {selectedGoalInfo.label}:
              </span>{" "}
              {selectedGoalInfo.description}
            </p>
          </div>
        )}

        {/* Goal Quick Stats */}
        {selectedGoal && (
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-center">
              <p className="text-xs text-muted-foreground">Protein</p>
              <p className="text-lg font-semibold text-primary">
                {selectedGoal === "muscle-gain"
                  ? "35%"
                  : selectedGoal === "weight-loss"
                    ? "30%"
                    : "25%"}
              </p>
            </div>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-center">
              <p className="text-xs text-muted-foreground">Carbs</p>
              <p className="text-lg font-semibold text-primary">
                {selectedGoal === "diabetes-control"
                  ? "30%"
                  : selectedGoal === "weight-loss"
                    ? "35%"
                    : "45%"}
              </p>
            </div>
            <div className="rounded-lg border border-border/50 bg-muted/30 p-3 text-center">
              <p className="text-xs text-muted-foreground">Fat</p>
              <p className="text-lg font-semibold text-primary">
                {selectedGoal === "weight-loss"
                  ? "35%"
                  : selectedGoal === "diabetes-control"
                    ? "35%"
                    : "30%"}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
