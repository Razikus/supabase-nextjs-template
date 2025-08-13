import { createClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import NewDashboard from "@/components/dashboard/NewDashboard"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get total count first
  const { count } = await supabase.from("creators").select("*", { count: "exact", head: true })

  // Fetch first 50 creators
  const { data: creators, error } = await supabase.from("creators").select("*").range(0, 49)

  if (error) {
    console.error("Error fetching creators:", error)
  }

  // Get unique platforms from database
  const { data: platformData } = await supabase
    .from("creators")
    .select("channel_platform")
    .not("channel_platform", "is", null)

  const uniquePlatforms = [...new Set(platformData?.map((item) => item.channel_platform) || [])]
  const platforms = uniquePlatforms.sort()

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gray-50">
      <NewDashboard />
    </div>
  )
}
