import Link from "next/link"
import { ADMIN_URL } from "@/lib/config"

const SHOP_LINKS = [
  { href: "/products", label: "All Products" },
  { href: "/collections/new-arrivals", label: "New Arrivals" },
  { href: "/collections/flash-sale", label: "Flash Sale" },
  { href: "/collections/tech-essentials", label: "Tech Essentials" },
  { href: "/collections/lifestyle", label: "Lifestyle" },
]

const INFO_LINKS = [
  { href: "/", label: "About Us" },
  { href: "/", label: "Contact" },
  { href: "/", label: "FAQ" },
  { href: "/", label: "Shipping Info" },
  { href: "/", label: "Returns & Refunds" },
]

const DEMO_LINKS = [
  { href: ADMIN_URL, label: "Admin Dashboard", external: true },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/order-confirmed", label: "Order Demo" },
]

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <span className="font-bold text-xl uppercase tracking-tight">Shopedia</span>
            <p className="text-sm text-neutral-400 mt-4 leading-relaxed max-w-xs">
              Toko online demo untuk portfolio. Dibangun dengan Next.js dan Tailwind CSS.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400 mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white hover:text-neutral-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400 mb-4">
              Information
            </h3>
            <ul className="space-y-2.5">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white hover:text-neutral-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-400 mb-4">
              Demo
            </h3>
            <ul className="space-y-2.5">
              {DEMO_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white hover:text-neutral-300 transition-colors inline-flex items-center gap-1"
                    >
                      {link.label} →
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-white hover:text-neutral-300 transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © 2025 Shopedia Demo. Built for portfolio purposes.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <Link key={item} href="/" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
