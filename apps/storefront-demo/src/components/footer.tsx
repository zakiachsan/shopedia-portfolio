import Link from "next/link"
import { ADMIN_URL } from "@/lib/config"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-lg">Shopedia</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Toko online demo untuk portfolio. Dibangun dengan Next.js dan Tailwind CSS.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground">All Products</Link></li>
              <li><Link href="/collections/new-arrivals" className="hover:text-foreground">New Arrivals</Link></li>
              <li><Link href="/collections/flash-sale" className="hover:text-foreground">Flash Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3">Collections</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/collections/tech-essentials" className="hover:text-foreground">Tech Essentials</Link></li>
              <li><Link href="/collections/lifestyle" className="hover:text-foreground">Lifestyle</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3">Demo</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={ADMIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  Admin Dashboard →
                </a>
              </li>
              <li><span className="text-xs">Data dummy | No backend</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 Shopedia Demo. Built for portfolio purposes.
        </div>
      </div>
    </footer>
  )
}
