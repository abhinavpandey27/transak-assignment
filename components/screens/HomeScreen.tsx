"use client";

import { useState, useEffect } from "react";
import { useBalanceStore } from "@/lib/store/balanceSlice";
import { useTransactionStore } from "@/lib/store/transactionSlice";
import { loadBrand, applyBrandColors, getBrandCopy } from "@/lib/brand/brandLoader";
import { WalletSidebar } from "@/components/widget/WalletSidebar";
import { TotalBalanceCard } from "@/components/widget/TotalBalanceCard";
import { ActionButtons } from "@/components/widget/ActionButtons";
import { TabbedInterface } from "@/components/widget/TabbedInterface";
import { FiatTransactionList } from "@/components/widget/FiatTransactionList";
import { CryptoWalletList } from "@/components/widget/CryptoWalletList";

export function HomeScreen() {
  const { fiatBalance, tokenBalances, refreshBalances, isLoading } = useBalanceStore();
  const { refreshTransactions } = useTransactionStore();
  const [currentScreen, setCurrentScreen] = useState('wallet');
  const [activeTab, setActiveTab] = useState('fiat');
  
  // Load brand configuration (default for now)
  const brand = loadBrand();
  
  useEffect(() => {
    // Apply brand colors
    applyBrandColors(brand);
    
    // Load initial data
    refreshBalances();
    refreshTransactions();
  }, [refreshBalances, refreshTransactions, brand]);

  const handleDeposit = () => {
    // TODO: Implement deposit flow
    console.log('Deposit clicked');
  };

  const handleWithdraw = () => {
    // TODO: Implement withdraw flow
    console.log('Withdraw clicked');
  };

  const handleFiltersClick = () => {
    // TODO: Implement filters
    console.log('Filters clicked');
  };

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Calculate total balance
  const totalBalance = (fiatBalance?.balance || 0) + 
    tokenBalances.reduce((sum, token) => sum + (token.usdValue || 0), 0);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <WalletSidebar 
        currentScreen={currentScreen}
        onScreenChange={handleScreenChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-6">
          <h1 className="text-h1 text-slate-900 dark:text-white text-center">
            Your Wallet
          </h1>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Total Balance Section */}
          <div className="mb-8">
            <TotalBalanceCard
              balance={totalBalance}
              currency="USD"
              symbol="$"
              description="Your Virtual Account is active and you can perform fiat and crypto transactions"
            />
          </div>

          {/* Action Buttons */}
          <div className="mb-8">
            <ActionButtons
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
            />
          </div>

          {/* Tabbed Interface */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <TabbedInterface
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onFiltersClick={handleFiltersClick}
            />
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'fiat' ? (
                <FiatTransactionList />
              ) : (
                <CryptoWalletList />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
