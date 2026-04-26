import Link from "next/link"
import { customers } from "@shopedia/dummy-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { DataTable } from "@/components/layout/data-table"
import { Plus, HelpCircle } from "lucide-react"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        actions={
          <>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
            <Button variant="primary" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add Customer
            </Button>
          </>
        }
      />

      <DataTable
        title="Customers"
        count={customers.length}
        showFilters
        showExport
        pagination={{ pageSize: 10, total: customers.length }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <input type="checkbox" className="rounded border-gray-300" disabled />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" disabled />
                </TableCell>
                <TableCell>
                  <Link href={`/customers/${customer.id}/`} className="flex items-center gap-3 group">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback className="text-xs bg-primary/10 text-primary font-medium">
                        {customer.first_name[0]}{customer.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium group-hover:text-primary transition-colors">{customer.first_name} {customer.last_name}</span>
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{customer.email}</TableCell>
                <TableCell className="text-right">{customer.orders_count}</TableCell>
                <TableCell className="text-right font-mono text-sm">
                  Rp {customer.total_spent.toLocaleString()}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(customer.created_at).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <span className="text-muted-foreground">⋯</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTable>
    </div>
  )
}
