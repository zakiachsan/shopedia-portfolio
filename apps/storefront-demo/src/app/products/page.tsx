import { products } from "@shopedia/dummy-data"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const minPrice = Math.min(...product.variants.map((v: any) => v.price))
  const hasDiscount = product.variants.some((v: any) => v.original_price)
  const originalPrice = product.variants.find((v: any) => v.original_price)?.original_price

  return (
    <Link href={`/products/${product.handle}`}>
      <div className="group">
        <div className="relative overflow-hidden rounded-lg aspect-square bg-muted mb-3">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          {hasDiscount && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-500 text-white text-xs font-medium">
              SALE
            </span>
          )}
        </div>
        <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{product.subtitle}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold text-sm">Rp {minPrice.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              Rp {originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
