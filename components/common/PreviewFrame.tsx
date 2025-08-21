"use client";

import { useUIStore } from "@/lib/store/uiSlice";
import { useEffect } from "react";
import { syncUIStateToURL, readUIStateFromURL } from "@/lib/store/uiSlice";

// Import screen components from the screens directory
import { LoginScreen } from "@/components/screens/LoginScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { DepositScreen } from "@/components/screens/DepositScreen";
import { WithdrawScreen } from "@/components/screens/WithdrawScreen";
import { ReceiveScreen } from "@/components/screens/ReceiveScreen";
import { TransactionsScreen } from "@/components/screens/TransactionsScreen";

const screenComponents = {
  login: LoginScreen,
  home: HomeScreen,
  deposit: DepositScreen,
  withdraw: WithdrawScreen,
  receive: ReceiveScreen,
  transactions: TransactionsScreen,
};

export function PreviewFrame() {
  const { device, selectedScreen, setDevice, setScreen } = useUIStore();

  // Read from URL only on mount (no dependencies)
  useEffect(() => {
    const urlState = readUIStateFromURL();
    if (urlState.device !== device || urlState.screen !== selectedScreen) {
      setDevice(urlState.device);
      setScreen(urlState.screen);
    }
  }, []); // Only run on mount

  // Sync state changes to URL
  useEffect(() => {
    syncUIStateToURL(device, selectedScreen);
  }, [device, selectedScreen]);

  const SelectedScreenComponent = screenComponents[selectedScreen];

  if (!SelectedScreenComponent) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Screen not found: {selectedScreen}
      </div>
    );
  }

  if (device === 'mobile') {
    return (
      <div className="max-w-[420px] mx-auto rounded-2xl border shadow-lg overflow-hidden">
        <SelectedScreenComponent />
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6">
      <SelectedScreenComponent />
    </div>
  );
}
