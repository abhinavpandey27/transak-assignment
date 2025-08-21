/**
 * Withdraw Form Component
 * Form for token withdrawal with bank details
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { withdrawalSchema, type WithdrawalFormData } from "@/lib/validators/transaction";
import { TokenBalance } from "@/lib/adapters/mockAdapter";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Coins, 
  DollarSign, 
  CreditCard, 
  Hash 
} from "lucide-react";

interface WithdrawFormProps {
  onSubmit: (tokenSymbol: string, amount: number, bankAccount: string, ifscCode: string) => Promise<void>;
  isLoading?: boolean;
  tokenBalances: TokenBalance[];
  placeholder?: string;
  submitText?: string;
}

export function WithdrawForm({ 
  onSubmit, 
  isLoading = false, 
  tokenBalances,
  placeholder = "Enter amount",
  submitText = "Confirm Withdrawal"
}: WithdrawFormProps) {
  const form = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      tokenSymbol: "",
      amount: 0,
      bankAccount: "",
      ifscCode: ""
    }
  });

  const selectedToken = form.watch("tokenSymbol");
  const selectedTokenData = tokenBalances.find(t => t.symbol === selectedToken);

  const handleSubmit = async (data: WithdrawalFormData) => {
    try {
      await onSubmit(data.tokenSymbol, data.amount, data.bankAccount, data.ifscCode);
    } catch (error) {
      console.error("Withdrawal submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Token Selection */}
        <FormField
          control={form.control}
          name="tokenSymbol"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Select Token
                  </label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose a token to withdraw" />
                    </SelectTrigger>
                    <SelectContent>
                      {tokenBalances.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center space-x-2">
                            <img 
                              src={token.icon} 
                              alt={`${token.symbol} icon`} 
                              className="w-4 h-4 rounded-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            <span>{token.symbol}</span>
                            <span className="text-slate-500">
                              ({token.balance.toFixed(4)} available)
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Amount
                  </label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      {...field}
                      type="number"
                      placeholder={placeholder}
                      className="pl-10 h-12 text-base"
                      disabled={isLoading || !selectedToken}
                      min="0.0001"
                      max={selectedTokenData?.balance || 0}
                      step="0.0001"
                      aria-describedby="amount-error"
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        field.onChange(value);
                      }}
                    />
                  </div>
                  {selectedTokenData && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Available: {selectedTokenData.balance.toFixed(8)} {selectedTokenData.symbol}
                      {selectedTokenData.usdValue && (
                        <span className="ml-2">
                          (≈ ${selectedTokenData.usdValue.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })})
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage id="amount-error" />
            </FormItem>
          )}
        />

        {/* Bank Account */}
        <FormField
          control={form.control}
          name="bankAccount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Bank Account Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter account number"
                      className="pl-10 h-12 text-base"
                      disabled={isLoading}
                      aria-describedby="bank-error"
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage id="bank-error" />
            </FormItem>
          )}
        />

        {/* IFSC Code */}
        <FormField
          control={form.control}
          name="ifscCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    IFSC Code
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter IFSC code"
                      className="pl-10 h-12 text-base"
                      disabled={isLoading}
                      aria-describedby="ifsc-error"
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage id="ifsc-error" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full h-12 text-base font-medium"
          disabled={isLoading || !selectedToken || form.watch("amount") <= 0 || !form.watch("bankAccount") || !form.watch("ifscCode")}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            submitText
          )}
        </Button>
      </form>
    </Form>
  );
}
