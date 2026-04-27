import { notFound } from "next/navigation"
import { getOrderById } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlaceholderDialog } from "@/components/ui/placeholder-dialog"
import { ArrowLeft, Printer, HelpCircle } from "lucide-react"

export function generateStaticParams() {
  const { orders } = require("@shopedia/dummy-data")
  return orders.map((o: any) => ({ id: o.id }))
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = getOrderById(id)
  if (!order) return notFound()

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Order #${order.display_id}`}
        actions={
          <>
            <PlaceholderDialog title="Help">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </PlaceholderDialog>
            <PlaceholderDialog title="Print Order">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Printer className="h-4 w-4" />
                Print
              </Button>
            </PlaceholderDialog>
            <Link href="/orders/">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </>
        }
      />

      <div className="flex items-center gap-3">
        <StatusBadge status={order.status} />
        <Badge variant="outline" className="capitalize">{order.payment_status}</Badge>
        <span className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString("id-ID")}</span>
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
                            <img src={item.thumbnail} alt={item.title} className="h-10 w-10 rounded-md object-cover border" />
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
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p className="font-medium">{order.email}</p>
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
              <p className="text-muted-foreground">{order.shipping_address.phone}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
