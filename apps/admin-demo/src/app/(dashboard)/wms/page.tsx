import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  products,
  stockLevels,
  wmsTransactions,
  getTotalStockValue,
  getLowStockItems,
} from "@shopedia/dummy-data"
import {
  ArrowDownLeft,
  ArrowUpRight,
  ClipboardCheck,
  Boxes,
  History,
} from "lucide-react"

export default function WmsPage() {
  const totalStock = getTotalStockValue()
  const lowStock = getLowStockItems(15)
  const recentTx = wmsTransactions.slice(-5).reverse()

  const stats = [
    { title: "Total SKUs", value: products.length.toString() },
    { title: "Total Stock", value: totalStock.toLocaleString() },
    { title: "Inbound Today", value: "0" },
    { title: "Outbound Today", value: "0" },
    { title: "Low Stock", value: lowStock.length.toString() },
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
        <h1 className="text-2xl font-bold tracking-tight">Warehouse</h1>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Link href="/wms/transactions">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTx.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={tx.type === "inbound" ? "default" : tx.type === "outbound" ? "destructive" : "secondary"}
                  >
                    {tx.type}
                  </Badge>
                  <span className="text-muted-foreground">
                    {tx.reference_no ?? tx.inventory_item_id.slice(0, 12)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>
                    {tx.quantity_before} → {tx.quantity_after}
                    <span className={tx.delta > 0 ? "text-green-600 ml-1" : tx.delta < 0 ? "text-red-600 ml-1" : "text-muted-foreground ml-1"}>
                      ({tx.delta > 0 ? "+" : ""}{tx.delta})
                    </span>
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {new Date(tx.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
