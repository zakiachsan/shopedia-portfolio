import { notFound } from "next/navigation"
import { products, getProductByHandle } from "@shopedia/dummy-data"
import { ProductDetail } from "./product-detail"

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }))
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const product = getProductByHandle(handle)
  if (!product) return notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProductDetail product={product} />
    </div>
  )
}
