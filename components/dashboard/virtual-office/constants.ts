import { Bot, TrendingUp, Sparkles, Users, PackageSearch, Calculator } from "lucide-react"
import { Team } from "./types"

export const TEAMS: Record<string, Team> = {
    yeison: {
        id: "yeison",
        sessionIdPrefix: "vo_yeison",
        name: "Yeison (Director General)",
        role: "Coordinador de Operaciones IA",
        icon: Bot,
        color: "text-primary",
        bgGradient: "from-primary/20 to-accent/20",
        borderColor: "border-primary/30",
        kpis: [
            { label: "Equipos activos", value: "5" },
            { label: "Salud del sistema", value: "100%", positive: true },
        ],
        greeting: "Hola. Soy Yeison, tu Director General IA. Conozco toda la operativa de tu empresa y puedo conectarte con los equipos adecuados. ¿Quieres un resumen general del día o necesitas consultar algo específico?",
        suggestions: ["Dame un resumen general de hoy", "¿Qué equipo está rindiendo mejor?", "Analiza el cuello de botella actual"],
        avatarImage: "/icon.svg"
    },
    ventas: {
        id: "ventas",
        sessionIdPrefix: "vo_ventas",
        name: "Equipo de Ventas",
        role: "Conversión y Pipeline",
        icon: TrendingUp,
        color: "text-emerald-500",
        bgGradient: "from-emerald-500/20 to-teal-500/20",
        borderColor: "border-emerald-500/30",
        kpis: [
            { label: "Leads hoy", value: "47", change: "+23%", positive: true },
            { label: "Pipeline", value: "$84.5k", change: "+17%", positive: true },
            { label: "Cierres", value: "12", change: "+2", positive: true },
        ],
        greeting: "¡Hola! Somos el equipo de Ventas. Estamos listos para revisar el pipeline o armar estrategias de cierre para los leads calientes. ¿Qué analizamos hoy?",
        suggestions: ["Revisar leads de alta prioridad", "¿Por qué perdimos las ventas de ayer?", "Crear estrategia de cierre para fin de mes"],
        avatarImage: "https://api.dicebear.com/7.x/micah/svg?seed=ventas_team&backgroundColor=10b981&radius=50"
    },
    marketing: {
        id: "marketing",
        sessionIdPrefix: "vo_marketing",
        name: "Equipo de Marketing",
        role: "Captación y Campañas",
        icon: Sparkles,
        color: "text-purple-500",
        bgGradient: "from-purple-500/20 to-fuchsia-500/20",
        borderColor: "border-purple-500/30",
        kpis: [
            { label: "Alcance", value: "12.4k", change: "+5%", positive: true },
            { label: "CAC", value: "$12.40", change: "-8%", positive: true },
            { label: "Conversión", value: "3.2%", change: "+0.4%", positive: true },
        ],
        greeting: "Hola, equipo de Marketing en línea. Las campañas actuales están corriendo bien. ¿Quieres optimizar el presupuesto o planear el contenido de la próxima semana?",
        suggestions: ["Mostrar rendimiento de campañas actuales", "Generar ideas para nueva campaña", "Analizar costo de adquisición"],
        avatarImage: "https://api.dicebear.com/7.x/micah/svg?seed=marketing_pro&backgroundColor=a855f7&radius=50"
    },
    rrhh: {
        id: "rrhh",
        sessionIdPrefix: "vo_rrhh",
        name: "Recursos Humanos",
        role: "Talento y Cultura",
        icon: Users,
        color: "text-blue-500",
        bgGradient: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-500/30",
        kpis: [
            { label: "Satisfacción", value: "94%", change: "+2%", positive: true },
            { label: "Vacantes", value: "2", change: "0" },
            { label: "Onboarding", value: "100%", positive: true },
        ],
        greeting: "Saludos desde Recursos Humanos. El clima laboral es positivo esta semana. ¿Necesitas revisar el proceso de contratación abierto o evaluar el rendimiento del equipo?",
        suggestions: ["Revisar candidatos de la vacante actual", "Resumen de clima laboral", "Planear capacitación mensual"],
        avatarImage: "https://api.dicebear.com/7.x/micah/svg?seed=rrhh_manager&backgroundColor=3b82f6&radius=50"
    },
    inventario: {
        id: "inventario",
        sessionIdPrefix: "vo_inventario",
        name: "Gestión de Inventario",
        role: "Logística y Stock",
        icon: PackageSearch,
        color: "text-amber-500",
        bgGradient: "from-amber-500/20 to-orange-500/20",
        borderColor: "border-amber-500/30",
        kpis: [
            { label: "Stock bajo", value: "14 items", change: "-3", positive: true },
            { label: "Rotación", value: "85%", change: "+5%", positive: true },
            { label: "Entregas", value: "98%", positive: true },
        ],
        greeting: "Hola. El sistema de Inventario y Logística está en línea. Los envíos de hoy están procesados. ¿Quieres revisar alertas de bajo stock o planificar el próximo abastecimiento?",
        suggestions: ["Mostrar productos con bajo stock", "Revisar tiempos de entrega promedio", "Actualizar catálogo de proveedores"],
        avatarImage: "https://api.dicebear.com/7.x/micah/svg?seed=inventory_logistics&backgroundColor=f59e0b&radius=50"
    },
    contabilidad: {
        id: "contabilidad",
        sessionIdPrefix: "vo_contabilidad",
        name: "Contabilidad",
        role: "Finanzas y Facturación",
        icon: Calculator,
        color: "text-indigo-500",
        bgGradient: "from-indigo-500/20 to-violet-500/20",
        borderColor: "border-indigo-500/30",
        kpis: [
            { label: "Flujo de caja", value: "+$12.3k", positive: true },
            { label: "Cuentas x Cobrar", value: "$4.2k", change: "-$500", positive: true },
            { label: "Impuestos", value: "Al día", positive: true },
        ],
        greeting: "Buen día. Área de Finanzas y Contabilidad a tu disposición. Tenemos reportes de facturación actualizados. ¿Te gustaría ver el flujo de caja o revisar las cuentas pendientes?",
        suggestions: ["Generar reporte de gastos del mes", "Revisar facturas pendientes de cobro", "Estado de flujo de caja"],
        avatarImage: "https://api.dicebear.com/7.x/micah/svg?seed=accounting_finance&backgroundColor=6366f1&radius=50"
    }
}
