import Link from "next/link"
import { orders } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  completed: "default",
  processing: "secondary",
  shipped: "secondary",
  pending: "outline",
  canceled: "destructive",
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer">
                  <TableCell>
                    <Link href={`/orders/${order.id}`} className="font-medium hover:underline">
                      #{order.display_id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{order.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status] ?? "secondary"}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.payment_status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    Rp {order.total.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("id-ID")}
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
