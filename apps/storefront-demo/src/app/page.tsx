import Link from "next/link"
import { products, collections } from "@shopedia/dummy-data"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  const featuredProducts = products.slice(0, 8)
  const heroCollection = collections.find((c) => c.handle === "new-arrivals")

  return (
    <div>
      {/* Hero */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-4">
              Portfolio Demo
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Belanja Online
              <br />
              <span className="text-muted-foreground">Mudah & Cepat</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Jelajahi berbagai produk berkualitas dengan harga terbaik. Demo e-commerce ini menampilkan integrasi admin dashboard dan storefront.
            </p>
            <div className="flex gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Jelajahi Produk <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/collections/flash-sale"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border font-medium hover:bg-muted transition-colors"
              >
                Flash Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collections.map((col) => (
            <Link key={col.id} href={`/collections/${col.handle}`}>
              <div className="group relative overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                  <div>
                    <div className="text-white font-semibold">{col.title}</div>
                    <div className="text-white/70 text-sm">{col.product_ids.length} products</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium hover:underline flex items-center gap-1">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Flash Sale - Diskon hingga 50%</h2>
            <p className="text-primary-foreground/80 mb-6">
              Dapatkan produk pilihan dengan harga spesial. Stok terbatas!
            </p>
            <Link
              href="/collections/flash-sale"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-primary font-medium hover:bg-white/90 transition-colors"
            >
              Belanja Sekarang <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const minPrice = Math.min(...product.variants.map((v: any) => v.price))
  const maxPrice = Math.max(...product.variants.map((v: any) => v.price))
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
