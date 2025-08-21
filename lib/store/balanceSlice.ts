/**
 * Balance Store Slice
 * Manages fiat and token balances, deposit/withdraw operations
 */

import { create } from 'zustand';
import { mockAdapter, TokenBalance, FiatBalance } from '../adapters/mockAdapter';

interface BalanceState {
  // State
  fiatBalance: FiatBalance | null;
  tokenBalances: TokenBalance[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  refreshBalances: () => Promise<void>;
  deposit: (amount: number) => Promise<boolean>;
  withdraw: (tokenSymbol: string, amount: number, bankAccount: string, ifscCode: string) => Promise<boolean>;
  clearError: () => void;
}

export const useBalanceStore = create<BalanceState>((set, get) => ({
  // Initial state
  fiatBalance: null,
  tokenBalances: [],
  isLoading: false,
  error: null,

  // Refresh balances from mock adapter
  refreshBalances: async () => {
    set({ isLoading: true });
    
    try {
      const userData = await mockAdapter.getUserData();
      set({ 
        fiatBalance: userData.fiatBalance,
        tokenBalances: userData.tokenBalances,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to refresh balances' 
      });
    }
  },

  // Deposit fiat to get tokens
  deposit: async (amount: number) => {
    set({ isLoading: true, error: null });
    
    try {
      const result = await mockAdapter.deposit(amount);
      
      if (result.success) {
        // Refresh balances after successful deposit
        await get().refreshBalances();
        set({ isLoading: false });
        return true;
      } else {
        set({ isLoading: false, error: result.message });
        return false;
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Deposit failed' 
      });
      return false;
    }
  },

  // Withdraw tokens to get fiat
  withdraw: async (tokenSymbol: string, amount: number, bankAccount: string, ifscCode: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const result = await mockAdapter.withdraw(tokenSymbol, amount, bankAccount, ifscCode);
      
      if (result.success) {
        // Refresh balances after successful withdrawal
        await get().refreshBalances();
        set({ isLoading: false });
        return true;
      } else {
        set({ isLoading: false, error: result.message });
        return false;
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Withdrawal failed' 
      });
      return false;
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  }
}));
