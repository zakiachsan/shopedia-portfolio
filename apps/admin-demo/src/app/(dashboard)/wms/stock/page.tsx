import { stockLevels, stockLocations, products } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/layout/page-header"

export default function StockPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Stock Levels" />

      <div className="space-y-4">
        {stockLocations.map((location) => {
          const locationStock = stockLevels.filter((s) => s.location_id === location.id)
          return (
            <Card key={location.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{location.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{location.address}</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Stocked</TableHead>
                      <TableHead className="text-right">Reserved</TableHead>
                      <TableHead className="text-right">Incoming</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {locationStock.map((sl) => {
                      const product = products.find((p) =>
                        p.variants.some((v) => v.id === sl.inventory_item_id)
                      )
                      const variant = product?.variants.find((v) => v.id === sl.inventory_item_id)
                      const isLow = sl.stocked_quantity < 15
                      return (
                        <TableRow key={sl.id}>
                          <TableCell>
                            <div className="font-medium text-sm">{product?.title ?? sl.inventory_item_id}</div>
                            {variant && <div className="text-xs text-muted-foreground">{variant.title}</div>}
                          </TableCell>
                          <TableCell className="text-right font-mono">{sl.stocked_quantity}</TableCell>
                          <TableCell className="text-right font-mono">{sl.reserved_quantity}</TableCell>
                          <TableCell className="text-right font-mono">{sl.incoming_quantity}</TableCell>
                          <TableCell>
                            {isLow ? (
                              <StatusBadge status="low" />
                            ) : (
                              <StatusBadge status="ok" />
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
