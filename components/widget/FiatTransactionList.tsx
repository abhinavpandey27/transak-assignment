"use client";

import { Badge } from "@/components/ui/badge";
import { 
  ArrowDown, 
  ArrowUp, 
  QrCode 
} from "lucide-react";

interface FiatTransaction {
  id: string;
  type: string;
  date: string;
  amount: number;
  currency: string;
  cryptoAmount: number;
  cryptoCurrency: string;
  status: string;
  direction: 'incoming' | 'outgoing';
}

const mockFiatTransactions: FiatTransaction[] = [
  {
    id: '20250812-C5M7J0',
    type: 'Buying Ethereum',
    date: '12th August 2025, 4:45 PM',
    amount: 30,
    currency: 'EUR',
    cryptoAmount: 0.007421,
    cryptoCurrency: 'ETH',
    status: 'Sandbox Testing',
    direction: 'incoming'
  },
  {
    id: '20250812-C5M7J1',
    type: 'Buying Ethereum',
    date: '12th August 2025, 4:45 PM',
    amount: 30,
    currency: 'EUR',
    cryptoAmount: 0.007421,
    cryptoCurrency: 'ETH',
    status: 'Sandbox Testing',
    direction: 'incoming'
  },
  {
    id: '20250812-C5M7J2',
    type: 'Buying Ethereum',
    date: '12th August 2025, 4:45 PM',
    amount: 30,
    currency: 'EUR',
    cryptoAmount: 0.007421,
    cryptoCurrency: 'ETH',
    status: 'Sandbox Testing',
    direction: 'outgoing'
  }
];

export function FiatTransactionList() {
  const getDirectionIcon = (direction: 'incoming' | 'outgoing') => {
    if (direction === 'incoming') {
      return <ArrowDown className="h-4 w-4 text-green-600" />;
    }
    return <ArrowUp className="h-4 w-4 text-blue-600" />;
  };

  const getDirectionColor = (direction: 'incoming' | 'outgoing') => {
    if (direction === 'incoming') {
      return 'text-green-600';
    }
    return 'text-blue-600';
  };

  return (
    <div className="space-y-4">
      {mockFiatTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          {/* Icon */}
          <div className={`p-2 rounded-full ${getDirectionColor(transaction.direction)}`}>
            {getDirectionIcon(transaction.direction)}
          </div>

          {/* Transaction Details */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-slate-900 dark:text-white">
                {transaction.type}
              </h4>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {transaction.date}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  ID: {transaction.id}
                </span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {transaction.amount} {transaction.currency}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {transaction.cryptoAmount} {transaction.cryptoCurrency}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {transaction.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
