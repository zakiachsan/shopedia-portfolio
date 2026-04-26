import { ReactNode } from "react"
import { Filter, Search, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableProps {
  title?: string
  count?: number
  searchPlaceholder?: string
  showExport?: boolean
  showFilters?: boolean
  children: ReactNode
  pagination?: {
    pageSize: number
    total: number
    currentPage?: number
  }
}

export function DataTable({
  title,
  count,
  searchPlaceholder = "Search...",
  showExport = true,
  showFilters = true,
  children,
  pagination,
}: DataTableProps) {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
        <div className="flex items-center gap-4">
          {title && <span className="text-sm font-semibold">{title}</span>}
          {count !== undefined && (
            <span className="text-sm text-muted-foreground">({count})</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showFilters && (
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          )}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-8 h-8 w-48 text-sm"
              disabled
            />
          </div>
          {showExport && (
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">{children}</div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/60 text-sm">
          <div className="text-muted-foreground">
            Showing <span className="font-medium text-foreground">1-{Math.min(pagination.pageSize, pagination.total)}</span> of{" "}
            <span className="font-medium text-foreground">{pagination.total}</span> items
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
