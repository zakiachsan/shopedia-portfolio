import Link from "next/link"
import { collections } from "@shopedia/dummy-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/layout/data-table"
import { Plus, HelpCircle } from "lucide-react"

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Collections"
        actions={
          <>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add Collection
            </Button>
          </>
        }
      />

      <DataTable
        title="Collections"
        count={collections.length}
        showFilters
        showExport
        pagination={{ pageSize: 10, total: collections.length }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input type="checkbox" className="rounded border-gray-300" disabled />
              </TableHead>
              <TableHead>Collection</TableHead>
              <TableHead>Handle</TableHead>
              <TableHead className="text-right">Products</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((col) => (
              <TableRow key={col.id}>
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" disabled />
                </TableCell>
                <TableCell>
                  <Link href={`/collections/${col.id}/`} className="flex items-center gap-3 group">
                    {col.image && (
                      <img src={col.image} alt={col.title} className="h-10 w-10 rounded-md object-cover border" />
                    )}
                    <span className="font-medium group-hover:text-primary transition-colors">{col.title}</span>
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{col.handle}</TableCell>
                <TableCell className="text-right">{col.product_ids.length}</TableCell>
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
