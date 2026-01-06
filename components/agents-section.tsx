"use client"

import { useState } from "react"
import { Bot, Settings, Play, BarChart3, Users, MessageSquare, TrendingUp } from "lucide-react"

interface Agent {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "training"
  performance: number
  calls: number
  successRate: number
  avgResponseTime: number
  icon: any
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Lead Qualifier",
    description: "Automatically qualifies inbound leads and scores them by conversion potential",
    status: "active",
    performance: 94,
    calls: 2847,
    successRate: 87,
    avgResponseTime: 1.2,
    icon: Users,
  },
  {
    id: "2",
    name: "Sales Engagement",
    description: "Manages multi-touch campaigns and personalized outreach sequences",
    status: "active",
    performance: 91,
    calls: 3421,
    successRate: 82,
    avgResponseTime: 1.8,
    icon: MessageSquare,
  },
  {
    id: "3",
    name: "Deal Analyzer",
    description: "Analyzes deal progression and predicts close probability with AI insights",
    status: "active",
    performance: 96,
    calls: 1523,
    successRate: 91,
    avgResponseTime: 0.9,
    icon: BarChart3,
  },
  {
    id: "4",
    name: "Customer Success",
    description: "Monitors customer health and identifies at-risk accounts for proactive intervention",
    status: "inactive",
    performance: 88,
    calls: 892,
    successRate: 79,
    avgResponseTime: 2.1,
    icon: TrendingUp,
  },
]

export default function AgentsSection() {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-black mb-2">Intelligent Agents</h2>
        <p className="text-muted-foreground">
          Manage autonomous agents that handle specific sales processes and customer interactions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent, index) => {
          const IconComponent = agent.icon
          const isExpanded = expandedAgent === agent.id

          return (
            <div
              key={agent.id}
              className="fade-in-up glass rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div
                className="p-6 border-b border-primary/20 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{agent.name}</h3>
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            agent.status === "active"
                              ? "bg-emerald-500"
                              : agent.status === "training"
                                ? "bg-blue-500"
                                : "bg-muted-foreground"
                          }`}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="p-2 glass hover:bg-white/20 rounded-lg transition-all ml-2 flex-shrink-0"
                  >
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Metrics Summary */}
              <div className="px-6 py-4 bg-white/5 grid grid-cols-4 gap-2">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Performance</p>
                  <p className="text-lg font-black text-primary">{agent.performance}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Calls</p>
                  <p className="text-lg font-black">{(agent.calls / 1000).toFixed(1)}K</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Success</p>
                  <p className="text-lg font-black text-emerald-500">{agent.successRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Avg Time</p>
                  <p className="text-lg font-black">{agent.avgResponseTime}s</p>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-6 border-t border-primary/20 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 glass rounded-xl border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-2">Total Interactions</p>
                      <p className="text-2xl font-black">{agent.calls.toLocaleString()}</p>
                      <p className="text-xs text-emerald-500 mt-2">+12% this week</p>
                    </div>
                    <div className="p-4 glass rounded-xl border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-2">Conversion Rate</p>
                      <p className="text-2xl font-black">{agent.successRate}%</p>
                      <p className="text-xs text-emerald-500 mt-2">+3% improvement</p>
                    </div>
                  </div>

                  <div className="p-4 glass rounded-xl border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-3">Response Time Distribution</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Average</span>
                        <span className="font-bold">{agent.avgResponseTime}s</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${100 - agent.avgResponseTime * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        agent.status === "active"
                          ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30"
                          : "bg-primary/30 text-primary hover:bg-primary/40"
                      }`}
                    >
                      <Play className="w-4 h-4" />
                      {agent.status === "active" ? "Running" : "Start"}
                    </button>
                    <button className="flex-1 py-3 rounded-lg font-semibold transition-all duration-300 bg-white/10 hover:bg-white/20 flex items-center justify-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Agent Configuration Card */}
      <div className="fade-in-up glass rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-black mb-1">Create New Agent</h3>
            <p className="text-muted-foreground">Deploy a custom intelligent agent for your specific workflow</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-6 glass rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:bg-white/10 transition-all group">
            <Users className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-sm mb-1">Lead Qualification</p>
            <p className="text-xs text-muted-foreground">Auto-score and route leads</p>
          </button>
          <button className="p-6 glass rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:bg-white/10 transition-all group">
            <MessageSquare className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-sm mb-1">Outreach Agent</p>
            <p className="text-xs text-muted-foreground">Multi-channel engagement</p>
          </button>
          <button className="p-6 glass rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:bg-white/10 transition-all group">
            <BarChart3 className="w-8 h-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-bold text-sm mb-1">Analytics Agent</p>
            <p className="text-xs text-muted-foreground">Advanced deal insights</p>
          </button>
        </div>
      </div>
    </div>
  )
}
