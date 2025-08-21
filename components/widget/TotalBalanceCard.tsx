"use client";

import { Card, CardContent } from "@/components/ui/card";

interface TotalBalanceCardProps {
  balance: number;
  currency: string;
  symbol: string;
  description: string;
}

export function TotalBalanceCard({ balance, currency, symbol, description }: TotalBalanceCardProps) {
  return (
    <Card className="bg-slate-50 dark:bg-slate-800 border-0 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
          Your Total Balance
        </h3>
        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {symbol}{balance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
