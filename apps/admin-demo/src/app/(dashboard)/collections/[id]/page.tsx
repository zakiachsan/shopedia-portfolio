import { notFound } from "next/navigation"
import { collections, products } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function generateStaticParams() {
  const { collections } = require("@shopedia/dummy-data")
  return collections.map((c: any) => ({ id: c.id }))
}

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
  const collection = collections.find((c) => c.id === params.id)
  if (!collection) return notFound()

  const collectionProducts = products.filter((p) => collection.product_ids.includes(p.id))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{collection.title}</h1>
          <p className="text-sm text-muted-foreground">{collection.handle}</p>
        </div>
        <Link href="/collections">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      {collection.image && (
        <img src={collection.image} alt={collection.title} className="w-full h-48 object-cover rounded-lg" />
      )}

      {collection.description && (
        <Card>
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{collection.description}</p></CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Products ({collectionProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {collectionProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
                  <img src={product.thumbnail} alt={product.title} className="w-full aspect-square object-cover" />
                  <div className="p-3">
                    <div className="font-medium text-sm truncate">{product.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Rp {Math.min(...product.variants.map((v) => v.price)).toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
