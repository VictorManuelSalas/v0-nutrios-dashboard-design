"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { PatientInfoCard } from "@/components/ai-diet/patient-info-card"
import { NutritionGoalSection } from "@/components/ai-diet/nutrition-goal-section"
import { DietConfigSection } from "@/components/ai-diet/diet-config-section"
import { MealPlanPreview } from "@/components/ai-diet/meal-plan-preview"
import { ShoppingListPanel } from "@/components/ai-diet/shopping-list-panel"
import { AiSuggestionsPanel } from "@/components/ai-diet/ai-suggestions-panel"
import { FoodSubstitutionSection } from "@/components/ai-diet/food-substitution-section"
import { ActionButtons } from "@/components/ai-diet/action-buttons"
import { Sparkles, Loader2 } from "lucide-react"

export default function AiDietGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  // Patient Information State
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    bmi: "",
    bodyFat: "",
    activityLevel: "",
    medicalConditions: "",
    allergies: "",
    dietaryRestrictions: "",
  })

  // Nutrition Goal State
  const [nutritionGoal, setNutritionGoal] = useState("")

  // Diet Configuration State
  const [dietConfig, setDietConfig] = useState({
    dailyCalories: "",
    mealsPerDay: "",
    budgetLevel: "",
    dietStyle: "",
  })

  // AI Preferences State
  const [aiPreferences, setAiPreferences] = useState({
    includeFavorites: true,
    excludeDisliked: true,
    excludeAllergens: true,
    includeSupplements: false,
    generateShoppingList: true,
    generateRecipes: true,
    includeFoodPhotos: true,
  })

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2500))
    setIsGenerating(false)
    setIsGenerated(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            AI Diet Generator
          </h1>
          <p className="text-muted-foreground">
            Generate personalized nutrition plans using AI.
          </p>
        </div>

        {/* Patient Information */}
        <PatientInfoCard
          patientInfo={patientInfo}
          onPatientInfoChange={setPatientInfo}
        />

        {/* Nutrition Goal */}
        <NutritionGoalSection
          selectedGoal={nutritionGoal}
          onGoalChange={setNutritionGoal}
        />

        {/* Diet Configuration & AI Preferences */}
        <DietConfigSection
          config={dietConfig}
          onConfigChange={setDietConfig}
          aiPreferences={aiPreferences}
          onAiPreferencesChange={setAiPreferences}
        />

        {/* Generate Button */}
        <div className="flex justify-center py-4">
          <Button
            size="lg"
            className="h-14 gap-3 rounded-xl bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl disabled:opacity-70"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating Diet Plan...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Diet with AI
              </>
            )}
          </Button>
        </div>

        {/* Generated Content */}
        {isGenerated && (
          <>
            {/* Meal Plan Preview */}
            <MealPlanPreview isVisible={isGenerated} />

            {/* Shopping List & AI Suggestions Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              <ShoppingListPanel isVisible={isGenerated} />
              <AiSuggestionsPanel isVisible={isGenerated} />
            </div>

            {/* Food Substitution */}
            <FoodSubstitutionSection isVisible={isGenerated} />

            {/* Action Buttons */}
            <ActionButtons isVisible={isGenerated} isGenerating={isGenerating} />
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
