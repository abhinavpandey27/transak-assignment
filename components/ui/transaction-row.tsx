"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from "lucide-react"

interface TransactionRowProps {
  type: "deposit" | "withdrawal"
  amount: number
  currency: string
  status: "success" | "pending" | "failed"
  timestamp: string
  description?: string
  className?: string
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    variant: "default" as const,
    text: "Success",
    className: "text-green-600 dark:text-green-400"
  },
  pending: {
    icon: Clock,
    variant: "secondary" as const,
    text: "Pending",
    className: "text-yellow-600 dark:text-yellow-400"
  },
  failed: {
    icon: XCircle,
    variant: "destructive" as const,
    text: "Failed",
    className: "text-red-600 dark:text-red-400"
  }
}

export function TransactionRow({
  type,
  amount,
  currency,
  status,
  timestamp,
  description,
  className
}: TransactionRowProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={cn(
      "flex items-center justify-between p-4 border rounded-lg bg-card",
      className
    )}>
      <div className="flex items-center space-x-3">
        <div className={cn(
          "p-2 rounded-full",
          type === "deposit" ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
        )}>
          {type === "deposit" ? (
            <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
          )}
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-medium">
              {type === "deposit" ? "+" : "-"}{amount.toLocaleString()} {currency}
            </span>
            <Badge variant={config.variant} className="text-xs">
              <Icon className="h-3 w-3 mr-1" />
              {config.text}
            </Badge>
          </div>
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
      </div>
    </div>
  )
}
