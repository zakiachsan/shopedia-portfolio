"use client"

import { wmsTransactions } from "@shopedia/dummy-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/layout/data-table"
import { PlaceholderDialog } from "@/components/ui/placeholder-dialog"
import { ClipboardCheck, Plus, HelpCircle } from "lucide-react"

export default function OpnamePage() {
  const txs = wmsTransactions.filter((t) => t.type === "opname")

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Opname"
        actions={
          <>
            <PlaceholderDialog title="Help">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </PlaceholderDialog>
            <PlaceholderDialog title="New Opname">
              <Button variant="primary" size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                New Opname
              </Button>
            </PlaceholderDialog>
          </>
        }
      />

      <DataTable
        title="Opname Records"
        count={txs.length}
        showFilters
        showExport
        pagination={{ pageSize: 10, total: txs.length }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Before</TableHead>
              <TableHead className="text-right">After</TableHead>
              <TableHead className="text-right">Delta</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {txs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No opname records.</TableCell>
              </TableRow>
            ) : (
              txs.slice().reverse().map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-xs whitespace-nowrap">{new Date(tx.created_at).toLocaleString("id-ID")}</TableCell>
                  <TableCell className="font-mono text-xs">{tx.inventory_item_id.slice(0, 12)}...</TableCell>
                  <TableCell className="font-mono text-xs">{tx.location_id.slice(0, 8)}...</TableCell>
                  <TableCell className="text-right">{tx.quantity_before}</TableCell>
                  <TableCell className="text-right">{tx.quantity_after}</TableCell>
                  <TableCell className={`text-right font-medium ${tx.delta > 0 ? "text-green-600" : tx.delta < 0 ? "text-red-600" : ""}`}>
                    {tx.delta > 0 ? "+" : ""}{tx.delta}
                  </TableCell>
                  <TableCell className="text-xs">{tx.reference_no ?? "—"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DataTable>
    </div>
  )
}
