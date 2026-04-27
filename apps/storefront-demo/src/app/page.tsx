import Link from "next/link"
import { products, collections } from "@shopedia/dummy-data"
import { ArrowRight, TrendingUp, Zap, ShieldCheck } from "lucide-react"

export default function HomePage() {
  const featuredProducts = products.slice(0, 8)
  const newArrivals = products.filter((p) => p.collection_ids.includes("col_new")).slice(0, 4)
  const saleProducts = products.filter((p) => p.collection_ids.includes("col_sale")).slice(0, 4)

  return (
    <div>
      {/* Hero — full-width bold */}
      <section className="relative bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dicwfbdgz/image/upload/v1777264597/Gambar_Background_dds6as.webp"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 mb-4">
              Portfolio Demo
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] mb-6">
              Belanja<br />Online
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-md">
              Jelajahi berbagai produk berkualitas dengan harga terbaik. Demo e-commerce menampilkan integrasi admin dashboard dan storefront.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Jelajahi Produk <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/collections/flash-sale"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 text-white text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Flash Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">
                What&apos;s New
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/collections/new-arrivals"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4"
            >
              Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">
                Best Picks
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Featured Products
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4"
            >
              Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sale + Promo */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">
                Limited Time
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Flash Sale
              </h2>
            </div>
            <Link
              href="/collections/flash-sale"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4"
            >
              Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black text-white px-8 md:px-16 py-12 md:py-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 text-white/[0.03]">
              <Zap className="w-full h-full" />
            </div>
            <div className="relative max-w-lg">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-3">
                Promo Spesial
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                Diskon hingga 50%
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Dapatkan produk pilihan dengan harga spesial. Stok terbatas, jangan sampai kehabisan!
              </p>
              <Link
                href="/collections/flash-sale"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Belanja Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USP Bar */}
      <section className="border-y bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x">
            {[
              { icon: TrendingUp, title: "Produk Berkualitas", desc: "Kurasi terbaik" },
              { icon: Zap, title: "Flash Sale", desc: "Diskon terbatas" },
              { icon: ShieldCheck, title: "Garansi", desc: "7 hari pengembalian" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 py-5 px-4">
                <item.icon className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider">{item.title}</p>
                  <p className="text-xs text-neutral-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">
              Collections
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {collections.map((col) => (
              <Link key={col.id} href={`/collections/${col.handle}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/5] mb-3">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-white font-bold uppercase text-sm tracking-wider">{col.title}</p>
                    <p className="text-white/60 text-xs mt-0.5">{col.product_ids.length} products</p>
                  </div>
                </div>
              </Link>
            ))}
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
