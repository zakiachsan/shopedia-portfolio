import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        actions={
          <Button variant="primary" size="sm" className="gap-1.5">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        }
      />

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
              <Input defaultValue="IDR (Indonesian Rupiah)" disabled className="bg-muted" />
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
              <Input defaultValue="Indonesia" disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Tax Rate (%)</Label>
              <Input defaultValue="11" type="number" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
