import { cn } from "@/lib/utils"

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-3 p-6", className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-xl font-bold leading-tight tracking-tight text-slate-900", className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-slate-600 font-medium leading-relaxed", className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
}
