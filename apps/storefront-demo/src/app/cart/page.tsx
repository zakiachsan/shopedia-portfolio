"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Keranjang Kosong</h1>
        <p className="text-muted-foreground mb-6">Belum ada produk di keranjangmu.</p>
        <Link href="/products">
          <Button>Mulai Belanja</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Keranjang</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-lg border">
              <img src={item.thumbnail} alt={item.title} className="h-24 w-24 rounded-md object-cover" />
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.variantTitle}</p>
                <p className="font-semibold mt-1">Rp {item.price.toLocaleString()}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border rounded-md">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-muted">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-muted">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="text-right font-semibold">
                Rp {(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="rounded-lg border p-6 sticky top-24">
            <h2 className="font-semibold mb-4">Ringkasan</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pengiriman</span>
                <span>Dihitung saat checkout</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button className="w-full mt-6">Lanjut ke Checkout</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full mt-2">Lanjut Belanja</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
