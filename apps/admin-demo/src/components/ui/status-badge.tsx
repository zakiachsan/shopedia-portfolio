import { Badge } from "./badge"

const statusMap: Record<string, "green" | "red" | "orange" | "blue" | "gray"> = {
  // Positive
  completed: "green",
  paid: "green",
  active: "green",
  published: "green",
  ok: "green",
  inbound: "green",
  // Negative
  canceled: "red",
  cancelled: "red",
  unpaid: "red",
  low: "red",
  outbound: "red",
  failed: "red",
  // Warning / Pending
  processing: "orange",
  pending: "orange",
  shipped: "orange",
  draft: "orange",
  // Neutral / Info
  secondary: "blue",
  refunded: "blue",
  manual: "blue",
  "pay with check": "blue",
  paypal: "blue",
  bank: "blue",
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const normalized = status.toLowerCase().trim()
  const variant = statusMap[normalized] ?? "gray"
  const label = status.charAt(0).toUpperCase() + status.slice(1)
  return <Badge variant={variant} className={className}>{label}</Badge>
}
