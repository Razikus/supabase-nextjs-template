"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Link2 } from "lucide-react"

export default function CreatorTable({ creators, selectedCreators, onSelectionChange, onSort, sortBy, sortOrder, onRowClick }) {
  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(creators)
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectCreator = (creator, checked) => {
    if (checked) {
      onSelectionChange([...selectedCreators, creator])
    } else {
      onSelectionChange(selectedCreators.filter((c) => c.id !== creator.id))
    }
  }

  const isSelected = (creator) => selectedCreators.some((c) => c.id === creator.id)
  const isAllSelected = creators.length > 0 && selectedCreators.length === creators.length

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

  const SortButton = ({ field, children }) => (
    <button onClick={() => onSort(field)} className="flex items-center gap-1 hover:text-violet-600 transition-colors">
      {children}
      {sortBy === field && <span className="text-violet-600">{sortOrder === "asc" ? "↑" : "↓"}</span>}
    </button>
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} className="rounded" />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-violet-600">
                <SortButton field="name">Creator</SortButton>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-violet-600">
                <SortButton field="channel_platform">Platform</SortButton>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-violet-600">
                <SortButton field="subscribers">Subscribers</SortButton>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-violet-600">
                <SortButton field="average_monthly_views">Monthly Views</SortButton>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-violet-600">
                <SortButton field="average_monthly_engagement">Engagement</SortButton>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-violet-600">
                <SortButton field="video_count">Channel</SortButton>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {creators.map((creator) => (
              <tr
                key={creator.id}
                className={`hover:bg-gray-50 transition-colors cursor-pointer ${isSelected(creator) ? "bg-violet-50" : ""}`}
                onClick={() => onRowClick && onRowClick(creator)}
              >
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSelected(creator)}
                    onCheckedChange={(checked) => handleSelectCreator(creator, checked)}
                    className="rounded"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{creator.name}</span>
                    <span className="text-sm text-gray-500">{creator.location}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge className={getPlatformColor(creator.channel_platform)}>{creator.channel_platform}</Badge>
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">{formatNumber(creator.subscribers)}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">{formatNumber(creator.average_monthly_views)}</td>
                <td className="px-4 py-3 text-gray-900 font-medium">
                  {formatNumber(creator.average_monthly_engagement)}
                </td>
                <td className="px-4 py-3 text-violet-900 font-medium">
                  <a href={`${creator.channel_url}`} className="flex items-center gap-1 hover:text-violet-600 transition-colors" target="_blank" rel="noopener noreferrer">
                    <Link2 className="h-4 w-4 text-violet-600" />
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}