"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, ShieldCheck, Lock, Package } from "lucide-react"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    phone: "",
  })

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Keranjang Kosong</h1>
        <p className="text-neutral-500">Tidak ada produk untuk dicheckout.</p>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      clearCart()
      router.push("/order-confirmed")
    }, 1500)
  }

  const shipping = 15000
  const grandTotal = total + shipping

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <a href="/cart" className="font-medium uppercase tracking-wider hover:text-black transition-colors">Cart</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-black font-bold uppercase tracking-wider">Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">Secure Checkout</p>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] mb-5 flex items-center gap-2">
                <Package className="h-4 w-4" /> Informasi Pengiriman
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Nama Depan</Label>
                  <Input required placeholder="Budi" value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Nama Belakang</Label>
                  <Input required placeholder="Santoso" value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Email</Label>
                  <Input type="email" required placeholder="budi@email.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Alamat</Label>
                  <Input required placeholder="Jl. Sudirman No. 123" value={form.address} onChange={(e) => updateField("address", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Kota</Label>
                  <Input required placeholder="Jakarta Selatan" value={form.city} onChange={(e) => updateField("city", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Kode Pos</Label>
                  <Input required placeholder="12190" value={form.postcode} onChange={(e) => updateField("postcode", e.target.value)} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Telepon</Label>
                  <Input required placeholder="+6281212345678" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-neutral-50 p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] mb-3 flex items-center gap-2">
                <Lock className="h-4 w-4" /> Pembayaran (Demo)
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Ini adalah demo portfolio. Tidak ada pembayaran nyata yang diproses. Klik &quot;Pesan Sekarang&quot; untuk mensimulasikan checkout berhasil.
              </p>
            </div>

            <Button type="submit" className="w-full h-[52px] text-sm font-bold uppercase tracking-wider" disabled={loading}>
              {loading ? (
                "Memproses..."
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Pesan Sekarang — Rp {grandTotal.toLocaleString()}
                </>
              )}
            </Button>
          </form>

          {/* Order Summary */}
          <div>
            <div className="border p-6 sticky top-[72px]">
              <h2 className="text-sm font-bold uppercase tracking-[0.1em] mb-5">Pesanan Anda</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-sm">
                    <div className="h-16 w-16 shrink-0 bg-neutral-100 overflow-hidden">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm leading-tight line-clamp-1">{item.title}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{item.variantTitle}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold shrink-0">
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t mt-5 pt-5 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-bold">Rp {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Pengiriman</span>
                  <span className="font-bold">Rp {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2.5 text-base border-t">
                  <span className="font-black uppercase tracking-wider text-sm">Total</span>
                  <span className="font-black">Rp {grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t flex items-center gap-2 text-xs text-neutral-400">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                Checkout aman & terenkripsi
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
