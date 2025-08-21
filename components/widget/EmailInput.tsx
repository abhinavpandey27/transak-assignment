/**
 * Email Input Component
 * Form component for email input with validation
 */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { emailSchema, type EmailFormData } from "@/lib/validators/auth";
import { Mail } from "lucide-react";

interface EmailInputProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
  submitText?: string;
}

export function EmailInput({ 
  onSubmit, 
  isLoading = false, 
  placeholder = "Enter your email",
  submitText = "Continue"
}: EmailInputProps) {
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ""
    }
  });

  const handleSubmit = async (data: EmailFormData) => {
    try {
      await onSubmit(data.email);
    } catch (error) {
      console.error("Email submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    {...field}
                    type="email"
                    placeholder={placeholder}
                    className="pl-10 h-12 text-base"
                    disabled={isLoading}
                    aria-describedby="email-error"
                  />
                </div>
              </FormControl>
              <FormMessage id="email-error" />
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
