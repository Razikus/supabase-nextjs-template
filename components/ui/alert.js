import { cn } from "@/lib/utils"

const alertVariants = {
  default: "bg-slate-50 text-slate-900 border-slate-200",
  destructive: "border-red-200 text-red-900 bg-red-50 [&>svg]:text-red-600",
  success: "border-green-200 text-green-900 bg-green-50 [&>svg]:text-green-600",
  warning: "border-yellow-200 text-yellow-900 bg-yellow-50 [&>svg]:text-yellow-600",
  info: "border-blue-200 text-blue-900 bg-blue-50 [&>svg]:text-blue-600",
}

export function Alert({ className, variant = "default", ...props }) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-xl border-2 p-4 shadow-sm [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-600",
        alertVariants[variant],
        className,
      )}
      {...props}
    />
  )
}

export function AlertDescription({ className, ...props }) {
  return <div className={cn("text-sm font-medium [&_p]:leading-relaxed", className)} {...props} />
}
