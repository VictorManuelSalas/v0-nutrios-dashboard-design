"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "High Risk", value: "high-risk" },
  { label: "Weight Loss", value: "weight-loss" },
  { label: "Muscle Gain", value: "muscle-gain" },
  { label: "Diabetes", value: "diabetes" },
  { label: "Hypertension", value: "hypertension" },
  { label: "New Patients", value: "new" },
  { label: "Upcoming Appt.", value: "upcoming" },
]

interface PatientsFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  activeFilter: string
  onFilterChange: (value: string) => void
  viewMode: "grid" | "table"
  onViewModeChange: (mode: "grid" | "table") => void
}

export function PatientsFilters({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
}: PatientsFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients by name, email, condition..."
            className="pl-9 bg-card border-border"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              viewMode === "grid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange("table")}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              viewMode === "table"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-all",
              activeFilter === filter.value
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}
