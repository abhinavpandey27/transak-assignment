/**
 * Authentication Validation Schemas
 * Zod schemas for email and OTP validation
 */

import { z } from 'zod';

// Email validation schema
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long')
});

export type EmailFormData = z.infer<typeof emailSchema>;

// OTP validation schema
export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, 'OTP is required')
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only numbers')
});

export type OtpFormData = z.infer<typeof otpSchema>;
