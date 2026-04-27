import { notFound } from "next/navigation"
import { promotions } from "@shopedia/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/layout/page-header"
import { PlaceholderDialog } from "@/components/ui/placeholder-dialog"
import Link from "next/link"
import { ArrowLeft, Pencil, HelpCircle, Calendar, Tag, Percent, Banknote, Users, Clock } from "lucide-react"

export function generateStaticParams() {
  return promotions.map((p) => ({ id: p.id }))
}

export default async function PromotionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const promo = promotions.find((p) => p.id === id)
  if (!promo) return notFound()

  const remainingUsage = promo.usage_limit ? promo.usage_limit - promo.usage_count : null

  return (
    <div className="space-y-6">
      <PageHeader
        title={promo.code}
        subtitle={promo.is_automatic ? "Automatic" : "Manual"}
        actions={
          <>
            <PlaceholderDialog title="Help">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </PlaceholderDialog>
            <PlaceholderDialog title="Edit Promotion">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </PlaceholderDialog>
            <Link href="/promotions/">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </>
        }
      />

      <div className="flex items-center gap-3">
        <StatusBadge status={promo.status} />
        <Badge variant="outline" className="capitalize">{promo.type}</Badge>
        <Badge variant={promo.is_automatic ? "blue" : "gray"}>{promo.is_automatic ? "Automatic" : "Manual"}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Promotion Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    Code
                  </div>
                  <div className="font-mono text-lg font-semibold">{promo.code}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    {promo.type === "percentage" ? <Percent className="h-3.5 w-3.5" /> : <Banknote className="h-3.5 w-3.5" />}
                    Value
                  </div>
                  <div className="text-lg font-semibold">
                    {promo.type === "percentage" ? `${promo.value}%` : `Rp ${promo.value.toLocaleString()}`}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
                  <Calendar className="h-3.5 w-3.5" />
                  Period
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Starts</div>
                    <div className="font-medium text-sm">
                      {promo.starts_at ? new Date(promo.starts_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" }) : "—"}
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-xs text-muted-foreground">Ends</div>
                    <div className="font-medium text-sm">
                      {promo.ends_at ? new Date(promo.ends_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" }) : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{promo.usage_count}</div>
                  <div className="text-xs text-muted-foreground">Times Used</div>
                </div>
              </div>

              {promo.usage_limit && (
                <>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Usage Limit</span>
                      <span className="font-medium">{promo.usage_count} / {promo.usage_limit}</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.min((promo.usage_count / promo.usage_limit) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Remaining:</span>
                    <span className="font-medium">{remainingUsage}</span>
                  </div>
                </>
              )}

              {!promo.usage_limit && (
                <div className="text-sm text-muted-foreground">
                  No usage limit set (unlimited)
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ID</span>
                <span className="font-mono text-xs">{promo.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="capitalize font-medium">{promo.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge status={promo.status} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Application</span>
                <span className="font-medium">{promo.is_automatic ? "Automatic" : "Manual Code"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
