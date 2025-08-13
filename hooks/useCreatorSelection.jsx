"use client"

import { useState, useMemo } from "react"
import { creatorService } from "@/services/creatorService"

export function useCreatorSelection() {
  const [selectedCreators, setSelectedCreators] = useState([])

  const projections = useMemo(() => {
    return creatorService.calculateProjections(selectedCreators)
  }, [selectedCreators])

  const handleSelectionChange = (newSelection) => {
    setSelectedCreators(newSelection)
  }

  const handleSelectCreator = (creator, checked) => {
    if (checked) {
      setSelectedCreators((prev) => [...prev, creator])
    } else {
      setSelectedCreators((prev) => prev.filter((c) => c.id !== creator.id))
    }
  }

  const clearSelection = () => {
    setSelectedCreators([])
  }

  const isSelected = (creator) => {
    return selectedCreators.some((c) => c.id === creator.id)
  }

  return {
    selectedCreators,
    projections,
    handleSelectionChange,
    handleSelectCreator,
    clearSelection,
    isSelected,
  }
}
