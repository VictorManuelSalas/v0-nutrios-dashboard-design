"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  RefreshCcw,
  ArrowRightLeft,
  Search,
  Check,
  X,
} from "lucide-react"

interface Substitution {
  id: string
  original: string
  replacement: string
  reason: string
  nutritionDiff: string
  accepted: boolean | null
}

const initialSubstitutions: Substitution[] = [
  {
    id: "1",
    original: "Atlantic Salmon",
    replacement: "Mackerel",
    reason: "Similar omega-3 content, more budget-friendly",
    nutritionDiff: "-5 cal, +2g protein",
    accepted: null,
  },
  {
    id: "2",
    original: "Quinoa",
    replacement: "Brown Rice",
    reason: "More widely available, comparable fiber content",
    nutritionDiff: "+10 cal, -1g protein",
    accepted: null,
  },
  {
    id: "3",
    original: "Almond Butter",
    replacement: "Peanut Butter",
    reason: "Lower cost, similar macros",
    nutritionDiff: "-5 cal, +1g protein",
    accepted: null,
  },
]

interface FoodSubstitutionSectionProps {
  isVisible: boolean
}

export function FoodSubstitutionSection({
  isVisible,
}: FoodSubstitutionSectionProps) {
  const [substitutions, setSubstitutions] =
    useState<Substitution[]>(initialSubstitutions)
  const [searchQuery, setSearchQuery] = useState("")

  if (!isVisible) return null

  const handleAccept = (id: string) => {
    setSubstitutions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, accepted: true } : sub))
    )
  }

  const handleReject = (id: string) => {
    setSubstitutions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, accepted: false } : sub))
    )
  }

  const handleRefresh = (id: string) => {
    setSubstitutions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, accepted: null } : sub))
    )
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            Food Substitutions
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            AI-Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for food to substitute..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {substitutions.map((sub) => (
            <div
              key={sub.id}
              className={`rounded-lg border p-4 transition-all ${
                sub.accepted === true
                  ? "border-green-500/50 bg-green-500/5"
                  : sub.accepted === false
                    ? "border-red-500/50 bg-red-500/5 opacity-60"
                    : "border-border/50 hover:border-primary/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-foreground">
                      {sub.original}
                    </span>
                    <ArrowRightLeft className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium text-primary">
                      {sub.replacement}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{sub.reason}</p>
                  <Badge variant="outline" className="text-xs">
                    {sub.nutritionDiff}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  {sub.accepted === null ? (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-green-500 hover:bg-green-500/10 hover:text-green-600"
                        onClick={() => handleAccept(sub.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500 hover:bg-red-500/10 hover:text-red-600"
                        onClick={() => handleReject(sub.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => handleRefresh(sub.id)}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full gap-2">
          <RefreshCcw className="h-4 w-4" />
          Generate More Substitutions
        </Button>
      </CardContent>
    </Card>
  )
}
