export * from "./types"
export { products } from "./products"
export { categories } from "./categories"
export { collections } from "./collections"
export { customers } from "./customers"
export { orders } from "./orders"
export { promotions } from "./promotions"
export { stockLocations, stockLevels, wmsTransactions } from "./wms"

import { products } from "./products"
import { customers } from "./customers"
import { orders } from "./orders"
import { categories } from "./categories"
import { collections } from "./collections"
import { promotions } from "./promotions"
import { stockLevels, wmsTransactions } from "./wms"

// Helper functions
export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function getProductByHandle(handle: string) {
  return products.find((p) => p.handle === handle)
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.category_id === categoryId)
}

export function getProductsByCollection(collectionId: string) {
  return products.filter((p) => p.collection_ids.includes(collectionId))
}

export function getCustomerById(id: string) {
  return customers.find((c) => c.id === id)
}

export function getOrdersByCustomer(customerId: string) {
  return orders.filter((o) => o.customer_id === customerId)
}

export function getOrderById(id: string) {
  return orders.find((o) => o.id === id)
}

export function getOrderByDisplayId(displayId: number) {
  return orders.find((o) => o.display_id === displayId)
}

export function getCategoryByHandle(handle: string) {
  return categories.find((c) => c.handle === handle)
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id)
}

export function getCollectionByHandle(handle: string) {
  return collections.find((c) => c.handle === handle)
}

export function getPromotionById(id: string) {
  return promotions.find((p) => p.id === id)
}

export function getWmsTransactionsByType(type: "inbound" | "outbound" | "opname") {
  return wmsTransactions.filter((t) => t.type === type)
}

export function getStockLevelsByLocation(locationId: string) {
  return stockLevels.filter((s) => s.location_id === locationId)
}

export function getStockLevelByItemAndLocation(itemId: string, locationId: string) {
  return stockLevels.find((s) => s.inventory_item_id === itemId && s.location_id === locationId)
}

// Stats helpers
export function getTotalStockValue() {
  return stockLevels.reduce((sum, s) => sum + s.stocked_quantity, 0)
}

export function getLowStockItems(threshold = 10) {
  return stockLevels.filter((s) => s.stocked_quantity < threshold)
}

export function getTotalRevenue() {
  return orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0)
}
