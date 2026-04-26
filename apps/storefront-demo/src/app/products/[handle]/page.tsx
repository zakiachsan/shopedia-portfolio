import { notFound } from "next/navigation"
import { getProductByHandle } from "@shopedia/dummy-data"
import { ProductDetail } from "./product-detail"

export function generateStaticParams() {
  const { products } = require("@shopedia/dummy-data")
  return products.map((p: any) => ({ handle: p.handle }))
}

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = getProductByHandle(params.handle)
  if (!product) return notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProductDetail product={product} />
    </div>
  )
}
