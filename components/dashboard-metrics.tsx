"use client"

import { ArrowUpRight, ArrowDownRight, Zap, Users, Target, DollarSign } from "lucide-react"

export default function DashboardMetrics() {
  const metrics = [
    {
      label: "Total Revenue",
      value: "$240,820",
      change: "+24.6%",
      positive: true,
      icon: DollarSign,
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-500/10 to-emerald-500/5",
    },
    {
      label: "Active Deals",
      value: "1,247",
      change: "+12.3%",
      positive: true,
      icon: Target,
      color: "from-blue-600 to-cyan-600",
      bgColor: "from-blue-500/10 to-cyan-500/5",
    },
    {
      label: "Win Rate",
      value: "68.5%",
      change: "+3.2%",
      positive: true,
      icon: Zap,
      color: "from-purple-600 to-pink-600",
      bgColor: "from-purple-500/10 to-pink-500/5",
    },
    {
      label: "Avg Deal Size",
      value: "$48,320",
      change: "-2.1%",
      positive: false,
      icon: Users,
      color: "from-orange-600 to-red-600",
      bgColor: "from-orange-500/10 to-red-500/5",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, i) => (
        <div
          key={metric.label}
          className="fade-in-up group glass rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/60 hover:bg-white/20 transition-all duration-300 hover-lift relative overflow-hidden"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <div
            className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${metric.bgColor} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>

          <div className="relative z-10 flex items-start justify-between mb-6">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{metric.label}</p>
              <p className="text-4xl font-black mt-3 tracking-tight">{metric.value}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all`}
            >
              <metric.icon className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            {metric.positive ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-bold ${metric.positive ? "text-emerald-500" : "text-red-500"}`}>
              {metric.change}
            </span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  )
}
