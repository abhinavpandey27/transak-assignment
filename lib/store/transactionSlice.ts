/**
 * Transaction Store Slice
 * Manages transaction history, status updates, and incoming transactions
 */

import { create } from 'zustand';
import { mockAdapter, Transaction } from '../adapters/mockAdapter';

interface TransactionState {
  // State
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  refreshTransactions: () => Promise<void>;
  generateIncomingTransaction: () => Promise<void>;
  clearError: () => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  // Initial state
  transactions: [],
  isLoading: false,
  error: null,

  // Refresh transactions from mock adapter
  refreshTransactions: async () => {
    set({ isLoading: true });
    
    try {
      const userData = await mockAdapter.getUserData();
      set({ 
        transactions: userData.transactions,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to refresh transactions' 
      });
    }
  },

  // Generate incoming transaction (for demo purposes)
  generateIncomingTransaction: async () => {
    try {
      await mockAdapter.generateIncomingTransaction();
      // Refresh transactions to show the new one
      await get().refreshTransactions();
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate incoming transaction' 
      });
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  }
}));
