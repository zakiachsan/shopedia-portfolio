import { promotions } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PromotionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Promotions</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Promotions ({promotions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Usage</TableHead>
                <TableHead>Period</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>
                    <div className="font-medium font-mono">{promo.code}</div>
                    <div className="text-xs text-muted-foreground">{promo.is_automatic ? "Automatic" : "Manual"}</div>
                  </TableCell>
                  <TableCell className="capitalize">{promo.type}</TableCell>
                  <TableCell className="text-right">
                    {promo.type === "percentage" ? `${promo.value}%` : `Rp ${promo.value.toLocaleString()}`}
                  </TableCell>
                  <TableCell>
                    <Badge variant={promo.status === "active" ? "default" : "secondary"}>{promo.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {promo.usage_count} / {promo.usage_limit ?? "∞"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {promo.starts_at && new Date(promo.starts_at).toLocaleDateString("id-ID")}
                    {promo.ends_at && ` - ${new Date(promo.ends_at).toLocaleDateString("id-ID")}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
