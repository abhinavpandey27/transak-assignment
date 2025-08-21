/**
 * Withdraw Page
 * Handles crypto to fiat conversion flow
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WithdrawForm } from "@/components/widget/WithdrawForm";
import { useAuthStore } from "@/lib/store/authSlice";
import { useBalanceStore } from "@/lib/store/balanceSlice";
import { loadBrand, applyBrandColors, getBrandCopy } from "@/lib/brand/brandLoader";
import { Wallet, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function WithdrawPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { tokenBalances, withdraw, isLoading, error, clearError } = useBalanceStore();
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

  const handleWithdraw = async (tokenSymbol: string, amount: number, bankAccount: string, ifscCode: string) => {
    clearError();
    const result = await withdraw(tokenSymbol, amount, bankAccount, ifscCode);
    
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
                Withdrawal Successful!
              </CardTitle>
              <CardDescription>
                Your crypto has been converted to fiat
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
              {getBrandCopy(brand, "withdraw.title", "Withdraw Crypto")}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {getBrandCopy(brand, "withdraw.subtitle", "Convert crypto to fiat")}
            </p>
          </div>

          {/* Token Balances */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Available Token Balances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {tokenBalances.map((token: { symbol: string; name: string; balance: number; usdValue: number; icon: string }) => (
                  <div key={token.symbol} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={token.icon} 
                        alt={`${token.symbol} icon`} 
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {token.symbol}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">
                          {token.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {token.balance.toLocaleString("en-US", {
                          minimumFractionDigits: 4,
                          maximumFractionDigits: 8
                        })}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        ${token.usdValue.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Withdraw Form */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90">
            <CardHeader>
              <CardTitle className="text-xl">Withdrawal Details</CardTitle>
              <CardDescription>
                Select token, enter amount, and provide bank details
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <WithdrawForm
                onSubmit={handleWithdraw}
                isLoading={isLoading}
                tokenBalances={tokenBalances}
                placeholder={getBrandCopy(brand, "withdraw.amountPlaceholder", "Enter amount")}
                submitText={getBrandCopy(brand, "withdraw.confirm", "Confirm Withdrawal")}
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
                  <li>• Select the token you want to withdraw</li>
                  <li>• Enter the amount to convert</li>
                  <li>• Provide your bank account details</li>
                  <li>• We&apos;ll convert tokens to fiat and credit your account</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


