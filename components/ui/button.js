import { cn } from "@/lib/utils"

const buttonVariants = {
  default:
    "bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 shadow-lg hover:shadow-xl focus:ring-slate-500/30",
  outline:
    "text-slate-700 bg-white hover:bg-slate-50 shadow-sm hover:shadow-md focus:ring-slate-500/20",
  ghost: "text-slate-700 hover:bg-slate-100 focus:ring-slate-500/20 hover:shadow-sm",
  destructive:
    "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-lg hover:shadow-xl focus:ring-red-500/30",
  primary:
    "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl focus:ring-blue-500/30",
}

const buttonSizes = {
  default: "h-12 px-6 py-3 text-sm font-semibold",
  sm: "h-10 px-4 py-2 text-sm font-medium",
  lg: "h-14 px-8 py-4 text-base font-semibold",
  icon: "h-12 w-12",
}

export function Button({ className, variant = "default", size = "default", children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.98]",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
