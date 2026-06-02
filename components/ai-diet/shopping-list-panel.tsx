"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Carrot, Apple, Beef, Milk, Wheat, Droplets, Pill } from "lucide-react"

interface ShoppingCategory {
  name: string
  icon: React.ComponentType<{ className?: string }>
  items: { name: string; quantity: string }[]
  color: string
}

const shoppingCategories: ShoppingCategory[] = [
  {
    name: "Vegetables",
    icon: Carrot,
    color: "text-green-500",
    items: [
      { name: "Broccoli", quantity: "500g" },
      { name: "Spinach", quantity: "300g" },
      { name: "Bell Peppers", quantity: "4 pieces" },
      { name: "Zucchini", quantity: "3 pieces" },
      { name: "Cherry Tomatoes", quantity: "400g" },
      { name: "Cucumber", quantity: "2 pieces" },
      { name: "Asparagus", quantity: "1 bunch" },
      { name: "Kale", quantity: "200g" },
    ],
  },
  {
    name: "Fruits",
    icon: Apple,
    color: "text-red-500",
    items: [
      { name: "Bananas", quantity: "7 pieces" },
      { name: "Blueberries", quantity: "500g" },
      { name: "Strawberries", quantity: "400g" },
      { name: "Apples", quantity: "5 pieces" },
      { name: "Avocados", quantity: "4 pieces" },
      { name: "Lemons", quantity: "3 pieces" },
    ],
  },
  {
    name: "Proteins",
    icon: Beef,
    color: "text-amber-600",
    items: [
      { name: "Chicken Breast", quantity: "1.5kg" },
      { name: "Atlantic Salmon", quantity: "800g" },
      { name: "Lean Beef", quantity: "600g" },
      { name: "Turkey Breast", quantity: "400g" },
      { name: "Eggs", quantity: "18 pieces" },
      { name: "Shrimp", quantity: "500g" },
      { name: "Sea Bass", quantity: "400g" },
    ],
  },
  {
    name: "Dairy",
    icon: Milk,
    color: "text-blue-400",
    items: [
      { name: "Greek Yogurt", quantity: "1kg" },
      { name: "Cottage Cheese", quantity: "500g" },
      { name: "Feta Cheese", quantity: "200g" },
      { name: "Parmesan", quantity: "150g" },
      { name: "Almond Milk", quantity: "2L" },
    ],
  },
  {
    name: "Grains",
    icon: Wheat,
    color: "text-yellow-600",
    items: [
      { name: "Quinoa", quantity: "500g" },
      { name: "Brown Rice", quantity: "1kg" },
      { name: "Whole Grain Bread", quantity: "1 loaf" },
      { name: "Whole Wheat Pasta", quantity: "500g" },
      { name: "Oats", quantity: "500g" },
      { name: "Granola", quantity: "400g" },
    ],
  },
  {
    name: "Healthy Fats",
    icon: Droplets,
    color: "text-emerald-500",
    items: [
      { name: "Olive Oil", quantity: "500ml" },
      { name: "Almond Butter", quantity: "300g" },
      { name: "Peanut Butter", quantity: "300g" },
      { name: "Mixed Nuts", quantity: "400g" },
      { name: "Chia Seeds", quantity: "200g" },
      { name: "Flax Seeds", quantity: "200g" },
    ],
  },
  {
    name: "Supplements",
    icon: Pill,
    color: "text-purple-500",
    items: [
      { name: "Whey Protein", quantity: "1 container" },
      { name: "Vitamin D", quantity: "1 bottle" },
      { name: "Omega-3 Fish Oil", quantity: "1 bottle" },
      { name: "Multivitamin", quantity: "1 bottle" },
    ],
  },
]

interface ShoppingListPanelProps {
  isVisible: boolean
}

export function ShoppingListPanel({ isVisible }: ShoppingListPanelProps) {
  if (!isVisible) return null

  const totalItems = shoppingCategories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  )

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Shopping List
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {totalItems} items
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {shoppingCategories.map((category) => (
              <div
                key={category.name}
                className="rounded-lg border border-border/50 p-3"
              >
                <div className="mb-3 flex items-center gap-2">
                  <category.icon className={`h-4 w-4 ${category.color}`} />
                  <h4 className="font-medium text-foreground">
                    {category.name}
                  </h4>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {category.items.length}
                  </Badge>
                </div>
                <div className="grid gap-2">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md bg-muted/30 px-3 py-2 text-sm"
                    >
                      <span className="text-foreground">{item.name}</span>
                      <span className="font-medium text-primary">
                        {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
