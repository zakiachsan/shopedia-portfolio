import Link from "next/link"
import { products } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead className="text-right">Price Range</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const minPrice = Math.min(...product.variants.map((v) => v.price))
                const maxPrice = Math.max(...product.variants.map((v) => v.price))
                return (
                  <TableRow key={product.id} className="cursor-pointer">
                    <TableCell>
                      <Link href={`/products/${product.id}`} className="flex items-center gap-3">
                        <img src={product.thumbnail} alt={product.title} className="h-10 w-10 rounded-md object-cover" />
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-xs text-muted-foreground">{product.handle}</div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === "published" ? "default" : "secondary"}>{product.status}</Badge>
                    </TableCell>
                    <TableCell>{product.variants.length}</TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      Rp {minPrice.toLocaleString()}
                      {minPrice !== maxPrice && ` - Rp ${maxPrice.toLocaleString()}`}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
