import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <CheckCircle className="h-16 w-16 mx-auto text-green-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Pesanan Berhasil!</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Terima kasih telah berbelanja di Shopedia Demo. Ini adalah simulasi checkout — tidak ada pesanan nyata yang dibuat.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/">
          <Button>Kembali ke Beranda</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">Lanjut Belanja</Button>
        </Link>
      </div>
    </div>
  )
}
