"use client"

import { useState, useEffect } from "react"
import { Bot, Settings, Play, BarChart3, Users, MessageSquare, TrendingUp, AlertCircle, Loader2, ChevronDown, Edit, Power, Save, X } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import { apiClient, AgentInstance } from "@/lib/api-client"

interface Agent {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "training"
  icon: any
  type?: string
  instance: AgentInstance
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
  const [editingAgent, setEditingAgent] = useState<string | null>(null)
  const [configForm, setConfigForm] = useState<any>({})
  
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
    type: instance.configuration?.agent_info?.type,
    instance: instance,
  }))

  const handleDisableAgent = async (agentId: string, currentStatus: boolean) => {
    try {
      await apiClient.put(`/agents/${agentId}`, {
        is_active: !currentStatus
      })
      // Refresh the list
      execute()
    } catch (err) {
      console.error('Failed to toggle agent status:', err)
    }
  }

  const handleSaveConfiguration = async (agentId: string) => {
    try {
      await apiClient.patch(`/agents/${agentId}/configuration`, configForm)
      setEditingAgent(null)
      setConfigForm({})
      // Refresh the list
      execute()
    } catch (err) {
      console.error('Failed to update configuration:', err)
    }
  }

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
                      setExpandedAgent(isExpanded ? null : agent.id)
                    }}
                    className="p-2 glass hover:bg-white/20 rounded-lg transition-all ml-2 flex-shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
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

              {/* Expanded Configuration Menu */}
              {isExpanded && (
                <div className="p-6 border-t border-primary/20 space-y-4">
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (editingAgent === agent.id) {
                          setEditingAgent(null)
                          setConfigForm({})
                        } else {
                          setEditingAgent(agent.id)
                          setConfigForm(agent.instance.configuration || {})
                        }
                      }}
                      className="flex-1 py-3 rounded-lg font-semibold transition-all duration-300 bg-primary/30 hover:bg-primary/40 flex items-center justify-center gap-2"
                    >
                      {editingAgent === agent.id ? (
                        <><X className="w-4 h-4" /> Cancel Edit</>
                      ) : (
                        <><Edit className="w-4 h-4" /> Edit Configuration</>
                      )}
                    </button>
                    <button
                      onClick={() => handleDisableAgent(agent.id, agent.instance.is_active)}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        agent.status === "active"
                          ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                          : "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30"
                      }`}
                    >
                      <Power className="w-4 h-4" />
                      {agent.status === "active" ? "Disable" : "Enable"}
                    </button>
                  </div>

                  {/* Configuration Form for Ventas type */}
                  {editingAgent === agent.id && agent.type?.toLowerCase() === "ventas" && (
                    <div className="space-y-4 pt-4 border-t border-primary/20">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold">Configuración del Agente de Ventas</h4>
                        <button
                          onClick={() => handleSaveConfiguration(agent.id)}
                          className="px-4 py-2 bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 rounded-lg font-semibold transition-all flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Guardar Cambios
                        </button>
                      </div>

                      {/* Agent Name */}
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">Nombre del Agente</label>
                        <input
                          type="text"
                          value={configForm?.agent_info?.name || ""}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            agent_info: { ...configForm.agent_info, name: e.target.value }
                          })}
                          className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                          placeholder="Ingrese el nombre del agente"
                        />
                      </div>

                      {/* Brand Voice */}
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">Voz de Marca</label>
                        <textarea
                          value={configForm?.personality?.brand_voice || ""}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            personality: { ...configForm.personality, brand_voice: e.target.value }
                          })}
                          className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors min-h-[100px]"
                          placeholder="Describe la voz de tu marca"
                        />
                      </div>

                      {/* Tone */}
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">Tono</label>
                        <select
                          value={configForm?.personality?.tone || "cool"}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            personality: { ...configForm.personality, tone: e.target.value }
                          })}
                          className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                        >
                          <option value="cool">Fresco</option>
                          <option value="professional">Profesional</option>
                          <option value="friendly">Amigable</option>
                          <option value="enthusiastic">Entusiasta</option>
                        </select>
                      </div>

                      {/* Language */}
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">Idioma</label>
                        <select
                          value={configForm?.personality?.language || "es"}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            personality: { ...configForm.personality, language: e.target.value }
                          })}
                          className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                        >
                          <option value="es">Español</option>
                          <option value="en">Inglés</option>
                          <option value="pt">Portugués</option>
                        </select>
                      </div>

                      {/* WhatsApp Number */}
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">Número de WhatsApp del Supervisor</label>
                        <input
                          type="text"
                          value={configForm?.integrations?.supervisor_number || ""}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            integrations: { ...configForm.integrations, supervisor_number: e.target.value }
                          })}
                          className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                          placeholder="ej., 59170123456"
                        />
                      </div>

                      {/* Formality Level */}
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">Nivel de Formalidad</label>
                        <select
                          value={configForm?.personality?.formality_level || "informal"}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            personality: { ...configForm.personality, formality_level: e.target.value }
                          })}
                          className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                        >
                          <option value="informal">Informal</option>
                          <option value="semi-formal">Semi-formal</option>
                          <option value="formal">Formal</option>
                        </select>
                      </div>

                      {/* Response Length */}
                      <div>
                        <label className="text-sm font-semibold text-muted-foreground mb-2 block">Longitud de Respuesta</label>
                        <select
                          value={configForm?.personality?.response_length || "concise"}
                          onChange={(e) => setConfigForm({
                            ...configForm,
                            personality: { ...configForm.personality, response_length: e.target.value }
                          })}
                          className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                        >
                          <option value="brief">Breve</option>
                          <option value="concise">Concisa</option>
                          <option value="detailed">Detallada</option>
                        </select>
                      </div>

                      {/* Custom Phrases Section */}
                      <div className="pt-4 border-t border-primary/20">
                        <h5 className="text-md font-bold text-muted-foreground mb-3">Frases Personalizadas</h5>
                        
                        {/* Greeting */}
                        <div className="mb-4">
                          <label className="text-sm font-semibold text-muted-foreground mb-2 block">Saludo</label>
                          <input
                            type="text"
                            maxLength={200}
                            value={configForm?.personality?.custom_phrases?.greeting || ""}
                            onChange={(e) => setConfigForm({
                              ...configForm,
                              personality: { 
                                ...configForm.personality, 
                                custom_phrases: { 
                                  ...configForm.personality?.custom_phrases, 
                                  greeting: e.target.value 
                                }
                              }
                            })}
                            className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                            placeholder="ej., ¡Hola! ¿Cómo puedo ayudarte hoy?"
                          />
                          <p className="text-xs text-muted-foreground mt-1">{configForm?.personality?.custom_phrases?.greeting?.length || 0}/200 caracteres</p>
                        </div>

                        {/* Thanks */}
                        <div className="mb-4">
                          <label className="text-sm font-semibold text-muted-foreground mb-2 block">Agradecimiento</label>
                          <input
                            type="text"
                            maxLength={200}
                            value={configForm?.personality?.custom_phrases?.thanks || ""}
                            onChange={(e) => setConfigForm({
                              ...configForm,
                              personality: { 
                                ...configForm.personality, 
                                custom_phrases: { 
                                  ...configForm.personality?.custom_phrases, 
                                  thanks: e.target.value 
                                }
                              }
                            })}
                            className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                            placeholder="ej., ¡Gracias por tu interés!"
                          />
                          <p className="text-xs text-muted-foreground mt-1">{configForm?.personality?.custom_phrases?.thanks?.length || 0}/200 caracteres</p>
                        </div>

                        {/* Farewell */}
                        <div>
                          <label className="text-sm font-semibold text-muted-foreground mb-2 block">Despedida</label>
                          <input
                            type="text"
                            maxLength={200}
                            value={configForm?.personality?.custom_phrases?.farewell || ""}
                            onChange={(e) => setConfigForm({
                              ...configForm,
                              personality: { 
                                ...configForm.personality, 
                                custom_phrases: { 
                                  ...configForm.personality?.custom_phrases, 
                                  farewell: e.target.value 
                                }
                              }
                            })}
                            className="w-full px-4 py-2 bg-white/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 transition-colors"
                            placeholder="ej., ¡Hasta pronto! Estoy aquí si me necesitas."
                          />
                          <p className="text-xs text-muted-foreground mt-1">{configForm?.personality?.custom_phrases?.farewell?.length || 0}/200 caracteres</p>
                        </div>
                      </div>

                      {/* Sales Process Section */}
                      <div className="pt-4 border-t border-primary/20">
                        <h5 className="text-md font-bold text-muted-foreground mb-3">Proceso de Ventas</h5>
                        
                        {/* QR Payment */}
                        <div className="mb-3">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={configForm?.sales_process?.QR_payment || false}
                              onChange={(e) => setConfigForm({
                                ...configForm,
                                sales_process: { 
                                  ...configForm.sales_process, 
                                  QR_payment: e.target.checked 
                                }
                              })}
                              className="w-5 h-5 rounded border-primary/20 bg-white/10 text-primary focus:ring-2 focus:ring-primary/40 transition-colors cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-semibold text-muted-foreground">Pago con QR</span>
                          </label>
                        </div>

                        {/* Physical Payment */}
                        <div>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={configForm?.sales_process?.physical_payment || false}
                              onChange={(e) => setConfigForm({
                                ...configForm,
                                sales_process: { 
                                  ...configForm.sales_process, 
                                  physical_payment: e.target.checked 
                                }
                              })}
                              className="w-5 h-5 rounded border-primary/20 bg-white/10 text-primary focus:ring-2 focus:ring-primary/40 transition-colors cursor-pointer"
                            />
                            <span className="ml-3 text-sm font-semibold text-muted-foreground">Pago Físico</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

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
