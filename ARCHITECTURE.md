# Architecture Overview

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Demo Hub (app/page.tsx)                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Device Toggle  │  │ Screen Select   │  │  Theme Toggle   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │        Preview Frame            │
                    │   (PreviewFrame.tsx)           │
                    └─────────────────────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │      Screen Components          │
                    │  ┌─────────┐ ┌─────────┐      │
                    │  │ Login   │ │ Home    │      │
                    │  │ Screen  │ │ Screen  │      │
                    │  └─────────┘ └─────────┘      │
                    │  ┌─────────┐ ┌─────────┐      │
                    │  │ Deposit │ │Withdraw │      │
                    │  │ Screen  │ │ Screen  │      │
                    │  └─────────┘ └─────────┘      │
                    └─────────────────────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │      Widget Components          │
                    │  ┌─────────┐ ┌─────────┐      │
                    │  │Wallet   │ │Balance  │      │
                    │  │Sidebar  │ │ Cards   │      │
                    │  └─────────┘ └─────────┘      │
                    │  ┌─────────┐ ┌─────────┐      │
                    │  │Action   │ │Tabbed   │      │
                    │  │Buttons  │ │Interface│      │
                    │  └─────────┘ └─────────┘      │
                    └─────────────────────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │        State Management        │
                    │        (Zustand Stores)        │
                    │  ┌─────────┐ ┌─────────┐      │
                    │  │   UI    │ │  Auth   │      │
                    │  │ Store   │ │ Store   │      │
                    │  └─────────┘ └─────────┘      │
                    │  ┌─────────┐ ┌─────────┐      │
                    │  │Balance  │ │Transaction│    │
                    │  │ Store   │ │ Store   │      │
                    │  └─────────┘ └─────────┘      │
                    └─────────────────────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │        Mock Adapter            │
                    │     (mockAdapter.ts)           │
                    │  ┌─────────────────────────┐   │
                    │  │  Simulated API Calls    │   │
                    │  │  • Login/OTP            │   │
                    │  │  • Balance Updates      │   │
                    │  │  • Transaction History  │   │
                    │  │  • Deposit/Withdraw     │   │
                    │  └─────────────────────────┘   │
                    └─────────────────────────────────┘
