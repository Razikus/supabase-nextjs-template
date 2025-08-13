"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, ArrowUpDown, Users, ChevronDown, ChevronLeft } from "lucide-react"

// Custom Select Component
function CustomSelect({ value, onValueChange, children, placeholder = "Select option", className = "" }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (selectedValue) => {
    onValueChange(selectedValue)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    const sortOptions = {
      name: "Name",
      subscribers: "Subscribers",
      average_monthly_views: "Monthly Views",
      average_monthly_engagement: "Engagement",
      channel_platform: "Platform"
    }
    return sortOptions[value] || placeholder
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-11 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 shadow-sm focus:ring-blue-500 ${className}`}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {getDisplayText()}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="py-1">
            <button
              type="button"
              onClick={() => handleSelect("name")}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:border-blue-500 focus:ring-blue-100"
            >
              Name
            </button>
            <button
              type="button"
              onClick={() => handleSelect("subscribers")}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100"
            >
              Subscribers
            </button>
            <button
              type="button"
              onClick={() => handleSelect("average_monthly_views")}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100"
            >
              Monthly Views
            </button>
            <button
              type="button"
              onClick={() => handleSelect("average_monthly_engagement")}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100"
            >
              Engagement
            </button>
            <button
              type="button"
              onClick={() => handleSelect("channel_platform")}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100"
            >
              Platform
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdvancedFilterBar({
  search,
  onSearchChange,
  platform,
  onPlatformChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  filterOptions,
  onClearFilters,
  onAdvancedFiltersChange,
  advancedFilters = {},
  isMobile = false,
  onMobileClose,
}) {
  const [selectedPlatforms, setSelectedPlatforms] = useState(advancedFilters.platforms || [])
  const [subscriberRange, setSubscriberRange] = useState({
    min: advancedFilters.subscriberMin || "",
    max: advancedFilters.subscriberMax || "",
  })
  const [viewsRange, setViewsRange] = useState({
    min: advancedFilters.viewsMin || "",
    max: advancedFilters.viewsMax || "",
  })
  const [engagementRange, setEngagementRange] = useState({
    min: advancedFilters.engagementMin || "",
    max: advancedFilters.engagementMax || "",
  })

  const hasActiveFilters =
    search ||
    platform !== "all" ||
    selectedPlatforms.length > 0 ||
    subscriberRange.min ||
    subscriberRange.max ||
    viewsRange.min ||
    viewsRange.max ||
    engagementRange.min ||
    engagementRange.max

  const handlePlatformToggle = (platformName, checked) => {
    const newPlatforms = checked
      ? [...selectedPlatforms, platformName]
      : selectedPlatforms.filter((p) => p !== platformName)
    setSelectedPlatforms(newPlatforms)
    onAdvancedFiltersChange({ platforms: newPlatforms })
  }

  const handleRangeChange = (type, field, value) => {
    const numValue = value === "" ? "" : Number.parseInt(value.replace(/,/g, ""))
    if (type === "subscribers") {
      const newRange = { ...subscriberRange, [field]: numValue }
      setSubscriberRange(newRange)
      onAdvancedFiltersChange({
        subscriberMin: newRange.min,
        subscriberMax: newRange.max,
      })
    } else if (type === "views") {
      const newRange = { ...viewsRange, [field]: numValue }
      setViewsRange(newRange)
      onAdvancedFiltersChange({
        viewsMin: newRange.min,
        viewsMax: newRange.max,
      })
    } else if (type === "engagement") {
      const newRange = { ...engagementRange, [field]: numValue }
      setEngagementRange(newRange)
      onAdvancedFiltersChange({
        engagementMin: newRange.min,
        engagementMax: newRange.max,
      })
    }
  }

  const formatNumberInput = (value) => {
    if (value === "") return ""
    return Number.parseInt(value).toLocaleString()
  }

  const clearAllFilters = () => {
    setSelectedPlatforms([])
    setSubscriberRange({ min: "", max: "" })
    setViewsRange({ min: "", max: "" })
    setEngagementRange({ min: "", max: "" })
    onClearFilters()
    onAdvancedFiltersChange({})
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (search) count++
    if (platform !== "all") count++
    if (selectedPlatforms.length > 0) count++
    if (subscriberRange.min || subscriberRange.max) count++
    if (viewsRange.min || viewsRange.max) count++
    if (engagementRange.min || engagementRange.max) count++
    return count
  }

  const handleApplyFilters = () => {
    if (onMobileClose) {
      onMobileClose()
    }
  }

  // Mobile view with overlay
  if (isMobile) {
    return (
      <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
        <div className="bg-white h-full overflow-y-auto">
          {/* Mobile Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onMobileClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold">Filters</h2>
              {getActiveFilterCount() > 0 && (
                <Badge className="bg-blue-600 text-white text-xs">
                  {getActiveFilterCount()} active
                </Badge>
              )}
            </div>
            <Button 
              onClick={handleApplyFilters}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Apply
            </Button>
          </div>

          <div className="p-4 space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Search Creators</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search creators or platforms..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Sort By</label>
                <CustomSelect 
                  value={sortBy} 
                  onValueChange={onSortChange}
                  placeholder="Select sort option"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Sort Order</label>
                <Button
                  variant="outline"
                  onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
                  className="w-full h-11 justify-start border-gray-300 hover:border-blue-500"
                >
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                </Button>
              </div>
            </div>

            {/* Platform Multi-Select */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Platforms
              </h4>
              <div className="space-y-3">
                {filterOptions.platforms && filterOptions.platforms.length > 0 ? (
                  filterOptions.platforms.map((platformName) => (
                    <div key={platformName} className="flex items-center justify-between py-2">
                      <label 
                        htmlFor={`platform-${platformName}`} 
                        className="text-sm text-gray-700"
                      >
                        {platformName}
                      </label>
                      <Checkbox
                        id={`platform-${platformName}`}
                        checked={selectedPlatforms.includes(platformName)}
                        onCheckedChange={(checked) => handlePlatformToggle(platformName, checked)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-500 py-4">
                    No platforms available
                  </div>
                )}
              </div>
            </div>

            {/* Range Filters */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700">Number Ranges</h4>
              
              {/* Subscriber Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-600">Subscribers Range</label>
                <div className="space-y-2">
                  <Input
                    placeholder="Minimum subscribers"
                    value={formatNumberInput(subscriberRange.min)}
                    onChange={(e) => handleRangeChange("subscribers", "min", e.target.value)}
                    className="border-gray-300"
                  />
                  <Input
                    placeholder="Maximum subscribers"
                    value={formatNumberInput(subscriberRange.max)}
                    onChange={(e) => handleRangeChange("subscribers", "max", e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </div>

              {/* Views Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-600">Monthly Views Range</label>
                <div className="space-y-2">
                  <Input
                    placeholder="Minimum views"
                    value={formatNumberInput(viewsRange.min)}
                    onChange={(e) => handleRangeChange("views", "min", e.target.value)}
                    className="border-gray-300"
                  />
                  <Input
                    placeholder="Maximum views"
                    value={formatNumberInput(viewsRange.max)}
                    onChange={(e) => handleRangeChange("views", "max", e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </div>

              {/* Engagement Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-600">Engagement Range</label>
                <div className="space-y-2">
                  <Input
                    placeholder="Minimum engagement"
                    value={formatNumberInput(engagementRange.min)}
                    onChange={(e) => handleRangeChange("engagement", "min", e.target.value)}
                    className="border-gray-300"
                  />
                  <Input
                    placeholder="Maximum engagement"
                    value={formatNumberInput(engagementRange.max)}
                    onChange={(e) => handleRangeChange("engagement", "max", e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={clearAllFilters} 
                className="w-full flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
              >
                <X className="h-4 w-4" />
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Desktop view (original layout)
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-violet-900">
            <Filter className="h-5 w-5 text-violet-600" />
            Filters & Search
            {getActiveFilterCount() > 0 && (
              <Badge className="ml-2 bg-blue-600 text-white text-xs">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </CardTitle>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllFilters} 
              className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700"
            >
              <X className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search and Sort Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Search Creators</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search creators or platforms..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Sort By</label>
            <CustomSelect 
              value={sortBy} 
              onValueChange={onSortChange}
              placeholder="Select sort option"
            />
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Sort Order</label>
            <Button
              variant="outline"
              onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
              className="w-full h-11 justify-start border-gray-300 hover:border-blue-500"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </Button>
          </div>
        </div>

        {/* Platform Multi-Select */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Platforms (Select Multiple)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 py-4">
            {filterOptions.platforms && filterOptions.platforms.length > 0 ? (
              filterOptions.platforms.map((platformName) => (
                <div key={platformName} className="flex items-center space-x-2">
                  <Checkbox
                    id={`platform-${platformName}`}
                    checked={selectedPlatforms.includes(platformName)}
                    onCheckedChange={(checked) => handlePlatformToggle(platformName, checked)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label 
                    htmlFor={`platform-${platformName}`} 
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    {platformName}
                  </label>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-sm text-gray-500 py-4">
                No platforms available
              </div>
            )}
          </div>
        </div>

        {/* Range Filters */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700">Number Ranges</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subscriber Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-600">Subscribers Range</label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Min"
                  value={formatNumberInput(subscriberRange.min)}
                  onChange={(e) => handleRangeChange("subscribers", "min", e.target.value)}
                  className="text-sm border-gray-300"
                />
                <span className="text-gray-500 text-sm font-medium">to</span>
                <Input
                  placeholder="Max"
                  value={formatNumberInput(subscriberRange.max)}
                  onChange={(e) => handleRangeChange("subscribers", "max", e.target.value)}
                  className="text-sm border-gray-300"
                />
              </div>
            </div>

            {/* Views Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-600">Monthly Views Range</label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Min"
                  value={formatNumberInput(viewsRange.min)}
                  onChange={(e) => handleRangeChange("views", "min", e.target.value)}
                  className="text-sm border-gray-300"
                />
                <span className="text-gray-500 text-sm font-medium">to</span>
                <Input
                  placeholder="Max"
                  value={formatNumberInput(viewsRange.max)}
                  onChange={(e) => handleRangeChange("views", "max", e.target.value)}
                  className="text-sm border-gray-300"
                />
              </div>
            </div>

            {/* Engagement Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-600">Engagement Range</label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Min"
                  value={formatNumberInput(engagementRange.min)}
                  onChange={(e) => handleRangeChange("engagement", "min", e.target.value)}
                  className="text-sm border-gray-300"
                />
                <span className="text-gray-500 text-sm font-medium">to</span>
                <Input
                  placeholder="Max"
                  value={formatNumberInput(engagementRange.max)}
                  onChange={(e) => handleRangeChange("engagement", "max", e.target.value)}
                  className="text-sm border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {search && (
                <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
                  Search: {search}
                </Badge>
              )}
              {platform !== "all" && (
                <Badge className="bg-green-100 text-green-800 border border-green-200">
                  Platform: {platform}
                </Badge>
              )}
              {selectedPlatforms.map((p) => (
                <Badge key={p} className="bg-purple-100 text-purple-800 border border-purple-200">
                  Platform: {p}
                </Badge>
              ))}
              {(subscriberRange.min || subscriberRange.max) && (
                <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
                  Subscribers: {formatNumberInput(subscriberRange.min) || "0"} -{" "}
                  {formatNumberInput(subscriberRange.max) || "∞"}
                </Badge>
              )}
              {(viewsRange.min || viewsRange.max) && (
                <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
                  Views: {formatNumberInput(viewsRange.min) || "0"} - {formatNumberInput(viewsRange.max) || "∞"}
                </Badge>
              )}
              {(engagementRange.min || engagementRange.max) && (
                <Badge className="bg-pink-100 text-pink-800 border border-pink-200">
                  Engagement: {formatNumberInput(engagementRange.min) || "0"} -{" "}
                  {formatNumberInput(engagementRange.max) || "∞"}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}