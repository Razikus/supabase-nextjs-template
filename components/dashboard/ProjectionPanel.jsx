import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectionPanel({ projections, selectedCount, isMobile = false }) {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (isMobile) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
            <div className="text-lg font-bold text-violet-900">{formatNumber(projections.totalViews)}</div>
            <div className="text-xs text-gray-600">Monthly Views</div>
          </div>

          <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
            <div className="text-lg font-bold text-violet-900">{formatNumber(projections.totalEngagement)}</div>
            <div className="text-xs text-gray-600">Engagement</div>
          </div>

          <div className="bg-violet-50 rounded-lg p-3 border border-violet-200">
            <div className="text-lg font-bold text-violet-900">{formatNumber(projections.totalSubscribers)}</div>
            <div className="text-xs text-gray-600">Subscribers</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-violet-900">Projected Reach/Engagment</CardTitle>
          <p className="text-xs text-violet-600">
            {selectedCount} creator{selectedCount !== 1 ? "s" : ""} selected
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-white rounded-md p-2 border border-violet-100">
              <div className="text-lg font-bold text-violet-900">{formatNumber(projections.totalViews)}</div>
              <div className="text-xs text-gray-600">Total Monthly Views</div>
            </div>

            <div className="bg-white rounded-md p-2 border border-violet-100">
              <div className="text-lg font-bold text-violet-900">{formatNumber(projections.totalEngagement)}</div>
              <div className="text-xs text-gray-600">Total Engagement</div>
            </div>

            <div className="bg-white rounded-md p-2 border border-violet-100">
              <div className="text-lg font-bold text-violet-900">{formatNumber(projections.totalSubscribers)}</div>
              <div className="text-xs text-gray-600">Total Subscribers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}