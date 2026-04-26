import { Collection } from "./types"

export const collections: Collection[] = [
  {
    id: "col_new",
    title: "New Arrivals",
    handle: "new-arrivals",
    description: "Produk terbaru yang baru masuk minggu ini",
    image: "https://picsum.photos/seed/newarr/800/400",
    product_ids: ["prod_001", "prod_002", "prod_003", "prod_004", "prod_005"],
  },
  {
    id: "col_sale",
    title: "Flash Sale",
    handle: "flash-sale",
    description: "Diskon besar-besaran hingga 50%",
    image: "https://picsum.photos/seed/flash/800/400",
    product_ids: ["prod_003", "prod_006", "prod_009", "prod_012", "prod_015"],
  },
  {
    id: "col_tech",
    title: "Tech Essentials",
    handle: "tech-essentials",
    description: "Gadget wajib untuk produktivitas",
    image: "https://picsum.photos/seed/tech/800/400",
    product_ids: ["prod_001", "prod_002", "prod_007", "prod_008", "prod_010"],
  },
  {
    id: "col_lifestyle",
    title: "Lifestyle",
    handle: "lifestyle",
    description: "Produk untuk gaya hidup modern",
    image: "https://picsum.photos/seed/life/800/400",
    product_ids: ["prod_004", "prod_011", "prod_013", "prod_014", "prod_016"],
  },
]
