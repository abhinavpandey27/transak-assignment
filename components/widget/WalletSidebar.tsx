"use client";

import { Button } from "@/components/ui/button";
import { 
  Home, 
  User, 
  FileText, 
  Shield, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  MoreHorizontal
} from "lucide-react";
import { useAuthStore } from "@/lib/store/authSlice";
import { useRouter } from "next/navigation";

interface WalletSidebarProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

const navigationItems = [
  { id: 'wallet', label: 'Your Wallet', icon: Home, active: true },
  { id: 'profile', label: 'Your Profile', icon: User, active: false },
  { id: 'limits', label: 'Transaction Limits', icon: FileText, active: false },
  { id: 'security', label: 'KYC and Security', icon: Shield, active: false },
  { id: 'settings', label: 'Settings', icon: Settings, active: false },
];

export function WalletSidebar({ currentScreen, onScreenChange }: WalletSidebarProps) {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/widget/login");
  };

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Logoipsum</h1>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start h-12 ${
                isActive 
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" 
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
              onClick={() => onScreenChange(item.id)}
              disabled={item.id !== 'wallet'} // Only wallet is enabled for now
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <span className="text-sm text-slate-600 dark:text-slate-300">Light Mode</span>
          <div className="flex items-center space-x-1 bg-white dark:bg-slate-700 p-1 rounded">
            <Button
              variant="default"
              size="sm"
              className="h-6 px-2 text-xs"
            >
              <Sun className="h-3 w-3 mr-1" />
              Light
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-slate-600 dark:text-slate-300"
            >
              <Moon className="h-3 w-3 mr-1" />
              Dark
            </Button>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start h-12 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
