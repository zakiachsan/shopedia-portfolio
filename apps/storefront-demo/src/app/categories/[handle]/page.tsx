import { notFound } from "next/navigation"
import { categories, products } from "@shopedia/dummy-data"
import Link from "next/link"

export function generateStaticParams() {
  const allCategories: any[] = []
  categories.forEach((cat) => {
    allCategories.push(cat)
    if (cat.children) allCategories.push(...cat.children)
  })
  return allCategories.map((c) => ({ handle: c.handle }))
}

export default async function CategoryPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const allCategories = categories.flatMap((c) => [c, ...(c.children ?? [])])
  const category = allCategories.find((c) => c.handle === handle)
  if (!category) return notFound()

  const categoryProducts = products.filter((p) => p.category_id === category.id)

  return (
    <div>
      <div className="border-b bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">Category</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{category.name}</h1>
          <p className="text-sm text-neutral-500 mt-2">{category.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryProducts.length === 0 ? (
          <p className="text-neutral-500 text-center py-12">Tidak ada produk dalam kategori ini.</p>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-8">{categoryProducts.length} Products</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
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
