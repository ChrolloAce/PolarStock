"use client"

import * as React from "react"
import { Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { industries } from "@/data/industries"
import { Input } from "@/components/ui/input"

export interface IndustrySearchProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function IndustrySearch({
  value,
  onChange,
  disabled = false,
}: IndustrySearchProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  // Initialize search term from value prop
  React.useEffect(() => {
    if (value && !searchTerm) {
      setSearchTerm(value)
    }
  }, [value])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter industries based on search term
  const filteredIndustries = React.useMemo(() => {
    if (!searchTerm) return industries
    const lowercaseSearch = searchTerm.toLowerCase()
    return industries.filter(industry => 
      industry.toLowerCase().includes(lowercaseSearch)
    )
  }, [searchTerm])

  // Create unique keys for industries
  const getIndustryKey = (industry: string) => {
    // Add category prefix for duplicate industries
    switch (industry) {
      case 'Architecture':
        return 'Professional Services - Architecture'
      case 'E-commerce':
        return 'Technology - E-commerce'
      case 'Landscaping':
        return 'Agriculture - Landscaping'
      case 'Moving Services':
        return 'Transportation - Moving Services'
      default:
        return industry
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (filteredIndustries.length > 0) {
        // Auto-select the first item on Enter if we have matches
        onChange(filteredIndustries[0])
        setSearchTerm(filteredIndustries[0])
      } else if (searchTerm.trim()) {
        // Use the entered search term if no matches
        onChange(searchTerm.trim())
      }
      setOpen(false)
    } else if (e.key === 'Escape') {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search industry or enter keywords..."
          className="w-full pl-9 pr-4 bg-white"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setOpen(true)
            if (!e.target.value) {
              onChange("")
            }
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
      </div>
      
      {open && filteredIndustries.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-md max-h-[300px] overflow-y-auto">
          <div className="py-1">
            {filteredIndustries.map((industry) => (
              <div
                key={getIndustryKey(industry)}
                className={cn(
                  "px-2 py-1.5 text-sm cursor-pointer flex items-center hover:bg-primary-50 hover:text-primary-600",
                  value === industry ? "bg-primary-50 text-primary-600" : ""
                )}
                onClick={() => {
                  onChange(industry)
                  setSearchTerm(industry)
                  setOpen(false)
                  inputRef.current?.blur()
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === industry ? "opacity-100 text-primary-600" : "opacity-0"
                  )}
                />
                {industry}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {open && searchTerm && filteredIndustries.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-md">
          <div className="px-2 py-2 text-sm text-center text-muted-foreground">
            <p className="text-sm text-gray-500">
              &quot;No industries found&quot;
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 