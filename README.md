# Transak Demo Hub

A clean, modern demo application showcasing a crypto widget with device switching and screen selection capabilities.

## 🏗️ Project Structure

```
transak-assignment/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Main demo hub page
│   └── design-system/           # Design system playground
│       └── page.tsx             # Design system page
├── components/                   # React components
│   ├── common/                  # Shared components
│   │   ├── DeviceToggle.tsx     # Web/Mobile device switcher
│   │   ├── PreviewFrame.tsx     # Main preview container
│   │   ├── ScreenSelect.tsx     # Screen selector dropdown
│   │   └── ThemeProvider.tsx    # Theme management
│   ├── screens/                 # Screen components
│   │   ├── LoginScreen.tsx      # Authentication screen
│   │   ├── HomeScreen.tsx       # Main dashboard
│   │   ├── DepositScreen.tsx    # Deposit placeholder
│   │   ├── WithdrawScreen.tsx   # Withdraw placeholder
│   │   ├── ReceiveScreen.tsx    # Receive placeholder
│   │   └── TransactionsScreen.tsx # Transactions placeholder
│   └── ui/                      # Reusable UI components
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       ├── input.tsx            # Input component
│       ├── select.tsx           # Select component
│       └── ...                  # Other UI components
├── lib/                         # Core library code
│   ├── adapters/                # Data adapters
│   │   └── mockAdapter.ts       # Mock data and operations
│   ├── brand/                   # Branding system
│   │   └── brandLoader.ts       # Brand configuration loader
│   ├── store/                   # State management
│   │   ├── authSlice.ts         # Authentication state
│   │   ├── balanceSlice.ts      # Balance management
│   │   ├── transactionSlice.ts  # Transaction state
│   │   └── uiSlice.ts           # UI state (device, screen)
│   └── validators/              # Form validation
│       ├── auth.ts              # Authentication schemas
│       └── transaction.ts       # Transaction schemas
├── brands/                      # Brand configurations
│   └── default.json             # Default brand settings
└── public/                      # Static assets
    └── icons/                   # Icon files
```

## 🚀 How It Works

### 1. **Entry Point**
- `app/page.tsx` - Main demo hub that renders the preview frame
- `app/layout.tsx` - Root layout with theme provider and global styles

### 2. **State Management (Zustand)**
The app uses Zustand for lightweight state management with four main stores:

- **`uiSlice`**: Manages device type (web/mobile) and selected screen
- **`authSlice`**: Handles authentication state, login flow, and user data
- **`balanceSlice`**: Manages fiat and crypto balances
- **`transactionSlice`**: Handles transaction history and operations

### 3. **Component Architecture**

#### **Common Components**
- `DeviceToggle`: Switches between web and mobile views
- `ScreenSelect`: Dropdown to select different screens
- `PreviewFrame`: Main container that renders the selected screen
- `ThemeProvider`: Manages light/dark theme switching

#### **Screen Components**
- `LoginScreen`: Email + OTP authentication flow
- `HomeScreen`: Dashboard with wallet sidebar and balance cards
- Other screens: Placeholder components for future implementation

#### **Widget Components**
- `WalletSidebar`: Navigation sidebar for wallet screens
- `TotalBalanceCard`: Displays total balance information
- `ActionButtons`: Deposit/Withdraw action buttons
- `TabbedInterface`: Tabbed view for fiat/crypto sections

### 4. **Data Flow**

```
User Action → Component → Store → Mock Adapter → Store → UI Update
```

- **Mock Adapter**: Simulates real API calls with deterministic data
- **Stores**: Centralized state management with async operations
- **Components**: React components that consume store state

### 5. **Branding System**
- **`brandLoader.ts`**: Loads brand configuration (currently default only)
- **`brands/default.json`**: Brand colors, copy text, and styling
- **Dynamic theming**: CSS custom properties for brand colors

### 6. **URL Persistence**
- Device and screen selection are synced to URL parameters
- State persists across page refreshes
- Shareable demo URLs

## 🎯 Key Features

- **Device Switching**: Toggle between web and mobile views
- **Screen Selection**: Switch between different app screens
- **Design System**: Comprehensive playground for all design foundations
- **Theme Support**: Light/dark mode with system preference detection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Mock Data**: Realistic crypto operations simulation
- **Form Validation**: Zod schemas for input validation
- **Type Safety**: Full TypeScript support

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
npm install
npm run dev
```

### Typography System
The app uses a tokenized typography system with fluid scaling:

- **Classes**: Use semantic classes like `text-h1`, `text-body-1`, `text-label-2`
- **Fluid Scaling**: Automatically scales between mobile (420px) and desktop (1100px)
- **Customization**: Edit CSS variables in `app/globals.css` to update globally
- **Tokens**: All typography roles defined in `lib/tokens/typography.ts`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Customization

### Adding New Screens
1. Create component in `components/screens/`
2. Add to `screenComponents` in `PreviewFrame.tsx`
3. Add option to `ScreenSelect.tsx`

### Branding
1. Modify `brands/default.json` for colors and copy
2. Update `brandLoader.ts` for new brand logic
3. Apply brand colors in components

### State Management
1. Create new store slice in `lib/store/`
2. Import and use in components
3. Follow Zustand patterns for async operations

## 📱 Demo Flow

1. **Landing**: Demo hub with device and screen controls
2. **Login**: Email input → OTP verification (demo: use `123456`)
3. **Home**: Dashboard with wallet overview and actions
4. **Navigation**: Switch between different app screens
5. **Device Toggle**: See responsive behavior
6. **Design System**: Comprehensive playground for all design foundations

## 🎨 Design System

- **Design System Page**: Comprehensive playground at `/design-system`
- **Typography**: Instrument Sans font family with tokenized system
- **Typography Tokens**: Fluid scaling between 420px (mobile) and 1100px (desktop)
- **Tailwind CSS**: Utility-first CSS framework with custom fontSize tokens
- **Shadcn/ui**: High-quality React components
- **Lucide Icons**: Beautiful, consistent icon set
- **CSS Variables**: Dynamic theming and brand colors
- **Component Library**: All shared components with real states

This architecture provides a clean, maintainable foundation for building and demonstrating crypto widget functionality with a focus on developer experience and code quality.