```

## 🔄 Data Flow

### 1. **User Interaction Flow**
```
User Action → Component → Store → Mock Adapter → Store → UI Update
```

**Example: Login Flow**
1. User types email → `EmailInput` component
2. Component calls `useAuthStore.login(email)`
3. Store calls `mockAdapter.login(email)`
4. Mock adapter simulates API call and returns result
5. Store updates state with result
6. Component re-renders with new state

### 2. **State Synchronization**
```
URL Parameters ↔ UI Store ↔ Local Storage ↔ Components
```

- **URL Sync**: Device and screen selection persist in URL
- **Local Storage**: Zustand persists state across sessions
- **Real-time Updates**: Components automatically re-render on state changes

## 🧩 Component Hierarchy

### **Level 1: Demo Hub**
- **`app/page.tsx`**: Main entry point
- **`app/layout.tsx`**: Root layout with theme provider

### **Level 2: Common Components**
- **`DeviceToggle`**: Web/Mobile switcher
- **`ScreenSelect`**: Screen dropdown selector
- **`PreviewFrame`**: Main preview container
- **`ThemeProvider`**: Theme management

### **Level 3: Screen Components**
- **`LoginScreen`**: Authentication flow
- **`HomeScreen`**: Main dashboard
- **`DepositScreen`**: Deposit placeholder
- **`WithdrawScreen`**: Withdraw placeholder
- **`ReceiveScreen`**: Receive placeholder
- **`TransactionsScreen`**: Transactions placeholder

### **Level 4: Widget Components**
- **`WalletSidebar`**: Navigation sidebar
- **`TotalBalanceCard`**: Balance display
- **`ActionButtons`**: Action buttons
- **`TabbedInterface`**: Tabbed content
- **`FiatTransactionList`**: Fiat transaction list
- **`CryptoWalletList`**: Crypto wallet list

### **Level 5: UI Components**
- **shadcn/ui**: Button, Card, Input, Select, etc.
- **Custom**: TransactionRow, OTP Input, etc.

## 🗄️ State Management Architecture

### **Store Structure**
```typescript
// Each store follows this pattern:
interface StoreState {
  // State properties
  data: DataType[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchData: () => Promise<void>;
  updateData: (data: DataType) => void;
  clearError: () => void;
}
```

### **Store Responsibilities**

#### **`uiSlice`** - UI State
- Device type (web/mobile)
- Selected screen
- URL synchronization
- Local storage persistence

#### **`authSlice`** - Authentication
- User authentication status
- Login/OTP flow
- User data management
- Session persistence

#### **`balanceSlice`** - Financial Data
- Fiat balance
- Token balances
- Deposit/withdraw operations
- Balance refresh logic

#### **`transactionSlice`** - Transaction History
- Transaction list
- Transaction status updates
- Incoming transaction generation
- History refresh logic

## 🔌 Adapter Pattern

### **Mock Adapter (`mockAdapter.ts`)**
- **Purpose**: Simulates real API endpoints
- **Features**:
  - Deterministic data generation
  - Network delay simulation
  - Error state simulation
  - Realistic crypto operations

### **Key Methods**
```typescript
class MockAdapter {
  async login(email: string): Promise<LoginResult>
  async verifyOTP(otp: string): Promise<OTPResult>
  async getUserData(): Promise<User>
  async deposit(amount: number): Promise<DepositResult>
  async withdraw(token: string, amount: number): Promise<WithdrawResult>
  async generateIncomingTransaction(): Promise<Transaction>
}
```

## 🎨 Branding & Typography System

### **Font System**
- **Primary Font**: Instrument Sans (Google Fonts)
- **Font Weights**: Light, Normal, Medium, Semibold, Bold
- **Implementation**: CSS variables with Tailwind integration
- **Fallbacks**: System font stack for optimal performance

### **Brand Configuration**
```json
{
  "id": "default",
  "name": "Default Brand",
  "colors": { /* CSS custom properties */ },
  "copy": { /* Text content */ }
}
```

### **Dynamic Theming**
- CSS custom properties for brand colors
- Runtime color application
- Fallback to default values
- Consistent theming across components
- Typography scaling with font weights

## 📱 Responsive Design

### **Device Switching**
- **Web Mode**: Full-width layout with sidebar
- **Mobile Mode**: Constrained width with mobile-optimized layout
- **URL Persistence**: Device preference saved in URL

### **Breakpoint Strategy**
- Mobile-first approach
- Tailwind CSS breakpoints
- Component-level responsive behavior
- Touch-friendly interactions

## 🔒 Security & Validation

### **Form Validation**
- **Zod Schemas**: Type-safe validation
- **Real-time Validation**: Immediate feedback
- **Error Handling**: User-friendly error messages
- **Input Sanitization**: XSS protection

### **Authentication Flow**
- Email validation
- OTP verification
- Session management
- Secure state persistence

## 🚀 Performance Optimizations

### **Font Optimization**
- **Google Fonts**: Instrument Sans with variable font support
- **Font Loading**: Optimized font loading with Next.js font optimization
- **CSS Variables**: Font family stored in CSS custom properties
- **Fallbacks**: System font fallbacks for optimal performance

### **Code Splitting**
- Route-based code splitting
- Component lazy loading
- Bundle optimization
- Tree shaking

### **State Optimization**
- Selective re-renders
- Memoized selectors
- Efficient state updates
- Minimal re-renders

## 🧪 Testing Strategy

### **Component Testing**
- React Testing Library
- Component isolation
- Props testing
- User interaction testing

### **Store Testing**
- Zustand store testing
- Action testing
- State mutation testing
- Async operation testing

### **Integration Testing**
- End-to-end flows
- Component integration
- State synchronization
- Error handling

This architecture provides a solid foundation for building scalable, maintainable crypto applications with clear separation of concerns and predictable data flow.
