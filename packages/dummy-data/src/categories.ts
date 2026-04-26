import { Category } from "./types"

export const categories: Category[] = [
  {
    id: "pcat_elektronik",
    name: "Elektronik",
    handle: "elektronik",
    description: "Gadget dan perangkat elektronik terbaru",
    rank: 0,
    children: [
      {
        id: "pcat_hp",
        name: "Handphone",
        handle: "handphone",
        parent_id: "pcat_elektronik",
        rank: 0,
      },
      {
        id: "pcat_laptop",
        name: "Laptop",
        handle: "laptop",
        parent_id: "pcat_elektronik",
        rank: 1,
      },
      {
        id: "pcat_audio",
        name: "Audio",
        handle: "audio",
        parent_id: "pcat_elektronik",
        rank: 2,
      },
    ],
  },
  {
    id: "pcat_fashion",
    name: "Fashion",
    handle: "fashion",
    description: "Pakaian dan aksesoris trendi",
    rank: 1,
    children: [
      {
        id: "pcat_pria",
        name: "Pria",
        handle: "fashion-pria",
        parent_id: "pcat_fashion",
        rank: 0,
      },
      {
        id: "pcat_wanita",
        name: "Wanita",
        handle: "fashion-wanita",
        parent_id: "pcat_fashion",
        rank: 1,
      },
    ],
  },
  {
    id: "pcat_rumah",
    name: "Rumah & Dapur",
    handle: "rumah-dapur",
    description: "Kebutuhan rumah tangga",
    rank: 2,
  },
  {
    id: "pcat_olahraga",
    name: "Olahraga",
    handle: "olahraga",
    description: "Peralatan olahraga dan fitness",
    rank: 3,
  },
  {
    id: "pcat_buku",
    name: "Buku & Stationery",
    handle: "buku-stationery",
    description: "Buku, alat tulis, dan perlengkapan kantor",
    rank: 4,
  },
]
