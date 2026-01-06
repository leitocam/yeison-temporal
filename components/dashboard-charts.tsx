"use client"

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Target, Zap } from "lucide-react"

const lineData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 52000 },
  { month: "Mar", value: 48000 },
  { month: "Apr", value: 61000 },
  { month: "May", value: 55000 },
  { month: "Jun", value: 68000 },
  { month: "Jul", value: 72000 },
  { month: "Aug", value: 78000 },
  { month: "Sep", value: 85000 },
  { month: "Oct", value: 92000 },
  { month: "Nov", value: 98000 },
  { month: "Dec", value: 120000 },
]

const barData = [
  { name: "Direct Sales", value: 45, fill: "hsl(var(--primary))" },
  { name: "Referrals", value: 28, fill: "hsl(var(--accent))" },
  { name: "Partnerships", value: 18, fill: "hsl(var(--chart-2))" },
  { name: "Inbound", value: 9, fill: "hsl(var(--chart-3))" },
]

export default function DashboardCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 fade-in-up glass rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black mb-2">Revenue Trend</h3>
              <p className="text-sm text-muted-foreground">Monthly growth trajectory</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-primary/20">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm font-bold text-accent">+167%</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "2px solid hsl(var(--primary))",
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 5 }}
                activeDot={{ r: 7 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className="fade-in-up glass rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black mb-2">Lead Source</h3>
              <p className="text-sm text-muted-foreground">Distribution</p>
            </div>
            <Target className="w-6 h-6 text-accent" />
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 30, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={70} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "2px solid hsl(var(--primary))",
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
              />
              <Bar dataKey="value" radius={8} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        className="fade-in-up glass rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-black mb-2">Key Performance Indicators</h3>
            <p className="text-sm text-muted-foreground">Critical metrics overview</p>
          </div>
          <Zap className="w-6 h-6 text-accent" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Conversion Rate", value: "3.24%", target: "3.50%", status: "on-track" },
            { label: "Avg Sales Cycle", value: "42 days", target: "35 days", status: "needs-attention" },
            { label: "Customer LTV", value: "$52,400", target: "$60,000", status: "on-track" },
            { label: "Churn Rate", value: "2.1%", target: "1.5%", status: "needs-attention" },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className="fade-in-up p-5 glass rounded-xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              style={{ animationDelay: `${0.25 + i * 0.05}s` }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{kpi.label}</p>
              <p className="text-3xl font-black mt-3 tracking-tight">{kpi.value}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary/10">
                <p className="text-xs text-muted-foreground">Target: {kpi.target}</p>
                <div
                  className={`w-2 h-2 rounded-full ${kpi.status === "on-track" ? "bg-emerald-500" : "bg-orange-500"}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
