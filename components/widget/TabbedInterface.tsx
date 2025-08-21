"use client";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface TabbedInterfaceProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onFiltersClick: () => void;
}

export function TabbedInterface({ activeTab, onTabChange, onFiltersClick }: TabbedInterfaceProps) {
  const tabs = [
    { id: 'fiat', label: 'Fiat Account' },
    { id: 'crypto', label: 'Crypto Wallet' }
  ];

  return (
    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === tab.id
                ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onFiltersClick}
        className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
    </div>
  );
}
