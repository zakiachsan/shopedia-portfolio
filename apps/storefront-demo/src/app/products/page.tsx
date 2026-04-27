import { products } from "@shopedia/dummy-data"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <div>
      <div className="border-b bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">Products</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">All Products</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-8">{products.length} Products</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const minPrice = Math.min(...product.variants.map((v: any) => v.price))
  const maxPrice = Math.max(...product.variants.map((v: any) => v.price))
  const hasDiscount = product.variants.some((v: any) => v.original_price)
  const highestOriginalPrice = product.variants
    .filter((v: any) => v.original_price)
    .sort((a: any, b: any) => (b.original_price || 0) - (a.original_price || 0))[0]?.original_price

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
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-block bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-wider w-full text-center">
            Quick View
          </span>
        </div>
      </div>
      <h3 className="font-bold text-sm leading-tight line-clamp-1 group-hover:underline underline-offset-2">
        {product.title}
      </h3>
      <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{product.subtitle}</p>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="font-bold text-sm">Rp {minPrice.toLocaleString()}</span>
        {highestOriginalPrice && (
          <span className="text-xs text-neutral-400 line-through">
            Rp {highestOriginalPrice.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  )
}
