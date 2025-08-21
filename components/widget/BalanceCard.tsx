/**
 * Balance Card Component
 * Displays fiat or token balance information
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BalanceCardProps {
  title: string;
  balance: number;
  currency: string;
  symbol?: string;
  usdValue?: number;
  icon?: string;
  type: "fiat" | "token";
  className?: string;
}

export function BalanceCard({
  title,
  balance,
  currency,
  symbol = "",
  usdValue,
  icon,
  type,
  className = ""
}: BalanceCardProps) {
  const formatBalance = (value: number) => {
    if (type === "fiat") {
      return `${symbol}${value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
    
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 8
    });
  };

  const formatUsdValue = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <Card className={`border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {title}
          </CardTitle>
          {type === "token" && (
            <Badge variant="secondary" className="text-xs">
              {currency}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          {icon && (
            <img 
              src={icon} 
              alt={`${currency} icon`} 
              className="w-6 h-6 rounded-full"
              onError={(e) => {
                // Fallback to text if icon fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          
          <div className="flex-1">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatBalance(balance)}
            </div>
            
            {type === "token" && usdValue && (
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {formatUsdValue(usdValue)}
              </div>
            )}
          </div>
        </div>
        
        {/* Mock trend indicator */}
        <div className="flex items-center space-x-1 text-xs">
          <TrendingUp className="h-3 w-3 text-green-500" />
          <span className="text-green-600 dark:text-green-400">
            +2.4% today
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
