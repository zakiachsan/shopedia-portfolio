import Link from "next/link"
import { orders } from "@shopedia/dummy-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/layout/data-table"
import { HelpCircle, UserPlus } from "lucide-react"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        actions={
          <>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
            <Button variant="outline" size="sm">Order Statistics</Button>
            <Button variant="primary" size="sm" className="gap-1.5">
              <UserPlus className="h-4 w-4" />
              New Customer
            </Button>
          </>
        }
      />

      <DataTable
        title="Orders"
        count={orders.length}
        showFilters
        showExport
        pagination={{ pageSize: 10, total: orders.length }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input type="checkbox" className="rounded border-gray-300" disabled />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, idx) => (
              <TableRow key={order.id}>
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" disabled />
                </TableCell>
                <TableCell>
                  <Link href={`/orders/${order.id}/`} className="font-medium hover:text-primary transition-colors">
                    {idx + 1}
                  </Link>
                </TableCell>
                <TableCell className="font-mono text-xs">{order.display_id}</TableCell>
                <TableCell>
                  <div className="text-sm">{order.email}</div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">{order.payment_status}</Badge>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  Rp {order.total.toLocaleString()}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(order.created_at).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <span className="text-muted-foreground">⋯</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTable>
    </div>
  )
}
