"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmailInput } from "@/components/widget/EmailInput";
import { OtpInput } from "@/components/widget/OtpInput";
import { useAuthStore } from "@/lib/store/authSlice";
import { loadBrand, applyBrandColors, getBrandCopy } from "@/lib/brand/brandLoader";
import { Wallet, ArrowLeft } from "lucide-react";

export function LoginScreen() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  
  const { login, verifyOTP, isLoading, error, clearError } = useAuthStore();
  
  // Load brand configuration (default)
  const brand = loadBrand();
  
  useEffect(() => {
    // Apply brand colors
    applyBrandColors(brand);
  }, [brand]);

  const handleEmailSubmit = async (email: string) => {
    clearError();
    const success = await login(email);
    if (success) {
      setEmail(email);
      setStep("otp");
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    clearError();
    const success = await verifyOTP(otp);
    if (success) {
      // In demo mode, just show success
      setStep("email");
      clearError();
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    clearError();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Wallet className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {getBrandCopy(brand, "appName", "CryptoRamp")}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            {getBrandCopy(brand, "login.tagline", "Seamless Crypto On/Off Ramp")}
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90">
          <CardHeader className="text-center pb-4">
            {step === "email" ? (
              <>
                <CardTitle className="text-2xl">
                  {getBrandCopy(brand, "login.title", "Welcome Back")}
                </CardTitle>
                <CardDescription>
                  {getBrandCopy(brand, "login.subtitle", "Enter your email to continue")}
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl">
                  {getBrandCopy(brand, "login.otpTitle", "Enter OTP")}
                </CardTitle>
                <CardDescription>
                  {getBrandCopy(brand, "login.otpSubtitle", "We've sent a 6-digit code to your email")}
                </CardDescription>
              </>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === "email" ? (
              <EmailInput 
                onSubmit={handleEmailSubmit}
                isLoading={isLoading}
                placeholder={getBrandCopy(brand, "login.emailPlaceholder", "Enter your email")}
                submitText={getBrandCopy(brand, "login.submit", "Continue")}
              />
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                    Code sent to:
                  </p>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {email}
                  </p>
                </div>
                
                <OtpInput 
                  onSubmit={handleOtpSubmit}
                  isLoading={isLoading}
                  placeholder={getBrandCopy(brand, "login.otpPlaceholder", "Enter 6-digit code")}
                  submitText={getBrandCopy(brand, "login.submit", "Continue")}
                />
                
                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToEmail}
                    className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to email
                  </Button>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Demo Info */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
                <strong>Demo Mode:</strong> Use any valid email format. OTP is always <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">123456</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
