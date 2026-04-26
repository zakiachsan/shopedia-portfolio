import { notFound } from "next/navigation"
import { getOrderById } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export function generateStaticParams() {
  const { orders } = require("@shopedia/dummy-data")
  return orders.map((o: any) => ({ id: o.id }))
}

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  completed: "default",
  processing: "secondary",
  shipped: "secondary",
  pending: "outline",
  canceled: "destructive",
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = getOrderById(params.id)
  if (!order) return notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Order #{order.display_id}</h1>
          <Badge variant={statusVariant[order.status] ?? "secondary"}>{order.status}</Badge>
        </div>
        <Link href="/orders">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {item.thumbnail && (
                            <img src={item.thumbnail} alt={item.title} className="h-10 w-10 rounded-md object-cover" />
                          )}
                          <div>
                            <div className="font-medium text-sm">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.variant_title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right font-mono text-sm">Rp {item.unit_price.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm">Rp {item.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">Rp {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-mono">Rp {order.tax_total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-mono">Rp {order.shipping_total.toLocaleString()}</span>
              </div>
              {order.discount_total > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-mono text-green-600">-Rp {order.discount_total.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span className="font-mono">Rp {order.total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p className="font-medium">{order.shipping_address.first_name} {order.shipping_address.last_name}</p>
              <p>{order.shipping_address.address_1}</p>
              {order.shipping_address.address_2 && <p>{order.shipping_address.address_2}</p>}
              <p>{order.shipping_address.city}, {order.shipping_address.province} {order.shipping_address.postal_code}</p>
              <p>{order.shipping_address.phone}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
