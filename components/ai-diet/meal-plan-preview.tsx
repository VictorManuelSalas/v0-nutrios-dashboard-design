"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Utensils, Flame, Dumbbell, Wheat, Droplets, RefreshCcw } from "lucide-react"

interface Meal {
  id: string
  name: string
  time: string
  image: string
  ingredients: string[]
  portions: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface DayPlan {
  day: string
  meals: Meal[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

// Sample data for the meal plan
const sampleMealPlan: DayPlan[] = [
  {
    day: "Monday",
    meals: [
      {
        id: "m1",
        name: "Greek Yogurt Parfait",
        time: "7:00 AM",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop",
        ingredients: ["Greek yogurt", "Mixed berries", "Granola", "Honey", "Chia seeds"],
        portions: "1 bowl (350g)",
        calories: 380,
        protein: 18,
        carbs: 45,
        fat: 12,
      },
      {
        id: "m2",
        name: "Grilled Chicken Salad",
        time: "12:30 PM",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
        ingredients: ["Grilled chicken", "Mixed greens", "Cherry tomatoes", "Cucumber", "Olive oil dressing"],
        portions: "1 large bowl (400g)",
        calories: 520,
        protein: 42,
        carbs: 18,
        fat: 28,
      },
      {
        id: "m3",
        name: "Salmon with Quinoa",
        time: "7:00 PM",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop",
        ingredients: ["Atlantic salmon", "Quinoa", "Steamed broccoli", "Lemon butter sauce"],
        portions: "1 plate (450g)",
        calories: 650,
        protein: 45,
        carbs: 35,
        fat: 32,
      },
      {
        id: "m4",
        name: "Protein Smoothie",
        time: "4:00 PM",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&h=200&fit=crop",
        ingredients: ["Whey protein", "Banana", "Almond milk", "Peanut butter"],
        portions: "1 glass (400ml)",
        calories: 350,
        protein: 28,
        carbs: 32,
        fat: 12,
      },
    ],
    totalCalories: 1900,
    totalProtein: 133,
    totalCarbs: 130,
    totalFat: 84,
  },
  {
    day: "Tuesday",
    meals: [
      {
        id: "t1",
        name: "Avocado Toast with Eggs",
        time: "7:00 AM",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&h=200&fit=crop",
        ingredients: ["Whole grain bread", "Avocado", "Poached eggs", "Cherry tomatoes", "Microgreens"],
        portions: "2 slices (280g)",
        calories: 420,
        protein: 20,
        carbs: 35,
        fat: 24,
      },
      {
        id: "t2",
        name: "Turkey Wrap",
        time: "12:30 PM",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop",
        ingredients: ["Whole wheat wrap", "Turkey breast", "Hummus", "Spinach", "Bell peppers"],
        portions: "1 large wrap (300g)",
        calories: 480,
        protein: 35,
        carbs: 42,
        fat: 18,
      },
      {
        id: "t3",
        name: "Beef Stir-Fry",
        time: "7:00 PM",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop",
        ingredients: ["Lean beef strips", "Brown rice", "Mixed vegetables", "Ginger soy sauce"],
        portions: "1 plate (450g)",
        calories: 580,
        protein: 40,
        carbs: 48,
        fat: 22,
      },
      {
        id: "t4",
        name: "Mixed Nuts & Fruit",
        time: "4:00 PM",
        image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=200&fit=crop",
        ingredients: ["Almonds", "Walnuts", "Dried apricots", "Dark chocolate chips"],
        portions: "1 small bowl (80g)",
        calories: 320,
        protein: 10,
        carbs: 25,
        fat: 22,
      },
    ],
    totalCalories: 1800,
    totalProtein: 105,
    totalCarbs: 150,
    totalFat: 86,
  },
  {
    day: "Wednesday",
    meals: [
      {
        id: "w1",
        name: "Oatmeal Power Bowl",
        time: "7:00 AM",
        image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=300&h=200&fit=crop",
        ingredients: ["Steel-cut oats", "Banana", "Almond butter", "Cinnamon", "Walnuts"],
        portions: "1 bowl (350g)",
        calories: 450,
        protein: 15,
        carbs: 55,
        fat: 18,
      },
      {
        id: "w2",
        name: "Mediterranean Bowl",
        time: "12:30 PM",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
        ingredients: ["Falafel", "Hummus", "Tabbouleh", "Pita bread", "Tzatziki"],
        portions: "1 bowl (420g)",
        calories: 550,
        protein: 22,
        carbs: 60,
        fat: 24,
      },
      {
        id: "w3",
        name: "Grilled Sea Bass",
        time: "7:00 PM",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=200&fit=crop",
        ingredients: ["Sea bass fillet", "Sweet potato", "Asparagus", "Lemon herb sauce"],
        portions: "1 plate (400g)",
        calories: 520,
        protein: 38,
        carbs: 35,
        fat: 24,
      },
      {
        id: "w4",
        name: "Greek Yogurt",
        time: "4:00 PM",
        image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=300&h=200&fit=crop",
        ingredients: ["Greek yogurt", "Honey", "Pistachios"],
        portions: "1 cup (200g)",
        calories: 280,
        protein: 18,
        carbs: 22,
        fat: 12,
      },
    ],
    totalCalories: 1800,
    totalProtein: 93,
    totalCarbs: 172,
    totalFat: 78,
  },
  {
    day: "Thursday",
    meals: [
      {
        id: "th1",
        name: "Egg White Omelette",
        time: "7:00 AM",
        image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=300&h=200&fit=crop",
        ingredients: ["Egg whites", "Spinach", "Feta cheese", "Tomatoes", "Whole grain toast"],
        portions: "1 plate (320g)",
        calories: 350,
        protein: 28,
        carbs: 25,
        fat: 14,
      },
      {
        id: "th2",
        name: "Poke Bowl",
        time: "12:30 PM",
        image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=300&h=200&fit=crop",
        ingredients: ["Sushi-grade tuna", "Sushi rice", "Edamame", "Avocado", "Seaweed"],
        portions: "1 bowl (400g)",
        calories: 580,
        protein: 35,
        carbs: 55,
        fat: 22,
      },
      {
        id: "th3",
        name: "Herb Roasted Chicken",
        time: "7:00 PM",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=200&fit=crop",
        ingredients: ["Chicken breast", "Roasted vegetables", "Herb butter", "Couscous"],
        portions: "1 plate (450g)",
        calories: 620,
        protein: 48,
        carbs: 38,
        fat: 28,
      },
      {
        id: "th4",
        name: "Cottage Cheese Bowl",
        time: "4:00 PM",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=200&fit=crop",
        ingredients: ["Cottage cheese", "Pineapple", "Flax seeds"],
        portions: "1 bowl (250g)",
        calories: 250,
        protein: 22,
        carbs: 18,
        fat: 8,
      },
    ],
    totalCalories: 1800,
    totalProtein: 133,
    totalCarbs: 136,
    totalFat: 72,
  },
  {
    day: "Friday",
    meals: [
      {
        id: "f1",
        name: "Smoothie Bowl",
        time: "7:00 AM",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300&h=200&fit=crop",
        ingredients: ["Acai", "Banana", "Blueberries", "Granola", "Coconut flakes"],
        portions: "1 bowl (380g)",
        calories: 420,
        protein: 12,
        carbs: 65,
        fat: 14,
      },
      {
        id: "f2",
        name: "Quinoa Buddha Bowl",
        time: "12:30 PM",
        image: "https://images.unsplash.com/photo-1540914124281-342587941389?w=300&h=200&fit=crop",
        ingredients: ["Quinoa", "Chickpeas", "Kale", "Sweet potato", "Tahini dressing"],
        portions: "1 bowl (420g)",
        calories: 520,
        protein: 20,
        carbs: 62,
        fat: 22,
      },
      {
        id: "f3",
        name: "Shrimp Pasta",
        time: "7:00 PM",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&h=200&fit=crop",
        ingredients: ["Whole wheat pasta", "Grilled shrimp", "Garlic", "Olive oil", "Parmesan"],
        portions: "1 plate (400g)",
        calories: 580,
        protein: 35,
        carbs: 58,
        fat: 22,
      },
      {
        id: "f4",
        name: "Apple with Almond Butter",
        time: "4:00 PM",
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&h=200&fit=crop",
        ingredients: ["Apple", "Almond butter"],
        portions: "1 apple + 2 tbsp",
        calories: 280,
        protein: 6,
        carbs: 32,
        fat: 16,
      },
    ],
    totalCalories: 1800,
    totalProtein: 73,
    totalCarbs: 217,
    totalFat: 74,
  },
  {
    day: "Saturday",
    meals: [
      {
        id: "s1",
        name: "Pancake Stack",
        time: "8:00 AM",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop",
        ingredients: ["Protein pancakes", "Fresh berries", "Maple syrup", "Greek yogurt"],
        portions: "3 pancakes (300g)",
        calories: 480,
        protein: 25,
        carbs: 55,
        fat: 18,
      },
      {
        id: "s2",
        name: "Chicken Caesar Wrap",
        time: "1:00 PM",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=200&fit=crop",
        ingredients: ["Grilled chicken", "Romaine lettuce", "Caesar dressing", "Parmesan", "Whole wheat wrap"],
        portions: "1 large wrap (350g)",
        calories: 520,
        protein: 38,
        carbs: 35,
        fat: 26,
      },
      {
        id: "s3",
        name: "Lamb Chops",
        time: "7:30 PM",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
        ingredients: ["Lamb chops", "Mashed potatoes", "Green beans", "Mint sauce"],
        portions: "1 plate (450g)",
        calories: 680,
        protein: 42,
        carbs: 35,
        fat: 40,
      },
      {
        id: "s4",
        name: "Protein Bar",
        time: "4:00 PM",
        image: "https://images.unsplash.com/photo-1622484211148-c5b6b7b0c8b9?w=300&h=200&fit=crop",
        ingredients: ["Protein bar"],
        portions: "1 bar (60g)",
        calories: 220,
        protein: 20,
        carbs: 22,
        fat: 8,
      },
    ],
    totalCalories: 1900,
    totalProtein: 125,
    totalCarbs: 147,
    totalFat: 92,
  },
  {
    day: "Sunday",
    meals: [
      {
        id: "su1",
        name: "Eggs Benedict",
        time: "9:00 AM",
        image: "https://images.unsplash.com/photo-1608039829572-9b8d0fdd6a53?w=300&h=200&fit=crop",
        ingredients: ["English muffin", "Poached eggs", "Canadian bacon", "Hollandaise sauce"],
        portions: "1 serving (280g)",
        calories: 520,
        protein: 25,
        carbs: 30,
        fat: 32,
      },
      {
        id: "su2",
        name: "Grilled Vegetable Platter",
        time: "1:00 PM",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
        ingredients: ["Zucchini", "Bell peppers", "Eggplant", "Halloumi cheese", "Balsamic glaze"],
        portions: "1 platter (400g)",
        calories: 420,
        protein: 18,
        carbs: 28,
        fat: 26,
      },
      {
        id: "su3",
        name: "Roast Beef Dinner",
        time: "6:30 PM",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
        ingredients: ["Roast beef", "Roasted potatoes", "Yorkshire pudding", "Gravy", "Carrots"],
        portions: "1 plate (500g)",
        calories: 720,
        protein: 48,
        carbs: 45,
        fat: 38,
      },
      {
        id: "su4",
        name: "Fruit Salad",
        time: "4:00 PM",
        image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=300&h=200&fit=crop",
        ingredients: ["Mixed seasonal fruits", "Mint", "Lime zest"],
        portions: "1 bowl (250g)",
        calories: 140,
        protein: 2,
        carbs: 35,
        fat: 0,
      },
    ],
    totalCalories: 1800,
    totalProtein: 93,
    totalCarbs: 138,
    totalFat: 96,
  },
]

interface MealPlanPreviewProps {
  isVisible: boolean
}

export function MealPlanPreview({ isVisible }: MealPlanPreviewProps) {
  const [selectedDay, setSelectedDay] = useState("Monday")

  if (!isVisible) return null

  const currentDayPlan = sampleMealPlan.find((d) => d.day === selectedDay)

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Weekly Meal Plan Preview
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            AI Generated
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={selectedDay} onValueChange={setSelectedDay}>
          <TabsList className="grid w-full grid-cols-7">
            {sampleMealPlan.map((day) => (
              <TabsTrigger
                key={day.day}
                value={day.day}
                className="text-xs sm:text-sm"
              >
                {day.day.slice(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>

          {sampleMealPlan.map((dayPlan) => (
            <TabsContent key={dayPlan.day} value={dayPlan.day} className="mt-4">
              {/* Daily Summary */}
              <div className="mb-4 grid grid-cols-4 gap-3">
                <div className="rounded-lg bg-primary/5 p-3 text-center dark:bg-primary/10">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="mt-1 text-lg font-bold text-foreground">
                    {dayPlan.totalCalories}
                  </p>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-3 text-center dark:bg-primary/10">
                  <div className="flex items-center justify-center gap-1">
                    <Dumbbell className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="mt-1 text-lg font-bold text-foreground">
                    {dayPlan.totalProtein}g
                  </p>
                  <p className="text-xs text-muted-foreground">Protein</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-3 text-center dark:bg-primary/10">
                  <div className="flex items-center justify-center gap-1">
                    <Wheat className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="mt-1 text-lg font-bold text-foreground">
                    {dayPlan.totalCarbs}g
                  </p>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-3 text-center dark:bg-primary/10">
                  <div className="flex items-center justify-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="mt-1 text-lg font-bold text-foreground">
                    {dayPlan.totalFat}g
                  </p>
                  <p className="text-xs text-muted-foreground">Fat</p>
                </div>
              </div>

              {/* Meals Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {dayPlan.meals.map((meal) => (
                  <div
                    key={meal.id}
                    className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute right-2 top-2">
                        <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
                          {meal.time}
                        </Badge>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {meal.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {meal.portions}
                          </p>
                        </div>
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {meal.ingredients.slice(0, 3).map((ingredient, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            {ingredient}
                          </Badge>
                        ))}
                        {meal.ingredients.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{meal.ingredients.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="mt-3 grid grid-cols-4 gap-2 border-t border-border/50 pt-3">
                        <div className="text-center">
                          <p className="text-sm font-semibold text-foreground">
                            {meal.calories}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            kcal
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-red-500">
                            {meal.protein}g
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            protein
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-amber-500">
                            {meal.carbs}g
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            carbs
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-blue-500">
                            {meal.fat}g
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            fat
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
