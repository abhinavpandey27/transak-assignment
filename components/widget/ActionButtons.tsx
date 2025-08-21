"use client";

import { Button } from "@/components/ui/button";
import { Camera, Truck } from "lucide-react";

interface ActionButtonsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
}

export function ActionButtons({ onDeposit, onWithdraw }: ActionButtonsProps) {
  return (
    <div className="flex space-x-4">
      <Button
        onClick={onDeposit}
        className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        <Camera className="h-5 w-5 mr-2" />
        Deposit
      </Button>
      <Button
        onClick={onWithdraw}
        className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        <Truck className="h-5 w-5 mr-2" />
        Withdraw
      </Button>
    </div>
  );
}
