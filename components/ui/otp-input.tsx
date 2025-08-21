"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  className,
  disabled = false
}: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return

    const newValue = value.split('')
    newValue[index] = digit
    const result = newValue.join('')
    onChange(result)

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length)
    if (/^\d+$/.test(pastedData)) {
      onChange(pastedData)
      // Focus last filled input or first empty input
      const focusIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[focusIndex]?.focus()
    }
  }

  const setRef = React.useCallback((el: HTMLInputElement | null, index: number) => {
    inputRefs.current[index] = el
  }, [])

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => setRef(el, index)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "h-12 w-12 rounded-lg border border-input bg-background text-center text-lg font-semibold transition-colors",
            "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-muted-foreground"
          )}
          placeholder="0"
        />
      ))}
    </div>
  )
}
