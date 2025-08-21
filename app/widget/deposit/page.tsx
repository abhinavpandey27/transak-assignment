/**
 * Deposit Page
 * Handles fiat to crypto conversion flow
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DepositForm } from "@/components/widget/DepositForm";
import { useAuthStore } from "@/lib/store/authSlice";
import { useBalanceStore } from "@/lib/store/balanceSlice";
import { loadBrand, applyBrandColors, getBrandCopy } from "@/lib/brand/brandLoader";
import { Wallet, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function DepositPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { fiatBalance, deposit, isLoading, error, clearError } = useBalanceStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState<string>("");
  
  // Load brand configuration
  const brand = loadBrand();
  
  useEffect(() => {
    // Apply brand colors
    applyBrandColors(brand);
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/widget/login");
      return;
    }
  }, [isAuthenticated, router, brand]);

  const handleDeposit = async (amount: number) => {
    clearError();
    const result = await deposit(amount);
    
    if (result) {
      setTransactionId(transactionId);
      setShowSuccess(true);
      
      // Auto-redirect after 3 seconds
      setTimeout(() => {
        router.push("/widget/home");
      }, 3000);
    }
  };

  const handleBackToHome = () => {
    router.push("/widget/home");
  };

  if (!isAuthenticated || !user) {
    return null; // Will redirect
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Deposit Successful!
              </CardTitle>
              <CardDescription>
                Your fiat has been converted to crypto tokens
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Transaction ID: <code className="bg-green-100 dark:bg-green-800 px-1 rounded">{transactionId}</code>
                </p>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Redirecting to dashboard in a few seconds...
              </p>
              
              <Button
                onClick={handleBackToHome}
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-slate-900 dark:text-white">
              {getBrandCopy(brand, "appName", "CryptoRamp")}
            </span>
          </div>
          
          <Link href="/widget/home">
            <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {getBrandCopy(brand, "deposit.title", "Deposit Fiat")}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {getBrandCopy(brand, "deposit.subtitle", "Convert fiat to crypto")}
            </p>
          </div>

          {/* Current Balance */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                ${fiatBalance?.balance?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) || "0.00"}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Virtual bank balance available for conversion
              </p>
            </CardContent>
          </Card>

          {/* Deposit Form */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90">
            <CardHeader>
              <CardTitle className="text-xl">Deposit Amount</CardTitle>
              <CardDescription>
                Enter the amount you want to convert from fiat to crypto
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <DepositForm
                onSubmit={handleDeposit}
                isLoading={isLoading}
                maxAmount={fiatBalance?.balance || 0}
                placeholder={getBrandCopy(brand, "deposit.amountPlaceholder", "Enter amount")}
                submitText={getBrandCopy(brand, "deposit.confirm", "Confirm Deposit")}
              />
              
              {/* Error Display */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">
                    {error}
                  </p>
                </div>
              )}

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  How it works:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Enter the USD amount you want to convert</li>
                  <li>• We&apos;ll convert it to ETH at current market rates</li>
                  <li>• Tokens will be added to your wallet immediately</li>
                  <li>• Transaction will be recorded in your history</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


