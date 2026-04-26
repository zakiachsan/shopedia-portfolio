"use client"

import { categories } from "@shopedia/dummy-data"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { FolderOpen, Folder, ChevronRight, Plus, HelpCircle } from "lucide-react"
import { useState } from "react"

export default function CategoriesPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        actions={
          <>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </>
        }
      />

      <div className="space-y-3">
        {categories.map((cat) => {
          const isExpanded = expanded[cat.id] ?? false
          const hasChildren = cat.children && cat.children.length > 0
          return (
            <Card key={cat.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => hasChildren && setExpanded((prev) => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors text-left"
                >
                  <FolderOpen className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">{cat.name}</div>
                    <div className="text-xs text-muted-foreground">/{cat.handle}</div>
                  </div>
                  {hasChildren && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{cat.children!.length} subcategories</span>
                      <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  )}
                </button>
                {hasChildren && isExpanded && (
                  <div className="border-t bg-muted/20">
                    {cat.children!.map((child) => (
                      <div key={child.id} className="flex items-center gap-3 px-5 py-3 pl-14 border-b last:border-b-0">
                        <Folder className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div>
                          <div className="text-sm font-medium">{child.name}</div>
                          <div className="text-xs text-muted-foreground">/{child.handle}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
