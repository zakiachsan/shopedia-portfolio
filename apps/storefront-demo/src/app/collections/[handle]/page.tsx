import { notFound } from "next/navigation"
import { collections, products } from "@shopedia/dummy-data"
import Link from "next/link"

export function generateStaticParams() {
  const { collections } = require("@shopedia/dummy-data")
  return collections.map((c: any) => ({ handle: c.handle }))
}

export default function CollectionPage({ params }: { params: { handle: string } }) {
  const collection = collections.find((c) => c.handle === params.handle)
  if (!collection) return notFound()

  const collectionProducts = products.filter((p) => collection.product_ids.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {collection.image && (
        <div className="relative h-64 rounded-xl overflow-hidden mb-8">
          <img src={collection.image} alt={collection.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold">{collection.title}</h1>
              {collection.description && <p className="mt-2 text-white/80">{collection.description}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {collectionProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.handle}`}>
            <div className="group">
              <div className="relative overflow-hidden rounded-lg aspect-square bg-muted mb-3">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold text-sm">
                  Rp {Math.min(...product.variants.map((v) => v.price)).toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
