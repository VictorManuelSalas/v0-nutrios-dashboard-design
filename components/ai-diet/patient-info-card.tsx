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
import { Textarea } from "@/components/ui/textarea"
import { User, Activity, AlertTriangle, Heart } from "lucide-react"

interface PatientInfo {
  name: string
  age: string
  gender: string
  weight: string
  height: string
  bmi: string
  bodyFat: string
  activityLevel: string
  medicalConditions: string
  allergies: string
  dietaryRestrictions: string
}

interface PatientInfoCardProps {
  patientInfo: PatientInfo
  onPatientInfoChange: (info: PatientInfo) => void
}

export function PatientInfoCard({
  patientInfo,
  onPatientInfoChange,
}: PatientInfoCardProps) {
  const updateField = (field: keyof PatientInfo, value: string) => {
    onPatientInfoChange({ ...patientInfo, [field]: value })
  }

  // Calculate BMI when weight or height changes
  const calculateBMI = (weight: string, height: string) => {
    const w = parseFloat(weight)
    const h = parseFloat(height) / 100 // convert cm to m
    if (w > 0 && h > 0) {
      return (w / (h * h)).toFixed(1)
    }
    return ""
  }

  const handleWeightChange = (value: string) => {
    updateField("weight", value)
    const newBMI = calculateBMI(value, patientInfo.height)
    if (newBMI) {
      onPatientInfoChange({ ...patientInfo, weight: value, bmi: newBMI })
    }
  }

  const handleHeightChange = (value: string) => {
    updateField("height", value)
    const newBMI = calculateBMI(patientInfo.weight, value)
    if (newBMI) {
      onPatientInfoChange({ ...patientInfo, height: value, bmi: newBMI })
    }
  }

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-primary" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="name">Patient Name</Label>
            <Input
              id="name"
              placeholder="Enter patient name"
              value={patientInfo.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Years"
              value={patientInfo.age}
              onChange={(e) => updateField("age", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={patientInfo.gender}
              onValueChange={(value) => updateField("gender", value)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select
              value={patientInfo.activityLevel}
              onValueChange={(value) => updateField("activityLevel", value)}
            >
              <SelectTrigger id="activity">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Lightly Active</SelectItem>
                <SelectItem value="moderate">Moderately Active</SelectItem>
                <SelectItem value="active">Very Active</SelectItem>
                <SelectItem value="athlete">Athlete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Body Metrics Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="kg"
              value={patientInfo.weight}
              onChange={(e) => handleWeightChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="cm"
              value={patientInfo.height}
              onChange={(e) => handleHeightChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bmi">BMI</Label>
            <div className="flex items-center gap-2">
              <Input
                id="bmi"
                placeholder="Auto-calculated"
                value={patientInfo.bmi}
                readOnly
                className="bg-muted/50"
              />
              {patientInfo.bmi && (
                <span
                  className={`rounded-md px-2 py-1 text-xs font-medium ${
                    parseFloat(patientInfo.bmi) < 18.5
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      : parseFloat(patientInfo.bmi) < 25
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : parseFloat(patientInfo.bmi) < 30
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {parseFloat(patientInfo.bmi) < 18.5
                    ? "Underweight"
                    : parseFloat(patientInfo.bmi) < 25
                      ? "Normal"
                      : parseFloat(patientInfo.bmi) < 30
                        ? "Overweight"
                        : "Obese"}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bodyFat">Body Fat %</Label>
            <Input
              id="bodyFat"
              type="number"
              placeholder="%"
              value={patientInfo.bodyFat}
              onChange={(e) => updateField("bodyFat", e.target.value)}
            />
          </div>
        </div>

        {/* Health Info Row */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="conditions" className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Medical Conditions
            </Label>
            <Textarea
              id="conditions"
              placeholder="e.g., Diabetes, Hypertension..."
              value={patientInfo.medicalConditions}
              onChange={(e) => updateField("medicalConditions", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allergies" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Allergies
            </Label>
            <Textarea
              id="allergies"
              placeholder="e.g., Nuts, Shellfish, Lactose..."
              value={patientInfo.allergies}
              onChange={(e) => updateField("allergies", e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="restrictions" className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Dietary Restrictions
            </Label>
            <Textarea
              id="restrictions"
              placeholder="e.g., No red meat, Low sodium..."
              value={patientInfo.dietaryRestrictions}
              onChange={(e) =>
                updateField("dietaryRestrictions", e.target.value)
              }
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
