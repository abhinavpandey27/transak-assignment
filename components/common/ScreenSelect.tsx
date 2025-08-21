"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUIStore } from "@/lib/store/uiSlice";

const screenOptions = [
  { value: 'login', label: 'Login' },
  { value: 'home', label: 'Home' },
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdraw', label: 'Withdraw' },
  { value: 'receive', label: 'Receive' },
  { value: 'transactions', label: 'Transactions' },
];

export function ScreenSelect() {
  const { selectedScreen, setScreen } = useUIStore();

  return (
    <Select value={selectedScreen} onValueChange={setScreen}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Screen" />
      </SelectTrigger>
      <SelectContent>
        {screenOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

