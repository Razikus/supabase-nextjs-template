import { cn } from "@/lib/utils"

export function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        "text-sm font-semibold text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tracking-tight",
        className,
      )}
      {...props}
    />
  )
}
