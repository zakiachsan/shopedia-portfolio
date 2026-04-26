"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBag, Check } from "lucide-react"

export function ProductDetail({ product }: { product: any }) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

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
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.slice(1).map((img: string, i: number) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img src={img} alt={`${product.title} ${i + 2}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-muted-foreground mt-2">{product.subtitle}</p>

        <div className="mt-6">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">Rp {selectedVariant?.price.toLocaleString()}</span>
            {selectedVariant?.original_price && (
              <span className="text-lg text-muted-foreground line-through">
                Rp {selectedVariant.original_price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {product.options.length > 0 && (
          <div className="mt-8 space-y-4">
            {product.options.map((option: any) => (
              <div key={option.id}>
                <label className="text-sm font-medium">{option.title}</label>
                <div className="flex gap-2 mt-2">
                  {option.values.map((value: string) => {
                    const isSelected = selectedVariant?.options[option.title] === value
                    return (
                      <button
                        key={value}
                        onClick={() => {
                          const variant = product.variants.find((v: any) => v.options[option.title] === value)
                          if (variant) setSelectedVariant(variant)
                        }}
                        className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input hover:bg-muted"
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

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-muted">
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2 hover:bg-muted">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button onClick={handleAddToCart} className="flex-1" disabled={added}>
            {added ? (
              <><Check className="h-4 w-4 mr-2" /> Ditambahkan</>
            ) : (
              <><ShoppingBag className="h-4 w-4 mr-2" /> Tambah ke Keranjang</>
            )}
          </Button>
        </div>

        <div className="mt-10">
          <h3 className="font-semibold mb-2">Deskripsi</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        </div>
      </div>
    </div>
  )
}
