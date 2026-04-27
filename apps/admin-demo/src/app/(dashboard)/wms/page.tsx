import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import {
  products,
  wmsTransactions,
  getTotalStockValue,
  getLowStockItems,
} from "@shopedia/dummy-data"
import {
  ArrowDownLeft,
  ArrowUpRight,
  Boxes,
  Package,
  AlertTriangle,
} from "lucide-react"

export default function WmsPage() {
  const totalStock = getTotalStockValue()
  const lowStock = getLowStockItems(15)
  const recentTx = wmsTransactions.slice(-5).reverse()

  const stats = [
    { title: "Total SKUs", value: products.length.toString(), icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Stock", value: totalStock.toLocaleString(), icon: Boxes, color: "text-green-600", bg: "bg-green-50" },
    { title: "Inbound Today", value: "0", icon: ArrowDownLeft, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Outbound Today", value: "0", icon: ArrowUpRight, color: "text-red-600", bg: "bg-red-50" },
    { title: "Low Stock", value: lowStock.length.toString(), icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Warehouse Management" />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`h-8 w-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle>Recent Transactions</CardTitle>
          <Link href="/wms/transactions/">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTx.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg border p-3 text-sm hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <Badge variant={tx.type === "inbound" ? "green" : tx.type === "outbound" ? "red" : "blue"}>
                    {tx.type}
                  </Badge>
                  <span className="text-muted-foreground truncate">{tx.reference_no ?? tx.inventory_item_id.slice(0, 12)}</span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm">
                    {tx.quantity_before} → {tx.quantity_after}
                    <span className={tx.delta > 0 ? "text-green-600 ml-1" : tx.delta < 0 ? "text-red-600 ml-1" : "text-muted-foreground ml-1"}>
                      ({tx.delta > 0 ? "+" : ""}{tx.delta})
                    </span>
                  </span>
                  <span className="text-muted-foreground text-xs whitespace-nowrap">{new Date(tx.created_at).toLocaleDateString("id-ID")}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
