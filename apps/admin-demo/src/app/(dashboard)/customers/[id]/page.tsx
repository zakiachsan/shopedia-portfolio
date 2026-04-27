import { notFound } from "next/navigation"
import { getCustomerById, getOrdersByCustomer } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { PlaceholderDialog } from "@/components/ui/placeholder-dialog"
import { ArrowLeft, Pencil, HelpCircle } from "lucide-react"

export function generateStaticParams() {
  const { customers } = require("@shopedia/dummy-data")
  return customers.map((c: any) => ({ id: c.id }))
}

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const customer = getCustomerById(id)
  if (!customer) return notFound()
  const customerOrders = getOrdersByCustomer(id)

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${customer.first_name} ${customer.last_name}`}
        subtitle={customer.email}
        actions={
          <>
            <PlaceholderDialog title="Help">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </PlaceholderDialog>
            <PlaceholderDialog title="Edit Customer">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </PlaceholderDialog>
            <Link href="/customers/">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={customer.avatar} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary font-semibold">
                    {customer.first_name[0]}{customer.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-semibold">{customer.first_name} {customer.last_name}</h2>
                <p className="text-sm text-muted-foreground">{customer.email}</p>
                <p className="text-sm text-muted-foreground">{customer.phone}</p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{customer.orders_count}</div>
                  <div className="text-xs text-muted-foreground">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Rp {(customer.total_spent / 1000000).toFixed(1)}M</div>
                  <div className="text-xs text-muted-foreground">Total Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Addresses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {customer.addresses.map((addr: any) => (
                <div key={addr.id} className="rounded-lg border p-3 text-sm">
                  <p className="font-medium">{addr.first_name} {addr.last_name}</p>
                  <p>{addr.address_1}</p>
                  {addr.address_2 && <p>{addr.address_2}</p>}
                  <p>{addr.city}, {addr.province} {addr.postal_code}</p>
                  <p className="text-muted-foreground">{addr.phone}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History ({customerOrders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {customerOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerOrders.map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Link href={`/orders/${order.id}/`} className="font-medium hover:text-primary transition-colors">
                            #{order.display_id}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">Rp {order.total.toLocaleString()}</TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(order.created_at).toLocaleDateString("id-ID")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
