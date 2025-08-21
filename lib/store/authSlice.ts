/**
 * Authentication Store Slice
 * Manages user authentication state, login flow, and user data
 */

import { create } from 'zustand';
import { mockAdapter, User } from '../adapters/mockAdapter';

interface AuthState {
  // State
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  
  // Actions
  login: (email: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  refreshUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,

  // Login with email
  login: async (email: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const result = await mockAdapter.login(email);
      
      if (result.success) {
        set({ isLoading: false });
        return true;
      } else {
        set({ isLoading: false, error: result.message });
        return false;
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      });
      return false;
    }
  },

  // Verify OTP
  verifyOTP: async (otp: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const result = await mockAdapter.verifyOTP(otp);
      
      if (result.success) {
        // Fetch user data after successful OTP verification
        const userData = await mockAdapter.getUserData();
        
        set({ 
          isAuthenticated: true, 
          isLoading: false, 
          user: userData,
          error: null 
        });
        
        return true;
      } else {
        set({ isLoading: false, error: result.message });
        return false;
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'OTP verification failed' 
      });
      return false;
    }
  },

  // Logout
  logout: () => {
    set({ 
      isAuthenticated: false, 
      user: null, 
      error: null 
    });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Refresh user data
  refreshUserData: async () => {
    const { isAuthenticated } = get();
    if (!isAuthenticated) return;

    set({ isLoading: true });
    
    try {
      const userData = await mockAdapter.getUserData();
      set({ user: userData, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to refresh user data' 
      });
    }
  }
}));
