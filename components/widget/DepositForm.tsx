/**
 * Deposit Form Component
 * Form for entering deposit amounts with validation
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { depositSchema, type DepositFormData } from "@/lib/validators/transaction";
import { DollarSign } from "lucide-react";

interface DepositFormProps {
  onSubmit: (amount: number) => Promise<void>;
  isLoading?: boolean;
  maxAmount: number;
  placeholder?: string;
  submitText?: string;
}

export function DepositForm({ 
  onSubmit, 
  isLoading = false, 
  maxAmount,
  placeholder = "Enter amount",
  submitText = "Confirm Deposit"
}: DepositFormProps) {
  const form = useForm<DepositFormData>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      amount: 0
    }
  });

  const handleSubmit = async (data: DepositFormData) => {
    try {
      await onSubmit(data.amount);
    } catch (error) {
      console.error("Deposit submission error:", error);
    }
  };

  const quickAmounts = [100, 250, 500, 1000];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    {...field}
                    type="number"
                    placeholder={placeholder}
                    className="pl-10 h-12 text-base"
                    disabled={isLoading}
                    min="0.01"
                    max={maxAmount}
                    step="0.01"
                    aria-describedby="amount-error"
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      field.onChange(value);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage id="amount-error" />
              
              {/* Available balance info */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Available: ${maxAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
            </FormItem>
          )}
        />

        {/* Quick amount buttons */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Quick amounts:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => form.setValue("amount", amount)}
                disabled={amount > maxAmount}
                className="h-10"
              >
                ${amount}
              </Button>
            ))}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 text-base font-medium"
          disabled={isLoading || form.watch("amount") <= 0 || form.watch("amount") > maxAmount}
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
