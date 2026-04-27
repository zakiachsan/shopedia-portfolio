"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight } from "lucide-react"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-neutral-200 mb-6" />
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Your Bag</p>
        <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Keranjang Kosong</h1>
        <p className="text-neutral-500 mb-8">Belum ada produk di keranjangmu.</p>
        <Link href="/products">
          <Button className="text-sm font-bold uppercase tracking-wider px-8 h-12">Mulai Belanja</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <a href="/" className="font-medium uppercase tracking-wider hover:text-black transition-colors">Home</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-black font-bold uppercase tracking-wider">Cart ({items.length})</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">Your Bag</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Keranjang</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border">
                <div className="h-28 w-28 shrink-0 bg-neutral-100 overflow-hidden">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm leading-tight">{item.title}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.variantTitle}</p>
                  <p className="font-black mt-2">Rp {item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1.5 hover:bg-neutral-100 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 py-1.5 text-xs font-bold min-w-[2.5rem] text-center border-x">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1.5 hover:bg-neutral-100 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right font-black text-sm shrink-0">
                  Rp {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="border p-6 sticky top-[72px]">
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] mb-5">Ringkasan</h2>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-bold">Rp {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Pengiriman</span>
                  <span className="font-bold">Dihitung saat checkout</span>
                </div>
                <div className="flex justify-between pt-2.5 border-t text-base">
                  <span className="font-black uppercase tracking-wider text-sm">Total</span>
                  <span className="font-black">Rp {total.toLocaleString()}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full mt-6 h-12 text-sm font-bold uppercase tracking-wider">
                  Lanjut ke Checkout
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="w-full mt-2 h-10 text-xs font-bold uppercase tracking-wider">
                  Lanjut Belanja
                </Button>
              </Link>
            </div>

            <div className="mt-6 border p-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-neutral-400">Ringkasan Pesanan</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {items.length} item di keranjang. Pengiriman akan dihitung saat checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
