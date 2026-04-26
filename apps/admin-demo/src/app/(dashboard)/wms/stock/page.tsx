import { stockLevels, stockLocations, products } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StockPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Stock Levels</h1>
      </div>

      <div className="grid gap-4">
        {stockLocations.map((location) => {
          const locationStock = stockLevels.filter((s) => s.location_id === location.id)
          return (
            <Card key={location.id}>
              <CardHeader>
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
                              <Badge variant="destructive">Low</Badge>
                            ) : (
                              <Badge variant="outline">OK</Badge>
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
