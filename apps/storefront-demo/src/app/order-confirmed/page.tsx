import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <CheckCircle className="h-20 w-20 mx-auto text-green-600 mb-6" />
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Thank You</p>
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3">Pesanan Berhasil!</h1>
      <p className="text-neutral-500 mb-10 max-w-md mx-auto leading-relaxed">
        Terima kasih telah berbelanja di Shopedia Demo. Ini adalah simulasi checkout &mdash; tidak ada pesanan nyata yang dibuat.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/">
          <Button className="text-sm font-bold uppercase tracking-wider px-8 h-12">Kembali ke Beranda</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline" className="text-sm font-bold uppercase tracking-wider px-8 h-12">Lanjut Belanja</Button>
        </Link>
      </div>
    </div>
  )
}
