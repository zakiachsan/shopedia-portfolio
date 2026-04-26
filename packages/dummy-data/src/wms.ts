import { WmsTransaction, StockLevel, StockLocation } from "./types"

export const stockLocations: StockLocation[] = [
  { id: "sloc_jkt", name: "Gudang Jakarta", address: "Jl. Industri Raya No. 1, Jakarta Utara" },
  { id: "sloc_bdg", name: "Gudang Bandung", address: "Jl. Soekarno-Hatta No. 45, Bandung" },
  { id: "sloc_sby", name: "Gudang Surabaya", address: "Jl. Rungkut Industri No. 12, Surabaya" },
]

export const stockLevels: StockLevel[] = [
  { id: "slvl_001", inventory_item_id: "var_001_nat_256", location_id: "sloc_jkt", stocked_quantity: 25, reserved_quantity: 5, incoming_quantity: 30 },
  { id: "slvl_002", inventory_item_id: "var_001_nat_256", location_id: "sloc_bdg", stocked_quantity: 12, reserved_quantity: 2, incoming_quantity: 0 },
  { id: "slvl_003", inventory_item_id: "var_001_nat_512", location_id: "sloc_jkt", stocked_quantity: 15, reserved_quantity: 3, incoming_quantity: 20 },
  { id: "slvl_004", inventory_item_id: "var_002_mid_16", location_id: "sloc_jkt", stocked_quantity: 8, reserved_quantity: 1, incoming_quantity: 15 },
  { id: "slvl_005", inventory_item_id: "var_003_blk", location_id: "sloc_jkt", stocked_quantity: 35, reserved_quantity: 8, incoming_quantity: 50 },
  { id: "slvl_006", inventory_item_id: "var_003_slv", location_id: "sloc_bdg", stocked_quantity: 18, reserved_quantity: 4, incoming_quantity: 0 },
  { id: "slvl_007", inventory_item_id: "var_004_42", location_id: "sloc_jkt", stocked_quantity: 10, reserved_quantity: 2, incoming_quantity: 20 },
  { id: "slvl_008", inventory_item_id: "var_004_41", location_id: "sloc_sby", stocked_quantity: 8, reserved_quantity: 0, incoming_quantity: 10 },
  { id: "slvl_009", inventory_item_id: "var_006", location_id: "sloc_jkt", stocked_quantity: 50, reserved_quantity: 12, incoming_quantity: 100 },
  { id: "slvl_010", inventory_item_id: "var_007_gph", location_id: "sloc_jkt", stocked_quantity: 22, reserved_quantity: 3, incoming_quantity: 30 },
  { id: "slvl_011", inventory_item_id: "var_008", location_id: "sloc_bdg", stocked_quantity: 28, reserved_quantity: 5, incoming_quantity: 0 },
  { id: "slvl_012", inventory_item_id: "var_009_blk", location_id: "sloc_jkt", stocked_quantity: 15, reserved_quantity: 2, incoming_quantity: 25 },
  { id: "slvl_013", inventory_item_id: "var_010_brn", location_id: "sloc_jkt", stocked_quantity: 12, reserved_quantity: 1, incoming_quantity: 20 },
  { id: "slvl_014", inventory_item_id: "var_011_pur", location_id: "sloc_sby", stocked_quantity: 30, reserved_quantity: 6, incoming_quantity: 0 },
  { id: "slvl_015", inventory_item_id: "var_012", location_id: "sloc_jkt", stocked_quantity: 20, reserved_quantity: 4, incoming_quantity: 30 },
]

