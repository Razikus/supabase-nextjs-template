"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Check, Minus } from "lucide-react"

export function Checkbox({ className, checked, indeterminate, onCheckedChange, ...props }) {
  const [isChecked, setIsChecked] = useState(checked || false)

  useEffect(() => {
    setIsChecked(checked || false)
  }, [checked])

  const handleChange = (newChecked) => {
    setIsChecked(newChecked)
    onCheckedChange?.(newChecked)
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : isChecked}
      onClick={() => handleChange(!isChecked)}
      className={cn(
        "flex items-center justify-center peer h-5 w-5 shrink-0 rounded-lg border-2 border-slate-300 bg-white ring-offset-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-slate-400 shadow-sm hover:shadow-md",
        (isChecked || indeterminate) && "bg-blue-600 border-blue-600 text-white shadow-md",
        className,
      )}
      {...props}
    >
      {indeterminate ? <Minus className="h-3 w-3" /> : isChecked ? <Check className="h-3 w-3" /> : null}
    </button>
  )
}
