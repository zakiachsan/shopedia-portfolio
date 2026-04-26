import Link from "next/link"
import { collections } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Collections</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Collections ({collections.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Collection</TableHead>
                <TableHead>Handle</TableHead>
                <TableHead className="text-right">Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map((col) => (
                <TableRow key={col.id} className="cursor-pointer">
                  <TableCell>
                    <Link href={`/collections/${col.id}`} className="flex items-center gap-3">
                      {col.image && (
                        <img src={col.image} alt={col.title} className="h-10 w-10 rounded-md object-cover" />
                      )}
                      <div className="font-medium">{col.title}</div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{col.handle}</TableCell>
                  <TableCell className="text-right">{col.product_ids.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
