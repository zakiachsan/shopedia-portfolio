"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-bold mb-2">Keranjang Kosong</h1>
        <p className="text-muted-foreground">Tidak ada produk untuk dicheckout.</p>
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border p-6">
            <h2 className="font-semibold mb-4">Informasi Pengiriman</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Depan</Label>
                <Input required placeholder="Budi" />
              </div>
              <div className="space-y-2">
                <Label>Nama Belakang</Label>
                <Input required placeholder="Santoso" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Email</Label>
                <Input type="email" required placeholder="budi@email.com" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Alamat</Label>
                <Input required placeholder="Jl. Sudirman No. 123" />
              </div>
              <div className="space-y-2">
                <Label>Kota</Label>
                <Input required placeholder="Jakarta Selatan" />
              </div>
              <div className="space-y-2">
                <Label>Kode Pos</Label>
                <Input required placeholder="12190" />
              </div>
              <div className="space-y-2">
                <Label>Telepon</Label>
                <Input required placeholder="+6281212345678" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-6">
            <h2 className="font-semibold mb-4">Pembayaran (Demo)</h2>
            <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
              Ini adalah demo portfolio. Tidak ada pembayaran nyata yang diproses.
              Klik "Pesan Sekarang" untuk mensimulasikan checkout berhasil.
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Memproses..." : "Pesan Sekarang"}
          </Button>
        </form>

        <div>
          <div className="rounded-lg border p-6 sticky top-24">
            <h2 className="font-semibold mb-4">Pesanan</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="text-muted-foreground"> x{item.quantity}</span>
                  </div>
                  <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pengiriman</span>
                <span>Rp 15,000</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2">
                <span>Total</span>
                <span>Rp {(total + 15000).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
