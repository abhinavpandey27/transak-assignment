"use client";

import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/store/uiSlice";
import { Monitor, Smartphone } from "lucide-react";

export function DeviceToggle() {
  const { device, setDevice } = useUIStore();

  return (
    <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
      <Button
        variant={device === 'web' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setDevice('web')}
        aria-pressed={device === 'web'}
        className="h-8 px-3"
      >
        <Monitor className="h-4 w-4 mr-2" />
        Web
      </Button>
      <Button
        variant={device === 'mobile' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setDevice('mobile')}
        aria-pressed={device === 'mobile'}
        className="h-8 px-3"
      >
        <Smartphone className="h-4 w-4 mr-2" />
        Mobile
      </Button>
    </div>
  );
}

