import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Store Name</Label>
              <Input defaultValue="Shopedia" />
            </div>
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Input defaultValue="IDR (Indonesian Rupiah)" disabled />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@shopedia.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Region Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Country</Label>
              <Input defaultValue="Indonesia" disabled />
            </div>
            <div className="space-y-2">
              <Label>Tax Rate (%)</Label>
              <Input defaultValue="11" type="number" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
