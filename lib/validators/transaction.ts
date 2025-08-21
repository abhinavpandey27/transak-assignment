/**
 * Transaction Validation Schemas
 * Zod schemas for deposit and withdrawal forms
 */

import { z } from 'zod';

// Deposit validation schema
export const depositSchema = z.object({
  amount: z
    .number()
    .min(0.01, 'Amount must be greater than 0')
    .max(100000, 'Amount cannot exceed $100,000')
});

export type DepositFormData = z.infer<typeof depositSchema>;

// Withdrawal validation schema
export const withdrawalSchema = z.object({
  tokenSymbol: z
    .string()
    .min(1, 'Please select a token'),
  amount: z
    .number()
    .min(0.01, 'Amount must be greater than 0'),
  bankAccount: z
    .string()
    .min(1, 'Bank account number is required')
    .regex(/^\d{9,18}$/, 'Please enter a valid bank account number'),
  ifscCode: z
    .string()
    .min(1, 'IFSC code is required')
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please enter a valid IFSC code')
});

export type WithdrawalFormData = z.infer<typeof withdrawalSchema>;
