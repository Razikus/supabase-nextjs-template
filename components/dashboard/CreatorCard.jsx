import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function CreatorCard({ creator, isSelected, onSelectionChange, onCardClick }) {
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "YouTube":
        return "bg-red-100 text-red-800"
      case "Instagram":
        return "bg-pink-100 text-pink-800"
      case "TikTok":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <Card
      className={`transition-all duration-200 cursor-pointer ${isSelected ? "ring-2 ring-violet-500 bg-violet-50" : "hover:shadow-md"}`}
      onClick={onCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelectionChange(creator, checked)}
                className="rounded"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{creator.name}</h3>
              <p className="text-sm text-gray-500">{creator.location}</p>
            </div>
          </div>
          <Badge className={getPlatformColor(creator.channel_platform)}>{creator.channel_platform}</Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">{formatNumber(creator.subscribers)}</div>
            <div className="text-xs text-gray-500">Subscribers</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{formatNumber(creator.average_monthly_views)}</div>
            <div className="text-xs text-gray-500">Monthly Views</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{formatNumber(creator.average_monthly_engagement)}</div>
            <div className="text-xs text-gray-500">Engagement</div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <span className="text-sm text-gray-600">{creator.category}</span>
        </div>
      </CardContent>
    </Card>
  )
}