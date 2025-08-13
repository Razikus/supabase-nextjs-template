import { cn } from "@/lib/utils"

export function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-slate-300 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm focus:shadow-md",
        className,
      )}
      {...props}
    />
  )
}
