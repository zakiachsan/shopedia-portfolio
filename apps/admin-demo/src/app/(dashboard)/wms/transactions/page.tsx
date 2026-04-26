import { wmsTransactions } from "@shopedia/dummy-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/layout/data-table"

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Transaction History" />

      <DataTable
        title="All Transactions"
        count={wmsTransactions.length}
        showFilters
        showExport
        pagination={{ pageSize: 10, total: wmsTransactions.length }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Before</TableHead>
              <TableHead className="text-right">After</TableHead>
              <TableHead className="text-right">Delta</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wmsTransactions.slice().reverse().map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  <StatusBadge status={tx.type} />
                </TableCell>
                <TableCell className="font-mono text-xs">{tx.inventory_item_id.slice(0, 12)}...</TableCell>
                <TableCell className="font-mono text-xs">{tx.location_id.slice(0, 8)}...</TableCell>
                <TableCell className="text-right">{tx.quantity_before}</TableCell>
                <TableCell className="text-right">{tx.quantity_after}</TableCell>
                <TableCell className={`text-right font-medium ${tx.delta > 0 ? "text-green-600" : tx.delta < 0 ? "text-red-600" : ""}`}>
                  {tx.delta > 0 ? "+" : ""}{tx.delta}
                </TableCell>
                <TableCell className="text-xs">{tx.reference_no ?? "—"}</TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(tx.created_at).toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTable>
    </div>
  )
}
