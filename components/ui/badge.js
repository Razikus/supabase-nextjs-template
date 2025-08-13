import { cn } from "@/lib/utils"

const badgeVariants = {
  default: "border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200",
  secondary: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
  destructive: "border-red-200 bg-red-100 text-red-800 hover:bg-red-200",
  outline: "border-slate-300 text-slate-700 bg-white hover:bg-slate-50",
  success: "border-green-200 bg-green-100 text-green-800 hover:bg-green-200",
  warning: "border-yellow-200 bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  info: "border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200",
}

export function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:ring-offset-2 shadow-sm",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  )
}
