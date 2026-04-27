import { notFound } from "next/navigation"
import { collections, products } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import Link from "next/link"
import { PlaceholderDialog } from "@/components/ui/placeholder-dialog"
import { ArrowLeft, Pencil, HelpCircle } from "lucide-react"

export function generateStaticParams() {
  const { collections } = require("@shopedia/dummy-data")
  return collections.map((c: any) => ({ id: c.id }))
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const collection = collections.find((c) => c.id === id)
  if (!collection) return notFound()

  const collectionProducts = products.filter((p) => collection.product_ids.includes(p.id))

  return (
    <div className="space-y-6">
      <PageHeader
        title={collection.title}
        subtitle={collection.handle}
        actions={
          <>
            <PlaceholderDialog title="Help">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </PlaceholderDialog>
            <PlaceholderDialog title="Edit Collection">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </PlaceholderDialog>
            <Link href="/collections/">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </>
        }
      />

      {collection.image && (
        <img src={collection.image} alt={collection.title} className="w-full h-48 object-cover rounded-lg border" />
      )}

      {collection.description && (
        <Card>
          <CardHeader><CardTitle>Description</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-muted-foreground leading-relaxed">{collection.description}</p></CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Products ({collectionProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {collectionProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}/`}>
                <div className="rounded-lg border overflow-hidden hover:shadow-md transition-shadow bg-white">
                  <img src={product.thumbnail} alt={product.title} className="w-full aspect-square object-cover border-b" />
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
