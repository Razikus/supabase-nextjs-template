"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

export function Select({ value, onValueChange, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={selectRef}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <SelectValue value={value} placeholder="Select..." />
      </SelectTrigger>
      <SelectContent isOpen={isOpen}>
        {Array.isArray(children)
          ? children.map((child, index) =>
              child && typeof child === "object" && child.props ? (
                <SelectItem
                  key={child.props.value || index}
                  value={child.props.value}
                  isSelected={value === child.props.value}
                  onSelect={(val) => {
                    onValueChange(val)
                    setIsOpen(false)
                  }}
                >
                  {child.props.children}
                </SelectItem>
              ) : (
                child
              ),
            )
          : children}
      </SelectContent>
    </div>
  )
}

export function SelectTrigger({ className, children, onClick, isOpen, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-12 w-full items-center justify-between rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm hover:shadow-md transition-all duration-200",
        isOpen && "border-blue-500 ring-4 ring-blue-500/20 shadow-md",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-5 w-5 text-slate-400 transition-transform duration-200", isOpen && "rotate-180")} />
    </button>
  )
}

export function SelectValue({ placeholder, value }) {
  return <span className={cn("truncate", !value && "text-slate-400")}>{value || placeholder}</span>
}

export function SelectContent({ className, children, isOpen }) {
  if (!isOpen) return null

  return (
    <div
      className={cn(
        "absolute top-full left-0 z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto animate-in fade-in-0 zoom-in-95 duration-200",
        className,
      )}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

export function SelectItem({ className, children, value, isSelected, onSelect, ...props }) {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm font-medium outline-none transition-colors duration-150",
        isSelected
          ? "bg-blue-100 text-blue-900 font-semibold"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        className,
      )}
      onClick={() => onSelect(value)}
      {...props}
    >
      <span className="flex-1">{children}</span>
      {isSelected && <Check className="h-4 w-4 text-blue-600 ml-2" />}
    </div>
  )
}
