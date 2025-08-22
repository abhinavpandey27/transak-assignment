/**
 * Design System — Playground
 * 
 * This page is the design system and playground. Tweak here to update globally.
 * All components are imported from shared exports - no local inline duplicates.
 * Changes to typography, colors, and component states here will propagate globally.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { OtpInput } from "@/components/widget/OtpInput";
import { EmailInput } from "@/components/widget/EmailInput";
import { DeviceToggle } from "@/components/common/DeviceToggle";
import { ScreenSelect } from "@/components/common/ScreenSelect";
import { TransactionRow } from "@/components/ui/transaction-row";
import { TotalBalanceCard } from "@/components/widget/TotalBalanceCard";
import { useTheme } from "@/components/common/ThemeProvider";
import { TypographySpec } from "@/components/common/TypographySpec";
import { Monitor, Smartphone, Palette, Type, Zap, ToggleLeft, MessageSquare, CheckCircle, AlertCircle, XCircle } from "lucide-react";

export default function DesignSystemPage() {
  const [isMobileView, setIsMobileView] = useState(false);
  const { theme, setTheme } = useTheme();

  const containerClasses = isMobileView 
    ? "max-w-[420px] mx-auto rounded-2xl border shadow-lg overflow-hidden"
    : "max-w-[1100px] mx-auto px-6";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-title-2 text-slate-900 dark:text-white">
                Design System — Playground
              </h1>
              <span className="text-body-2 text-slate-500 dark:text-slate-400">
                Single source of truth for all design foundations
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <Button
                  variant={theme === 'light' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('light')}
                  className="h-8 px-3"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                  className="h-8 px-3"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Dark
                </Button>
              </div>

              {/* Mobile View Toggle */}
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <Button
                  variant={!isMobileView ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setIsMobileView(false)}
                  className="h-8 px-3"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
                <Button
                  variant={isMobileView ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setIsMobileView(true)}
                  className="h-8 px-3"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-8">
        <div className={containerClasses}>
          <div className="space-y-12 p-6">
            
            {/* Typography Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Type className="h-6 w-6 text-blue-600" />
                <h2 className="text-h2 text-slate-900 dark:text-white">Typography — Tokenized System</h2>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Typography System</h4>
                  <p className="text-body-2 text-slate-600 dark:text-slate-400">
                    <strong>Fluid Typography:</strong> All typography roles scale fluidly between 420px (mobile) and 1100px (desktop) 
                    using CSS clamp() functions. Each role includes size, line-height, and letter-spacing. 
                    <strong>Editing CSS variables in globals.css updates all roles globally.</strong>
                  </p>
                </div>
                
                <TypographySpec />
                
                {/* Visual Comparison Section */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border">
                  <h4 className="text-h4 text-slate-900 dark:text-white mb-4">Visual Comparison</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-label-1 font-medium text-slate-700 dark:text-slate-300 mb-3">Title Scale</h5>
                      <div className="space-y-2">
                        <div className="text-title-1 font-semibold text-slate-900 dark:text-white">Title 1 - Hero</div>
                        <div className="text-title-2 font-semibold text-slate-900 dark:text-white">Title 2 - Page</div>
                        <div className="text-title-3 font-semibold text-slate-900 dark:text-white">Title 3 - Section</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-label-1 font-medium text-slate-700 dark:text-slate-300 mb-3">Heading Scale</h5>
                      <div className="space-y-2">
                        <div className="text-h1 font-semibold text-slate-900 dark:text-white">Heading 1</div>
                        <div className="text-h2 font-semibold text-slate-900 dark:text-white">Heading 2</div>
                        <div className="text-h3 font-semibold text-slate-900 dark:text-white">Heading 3</div>
                        <div className="text-h4 font-semibold text-slate-900 dark:text-white">Heading 4</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-label-1 font-medium text-slate-700 dark:text-slate-300 mb-3">Body Text Scale</h5>
                      <div className="space-y-2">
                        <div className="text-body-1 text-slate-900 dark:text-white">Body 1 - Primary text for paragraphs and main content</div>
                        <div className="text-body-2 text-slate-700 dark:text-slate-300">Body 2 - Secondary text for descriptions and metadata</div>
                        <div className="text-body-3 text-slate-600 dark:text-slate-400">Body 3 - Tertiary text for fine print and captions</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-label-1 font-medium text-slate-700 dark:text-slate-300 mb-3">Label Scale</h5>
                      <div className="space-y-2">
                        <div className="text-label-1 text-slate-900 dark:text-white">Label 1 - Large labels and buttons</div>
                        <div className="text-label-2 text-slate-700 dark:text-slate-300">Label 2 - Medium labels and inputs</div>
                        <div className="text-label-3 text-slate-600 dark:text-slate-400">Label 3 - Small labels and meta</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Colors Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Palette className="h-6 w-6 text-blue-600" />
                <h2 className="text-h2 text-slate-900 dark:text-white">Colors</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-primary rounded-lg border flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">Primary</span>
                  </div>
                  <p className="text-body-2 text-slate-600 dark:text-slate-400 text-center">Primary</p>
                </div>
                
                <div className="space-y-2">
                  <div className="h-20 bg-secondary rounded-lg border flex items-center justify-center">
                    <span className="text-secondary-foreground font-medium">Secondary</span>
                  </div>
                  <p className="text-body-2 text-slate-600 dark:text-slate-400 text-center">Secondary</p>
                </div>
                
                <div className="space-y-2">
                  <div className="h-20 bg-accent rounded-lg border flex items-center justify-center">
                    <span className="text-accent-foreground font-medium">Accent</span>
                  </div>
                  <p className="text-body-2 text-slate-600 dark:text-slate-400 text-center">Accent</p>
                </div>
                
                <div className="space-y-2">
                  <div className="h-20 bg-destructive rounded-lg border flex items-center justify-center">
                    <span className="text-white font-medium">Destructive</span>
                  </div>
                  <p className="text-body-2 text-slate-600 dark:text-slate-400 text-center">Destructive</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-muted rounded-lg border flex items-center justify-center">
                    <span className="text-muted-foreground font-medium">Muted</span>
                  </div>
                  <p className="text-body-2 text-slate-600 dark:text-slate-400 text-center">Muted</p>
                </div>
                
                <div className="space-y-2">
                  <div className="h-20 bg-background rounded-lg border flex items-center justify-center">
                    <span className="text-foreground font-medium">Background</span>
                  </div>
                  <p className="text-body-2 text-slate-600 dark:text-slate-400 text-center">Background</p>
                </div>
                
                <div className="space-y-2">
                  <div className="h-20 bg-card rounded-lg border flex items-center justify-center">
                    <span className="text-card-foreground font-medium">Card</span>
                  </div>
                  <p className="text-body-2 text-slate-600 dark:text-slate-400 text-center">Card</p>
                </div>
                
                <div className="space-y-2">
                  <div className="h-20 bg-border rounded-lg border flex items-center justify-center">
                    <span className="text-foreground font-medium">Border</span>
                  </div>
                  <p className="text-body-2 text-slate-600 dark:text-slate-400 text-center">Border</p>
                </div>
              </div>
            </section>

            {/* Buttons Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="h-6 w-6 text-blue-600" />
                <h2 className="text-h2 text-slate-900 dark:text-white">Buttons</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button>Primary Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button variant="secondary" disabled>Disabled Secondary</Button>
                </div>
              </div>
            </section>

            {/* Inputs Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="h-6 w-6 text-blue-600" />
                <h2 className="text-h2 text-slate-900 dark:text-white">Inputs & Forms</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-input">Text Input</Label>
                    <Input id="text-input" placeholder="Enter text..." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-input">Email Input</Label>
                    <Input id="email-input" type="email" placeholder="Enter email..." />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>OTP Input (6 digits)</Label>
                  <OtpInput 
                    onSubmit={async (otp) => { console.log('OTP submitted:', otp); }}
                    placeholder="Enter 6-digit code"
                    submitText="Verify"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Email Input Component</Label>
                  <EmailInput 
                    onSubmit={async (email) => { console.log('Email submitted:', email); }}
                    placeholder="Enter your email"
                    submitText="Continue"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Select Dropdown</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Checkbox</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="checkbox" />
                      <Label htmlFor="checkbox">Accept terms and conditions</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="r1" />
                      <Label htmlFor="r1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="r2" />
                      <Label htmlFor="r2">Option 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option3" id="r3" />
                      <Label htmlFor="r3">Option 3</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </section>

            {/* Cards Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="h-6 w-6 text-blue-600" />
                <h2 className="text-h2 text-slate-900 dark:text-white">Cards & Content</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Card</CardTitle>
                      <CardDescription>This is a basic card component with header and content.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Card content goes here. This demonstrates the basic card structure.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <div>
                    <TotalBalanceCard
                      balance={5000}
                      currency="USD"
                      symbol="$"
                      description="Your Virtual Account is active and you can perform fiat and crypto transactions"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-h4 text-slate-900 dark:text-white">Transaction Rows</h4>
                  <TransactionRow
                    type="deposit"
                    status="success"
                    amount={1000}
                    currency="USD"
                    timestamp={new Date().toLocaleDateString()}
                    description="Fiat deposit converted to ETH"
                  />
                  <TransactionRow
                    type="withdrawal"
                    status="pending"
                    amount={500}
                    currency="USDT"
                    timestamp={new Date(Date.now() - 86400000).toLocaleDateString()}
                    description="USDT withdrawal to bank account"
                  />
                  <TransactionRow
                    type="deposit"
                    status="failed"
                    amount={250}
                    currency="ETH"
                    timestamp={new Date(Date.now() - 172800000).toLocaleDateString()}
                    description="Incoming ETH transfer"
                  />
                </div>
              </div>
            </section>

            {/* Toggles & Controls Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <ToggleLeft className="h-6 w-6 text-blue-600" />
                <h2 className="text-h2 text-slate-900 dark:text-white">Toggles & Controls</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-h4 text-slate-900 dark:text-white">Device Toggle</h4>
                  <DeviceToggle />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-h4 text-slate-900 dark:text-white">Screen Select</h4>
                  <ScreenSelect />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-h4 text-slate-900 dark:text-white">Tabs Interface</h4>
                  <Tabs defaultValue="fiat" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="fiat">Fiat</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    </TabsList>
                                         <TabsContent value="fiat" className="mt-4">
                       <p className="text-body-2 text-slate-600 dark:text-slate-400">
                         Fiat transactions and balances will be displayed here.
                       </p>
                     </TabsContent>
                     <TabsContent value="crypto" className="mt-4">
                       <p className="text-body-2 text-slate-600 dark:text-slate-400">
                         Crypto wallet information and transactions will be displayed here.
                       </p>
                     </TabsContent>
                  </Tabs>
                </div>
              </div>
            </section>

            {/* Feedback Section */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <h2 className="text-h2 text-slate-900 dark:text-white">Feedback & Status</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-h4 text-slate-900 dark:text-white">Status Badges</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Success
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Failed
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-h4 text-slate-900 dark:text-white">Skeleton Loaders</h4>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[300px]" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Responsive Typography Preview */}
            <section>
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="h-6 w-6 text-blue-600" />
                <h2 className="text-h2 text-slate-900 dark:text-white">Responsive Typography Preview</h2>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <h4 className="text-h4 text-amber-800 dark:text-amber-200 mb-2">How to Test Responsive Behavior</h4>
                                      <p className="text-body-2 text-amber-700 dark:text-amber-300">
                      <strong>Desktop View:</strong> Resize your browser window to see how typography scales fluidly. 
                      At 1100px width, you&apos;ll see the maximum sizes. At 420px width, you&apos;ll see the minimum sizes.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mobile Preview */}
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
                    <h5 className="text-label-1 font-medium text-slate-700 dark:text-slate-300 mb-3">Mobile (420px) Preview</h5>
                    <div className="space-y-3">
                      <div className="text-title-1 font-semibold text-slate-900 dark:text-white">Hero Title</div>
                      <div className="text-h2 font-semibold text-slate-900 dark:text-white">Page Heading</div>
                      <div className="text-body-1 text-slate-700 dark:text-slate-300">This is how text appears at mobile sizes with the minimum clamp values.</div>
                    </div>
                  </div>
                  
                  {/* Desktop Preview */}
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
                    <h5 className="text-label-1 font-medium text-slate-700 dark:text-slate-300 mb-3">Desktop (1100px) Preview</h5>
                    <div className="space-y-3">
                      <div className="text-title-1 font-semibold text-slate-900 dark:text-white">Hero Title</div>
                      <div className="text-h2 font-semibold text-slate-900 dark:text-white">Page Heading</div>
                      <div className="text-body-1 text-slate-700 dark:text-slate-300">This is how text appears at desktop sizes with the maximum clamp values.</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <h4 className="text-h4 text-green-800 dark:text-green-200 mb-2">Current Viewport Size</h4>
                  <p className="text-body-2 text-green-700 dark:text-green-300">
                    Your current viewport width is: <span className="font-mono font-medium">{typeof window !== 'undefined' ? window.innerWidth : 'Unknown'}px</span>
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
