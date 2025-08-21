"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { OTPInput } from "@/components/ui/otp-input"
import { TransactionRow } from "@/components/ui/transaction-row"
import { BalanceCard } from "@/components/widget/BalanceCard"
import { DeviceToggle } from "@/components/common/DeviceToggle"
import { useTheme } from "@/components/common/ThemeProvider"
import { Moon, Sun, Smartphone, Monitor, Eye, X } from "lucide-react"

export default function DesignSystemPage() {
  const [isMobileView, setIsMobileView] = useState(false)
  const [otpValue, setOtpValue] = useState("")
  const [showToast, setShowToast] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const showToastMessage = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const content = (
    <div className="max-w-[1100px] mx-auto px-6 space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between pt-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          <p className="text-xl text-muted-foreground mt-2">Playground</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center space-x-2"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span>{theme === "light" ? "Dark" : "Light"}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileView(!isMobileView)}
            className="flex items-center space-x-2"
          >
            {isMobileView ? <Monitor className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
            <span>{isMobileView ? "Desktop" : "Mobile"}</span>
          </Button>
        </div>
      </div>

      {/* Typography Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Heading 1 - The quick brown fox</h1>
            <p className="text-sm text-muted-foreground mt-1">text-4xl font-bold tracking-tight</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold">Heading 2 - The quick brown fox</h2>
            <p className="text-sm text-muted-foreground mt-1">text-3xl font-semibold</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Heading 3 - The quick brown fox</h3>
            <p className="text-sm text-muted-foreground mt-1">text-2xl font-semibold</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Heading 4 - The quick brown fox</h4>
            <p className="text-sm text-muted-foreground mt-1">text-xl font-semibold</p>
          </div>
          <div>
            <p className="text-base">Body text - The quick brown fox jumps over the lazy dog. This is standard body text that provides good readability for longer content.</p>
            <p className="text-sm text-muted-foreground mt-1">text-base</p>
          </div>
          <div>
            <p className="text-sm">Small text - The quick brown fox jumps over the lazy dog. This is smaller text used for captions and secondary information.</p>
            <p className="text-sm text-muted-foreground mt-1">text-sm</p>
          </div>
          <div>
            <a href="#" className="text-primary hover:underline">Link style - This is how links appear in the design system</a>
            <p className="text-sm text-muted-foreground mt-1">text-primary hover:underline</p>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Buttons</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Eye className="h-4 w-4" /></Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">States</h3>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inputs & Forms Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Inputs & Forms</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Input</Label>
              <Input id="text-input" placeholder="Enter text here" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-input">Email Input</Label>
              <Input id="email-input" type="email" placeholder="Enter email address" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>OTP Input (6 digits)</Label>
            <OTPInput value={otpValue} onChange={setOtpValue} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="select-input">Select Dropdown</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Checkbox & Radio</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox1" />
                  <Label htmlFor="checkbox1">Checkbox option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox2" />
                  <Label htmlFor="checkbox2">Checkbox option 2</Label>
                </div>
                <RadioGroup defaultValue="option1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="radio1" />
                    <Label htmlFor="radio1">Radio option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="radio2" />
                    <Label htmlFor="radio2">Radio option 2</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="error-input">Input with Error</Label>
            <Input 
              id="error-input" 
              placeholder="This input has an error" 
              aria-invalid="true"
            />
            <p className="text-sm text-destructive">This field is required</p>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Cards</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Balance Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BalanceCard
                title="Fiat Balance"
                balance={1250.75}
                currency="USD"
                symbol="$"
                type="fiat"
                icon="/icons/usdc.svg"
              />
              <BalanceCard
                title="Token Balance"
                balance={0.0456}
                currency="ETH"
                usdValue={89.45}
                type="token"
                icon="/icons/eth.svg"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Transaction Rows</h3>
            <div className="space-y-3">
              <TransactionRow
                type="deposit"
                amount={100}
                currency="USD"
                status="success"
                timestamp="2 hours ago"
                description="Bank transfer from Chase"
              />
              <TransactionRow
                type="withdrawal"
                amount={50}
                currency="USD"
                status="pending"
                timestamp="1 hour ago"
                description="ATM withdrawal"
              />
              <TransactionRow
                type="deposit"
                amount={25}
                currency="USD"
                status="failed"
                timestamp="30 min ago"
                description="Failed transfer"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Generic Info Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Information Card</CardTitle>
                  <CardDescription>This is a generic information card with title and body content.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This card demonstrates the basic card structure with header, content, and optional footer sections.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Action Card</CardTitle>
                  <CardDescription>Card with action buttons</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This card shows how to include action buttons in the footer.
                  </p>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button size="sm">Action</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Toggles & Controls Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Toggles & Controls</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Device Toggle</h3>
            <DeviceToggle />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Tabs Interface</h3>
            <Tabs defaultValue="fiat" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fiat">Fiat</TabsTrigger>
                <TabsTrigger value="crypto">Crypto</TabsTrigger>
              </TabsList>
              <TabsContent value="fiat" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">
                      Fiat currency options and settings would go here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="crypto" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">
                      Cryptocurrency options and settings would go here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Feedback</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Status Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Success</Badge>
              <Badge variant="secondary">Pending</Badge>
              <Badge variant="destructive">Failed</Badge>
              <Badge variant="outline">Info</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Toast Notification</h3>
            <Button onClick={showToastMessage}>Show Toast</Button>
            {showToast && (
              <div className="fixed top-4 right-4 z-50">
                <div className="bg-background border rounded-lg shadow-lg p-4 max-w-sm">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <h4 className="font-medium">Success!</h4>
                      <p className="text-sm text-muted-foreground">
                        Your action was completed successfully.
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowToast(false)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Skeleton Loaders</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  if (isMobileView) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[420px] mx-auto rounded-2xl border shadow overflow-hidden bg-background">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {content}
    </div>
  )
}
