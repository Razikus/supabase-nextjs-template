"use client"

import { useState, useEffect, useCallback } from "react"
import { creatorService } from "@/services/creatorService"

export function usePagination(initialFilters = {}) {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [totalShown, setTotalShown] = useState(0)
  const [totalAvailable, setTotalAvailable] = useState(0)
  const [error, setError] = useState(null)

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    platform: "all",
    category: "all",
    location: "all",
    sortBy: "name",
    sortOrder: "asc",
    ...initialFilters,
  })

  const [advancedFilters, setAdvancedFilters] = useState({
    platforms: [],
    categories: [],
    subscriberMin: "",
    subscriberMax: "",
    viewsMin: "",
    viewsMax: "",
    engagementMin: "",
    engagementMax: "",
  })

  const loadCreators = useCallback(
    async (pageNum = 1, resetData = false) => {
      setLoading(true)
      setError(null)

      try {
        const options = {
          page: pageNum,
          limit: 50,
          search: filters.search,
          platform: filters.platform === "all" ? "" : filters.platform,
          category: filters.category === "all" ? "" : filters.category,
          location: filters.location === "all" ? "" : filters.location,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          platforms: advancedFilters.platforms,
          categories: advancedFilters.categories,
          subscriberMin: advancedFilters.subscriberMin,
          subscriberMax: advancedFilters.subscriberMax,
          viewsMin: advancedFilters.viewsMin,
          viewsMax: advancedFilters.viewsMax,
          engagementMin: advancedFilters.engagementMin,
          engagementMax: advancedFilters.engagementMax,
        }

        const result = await creatorService.getCreators(options)

        if (resetData || pageNum === 1) {
          setCreators(result.data)
          setTotalShown(result.data.length)
        } else {
          setCreators((prev) => [...prev, ...result.data])
          setTotalShown((prev) => prev + result.data.length)
        }

        setHasMore(result.hasMore)
        setTotalAvailable(result.total)
        setPage(pageNum)
      } catch (err) {
        setError(err.message)
        console.error("Error loading creators:", err)
      } finally {
        setLoading(false)
      }
    },
    [filters, advancedFilters],
  )

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadCreators(page + 1, false)
    }
  }, [loading, hasMore, page, loadCreators])

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setPage(1)
  }, [])

  const updateAdvancedFilters = useCallback((newAdvancedFilters) => {
    setAdvancedFilters((prev) => ({ ...prev, ...newAdvancedFilters }))
    setPage(1)
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      platform: "all",
      category: "all",
      location: "all",
      sortBy: "name",
      sortOrder: "asc",
    })
    setAdvancedFilters({
      platforms: [],
      categories: [],
      subscriberMin: "",
      subscriberMax: "",
      viewsMin: "",
      viewsMax: "",
      engagementMin: "",
      engagementMax: "",
    })
    setPage(1)
  }, [])

  const refresh = useCallback(() => {
    loadCreators(1, true)
  }, [loadCreators])

  // Load initial data and reload when filters change
  useEffect(() => {
    loadCreators(1, true)
  }, [
    filters.search,
    filters.platform,
    filters.category,
    filters.location,
    filters.sortBy,
    filters.sortOrder,
    advancedFilters.platforms,
    advancedFilters.categories,
    advancedFilters.subscriberMin,
    advancedFilters.subscriberMax,
    advancedFilters.viewsMin,
    advancedFilters.viewsMax,
    advancedFilters.engagementMin,
    advancedFilters.engagementMax,
  ])

  return {
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
    refresh,
  }
}
