import { notFound } from "next/navigation"
import { collections, products } from "@shopedia/dummy-data"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }))
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const collection = collections.find((c) => c.handle === handle)
  if (!collection) return notFound()

  const collectionProducts = products.filter((p) => collection.product_ids.includes(p.id))

  return (
    <div>
      {collection.image && (
        <section className="relative h-56 md:h-80 bg-neutral-900 overflow-hidden">
          <img src={collection.image} alt={collection.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">Collection</p>
              <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">{collection.title}</h1>
              {collection.description && <p className="text-sm text-white/70 mt-2 max-w-md">{collection.description}</p>}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">{collectionProducts.length} Products</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const minPrice = Math.min(...product.variants.map((v: any) => v.price))
  const hasDiscount = product.variants.some((v: any) => v.original_price)

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative overflow-hidden aspect-square bg-neutral-100 mb-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>
      <h3 className="font-bold text-sm leading-tight line-clamp-1 group-hover:underline underline-offset-2">{product.title}</h3>
      <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{product.subtitle}</p>
      <span className="font-bold text-sm mt-1.5 block">Rp {minPrice.toLocaleString()}</span>
    </Link>
  )
}
