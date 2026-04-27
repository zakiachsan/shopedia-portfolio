import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  products,
  orders,
  customers,
  getTotalRevenue,
  getTotalStockValue,
  getLowStockItems,
  wmsTransactions,
} from "@shopedia/dummy-data"
import {
  Boxes,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"

export default function DashboardPage() {
  const totalRevenue = getTotalRevenue()
  const totalStock = getTotalStockValue()
  const lowStock = getLowStockItems(15)
  const recentTx = wmsTransactions.slice(-5).reverse()

  const stats = [
    { title: "Total Produk", value: products.length.toString(), icon: Package, color: "text-blue-600" },
    { title: "Total Order", value: orders.length.toString(), icon: ShoppingCart, color: "text-purple-600" },
    { title: "Pelanggan", value: customers.length.toString(), icon: Users, color: "text-green-600" },
    { title: "Pendapatan", value: `Rp ${(totalRevenue / 1000000).toFixed(1)}M`, icon: TrendingUp, color: "text-amber-600" },
    { title: "Total Stok", value: totalStock.toLocaleString(), icon: Boxes, color: "text-cyan-600" },
    { title: "Stok Rendah", value: lowStock.length.toString(), icon: AlertTriangle, color: "text-red-600" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" actions={<DateRangePicker />} />

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle>Order Terbaru</CardTitle>
            <Link href="/orders/">
              <Button variant="ghost" size="sm">Lihat Semua</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 5).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link href={`/orders/${order.id}/`} className="font-mono text-xs font-medium hover:text-primary transition-colors">
                        #{order.display_id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {order.customer_id ? (
                        <Link href={`/customers/${order.customer_id}/`} className="text-muted-foreground hover:text-primary transition-colors">
                          {order.email}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">{order.email}</span>
                      )}
                    </TableCell>
                    <TableCell><StatusBadge status={order.status} /></TableCell>
                    <TableCell className="text-right font-mono text-sm">Rp {order.total.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(order.created_at).toLocaleDateString("id-ID")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle>Aktivitas WMS Terbaru</CardTitle>
            <Link href="/wms/transactions/">
              <Button variant="ghost" size="sm">Lihat Semua</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Qty Change</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTx.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell><StatusBadge status={tx.type} /></TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{tx.reference_no ?? tx.inventory_item_id.slice(0, 12)}</TableCell>
                    <TableCell className="text-right text-sm">
                      {tx.quantity_before} → {tx.quantity_after}
                      <span className={tx.delta > 0 ? "text-green-600 ml-1" : tx.delta < 0 ? "text-red-600 ml-1" : "text-muted-foreground ml-1"}>
                        ({tx.delta > 0 ? "+" : ""}{tx.delta})
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(tx.created_at).toLocaleDateString("id-ID")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
