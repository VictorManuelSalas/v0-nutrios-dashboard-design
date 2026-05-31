"use client"

import { useState } from "react"
import { Search, Filter, LayoutGrid, List, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const filterOptions = [
  { id: "active", label: "Active", count: 186 },
  { id: "inactive", label: "Inactive", count: 62 },
  { id: "high-risk", label: "High Risk", count: 12 },
  { id: "weight-loss", label: "Weight Loss", count: 89 },
  { id: "muscle-gain", label: "Muscle Gain", count: 45 },
  { id: "diabetes", label: "Diabetes", count: 28 },
  { id: "hypertension", label: "Hypertension", count: 22 },
  { id: "new-patients", label: "New Patients", count: 24 },
  { id: "upcoming-appointment", label: "Upcoming Appointment", count: 34 },
]

interface PatientSearchFilterProps {
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeFilters: string[]
  setActiveFilters: (filters: string[]) => void
}

export function PatientSearchFilter({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  activeFilters,
  setActiveFilters,
}: PatientSearchFilterProps) {
  const [tempFilters, setTempFilters] = useState<string[]>(activeFilters)

  const handleFilterToggle = (filterId: string, checked: boolean) => {
    if (checked) {
      setTempFilters([...tempFilters, filterId])
    } else {
      setTempFilters(tempFilters.filter((f) => f !== filterId))
    }
  }

  const applyFilters = () => {
    setActiveFilters(tempFilters)
  }

  const clearFilters = () => {
    setTempFilters([])
    setActiveFilters([])
  }

  const removeFilter = (filterId: string) => {
    const newFilters = activeFilters.filter((f) => f !== filterId)
    setActiveFilters(newFilters)
    setTempFilters(newFilters)
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1 bg-primary text-primary-foreground">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {filterOptions.map((filter) => (
              <DropdownMenuCheckboxItem
                key={filter.id}
                checked={tempFilters.includes(filter.id)}
                onCheckedChange={(checked) => handleFilterToggle(filter.id, checked)}
              >
                <span className="flex-1">{filter.label}</span>
                <span className="text-xs text-muted-foreground">{filter.count}</span>
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <div className="flex gap-2 p-2">
              <Button size="sm" variant="outline" onClick={clearFilters} className="flex-1">
                Clear
              </Button>
              <Button size="sm" onClick={applyFilters} className="flex-1 bg-primary text-primary-foreground">
                Apply
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Mode Toggle */}
        <div className="flex border border-border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`rounded-none px-3 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={`rounded-none px-3 ${viewMode === "list" ? "bg-primary text-primary-foreground" : ""}`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filterId) => {
            const filter = filterOptions.find((f) => f.id === filterId)
            return filter ? (
              <Badge
                key={filterId}
                variant="secondary"
                className="gap-1 bg-primary/10 text-primary hover:bg-primary/20"
              >
                {filter.label}
                <button onClick={() => removeFilter(filterId)} className="ml-1">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ) : null
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 text-xs text-muted-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
