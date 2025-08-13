"use client"

import { useState, useEffect } from "react"
import { usePagination } from "@/hooks/usePagination"
import { useCreatorSelection } from "@/hooks/useCreatorSelection"
import { creatorService } from "@/services/creatorService"
import { Filter, ChevronUp } from "lucide-react"

import AdvancedFilterBar from "./AdvancedFilterBar"
import CreatorTable from "./CreatorTable"
import CreatorCard from "./CreatorCard"
import ProjectionPanel from "./ProjectionPanel"
import LoadMoreButton from "./LoadMoreButton"
import Header from "../ui/header"

export default function NewDashboard() {
  const [filterOptions, setFilterOptions] = useState({
    platforms: [],
    categories: [],
    locations: [],
  })
  const [viewMode, setViewMode] = useState("table") // 'table' or 'grid'
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showMobileProjection, setShowMobileProjection] = useState(false)

  const {
    creators,
    loading,
    hasMore,
    totalShown,
    totalAvailable,
    error,
    filters,
    advancedFilters,
    loadMore,
    updateFilters,
    updateAdvancedFilters,
    clearFilters,
  } = usePagination()

  const { selectedCreators, projections, handleSelectionChange, handleSelectCreator, isSelected } =
    useCreatorSelection()

  // Load filter options
  useEffect(() => {
    const loadFilterOptions = async () => {
      const options = await creatorService.getFilterOptions()
      setFilterOptions(options)
    }
    loadFilterOptions()
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-6 py-4">
          {/* Main Content - Responsive Layout */}
          <div className="flex flex-col xl:flex-row gap-4">
            {/* Left Column - Filters and Content */}
          <div className="flex-1 space-y-4">
            {/* Mobile Filter Toggle Button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                Apply Filters
              </button>
            </div>

            {/* Desktop Filters (always visible) or Mobile Filters (conditional) */}
            <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block`}>
              <AdvancedFilterBar
                search={filters.search}
                onSearchChange={(value) => updateFilters({ search: value })}
                platform={filters.platform}
                onPlatformChange={(value) => updateFilters({ platform: value })}
                category={filters.category}
                onCategoryChange={(value) => updateFilters({ category: value })}
                location={filters.location}
                onLocationChange={(value) => updateFilters({ location: value })}
                sortBy={filters.sortBy}
                onSortChange={(value) => updateFilters({ sortBy: value })}
                sortOrder={filters.sortOrder}
                onSortOrderChange={(value) => updateFilters({ sortOrder: value })}
                filterOptions={filterOptions}
                onClearFilters={clearFilters}
                onAdvancedFiltersChange={updateAdvancedFilters}
                advancedFilters={advancedFilters}
                isMobile={showMobileFilters}
                onMobileClose={() => setShowMobileFilters(false)}
              />
            </div>

            {/* Content */}
            {loading && creators.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600">Loading creators...</span>
                </div>
              </div>
            ) : creators.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-3">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-1">No creators found</h3>
                <p className="text-sm text-gray-600 mb-3">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-violet-600 text-white px-3 py-1.5 text-sm rounded-md hover:bg-violet-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Results Count and View Toggle */}
                <div className="flex items-center justify-between py-2">
                  <p className="text-xs text-gray-600">
                    {totalShown} of {totalAvailable} creators
                    {selectedCreators.length > 0 && (
                      <span className="ml-2 text-violet-600 font-medium">({selectedCreators.length} selected)</span>
                    )}
                  </p>
                  {/* Desktop View Toggle */}
                  <div className="hidden md:flex items-center gap-3">
                    <div className="flex bg-gray-100 rounded-md p-0.5">
                      <button
                        onClick={() => setViewMode("table")}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          viewMode === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Table
                      </button>
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Grid
                      </button>
                    </div>
                  </div>
                </div>

                {/* Table or Grid View - Mobile always grid, Desktop can toggle */}
                <div className="md:hidden">
                  {/* Mobile Grid View */}
                  <div className="grid grid-cols-1 gap-3 pb-20">
                    {creators.map((creator) => (
                      <CreatorCard
                        key={creator.id}
                        creator={creator}
                        isSelected={isSelected(creator)}
                        onSelectionChange={handleSelectCreator}
                        onCardClick={() => handleSelectCreator(creator, !isSelected(creator))}
                      />
                    ))}
                  </div>
                </div>

                <div className="hidden md:block">
                  {/* Desktop View */}
                  {viewMode === "table" ? (
                    <CreatorTable
                      creators={creators}
                      selectedCreators={selectedCreators}
                      onSelectionChange={handleSelectionChange}
                      onSort={(field) => updateFilters({ sortBy: field })}
                      sortBy={filters.sortBy}
                      sortOrder={filters.sortOrder}
                      onRowClick={(creator) => handleSelectCreator(creator, !isSelected(creator))}
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                      {creators.map((creator) => (
                        <CreatorCard
                          key={creator.id}
                          creator={creator}
                          isSelected={isSelected(creator)}
                          onSelectionChange={handleSelectCreator}
                          onCardClick={() => handleSelectCreator(creator, !isSelected(creator))}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Load More Button */}
                <LoadMoreButton
                  onLoadMore={loadMore}
                  hasMore={hasMore}
                  loading={loading}
                  totalShown={totalShown}
                  totalAvailable={totalAvailable}
                />
              </>
            )}
          </div>

          {/* Right Column - Desktop Projection Panel */}
          <div className="hidden xl:block xl:w-72 xl:flex-shrink-0">
            <div className="sticky top-4">
              <ProjectionPanel projections={projections} selectedCount={selectedCreators.length} />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Projection Panel */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
          {!showMobileProjection ? (
            <button
              onClick={() => setShowMobileProjection(true)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div>
                <div className="font-semibold text-gray-900">Reach Projection</div>
                <div className="text-sm text-gray-600">
                  {selectedCreators.length} creator{selectedCreators.length !== 1 ? "s" : ""} selected
                </div>
              </div>
              <ChevronUp className="h-5 w-5 text-gray-400" />
            </button>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              <div className="p-4">
                <button
                  onClick={() => setShowMobileProjection(false)}
                  className="w-full flex items-center justify-between mb-4 text-left"
                >
                  <div className="font-semibold text-gray-900">Reach Projection</div>
                  <ChevronUp className="h-5 w-5 text-gray-400 rotate-180" />
                </button>
                <ProjectionPanel 
                  projections={projections} 
                  selectedCount={selectedCreators.length} 
                  isMobile={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}