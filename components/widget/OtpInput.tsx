/**
 * OTP Input Component
 * Form component for 6-digit OTP input with validation
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { otpSchema, type OtpFormData } from "@/lib/validators/auth";
import { Key } from "lucide-react";

interface OtpInputProps {
  onSubmit: (otp: string) => Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
  submitText?: string;
}

export function OtpInput({ 
  onSubmit, 
  isLoading = false, 
  placeholder = "Enter 6-digit code",
  submitText = "Continue"
}: OtpInputProps) {
  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ""
    }
  });

  const handleSubmit = async (data: OtpFormData) => {
    try {
      await onSubmit(data.otp);
    } catch (error) {
      console.error("OTP submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    {...field}
                    type="text"
                    placeholder={placeholder}
                    className="pl-10 h-12 text-base text-center tracking-widest font-mono"
                    disabled={isLoading}
                    maxLength={6}
                    aria-describedby="otp-error"
                    autoComplete="one-time-code"
                  />
                </div>
              </FormControl>
              <FormMessage id="otp-error" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full h-12 text-base font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            submitText
          )}
        </Button>
      </form>
    </Form>
  );
}
