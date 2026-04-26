import Link from "next/link"
import { products } from "@shopedia/dummy-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/layout/data-table"
import { Plus, HelpCircle } from "lucide-react"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        actions={
          <>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </>
        }
      />

      <DataTable
        title="Products"
        count={products.length}
        showFilters
        showExport
        pagination={{ pageSize: 10, total: products.length }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input type="checkbox" className="rounded border-gray-300" disabled />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead className="text-right">Price Range</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const minPrice = Math.min(...product.variants.map((v) => v.price))
              const maxPrice = Math.max(...product.variants.map((v) => v.price))
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" disabled />
                  </TableCell>
                  <TableCell>
                    <Link href={`/products/${product.id}/`} className="flex items-center gap-3 group">
                      <img src={product.thumbnail} alt={product.title} className="h-10 w-10 rounded-md object-cover border" />
                      <div>
                        <div className="font-medium group-hover:text-primary transition-colors">{product.title}</div>
                        <div className="text-xs text-muted-foreground">{product.handle}</div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={product.status} />
                  </TableCell>
                  <TableCell>{product.variants.length}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    Rp {minPrice.toLocaleString()}
                    {minPrice !== maxPrice && ` - Rp ${maxPrice.toLocaleString()}`}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <span className="text-muted-foreground">⋯</span>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </DataTable>
    </div>
  )
}
