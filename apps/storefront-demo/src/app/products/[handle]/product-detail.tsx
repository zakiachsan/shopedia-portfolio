"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBag, Check, ChevronRight } from "lucide-react"

export function ProductDetail({ product }: { product: any }) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [mainImage, setMainImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const allImages = [product.thumbnail, ...product.images.filter((img: string) => img !== product.thumbnail)]

  const handleAddToCart = () => {
    if (!selectedVariant) return
    addItem({
      id: `${product.id}-${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      thumbnail: product.thumbnail,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-400 mb-8">
        <Link href="/" className="font-medium uppercase tracking-wider hover:text-black transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="font-medium uppercase tracking-wider hover:text-black transition-colors">Products</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-black font-medium uppercase tracking-wider truncate">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-[420px_1fr] gap-10 lg:gap-14">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="aspect-square bg-neutral-100 overflow-hidden max-w-[420px]">
            <img
              src={allImages[mainImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2 max-w-[420px]">
              {allImages.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  className={`aspect-square bg-neutral-100 overflow-hidden border-2 transition-colors ${
                    i === mainImage ? "border-black" : "border-transparent hover:border-neutral-300"
                  }`}
                >
                  <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-2">
            {product.tags?.[0] || "Product"}
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight">
            {product.title}
          </h1>
          <p className="text-sm text-neutral-500 mt-3 leading-relaxed">{product.subtitle}</p>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-2xl font-black">
              Rp {selectedVariant?.price.toLocaleString()}
            </span>
            {selectedVariant?.original_price && (
              <>
                <span className="text-lg text-neutral-400 line-through">
                  Rp {selectedVariant.original_price.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-red-600 uppercase">
                  {Math.round((1 - selectedVariant.price / selectedVariant.original_price) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Variant Selectors */}
          {product.options.length > 0 && (
            <div className="mt-8 space-y-5">
              {product.options.map((option: any) => (
                <div key={option.id}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2.5">
                    {option.title}: <span className="text-neutral-500 font-medium normal-case">{selectedVariant?.options[option.title]}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value: string) => {
                      const isSelected = selectedVariant?.options[option.title] === value
                      const variantWithValue = product.variants.find((v: any) => v.options[option.title] === value)
                      const isAvailable = !!variantWithValue
                      return (
                        <button
                          key={value}
                          onClick={() => {
                            if (variantWithValue) setSelectedVariant(variantWithValue)
                          }}
                          disabled={!isAvailable}
                          className={`px-5 py-2.5 text-sm font-medium border transition-all ${
                            isSelected
                              ? "border-black bg-black text-white"
                              : isAvailable
                                ? "border-neutral-300 hover:border-black bg-white text-black"
                                : "border-neutral-200 text-neutral-300 cursor-not-allowed line-through"
                          }`}
                        >
                          {value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="mt-8 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-300">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-neutral-100 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 py-3 font-bold text-sm min-w-[3.5rem] text-center border-x border-neutral-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 hover:bg-neutral-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1 h-[50px] text-sm font-bold uppercase tracking-wider" disabled={added}>
                {added ? (
                  <><Check className="h-4 w-4" /> Added</>
                ) : (
                  <><ShoppingBag className="h-4 w-4" /> Add to Cart</>
                )}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-10 pt-8 border-t">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-3">Description</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Quick info */}
          <div className="mt-8 pt-8 border-t space-y-3 text-sm">
            {[
              { label: "SKU", value: selectedVariant?.sku || "-" },
              { label: "Stock", value: `${selectedVariant?.inventory_quantity || 0} tersedia` },
              { label: "Tags", value: product.tags?.join(", ") || "-" },
            ].map((item) => (
              <div key={item.label} className="flex gap-2">
                <span className="text-neutral-400 font-medium min-w-[60px]">{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
