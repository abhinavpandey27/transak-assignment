/**
 * Landing Page
 * Showcases the crypto widget demo
 */

import { Suspense } from "react";
import { DeviceToggle } from "@/components/common/DeviceToggle";
import { ScreenSelect } from "@/components/common/ScreenSelect";
import { PreviewFrame } from "@/components/common/PreviewFrame";

export default function DemoHub() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Title and Author */}
            <div className="flex items-center space-x-3">
              <h1 className="text-h2 text-slate-900 dark:text-white">
                Transak Demo
              </h1>
              <span className="text-body-2 text-slate-500 dark:text-slate-400">
                built by Abhinav Pandey
              </span>
            </div>

            {/* Center: Screen Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-body-2 text-slate-600 dark:text-slate-300">
                Screen:
              </span>
              <ScreenSelect />
            </div>

            {/* Design System Link */}
            <div className="flex items-center space-x-4">
              <a 
                href="/design-system" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Design System
              </a>
            </div>

            {/* Right: Device Toggle */}
            <DeviceToggle />
          </div>
        </div>
      </header>

      {/* Preview Area */}
      <main className="py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-body-2 text-slate-600 dark:text-slate-300">Loading preview...</p>
            </div>
          </div>
        }>
          <PreviewFrame />
        </Suspense>
      </main>
    </div>
  );
}
