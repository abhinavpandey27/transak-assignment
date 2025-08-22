/**
 * Brand Loader Utility
 * Loads brand configurations and applies them to the application
 */

export interface BrandConfig {
  id: string;
  name: string;
  logo: string;
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
    success: string;
    warning: string;
    error: string;
  };
  copy: {
    appName: string;
    tagline: string;
    login: {
      title: string;
      subtitle: string;
      emailPlaceholder: string;
      otpTitle: string;
      otpSubtitle: string;
      otpPlaceholder: string;
      submit: string;
      resend: string;
    };
    home: {
      title: string;
      deposit: string;
      withdraw: string;
      receive: string;
      transactions: string;
    };
    deposit: {
      title: string;
      subtitle: string;
      amountLabel: string;
      amountPlaceholder: string;
      confirm: string;
    };
    withdraw: {
      title: string;
      subtitle: string;
      tokenLabel: string;
      amountLabel: string;
      amountPlaceholder: string;
      bankLabel: string;
      bankPlaceholder: string;
      ifscLabel: string;
      ifscPlaceholder: string;
      confirm: string;
    };
    receive: {
      title: string;
      subtitle: string;
      copyAddress: string;
      qrTitle: string;
    };
    transactions: {
      title: string;
      noTransactions: string;
      status: {
        pending: string;
        success: string;
        failed: string;
      };
    };
  };
}

// Default brand configuration
const defaultBrand: BrandConfig = {
  id: 'default',
  name: 'Default Brand',
  logo: '/icons/default-logo.svg',
  colors: {
    primary: '#3b82f6',
    primaryForeground: '#ffffff',
    secondary: '#64748b',
    secondaryForeground: '#ffffff',
    accent: '#f1f5f9',
    accentForeground: '#0f172a',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f8fafc',
    mutedForeground: '#64748b',
    border: '#e2e8f0',
    input: '#ffffff',
    ring: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  copy: {
    appName: 'CryptoRamp',
    tagline: 'Seamless Crypto On/Off Ramp',
    login: {
      title: 'Welcome Back',
      subtitle: 'Enter your email to continue',
      emailPlaceholder: 'Enter your email',
      otpTitle: 'Enter OTP',
      otpSubtitle: 'We\'ve sent a 6-digit code to your email',
      otpPlaceholder: 'Enter 6-digit code',
      submit: 'Continue',
      resend: 'Resend Code'
    },
    home: {
      title: 'Dashboard',
      deposit: 'Deposit',
      withdraw: 'Withdraw',
      receive: 'Receive',
      transactions: 'Transactions'
    },
    deposit: {
      title: 'Deposit Fiat',
      subtitle: 'Convert fiat to crypto',
      amountLabel: 'Amount (USD)',
      amountPlaceholder: 'Enter amount',
      confirm: 'Confirm Deposit'
    },
    withdraw: {
      title: 'Withdraw Crypto',
      subtitle: 'Convert crypto to fiat',
      tokenLabel: 'Select Token',
      amountLabel: 'Amount',
      amountPlaceholder: 'Enter amount',
      bankLabel: 'Bank Account',
      bankPlaceholder: 'Enter account number',
      ifscLabel: 'IFSC Code',
      ifscPlaceholder: 'Enter IFSC code',
      confirm: 'Confirm Withdrawal'
    },
    receive: {
      title: 'Receive Crypto',
      subtitle: 'Your assigned wallet address',
      copyAddress: 'Copy Address',
      qrTitle: 'Scan QR Code'
    },
    transactions: {
      title: 'Transaction History',
      noTransactions: 'No transactions yet',
      status: {
        pending: 'Pending',
        success: 'Success',
        failed: 'Failed'
      }
    }
  }
};

/**
 * Load brand configuration (always returns default brand)
 * @returns Default brand configuration
 */
export function loadBrand(): BrandConfig {
  return defaultBrand;
}

/**
 * Apply brand colors to CSS custom properties
 * @param brand - Brand configuration
 */
export function applyBrandColors(brand: BrandConfig): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Apply color variables
  Object.entries(brand.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

/**
 * Get brand copy text with fallback
 * @param brand - Brand configuration
 * @param path - Dot notation path to copy text
 * @param fallback - Fallback text if not found
 * @returns Copy text or fallback
 */
export function getBrandCopy(
  brand: BrandConfig, 
  path: string, 
  fallback: string
): string {
  const keys = path.split('.');
  let current: unknown = brand.copy;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return fallback;
    }
  }
  
  return typeof current === 'string' ? current : fallback;
}
