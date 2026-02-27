"use client"

import { useState, useEffect } from "react"
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Line, LineChart } from "recharts"
import { adminApi } from "@/lib/api-client"
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/constants"
import type { DashboardStats } from "@/lib/types"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.getDashboard()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading || !stats) {
    return (
      <div>
        <h1 className="mb-8 text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-secondary" />
          ))}
        </div>
      </div>
    )
  }

  const statCards = [
    { title: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, change: stats.revenueChange, icon: DollarSign },
    { title: "Total Orders", value: stats.totalOrders.toString(), change: stats.ordersChange, icon: ShoppingCart },
    { title: "Products", value: stats.totalProducts.toString(), change: null, icon: Package },
    { title: "Customers", value: stats.totalUsers.toLocaleString(), change: null, icon: Users },
  ]

  // Compute recharts colors in JS, not CSS variables
  const chartBlue = "#3b82f6"
  const chartEmerald = "#10b981"

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* Stat Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <stat.icon className="size-5 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              {stat.change !== null && (
                <div className="mt-1 flex items-center gap-1">
                  {stat.change >= 0 ? (
                    <TrendingUp className="size-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="size-3.5 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${stat.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {stat.change >= 0 ? "+" : ""}{stat.change}% from last month
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: chartBlue },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.revenueByMonth}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill={chartBlue} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Orders Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                orders: { label: "Orders", color: chartEmerald },
              }}
              className="h-[280px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.ordersByMonth}>
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="orders" stroke={chartEmerald} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {stats.recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
                    <span className="text-sm font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {stats.topProducts.slice(0, 5).map((product, i) => (
                <div key={product.id} className="flex items-center gap-3 rounded-lg border border-border/50 p-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                  <img src={product.images[0]} alt="" className="size-10 rounded-lg object-cover" />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.totalSold} sold</p>
                  </div>
                  <span className="text-sm font-semibold">${product.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
