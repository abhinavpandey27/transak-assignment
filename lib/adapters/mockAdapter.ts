/**
 * Mock Adapter for Crypto Operations
 * Simulates real-world crypto operations with deterministic data
 */

export interface TokenBalance {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  icon: string;
}

export interface FiatBalance {
  currency: string;
  balance: number;
  symbol: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'receive';
  status: 'pending' | 'success' | 'failed';
  amount: number;
  currency: string;
  timestamp: Date;
  description: string;
  direction: 'incoming' | 'outgoing';
}

export interface User {
  id: string;
  email: string;
  walletAddress: string;
  fiatBalance: FiatBalance;
  tokenBalances: TokenBalance[];
  transactions: Transaction[];
}

// Seed for deterministic randomness
let seed = 12345;

function seededRandom(): number {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Mock user data
const mockUser: User = {
  id: 'user-001',
  email: 'demo@example.com',
  walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  fiatBalance: {
    currency: 'USD',
    balance: 3000,
    symbol: '$'
  },
  tokenBalances: [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 2.5,
      usdValue: 4500,
      icon: '/icons/eth.svg'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      balance: 1000,
      usdValue: 1000,
      icon: '/icons/usdt.svg'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 500,
      usdValue: 500,
      icon: '/icons/usdc.svg'
    }
  ],
  transactions: [
    {
      id: 'tx-001',
      type: 'deposit',
      status: 'success',
      amount: 1000,
      currency: 'USD',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      description: 'Fiat deposit converted to ETH',
      direction: 'incoming'
    },
    {
      id: 'tx-002',
      type: 'withdraw',
      status: 'success',
      amount: 500,
      currency: 'USDT',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      description: 'USDT withdrawal to bank account',
      direction: 'outgoing'
    }
  ]
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockAdapter {
  private user: User = { ...mockUser };

  async login(email: string): Promise<{ success: boolean; message: string }> {
    await delay(1000); // Simulate API delay
    
    if (email.includes('@')) {
      return { success: true, message: 'OTP sent to your email' };
    }
    
    return { success: false, message: 'Invalid email format' };
  }

  async verifyOTP(otp: string): Promise<{ success: boolean; message: string }> {
    await delay(800);
    
    if (otp === '123456') {
      return { success: true, message: 'Login successful' };
    }
    
    return { success: false, message: 'Invalid OTP' };
  }

  async getUserData(): Promise<User> {
    await delay(500);
    return { ...this.user };
  }

  async deposit(amount: number): Promise<{ success: boolean; message: string; transactionId?: string }> {
    await delay(2000); // Simulate processing time
    
    if (amount <= 0) {
      return { success: false, message: 'Amount must be greater than 0' };
    }
    
    if (amount > this.user.fiatBalance.balance) {
      return { success: false, message: 'Insufficient fiat balance' };
    }

    // Simulate conversion to ETH (1 USD = 0.0005 ETH)
    const ethAmount = amount * 0.0005;
    
    // Update balances
    this.user.fiatBalance.balance -= amount;
    this.user.tokenBalances[0].balance += ethAmount;
    this.user.tokenBalances[0].usdValue = this.user.tokenBalances[0].balance * 1800; // Mock ETH price

    // Create transaction
    const transaction: Transaction = {
      id: generateId(),
      type: 'deposit',
      status: 'success',
      amount: amount,
      currency: 'USD',
      timestamp: new Date(),
      description: `Fiat deposit converted to ${ethAmount.toFixed(4)} ETH`,
      direction: 'incoming'
    };

    this.user.transactions.unshift(transaction);

    return { 
      success: true, 
      message: `Successfully converted $${amount} to ${ethAmount.toFixed(4)} ETH`,
      transactionId: transaction.id
    };
  }

  async withdraw(tokenSymbol: string, amount: number, bankAccount: string, ifscCode: string): Promise<{ success: boolean; message: string; transactionId?: string }> {
    await delay(2500); // Simulate processing time
    
    if (amount <= 0) {
      return { success: false, message: 'Amount must be greater than 0' };
    }

    const tokenIndex = this.user.tokenBalances.findIndex(t => t.symbol === tokenSymbol);
    if (tokenIndex === -1) {
      return { success: false, message: 'Invalid token' };
    }

    if (amount > this.user.tokenBalances[tokenIndex].balance) {
      return { success: false, message: 'Insufficient token balance' };
    }

    if (!bankAccount || !ifscCode) {
      return { success: false, message: 'Bank details are required' };
    }

    // Simulate conversion to USD (1 ETH = 1800 USD, 1 USDT = 1 USD, 1 USDC = 1 USD)
    let usdAmount = 0;
    switch (tokenSymbol) {
      case 'ETH':
        usdAmount = amount * 1800;
        break;
      case 'USDT':
      case 'USDC':
        usdAmount = amount;
        break;
      default:
        usdAmount = amount;
    }

    // Update balances
    this.user.tokenBalances[tokenIndex].balance -= amount;
    this.user.tokenBalances[tokenIndex].usdValue = this.user.tokenBalances[tokenIndex].balance * (tokenSymbol === 'ETH' ? 1800 : 1);
    this.user.fiatBalance.balance += usdAmount;

    // Create transaction
    const transaction: Transaction = {
      id: generateId(),
      type: 'withdraw',
      status: 'success',
      amount: amount,
      currency: tokenSymbol,
      timestamp: new Date(),
      description: `${amount} ${tokenSymbol} withdrawn to bank account`,
      direction: 'outgoing'
    };

    this.user.transactions.unshift(transaction);

    return { 
      success: true, 
      message: `Successfully converted ${amount} ${tokenSymbol} to $${usdAmount.toFixed(2)}`,
      transactionId: transaction.id
    };
  }

  async generateIncomingTransaction(): Promise<Transaction> {
    // Simulate incoming transaction (e.g., from another wallet)
    const amount = Math.floor(seededRandom() * 100) + 10; // 10-110 USD
    const tokens = ['ETH', 'USDT', 'USDC'];
    const token = tokens[Math.floor(seededRandom() * tokens.length)];
    
    const transaction: Transaction = {
      id: generateId(),
      type: 'receive',
      status: 'pending',
      amount: amount,
      currency: token,
      timestamp: new Date(),
      description: `Incoming ${amount} ${token}`,
      direction: 'incoming'
    };

    // Simulate confirmation after some time
    setTimeout(() => {
      const tx = this.user.transactions.find(t => t.id === transaction.id);
      if (tx) {
        tx.status = 'success';
        // Update token balance
        const tokenIndex = this.user.tokenBalances.findIndex(t => t.symbol === token);
        if (tokenIndex !== -1) {
          this.user.tokenBalances[tokenIndex].balance += amount;
          this.user.tokenBalances[tokenIndex].usdValue = this.user.tokenBalances[tokenIndex].balance * (token === 'ETH' ? 1800 : 1);
        }
      }
    }, 5000 + Math.random() * 10000); // 5-15 seconds

    this.user.transactions.unshift(transaction);
    return transaction;
  }

  async resetDemo(): Promise<void> {
    await delay(500);
    this.user = { ...mockUser };
    seed = 12345; // Reset seed
  }

  // Getter for current state
  getCurrentUser(): User {
    return { ...this.user };
  }
}

// Export singleton instance
export const mockAdapter = new MockAdapter();
