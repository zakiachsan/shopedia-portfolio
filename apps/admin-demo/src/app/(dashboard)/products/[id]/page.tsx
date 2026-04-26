import { notFound } from "next/navigation"
import { getProductById } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function generateStaticParams() {
  const { products } = require("@shopedia/dummy-data")
  return products.map((p: any) => ({ id: p.id }))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  if (!product) return notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{product.title}</h1>
          <p className="text-sm text-muted-foreground">{product.handle}</p>
        </div>
        <Link href="/products">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, i) => (
                  <img key={i} src={img} alt={`${product.title} ${i + 1}`} className="rounded-lg aspect-square object-cover" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <div className="font-medium text-sm">{variant.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">{variant.sku}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Rp {variant.price.toLocaleString()}</div>
                      {variant.original_price && (
                        <div className="text-xs text-muted-foreground line-through">
                          Rp {variant.original_price.toLocaleString()}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">Stock: {variant.inventory_quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
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
                <div className="text-xs text-muted-foreground">Status</div>
                <Badge variant={product.status === "published" ? "default" : "secondary"}>{product.status}</Badge>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Tags</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Created</div>
                <div className="text-sm">{new Date(product.created_at).toLocaleDateString("id-ID")}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
