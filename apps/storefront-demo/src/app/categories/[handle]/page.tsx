import { notFound } from "next/navigation"
import { categories, products } from "@shopedia/dummy-data"
import Link from "next/link"

export function generateStaticParams() {
  const { categories } = require("@shopedia/dummy-data")
  const allCategories: any[] = []
  categories.forEach((cat: any) => {
    allCategories.push(cat)
    if (cat.children) allCategories.push(...cat.children)
  })
  return allCategories.map((c: any) => ({ handle: c.handle }))
}

export default function CategoryPage({ params }: { params: { handle: string } }) {
  const allCategories = categories.flatMap((c) => [c, ...(c.children ?? [])])
  const category = allCategories.find((c) => c.handle === params.handle)
  if (!category) return notFound()

  const categoryProducts = products.filter((p) => p.category_id === category.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-muted-foreground mb-8">{category.description}</p>

      {categoryProducts.length === 0 ? (
        <p className="text-muted-foreground">Tidak ada produk dalam kategori ini.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
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
      )}
    </div>
  )
}
