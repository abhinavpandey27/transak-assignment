/**
 * Transactions Page
 * Displays complete transaction history with filtering and status
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/store/authSlice";
import { useTransactionStore } from "@/lib/store/transactionSlice";
import { loadBrand, applyBrandColors, getBrandCopy } from "@/lib/brand/brandLoader";
import { Wallet, ArrowLeft, Filter, RefreshCw, ArrowUp, ArrowDown, QrCode } from "lucide-react";
import Link from "next/link";
import { Transaction } from "@/lib/adapters/mockAdapter";

export default function TransactionsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { transactions, refreshTransactions, isLoading } = useTransactionStore();
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<"all" | "incoming" | "outgoing">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "pending" | "failed">("all");
  
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
  }, [isAuthenticated, router, brand, refreshTransactions]);

  useEffect(() => {
    // Apply filters
    let filtered = transactions;
    
    if (filter !== "all") {
      filtered = filtered.filter(tx => tx.direction === filter);
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, filter, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Success</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case "incoming":
        return <ArrowDown className="h-4 w-4 text-green-600" />;
      case "outgoing":
        return <ArrowUp className="h-4 w-4 text-red-600" />;
      default:
        return <QrCode className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "deposit":
        return "Deposit";
      case "withdraw":
        return "Withdrawal";
      case "receive":
        return "Receive";
      default:
        return type;
    }
  };

  const handleBackToHome = () => {
    router.push("/widget/home");
  };

  if (!isAuthenticated || !user) {
    return null; // Will redirect
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {getBrandCopy(brand, "transactions.title", "Transaction History")}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              View all your crypto transactions and their current status
            </p>
          </div>

          {/* Filters and Stats */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-slate-600" />
                  <span className="font-medium">Filters</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshTransactions}
                  disabled={isLoading}
                  className="text-sm"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Direction Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Transaction Direction
                  </label>
                  <div className="flex space-x-2">
                    {(["all", "incoming", "outgoing"] as const).map((direction) => (
                      <Button
                        key={direction}
                        variant={filter === direction ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilter(direction)}
                        className="text-xs"
                      >
                        {direction === "all" ? "All" : 
                         direction === "incoming" ? "Incoming" : "Outgoing"}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Transaction Status
                  </label>
                  <div className="flex space-x-2">
                    {(["all", "success", "pending", "failed"] as const).map((status) => (
                      <Button
                        key={status}
                        variant={statusFilter === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStatusFilter(status)}
                        className="text-xs"
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {transactions.length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {transactions.filter(tx => tx.status === "success").length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Successful</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {transactions.filter(tx => tx.status === "pending").length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm dark:bg-slate-800/90">
            <CardHeader>
              <CardTitle className="text-xl">Transactions</CardTitle>
              <CardDescription>
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {filteredTransactions.length > 0 ? (
                <div className="space-y-3">
                  {filteredTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-slate-200 dark:bg-slate-600 rounded-full">
                          {getDirectionIcon(tx.direction)}
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-slate-900 dark:text-white">
                              {getTypeLabel(tx.type)}
                            </span>
                            {getStatusBadge(tx.status)}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-300">
                            {tx.description}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {tx.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                          {tx.amount} {tx.currency}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">
                          {tx.direction === "incoming" ? "Received" : "Sent"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    No transactions found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {getBrandCopy(brand, "transactions.noTransactions", "No transactions match your current filters")}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilter("all");
                      setStatusFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


