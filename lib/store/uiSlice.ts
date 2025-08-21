/**
 * UI Store Slice
 * Manages theme, device mode, and UI state preferences
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DeviceType = 'web' | 'mobile';
export type ScreenType = 'login' | 'home' | 'deposit' | 'withdraw' | 'receive' | 'transactions';

interface UIState {
  device: DeviceType;
  selectedScreen: ScreenType;
  setDevice: (device: DeviceType) => void;
  setScreen: (screen: ScreenType) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      device: 'web',
      selectedScreen: 'login',
      setDevice: (device) => set({ device }),
      setScreen: (selectedScreen) => set({ selectedScreen }),
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({ device: state.device, selectedScreen: state.selectedScreen }),
    }
  )
);

// URL persistence helpers
export const syncUIStateToURL = (device: DeviceType, screen: ScreenType) => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    url.searchParams.set('device', device);
    url.searchParams.set('screen', screen);
    window.history.replaceState({}, '', url.toString());
  }
};

export const readUIStateFromURL = (): { device: DeviceType; screen: ScreenType } => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    const device = (url.searchParams.get('device') as DeviceType) || 'web';
    const screen = (url.searchParams.get('screen') as ScreenType) || 'login';
    return { device, screen };
  }
  return { device: 'web', screen: 'login' };
};
