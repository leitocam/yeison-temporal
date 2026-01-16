"use client"

import { useState, useEffect } from "react"
import { Bot, Settings, Play, BarChart3, Users, MessageSquare, TrendingUp, AlertCircle, Loader2 } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import { apiClient, AgentInstance } from "@/lib/api-client"

interface Agent {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "training"
  icon: any
}

// Map agent type to icon
const getIconForType = (type?: string) => {
  const typeMap: Record<string, any> = {
    sales: MessageSquare,
    lead: Users,
    analytics: BarChart3,
    customer: TrendingUp,
  }
  return typeMap[type?.toLowerCase() || ""] || Bot
}

export default function AgentsSection() {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)
  
  const { data: agentInstances, isLoading, error, execute } = useApi<AgentInstance[]>(
    () => apiClient.get("/agents?skip=0&limit=100")
  )

  useEffect(() => {
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Transform API data to Agent format
  const agents: Agent[] = (agentInstances || []).map((instance) => ({
    id: instance.id,
    name: instance.configuration?.agent_info?.name || instance.name,
    description: `${instance.configuration?.agent_info?.type || "Agent"}: ${instance.configuration?.personality?.brand_voice || "No brand voice configured"}`,
    status: instance.is_active ? "active" : "inactive",
    icon: getIconForType(instance.configuration?.agent_info?.type),
  }))

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-black mb-2">Intelligent Agents</h2>
        <p className="text-muted-foreground">
          Manage autonomous agents that handle specific sales processes and customer interactions
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="glass rounded-2xl p-8 border-2 border-red-500/20">
          <div className="flex items-center gap-4 mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="text-xl font-bold text-red-500">Failed to load agents</h3>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>
          <button
            onClick={() => execute()}
            className="px-6 py-2 bg-primary/30 hover:bg-primary/40 rounded-lg font-semibold transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && agents.length === 0 && (
        <div className="glass rounded-2xl p-12 border-2 border-primary/20 text-center">
          <Bot className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">No agents yet</h3>
          <p className="text-muted-foreground mb-6">Create your first intelligent agent to get started</p>
        </div>
      )}

      {/* Agents Grid */}
      {!isLoading && !error && agents.length > 0 && (
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
                  <p className="text-lg font-black text-primary">--</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Calls</p>
                  <p className="text-lg font-black">--</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Success</p>
                  <p className="text-lg font-black text-emerald-500">--</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Avg Time</p>
                  <p className="text-lg font-black">--</p>
                </div>
              </div>

            </div>
          )
        })}
      </div>
      )}

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
