import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  products,
  orders,
  customers,
  promotions,
  getTotalRevenue,
  getTotalStockValue,
  getLowStockItems,
  wmsTransactions,
} from "@shopedia/dummy-data"
import {
  ArrowDownLeft,
  ArrowUpRight,
  ClipboardCheck,
  Boxes,
  History,
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

  const quickLinks = [
    { href: "/wms/inbound", label: "Inbound", icon: ArrowDownLeft, color: "text-green-600" },
    { href: "/wms/outbound", label: "Outbound", icon: ArrowUpRight, color: "text-red-600" },
    { href: "/wms/opname", label: "Stock Opname", icon: ClipboardCheck, color: "text-amber-600" },
    { href: "/wms/stock", label: "Stock Levels", icon: Boxes, color: "text-blue-600" },
    { href: "/wms/transactions", label: "History", icon: History, color: "text-purple-600" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <link.icon className={`h-5 w-5 ${link.color}`} />
                <span className="font-medium">{link.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Order Terbaru</CardTitle>
            <Link href="/orders">
              <Button variant="ghost" size="sm">Lihat Semua</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Badge variant={order.status === "completed" ? "default" : order.status === "canceled" ? "destructive" : "secondary"}>
                      #{order.display_id}
                    </Badge>
                    <span className="text-muted-foreground">{order.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Rp {order.total.toLocaleString()}</span>
                    <span className="text-muted-foreground text-xs">{new Date(order.created_at).toLocaleDateString("id-ID")}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Aktivitas WMS Terbaru</CardTitle>
            <Link href="/wms/transactions">
              <Button variant="ghost" size="sm">Lihat Semua</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTx.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={tx.type === "inbound" ? "default" : tx.type === "outbound" ? "destructive" : "secondary"}
                    >
                      {tx.type}
                    </Badge>
                    <span className="text-muted-foreground">{tx.reference_no ?? tx.inventory_item_id.slice(0, 12)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      {tx.quantity_before} → {tx.quantity_after}
                      <span className={tx.delta > 0 ? "text-green-600 ml-1" : tx.delta < 0 ? "text-red-600 ml-1" : "text-muted-foreground ml-1"}>
                        ({tx.delta > 0 ? "+" : ""}{tx.delta})
                      </span>
                    </span>
                    <span className="text-muted-foreground text-xs">{new Date(tx.created_at).toLocaleDateString("id-ID")}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
