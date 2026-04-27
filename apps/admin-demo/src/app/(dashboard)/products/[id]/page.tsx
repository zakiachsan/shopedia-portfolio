import { notFound } from "next/navigation"
import { getProductById, getCategoryById } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlaceholderDialog } from "@/components/ui/placeholder-dialog"
import { ArrowLeft, Pencil, HelpCircle } from "lucide-react"

export function generateStaticParams() {
  const { products } = require("@shopedia/dummy-data")
  return products.map((p: any) => ({ id: p.id }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return notFound()

  return (
    <div className="space-y-6">
      <PageHeader
        title={product.title}
        subtitle={product.handle}
        actions={
          <>
            <PlaceholderDialog title="Help">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </PlaceholderDialog>
            <PlaceholderDialog title="Edit Product">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </PlaceholderDialog>
            <Link href="/products/">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <img key={i} src={img} alt={`${product.title} ${i + 1}`} className="rounded-lg aspect-square object-cover border" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variants ({product.variants.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Variant</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.variants.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell className="font-medium text-sm">{variant.title}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{variant.sku}</TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        <span className="font-medium">Rp {variant.price.toLocaleString()}</span>
                        {variant.original_price && (
                          <span className="text-xs text-muted-foreground line-through ml-2">
                            Rp {variant.original_price.toLocaleString()}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right text-sm">{variant.inventory_quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Status</div>
                <StatusBadge status={product.status} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Tags</div>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Category</div>
                <div className="text-sm">{product.category_id ? getCategoryById(product.category_id)?.name ?? product.category_id : "—"}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Created</div>
                <div className="text-sm">{new Date(product.created_at).toLocaleDateString("id-ID")}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Updated</div>
                <div className="text-sm">{new Date(product.updated_at).toLocaleDateString("id-ID")}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
