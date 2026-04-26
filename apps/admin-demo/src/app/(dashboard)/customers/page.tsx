import Link from "next/link"
import { customers } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({customers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} className="cursor-pointer">
                  <TableCell>
                    <Link href={`/customers/${customer.id}`} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>{customer.first_name[0]}{customer.last_name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{customer.first_name} {customer.last_name}</span>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">{customer.email}</TableCell>
                  <TableCell className="text-right">{customer.orders_count}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    Rp {customer.total_spent.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(customer.created_at).toLocaleDateString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
