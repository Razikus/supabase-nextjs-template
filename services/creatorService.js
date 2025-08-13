import { createClient } from "@/lib/supabase-client"

class CreatorService {
  constructor() {
    this.supabase = createClient()
    this.isSupabaseConfigured = this.checkSupabaseConfig()
  }

  checkSupabaseConfig() {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      return url && key && url !== "your-supabase-url" && key !== "your-supabase-anon-key"
    } catch {
      return false
    }
  }

  async getCreators(options = {}) {
    const {
      page = 1,
      limit = 50,
      search = "",
      platform = "",
      sortBy = "name",
      sortOrder = "asc",
      platforms = [],
      subscriberMin = "",
      subscriberMax = "",
      viewsMin = "",
      viewsMax = "",
      engagementMin = "",
      engagementMax = "",
    } = options

    try {
      if (!this.isSupabaseConfigured) {
        return {
          data: [],
          hasMore: false,
          total: 0,
          error: "Supabase not configured",
        }
      }

      let query = this.supabase
        .from("creators")
        .select(
          "id, name, channel_platform, channel_url, average_monthly_views, average_monthly_engagement, subscribers",
          { count: 'exact' } // This is the key addition - request exact count
        )

      // Apply filters
      if (search) {
        query = query.or(`name.ilike.%${search}%,channel_platform.ilike.%${search}%`)
      }

      if (platform) {
        query = query.eq("channel_platform", platform)
      }

      if (platforms.length > 0) {
        query = query.in("channel_platform", platforms)
      }

      if (subscriberMin !== "") {
        query = query.gte("subscribers", Number.parseInt(subscriberMin))
      }

      if (subscriberMax !== "") {
        query = query.lte("subscribers", Number.parseInt(subscriberMax))
      }

      if (viewsMin !== "") {
        query = query.gte("average_monthly_views", Number.parseInt(viewsMin))
      }

      if (viewsMax !== "") {
        query = query.lte("average_monthly_views", Number.parseInt(viewsMax))
      }

      if (engagementMin !== "") {
        query = query.gte("average_monthly_engagement", Number.parseInt(engagementMin))
      }

      if (engagementMax !== "") {
        query = query.lte("average_monthly_engagement", Number.parseInt(engagementMax))
      }

      // Apply sorting
      query = query.order(sortBy, { ascending: sortOrder === "asc" })

      // Apply pagination
      const startIndex = (page - 1) * limit
      query = query.range(startIndex, startIndex + limit - 1)

      const { data, error, count } = await query

      if (error) {
        console.error("Supabase error:", error)
        return {
          data: [],
          hasMore: false,
          total: 0,
          error: error.message,
        }
      }

      return {
        data: data || [],
        hasMore: data && data.length === limit,
        total: count || 0, // Now count will have the actual total
      }
    } catch (error) {
      console.error("Error fetching creators:", error)
      return {
        data: [],
        hasMore: false,
        total: 0,
        error: error.message,
      }
    }
  }

  async getFilterOptions() {
    try {
      if (!this.isSupabaseConfigured) {
        return {
          platforms: [],
        }
      }

      const platformsResult = await this.supabase
        .from("creators")
        .select("channel_platform")
        .not("channel_platform", "is", null)

      return {
        platforms: [...new Set(platformsResult.data?.map((item) => item.channel_platform) || [])],
      }
    } catch (error) {
      console.error("Error fetching filter options:", error)
      return {
        platforms: [],
      }
    }
  }

  calculateProjections(selectedCreators) {
    if (!selectedCreators || selectedCreators.length === 0) {
      return {
        totalViews: 0,
        totalEngagement: 0,
        totalSubscribers: 0,
      }
    }

    const totalViews = selectedCreators.reduce((sum, creator) => sum + (creator.average_monthly_views || 0), 0)
    const totalEngagement = selectedCreators.reduce(
      (sum, creator) => sum + (creator.average_monthly_engagement || 0),
      0,
    )
    const totalSubscribers = selectedCreators.reduce((sum, creator) => sum + (creator.subscribers || 0), 0)
    const averageEngagementRate = totalViews > 0 ? (totalEngagement / totalViews) * 100 : 0

    return {
      totalViews,
      totalEngagement,
      totalSubscribers,
      averageEngagementRate,
    }
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }
}

// Export singleton instance
export const creatorService = new CreatorService()
export default creatorService