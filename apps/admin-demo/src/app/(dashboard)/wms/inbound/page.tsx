"use client"

import { useState } from "react"
import { wmsTransactions } from "@shopedia/dummy-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/layout/data-table"
import { ArrowDownLeft, Plus, HelpCircle } from "lucide-react"

export default function InboundPage() {
  const [txs] = useState(wmsTransactions.filter((t) => t.type === "inbound"))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inbound"
        actions={
          <>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Record Inbound
            </Button>
          </>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <ArrowDownLeft className="h-4 w-4 text-green-600" />
            Record Inbound
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
            In a real app, this form would record inbound stock. In demo mode, data is read-only.
          </div>
        </CardContent>
      </Card>

      <DataTable
        title="Inbound History"
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
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No inbound transactions.</TableCell>
              </TableRow>
            ) : (
              txs.slice().reverse().map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-xs whitespace-nowrap">{new Date(tx.created_at).toLocaleString("id-ID")}</TableCell>
                  <TableCell className="font-mono text-xs">{tx.inventory_item_id.slice(0, 12)}...</TableCell>
                  <TableCell className="font-mono text-xs">{tx.location_id.slice(0, 8)}...</TableCell>
                  <TableCell className="text-right">{tx.quantity_before}</TableCell>
                  <TableCell className="text-right">{tx.quantity_after}</TableCell>
                  <TableCell className="text-right text-green-600 font-medium">+{tx.delta}</TableCell>
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
