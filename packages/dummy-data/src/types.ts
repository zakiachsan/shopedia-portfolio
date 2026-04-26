export interface Product {
  id: string
  title: string
  handle: string
  description: string
  subtitle?: string
  status: "published" | "draft"
  thumbnail: string
  images: string[]
  category_id?: string
  collection_ids: string[]
  tags: string[]
  variants: ProductVariant[]
  options: ProductOption[]
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  title: string
  sku: string
  price: number
  original_price?: number
  inventory_quantity: number
  options: Record<string, string>
  image?: string
}

export interface ProductOption {
  id: string
  title: string
  values: string[]
}

export interface Category {
  id: string
  name: string
  handle: string
  description?: string
  parent_id?: string
  rank: number
  children?: Category[]
}

export interface Collection {
  id: string
  title: string
  handle: string
  description?: string
  image?: string
  product_ids: string[]
}

export interface Customer {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  avatar?: string
  addresses: Address[]
  orders_count: number
  total_spent: number
  created_at: string
}

export interface Address {
  id: string
  first_name: string
  last_name: string
  address_1: string
  address_2?: string
  city: string
  province: string
  postal_code: string
  country_code: string
  phone?: string
}

export interface Order {
  id: string
  display_id: number
  status: "pending" | "processing" | "shipped" | "completed" | "canceled"
  fulfillment_status: "not_fulfilled" | "partially_fulfilled" | "fulfilled"
  payment_status: "pending" | "captured" | "refunded"
  customer_id?: string
  email: string
  currency_code: string
  total: number
  subtotal: number
  tax_total: number
  shipping_total: number
  discount_total: number
  items: OrderItem[]
  shipping_address: Address
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  product_id: string
  variant_id: string
  title: string
  variant_title: string
  quantity: number
  unit_price: number
  total: number
  thumbnail?: string
}

export interface Promotion {
  id: string
  code: string
  is_automatic: boolean
  type: "percentage" | "fixed"
  status: "active" | "inactive"
  value: number
  usage_limit?: number
  usage_count: number
  starts_at?: string
  ends_at?: string
}

export interface WmsTransaction {
  id: string
  type: "inbound" | "outbound" | "opname"
  inventory_item_id: string
  variant_id?: string
  product_id?: string
  location_id: string
  quantity_before: number
  quantity_after: number
  delta: number
  reference_no?: string
  notes?: string
  created_by?: string
  created_at: string
}

export interface StockLevel {
  id: string
  inventory_item_id: string
  location_id: string
  stocked_quantity: number
  reserved_quantity: number
  incoming_quantity: number
}

export interface StockLocation {
  id: string
  name: string
  address?: string
}
