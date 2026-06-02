"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Settings2, Sparkles } from "lucide-react"

interface DietConfig {
  dailyCalories: string
  mealsPerDay: string
  budgetLevel: string
  dietStyle: string
}

interface AiPreferences {
  includeFavorites: boolean
  excludeDisliked: boolean
  excludeAllergens: boolean
  includeSupplements: boolean
  generateShoppingList: boolean
  generateRecipes: boolean
  includeFoodPhotos: boolean
}

interface DietConfigSectionProps {
  config: DietConfig
  onConfigChange: (config: DietConfig) => void
  aiPreferences: AiPreferences
  onAiPreferencesChange: (preferences: AiPreferences) => void
}

export function DietConfigSection({
  config,
  onConfigChange,
  aiPreferences,
  onAiPreferencesChange,
}: DietConfigSectionProps) {
  const updateConfig = (field: keyof DietConfig, value: string) => {
    onConfigChange({ ...config, [field]: value })
  }

  const updatePreference = (field: keyof AiPreferences, value: boolean) => {
    onAiPreferencesChange({ ...aiPreferences, [field]: value })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Diet Configuration */}
      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings2 className="h-5 w-5 text-primary" />
            Diet Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="calories">Daily Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="e.g., 2000"
                value={config.dailyCalories}
                onChange={(e) => updateConfig("dailyCalories", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meals">Meals Per Day</Label>
              <Select
                value={config.mealsPerDay}
                onValueChange={(value) => updateConfig("mealsPerDay", value)}
              >
                <SelectTrigger id="meals">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Meals</SelectItem>
                  <SelectItem value="4">4 Meals</SelectItem>
                  <SelectItem value="5">5 Meals</SelectItem>
                  <SelectItem value="6">6 Meals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Level</Label>
              <Select
                value={config.budgetLevel}
                onValueChange={(value) => updateConfig("budgetLevel", value)}
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget-Friendly</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="style">Diet Style</Label>
              <Select
                value={config.dietStyle}
                onValueChange={(value) => updateConfig("dietStyle", value)}
              >
                <SelectTrigger id="style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="keto">Keto</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="high-protein">High Protein</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50">
              <Checkbox
                id="favorites"
                checked={aiPreferences.includeFavorites}
                onCheckedChange={(checked) =>
                  updatePreference("includeFavorites", checked as boolean)
                }
              />
              <Label
                htmlFor="favorites"
                className="cursor-pointer text-sm font-medium"
              >
                Include favorite foods
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50">
              <Checkbox
                id="disliked"
                checked={aiPreferences.excludeDisliked}
                onCheckedChange={(checked) =>
                  updatePreference("excludeDisliked", checked as boolean)
                }
              />
              <Label
                htmlFor="disliked"
                className="cursor-pointer text-sm font-medium"
              >
                Exclude disliked foods
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50">
              <Checkbox
                id="allergens"
                checked={aiPreferences.excludeAllergens}
                onCheckedChange={(checked) =>
                  updatePreference("excludeAllergens", checked as boolean)
                }
              />
              <Label
                htmlFor="allergens"
                className="cursor-pointer text-sm font-medium"
              >
                Exclude allergens
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50">
              <Checkbox
                id="supplements"
                checked={aiPreferences.includeSupplements}
                onCheckedChange={(checked) =>
                  updatePreference("includeSupplements", checked as boolean)
                }
              />
              <Label
                htmlFor="supplements"
                className="cursor-pointer text-sm font-medium"
              >
                Include supplements
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50">
              <Checkbox
                id="shopping"
                checked={aiPreferences.generateShoppingList}
                onCheckedChange={(checked) =>
                  updatePreference("generateShoppingList", checked as boolean)
                }
              />
              <Label
                htmlFor="shopping"
                className="cursor-pointer text-sm font-medium"
              >
                Generate shopping list
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50">
              <Checkbox
                id="recipes"
                checked={aiPreferences.generateRecipes}
                onCheckedChange={(checked) =>
                  updatePreference("generateRecipes", checked as boolean)
                }
              />
              <Label
                htmlFor="recipes"
                className="cursor-pointer text-sm font-medium"
              >
                Generate recipes
              </Label>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50 sm:col-span-2">
              <Checkbox
                id="photos"
                checked={aiPreferences.includeFoodPhotos}
                onCheckedChange={(checked) =>
                  updatePreference("includeFoodPhotos", checked as boolean)
                }
              />
              <Label
                htmlFor="photos"
                className="cursor-pointer text-sm font-medium"
              >
                Include food photos
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
