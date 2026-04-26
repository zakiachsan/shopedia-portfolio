"use client"

import { useState } from "react"
import { wmsTransactions } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClipboardCheck } from "lucide-react"

export default function OpnamePage() {
  const [txs] = useState(wmsTransactions.filter((t) => t.type === "opname"))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Stock Opname</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-amber-600" />
            Record Stock Opname
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
            In a real app, this form would record stock opname. In demo mode, data is read-only.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Opname History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Before</TableHead>
                <TableHead className="text-right">After</TableHead>
                <TableHead className="text-right">Delta</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {txs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No opname transactions.</TableCell>
                </TableRow>
              ) : (
                txs.slice().reverse().map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-xs whitespace-nowrap">{new Date(tx.created_at).toLocaleString("id-ID")}</TableCell>
                    <TableCell className="font-mono text-xs">{tx.inventory_item_id.slice(0, 12)}...</TableCell>
                    <TableCell className="font-mono text-xs">{tx.location_id.slice(0, 8)}...</TableCell>
                    <TableCell className="text-right">{tx.quantity_before}</TableCell>
                    <TableCell className="text-right">{tx.quantity_after}</TableCell>
                    <TableCell className={`text-right font-medium ${tx.delta > 0 ? "text-green-600" : tx.delta < 0 ? "text-red-600" : "text-muted-foreground"}`}>
                      {tx.delta > 0 ? "+" : ""}{tx.delta}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{tx.notes ?? "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
