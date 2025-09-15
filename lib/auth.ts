// Mock authentication utilities
export interface User {
  email: string
  name: string
  role: string
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const isAuth = localStorage.getItem("10x_auth")
  const userData = localStorage.getItem("10x_user")

  if (isAuth === "true" && userData) {
    try {
      return JSON.parse(userData)
    } catch {
      return null
    }
  }

  return null
}

export const logout = () => {
  if (typeof window === "undefined") return

  localStorage.removeItem("10x_auth")
  localStorage.removeItem("10x_user")
  window.location.href = "/login"
}

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("10x_auth") === "true"
}
