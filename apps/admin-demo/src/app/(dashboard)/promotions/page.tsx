import Link from "next/link"
import { promotions } from "@shopedia/dummy-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/layout/data-table"
import { PlaceholderDialog } from "@/components/ui/placeholder-dialog"
import { Plus, HelpCircle } from "lucide-react"

export default function PromotionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Promotions"
        actions={
          <>
            <PlaceholderDialog title="Help">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </PlaceholderDialog>
            <PlaceholderDialog title="Add Promotion">
              <Button variant="primary" size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add Promotion
              </Button>
            </PlaceholderDialog>
          </>
        }
      />

      <DataTable
        title="Promotions"
        count={promotions.length}
        showFilters
        showExport
        pagination={{ pageSize: 10, total: promotions.length }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input type="checkbox" className="rounded border-gray-300" disabled />
              </TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Usage</TableHead>
              <TableHead>Period</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promo) => (
              <TableRow key={promo.id}>
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" disabled />
                </TableCell>
                <TableCell>
                  <Link href={`/promotions/${promo.id}/`} className="block group">
                    <div className="font-mono text-sm font-medium group-hover:text-primary transition-colors">{promo.code}</div>
                    <div className="text-xs text-muted-foreground">{promo.is_automatic ? "Automatic" : "Manual"}</div>
                  </Link>
                </TableCell>
                <TableCell className="capitalize text-sm">{promo.type}</TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {promo.type === "percentage" ? `${promo.value}%` : `Rp ${promo.value.toLocaleString()}`}
                </TableCell>
                <TableCell>
                  <StatusBadge status={promo.status} />
                </TableCell>
                <TableCell className="text-right text-sm">
                  {promo.usage_count} / {promo.usage_limit ?? "∞"}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {promo.starts_at && new Date(promo.starts_at).toLocaleDateString("id-ID")}
                  {promo.ends_at && ` - ${new Date(promo.ends_at).toLocaleDateString("id-ID")}`}
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