export const wmsTransactions: WmsTransaction[] = [
  {
    id: "wtx_001", type: "inbound", inventory_item_id: "var_001_nat_256", variant_id: "var_001_nat_256", product_id: "prod_001",
    location_id: "sloc_jkt", quantity_before: 0, quantity_after: 50, delta: 50, reference_no: "PO-2025-001", notes: "Stok awal iPhone 15 Pro Max", created_by: "admin@shopedia.com", created_at: "2025-01-05T08:00:00Z",
  },
  {
    id: "wtx_002", type: "inbound", inventory_item_id: "var_003_blk", variant_id: "var_003_blk", product_id: "prod_003",
    location_id: "sloc_jkt", quantity_before: 0, quantity_after: 100, delta: 100, reference_no: "PO-2025-002", notes: "Stok awal Sony WH-1000XM5", created_by: "admin@shopedia.com", created_at: "2025-01-06T08:00:00Z",
  },
  {
    id: "wtx_003", type: "outbound", inventory_item_id: "var_001_nat_256", variant_id: "var_001_nat_256", product_id: "prod_001",
    location_id: "sloc_jkt", quantity_before: 50, quantity_after: 45, delta: -5, reference_no: "SO-1001", notes: "Order #1001", created_by: "admin@shopedia.com", created_at: "2025-01-10T10:00:00Z",
  },
  {
    id: "wtx_004", type: "outbound", inventory_item_id: "var_003_blk", variant_id: "var_003_blk", product_id: "prod_003",
    location_id: "sloc_jkt", quantity_before: 100, quantity_after: 92, delta: -8, reference_no: "SO-1003", notes: "Order #1003", created_by: "admin@shopedia.com", created_at: "2025-02-01T10:00:00Z",
  },
  {
    id: "wtx_005", type: "inbound", inventory_item_id: "var_002_mid_16", variant_id: "var_002_mid_16", product_id: "prod_002",
    location_id: "sloc_jkt", quantity_before: 0, quantity_after: 20, delta: 20, reference_no: "PO-2025-005", notes: "Restock MacBook Air M3", created_by: "admin@shopedia.com", created_at: "2025-02-15T08:00:00Z",
  },
  {
    id: "wtx_006", type: "outbound", inventory_item_id: "var_002_mid_16", variant_id: "var_002_mid_16", product_id: "prod_002",
    location_id: "sloc_jkt", quantity_before: 20, quantity_after: 17, delta: -3, reference_no: "SO-1002", notes: "Order #1002", created_by: "admin@shopedia.com", created_at: "2025-02-15T12:00:00Z",
  },
  {
    id: "wtx_007", type: "opname", inventory_item_id: "var_001_nat_256", variant_id: "var_001_nat_256", product_id: "prod_001",
    location_id: "sloc_jkt", quantity_before: 45, quantity_after: 43, delta: -2, reference_no: undefined, notes: "Stock opname Januari - ditemukan 2 unit rusak", created_by: "admin@shopedia.com", created_at: "2025-01-31T09:00:00Z",
  },
  {
    id: "wtx_008", type: "inbound", inventory_item_id: "var_006", variant_id: "var_006", product_id: "prod_006",
    location_id: "sloc_jkt", quantity_before: 50, quantity_after: 150, delta: 100, reference_no: "PO-2025-008", notes: "Restock AirPods Pro 2", created_by: "admin@shopedia.com", created_at: "2025-03-01T08:00:00Z",
  },
  {
    id: "wtx_009", type: "outbound", inventory_item_id: "var_006", variant_id: "var_006", product_id: "prod_006",
    location_id: "sloc_jkt", quantity_before: 150, quantity_after: 138, delta: -12, reference_no: "SO-1004", notes: "Order #1004", created_by: "admin@shopedia.com", created_at: "2025-02-20T14:00:00Z",
  },
  {
    id: "wtx_010", type: "outbound", inventory_item_id: "var_006", variant_id: "var_006", product_id: "prod_006",
    location_id: "sloc_jkt", quantity_before: 138, quantity_after: 126, delta: -12, reference_no: "SO-1007", notes: "Order #1007", created_by: "admin@shopedia.com", created_at: "2025-03-10T10:00:00Z",
  },
  {
    id: "wtx_011", type: "inbound", inventory_item_id: "var_004_42", variant_id: "var_004_42", product_id: "prod_004",
    location_id: "sloc_jkt", quantity_before: 10, quantity_after: 30, delta: 20, reference_no: "PO-2025-011", notes: "Restock Nike AF1 size 42", created_by: "admin@shopedia.com", created_at: "2025-03-20T08:00:00Z",
  },
  {
    id: "wtx_012", type: "opname", inventory_item_id: "var_003_blk", variant_id: "var_003_blk", product_id: "prod_003",
    location_id: "sloc_jkt", quantity_before: 92, quantity_after: 90, delta: -2, reference_no: undefined, notes: "Stock opname Maret - variance 2 unit", created_by: "admin@shopedia.com", created_at: "2025-03-31T09:00:00Z",
  },
]
