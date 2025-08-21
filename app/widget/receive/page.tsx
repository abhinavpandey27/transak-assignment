/**
 * Receive Page
 * Displays assigned wallet address and QR code for receiving crypto
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/store/authSlice";
import { useTransactionStore } from "@/lib/store/transactionSlice";
import { loadBrand, applyBrandColors, getBrandCopy } from "@/lib/brand/brandLoader";
import { Wallet, ArrowLeft, Copy, QrCode, Download, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ReceivePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { transactions, refreshTransactions, generateIncomingTransaction } = useTransactionStore();
  const [copied, setCopied] = useState(false);
  const [qrCode, setQrCode] = useState<string>("");
  
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
    
    // Load transactions
    refreshTransactions();
    
    // Generate simple QR code (mock)
    if (user?.walletAddress) {
      // In a real app, you'd use a QR code library
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(user.walletAddress)}`);
    }
  }, [isAuthenticated, router, brand, refreshTransactions, user?.walletAddress]);

  const handleCopyAddress = async () => {
    if (user?.walletAddress) {
      try {
        await navigator.clipboard.writeText(user.walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy address:", error);
      }
    }
  };

  const handleGenerateIncoming = async () => {
    await generateIncomingTransaction();
  };

  const handleBackToHome = () => {
    router.push("/widget/home");
  };

  if (!isAuthenticated || !user) {
    return null; // Will redirect
  }

  // Filter incoming transactions
  const incomingTransactions = transactions.filter(tx => tx.direction === "incoming");

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
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {getBrandCopy(brand, "receive.title", "Receive Crypto")}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              {getBrandCopy(brand, "receive.subtitle", "Your assigned wallet address")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Wallet Address Card */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90">
              <CardHeader>
                <CardTitle className="text-xl">Wallet Address</CardTitle>
                <CardDescription>
                  Share this address to receive crypto tokens
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <p className="font-mono text-sm text-slate-900 dark:text-white break-all">
                    {user.walletAddress}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopyAddress}
                    className="flex-1"
                    variant={copied ? "default" : "outline"}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : getBrandCopy(brand, "receive.copyAddress", "Copy Address")}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => window.open(qrCode, "_blank")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Save QR
                  </Button>
                </div>
                
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <p><strong>Note:</strong> Only send supported tokens (ETH, USDT, USDC) to this address.</p>
                  <p>Transfers may take a few minutes to confirm on the blockchain.</p>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Card */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90">
              <CardHeader>
                <CardTitle className="text-xl">{getBrandCopy(brand, "receive.qrTitle", "QR Code")}</CardTitle>
                <CardDescription>
                  Scan this QR code to get the wallet address
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center">
                {qrCode ? (
                  <div className="space-y-4">
                    <img 
                      src={qrCode} 
                      alt="Wallet QR Code" 
                      className="mx-auto w-48 h-48 border-4 border-slate-200 dark:border-slate-600 rounded-lg"
                    />
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Scan with any crypto wallet app
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48">
                    <div className="text-center">
                      <QrCode className="h-16 w-16 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-500 dark:text-slate-400">Loading QR code...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Incoming Transactions */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 mt-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Incoming Transactions</CardTitle>
                  <CardDescription>
                    Recent deposits to your wallet
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateIncoming}
                  className="text-sm"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate Demo
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              {incomingTransactions.length > 0 ? (
                <div className="space-y-3">
                  {incomingTransactions.slice(0, 5).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          tx.status === 'success' ? 'bg-green-500' :
                          tx.status === 'pending' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {tx.amount} {tx.currency}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">
                            {tx.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {tx.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <QrCode className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-500 dark:text-slate-400">
                    No incoming transactions yet
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Share your address to receive crypto
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


