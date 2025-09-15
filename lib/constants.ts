export const BRAND_COLORS = {
  primary: "#3B99D1",
  red: "#E85949",
  darkRed: "#E2383A",
  brown: "#572E29",
  dark: "#132945",
} as const

export const SPORTS_OPTIONS = [
  "Football",
  "Basketball",
  "Baseball",
  "Soccer",
  "Tennis",
  "Golf",
  "Hockey",
  "Swimming",
  "Track & Field",
  "Other",
] as const

export const CREATOR_ROLES = ["Athlete", "Coach", "Content Creator", "Sports Media", "Team Manager", "Other"] as const

export const INTEREST_AREAS = ["Creators", "Events", "Streaming", "All of the above"] as const

export const SPORTS = SPORTS_OPTIONS
export const ROLES = CREATOR_ROLES
