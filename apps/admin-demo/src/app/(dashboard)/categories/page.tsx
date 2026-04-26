import { categories } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder, FolderOpen } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
      </div>
      <div className="grid gap-4">
        {categories.map((cat) => (
          <Card key={cat.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FolderOpen className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">/{cat.handle}</div>
                </div>
                {cat.children && cat.children.length > 0 && (
                  <div className="text-xs text-muted-foreground">{cat.children.length} subcategories</div>
                )}
              </div>
              {cat.children && cat.children.length > 0 && (
                <div className="mt-3 ml-8 space-y-2">
                  {cat.children.map((child) => (
                    <div key={child.id} className="flex items-center gap-2 text-sm">
                      <Folder className="h-4 w-4 text-muted-foreground" />
                      <span>{child.name}</span>
                      <span className="text-xs text-muted-foreground">/{child.handle}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
