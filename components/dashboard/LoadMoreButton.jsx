"use client"

import { Button } from "@/components/ui/button"

export default function LoadMoreButton({ onLoadMore, hasMore, loading, totalShown, totalAvailable }) {
  if (!hasMore) {
    return (
      <div className="text-center py-36">
        <p className="text-gray-500">Showing all {totalShown} creators</p>
      </div>
    )
  }

  return (
    <div className="text-center pb-36">
      <Button
        onClick={onLoadMore}
        disabled={loading}
        className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>
        ) : (
          `Load More Creators (${totalShown} of ${totalAvailable})`
        )}
      </Button>
    </div>
  )
}
