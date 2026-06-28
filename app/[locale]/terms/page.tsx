import type { Metadata } from "next"
import { Navbar } from "@/components/landing"
import { Footer } from "@/components/landing"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Yeison AI",
  description:
    "Términos y condiciones de uso de la plataforma Yeison AI y sus agentes de ventas con inteligencia artificial.",
}

const LAST_UPDATED = "27 de junio de 2026"
const COMPANY = "Yeison AI S.R.L."
const EMAIL_LEGAL = "legal@yeison.ai"
const EMAIL_SOPORTE = "soporte@yeison.ai"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-flex rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-[0.625rem] font-bold uppercase tracking-[0.15em] text-primary mb-6">
              Documento legal
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Por favor lee detenidamente estos términos antes de utilizar la plataforma Yeison AI.
              Al registrarte o usar cualquier servicio, aceptas quedar vinculado por estas condiciones.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Última actualización: <span className="text-foreground font-medium">{LAST_UPDATED}</span>
            </p>
          </div>

          {/* Quick Nav */}
          <div className="rounded-2xl border border-border bg-card/40 p-6 mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Contenido</h2>
            <ol className="space-y-2 text-sm text-muted-foreground list-none">
              {[
                ["1", "Identificación del prestador del servicio"],
                ["2", "Descripción del servicio"],
                ["3", "Activación y uso de agentes de ventas IA"],
                ["4", "Condiciones de suscripción y pagos"],
                ["5", "Integración con WhatsApp y Meta"],
                ["6", "Procesamiento de datos y privacidad"],
                ["7", "Obligaciones del usuario"],
                ["8", "Propiedad intelectual"],
                ["9", "Limitación de responsabilidad"],
                ["10", "Cancelación y suspensión del servicio"],
                ["11", "Modificaciones a los términos"],
                ["12", "Ley aplicable y jurisdicción"],
                ["13", "Contacto"],
              ].map(([num, title]) => (
                <li key={num}>
                  <a
                    href={`#seccion-${num}`}
                    className="hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {num}
                    </span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Sections */}
          <div className="space-y-12 prose prose-invert max-w-none">

            <Section id="1" title="1. Identificación del prestador del servicio">
              <p>
                <strong>{COMPANY}</strong> (en adelante "Yeison AI", "nosotros" o "la empresa") es la entidad
                responsable de la plataforma Yeison AI, incluyendo todos sus módulos, agentes de inteligencia
                artificial, integraciones y servicios asociados.
              </p>
              <InfoBox>
                <strong>Razón social:</strong> {COMPANY}<br />
                <strong>Correo legal:</strong> {EMAIL_LEGAL}<br />
                <strong>Soporte:</strong> {EMAIL_SOPORTE}
              </InfoBox>
            </Section>

            <Section id="2" title="2. Descripción del servicio">
              <p>
                Yeison AI es una plataforma de software como servicio (SaaS) que permite a empresas crear,
                configurar y gestionar agentes de inteligencia artificial capaces de:
              </p>
              <ul>
                <li>Atender y gestionar conversaciones de ventas mediante WhatsApp Business API.</li>
                <li>Procesar consultas de clientes, entregar cotizaciones y asistir en el cierre de ventas.</li>
                <li>Generar contenido de marketing y campañas publicitarias con asistencia de IA.</li>
                <li>Administrar inventarios, reportes y métricas de rendimiento comercial.</li>
                <li>Automatizar flujos de comunicación con prospectos y clientes existentes.</li>
              </ul>
              <p>
                El servicio opera bajo un modelo de suscripción mensual o anual, con distintos planes que
                determinan la cantidad de agentes activos y funcionalidades disponibles.
              </p>
            </Section>

            <Section id="3" title="3. Activación y uso de agentes de ventas IA">
              <h3>3.1 Responsabilidad sobre el contenido del agente</h3>
              <p>
                Al activar un agente de ventas, el usuario es responsable de toda la información que
                configura en el mismo, incluyendo: datos de productos y precios, guiones de ventas,
                respuestas a objeciones, política de descuentos y cualquier otro contenido que el agente
                transmita a terceros.
              </p>
              <p>
                Yeison AI actúa como plataforma tecnológica y no como vendedor ni representante del usuario.
                Las declaraciones que haga el agente son responsabilidad exclusiva del usuario que lo configuró.
              </p>

              <h3>3.2 Uso aceptable del agente</h3>
              <p>El usuario se compromete a no utilizar los agentes de Yeison AI para:</p>
              <ul>
                <li>Enviar mensajes no solicitados (spam) de forma masiva.</li>
                <li>Engañar, estafar o inducir a error a los destinatarios.</li>
                <li>Difundir contenido ilegal, discriminatorio, violento o para adultos.</li>
                <li>Recolectar datos personales sin el consentimiento explícito de los destinatarios.</li>
                <li>Suplantar identidades de terceros o marcas registradas.</li>
                <li>Eludir las políticas de uso de Meta/WhatsApp Business.</li>
              </ul>
              <p>
                El incumplimiento de estas restricciones puede resultar en la suspensión inmediata del
                agente o la cuenta, sin derecho a reembolso.
              </p>

              <h3>3.3 Número de supervisor</h3>
              <p>
                Al crear un agente, el usuario designa un número de teléfono supervisor. Este número recibirá
                notificaciones del agente y podrá intervenir en conversaciones. El usuario garantiza tener
                autorización para usar dicho número con este propósito.
              </p>

              <h3>3.4 Disponibilidad y rendimiento</h3>
              <p>
                Yeison AI procura una disponibilidad del 99% del tiempo; sin embargo, no garantiza un
                funcionamiento ininterrumpido. Pueden existir interrupciones por mantenimiento programado,
                fallas de terceros (Meta, proveedores de IA) o causas de fuerza mayor. El usuario acepta
                que las respuestas del agente son generadas por modelos de lenguaje y pueden contener
                imprecisiones que requieren supervisión humana.
              </p>
            </Section>

            <Section id="4" title="4. Condiciones de suscripción y pagos">
              <h3>4.1 Planes disponibles</h3>
              <p>
                Yeison AI ofrece los siguientes planes de suscripción:
              </p>
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Plan</th>
                      <th>Agentes activos</th>
                      <th>Precio mensual (Bs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Starter</td><td>1</td><td>900</td></tr>
                    <tr><td>Duo</td><td>2</td><td>1,300</td></tr>
                    <tr><td>Pro</td><td>3</td><td>1,700</td></tr>
                    <tr><td>Full</td><td>4</td><td>2,200</td></tr>
                    <tr><td>Max</td><td>5+</td><td>Precio a convenir</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground">
                Los precios pueden actualizarse con 30 días de aviso previo. El plan anual incluye un
                descuento del 8% sobre el precio mensual equivalente.
              </p>

              <h3>4.2 Facturación y renovación</h3>
              <p>
                Las suscripciones se renuevan automáticamente al inicio de cada período (mensual o anual).
                El cargo se realiza mediante el método de pago registrado. Es responsabilidad del usuario
                mantener un método de pago válido para evitar interrupciones del servicio.
              </p>

              <h3>4.3 Política de reembolsos</h3>
              <p>
                Los pagos realizados no son reembolsables, salvo en los siguientes casos:
              </p>
              <ul>
                <li>Error de cobro duplicado o por un monto incorrecto.</li>
                <li>Falla técnica grave imputable exclusivamente a Yeison AI que impida el uso del
                    servicio por más de 72 horas consecutivas.</li>
                <li>Cancelación dentro de las primeras 48 horas de la primera suscripción de pago,
                    siempre que no se haya utilizado el agente en producción.</li>
              </ul>
              <p>
                Las solicitudes de reembolso deben enviarse a <strong>{EMAIL_LEGAL}</strong> con el comprobante
                de pago correspondiente dentro de los 7 días siguientes al cargo.
              </p>

              <h3>4.4 Cambio de plan</h3>
              <p>
                El usuario puede actualizar su plan en cualquier momento. La diferencia de precio se
                calcula de forma proporcional al período restante. El downgrade de plan entra en vigor
                al inicio del siguiente período de facturación.
              </p>
            </Section>

            <Section id="5" title="5. Integración con WhatsApp y Meta">
              <h3>5.1 WhatsApp Business API</h3>
              <p>
                Yeison AI utiliza la API oficial de WhatsApp Business proporcionada por Meta Platforms Inc.
                Al conectar un número de WhatsApp Business a través de la plataforma, el usuario acepta
                adicionalmente los{" "}
                <a
                  href="https://www.whatsapp.com/legal/business-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Términos del servicio de WhatsApp Business
                </a>{" "}
                y las{" "}
                <a
                  href="https://developers.facebook.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Políticas de la plataforma de Meta
                </a>.
              </p>

              <h3>5.2 Aprobación de Meta</h3>
              <p>
                La habilitación del número de WhatsApp Business requiere aprobación de Meta. Yeison AI
                no garantiza la aprobación, ya que depende exclusivamente de las políticas y criterios
                de Meta. Si Meta rechaza o suspende la cuenta de WhatsApp Business del usuario, Yeison AI
                no será responsable de dicha decisión.
              </p>

              <h3>5.3 Cumplimiento de políticas de mensajería</h3>
              <p>
                El usuario es responsable de cumplir con las políticas de mensajería de WhatsApp, que
                incluyen (pero no se limitan a): obtener opt-in explícito de los contactos antes de
                iniciar conversaciones, respetar las ventanas de mensajería de 24 horas, y no enviar
                mensajes de marketing sin plantillas aprobadas por Meta.
              </p>

              <InfoBox variant="warning">
                El incumplimiento de las políticas de Meta puede resultar en la suspensión permanente
                del número de WhatsApp Business, independientemente del estado de la suscripción con Yeison AI.
              </InfoBox>
            </Section>

            <Section id="6" title="6. Procesamiento de datos y privacidad">
              <h3>6.1 Datos del usuario</h3>
              <p>
                Al registrarse, el usuario proporciona datos personales (nombre, correo, teléfono) y datos
                empresariales (nombre de empresa, industria, productos, procesos de ventas). Estos datos se
                utilizan exclusivamente para la configuración y operación del servicio.
              </p>

              <h3>6.2 Datos de conversaciones</h3>
              <p>
                Las conversaciones gestionadas por los agentes de ventas se almacenan en servidores
                seguros con cifrado en reposo y en tránsito. Los datos de conversaciones pueden
                utilizarse de forma anonimizada para mejorar los modelos de IA, salvo que el usuario
                solicite lo contrario mediante configuración en el panel o correo a {EMAIL_LEGAL}.
              </p>

              <h3>6.3 Datos de terceros (clientes del usuario)</h3>
              <p>
                El usuario actúa como responsable del tratamiento de los datos personales de sus propios
                clientes. Yeison AI actúa como encargado del tratamiento en nombre del usuario. El usuario
                garantiza que cuenta con las bases legales necesarias para procesar los datos de sus
                clientes a través de la plataforma.
              </p>

              <h3>6.4 Política de privacidad</h3>
              <p>
                Para mayor detalle sobre el tratamiento de datos, consulta nuestra{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>.
              </p>
            </Section>

            <Section id="7" title="7. Obligaciones del usuario">
              <p>Al utilizar Yeison AI, el usuario se compromete a:</p>
              <ul>
                <li>Proporcionar información veraz y actualizada durante el registro y configuración.</li>
                <li>Mantener la confidencialidad de sus credenciales de acceso.</li>
                <li>Notificar inmediatamente cualquier acceso no autorizado a su cuenta.</li>
                <li>Supervisar periódicamente el comportamiento del agente y la calidad de sus respuestas.</li>
                <li>Cumplir con toda la legislación aplicable en su jurisdicción respecto al uso de IA,
                    protección de datos y comunicaciones comerciales.</li>
                <li>No compartir el acceso a la plataforma con personas no autorizadas.</li>
                <li>No intentar acceder a cuentas de otros usuarios ni a sistemas internos de Yeison AI.</li>
                <li>No realizar ingeniería inversa, descompilar o intentar extraer el código fuente
                    de la plataforma.</li>
              </ul>
            </Section>

            <Section id="8" title="8. Propiedad intelectual">
              <h3>8.1 Propiedad de Yeison AI</h3>
              <p>
                Todos los elementos de la plataforma Yeison AI —incluyendo software, algoritmos, diseño,
                marca, logotipos, modelos de IA entrenados y documentación— son propiedad exclusiva de
                {COMPANY} o de sus licenciantes, protegidos por las leyes de propiedad intelectual aplicables.
              </p>

              <h3>8.2 Contenido del usuario</h3>
              <p>
                El usuario conserva todos los derechos sobre los contenidos que sube a la plataforma
                (catálogo de productos, guiones, imágenes de marca, etc.). Al cargar dicho contenido,
                el usuario otorga a Yeison AI una licencia no exclusiva, mundial y libre de regalías
                para procesarlo y utilizarlo con el único fin de prestar el servicio contratado.
              </p>

              <h3>8.3 Contenido generado por IA</h3>
              <p>
                El contenido generado por los agentes de IA (textos, imágenes de marketing, propuestas
                comerciales) puede ser utilizado libremente por el usuario para sus fines comerciales.
                Yeison AI no reclama derechos sobre el output generado en nombre del usuario.
              </p>
            </Section>

            <Section id="9" title="9. Limitación de responsabilidad">
              <p>
                En la máxima medida permitida por la ley aplicable:
              </p>
              <ul>
                <li>
                  Yeison AI no será responsable de pérdidas de ingresos, ventas perdidas, pérdida de
                  datos, daños indirectos, consecuentes o punitivos derivados del uso o imposibilidad
                  de uso del servicio.
                </li>
                <li>
                  La responsabilidad total acumulada de Yeison AI frente al usuario, por cualquier
                  causa, no excederá el importe pagado por el usuario en los 3 meses anteriores al
                  evento que dio origen a la reclamación.
                </li>
                <li>
                  Yeison AI no garantiza que el agente de ventas cierre ventas, aumente ingresos o
                  genere resultados comerciales específicos. Los resultados dependen de múltiples
                  factores externos a la plataforma.
                </li>
                <li>
                  Las respuestas del agente son generadas por modelos de lenguaje que pueden cometer
                  errores. El usuario es responsable de revisar y validar la información antes de
                  que llegue a sus clientes.
                </li>
              </ul>

              <InfoBox variant="warning">
                Yeison AI no es responsable de las decisiones comerciales que el usuario tome basándose
                en métricas, reportes o recomendaciones generadas por la plataforma.
              </InfoBox>
            </Section>

            <Section id="10" title="10. Cancelación y suspensión del servicio">
              <h3>10.1 Cancelación por el usuario</h3>
              <p>
                El usuario puede cancelar su suscripción en cualquier momento desde el panel de configuración.
                La cancelación entra en vigor al final del período de facturación en curso. El usuario
                mantiene acceso al servicio hasta esa fecha.
              </p>

              <h3>10.2 Suspensión por incumplimiento</h3>
              <p>
                Yeison AI puede suspender o cancelar la cuenta del usuario de forma inmediata y sin previo
                aviso en caso de:
              </p>
              <ul>
                <li>Incumplimiento grave de estos términos o las políticas de Meta/WhatsApp.</li>
                <li>Uso fraudulento de la plataforma o intento de fraude en pagos.</li>
                <li>Actividades ilegales o que pongan en riesgo a otros usuarios o terceros.</li>
                <li>Impago reiterado tras dos intentos de cobro fallidos.</li>
              </ul>

              <h3>10.3 Consecuencias de la cancelación</h3>
              <p>
                Al cancelarse la cuenta, los agentes activos se desactivarán y dejarán de responder mensajes.
                Los datos del usuario se conservarán durante 90 días para permitir la exportación, tras los
                cuales serán eliminados de forma permanente. Los datos de conversaciones pueden retenerse
                por hasta 1 año con fines de auditoría y cumplimiento legal.
              </p>
            </Section>

            <Section id="11" title="11. Modificaciones a los términos">
              <p>
                Yeison AI puede actualizar estos Términos y Condiciones en cualquier momento. Los cambios
                materiales se notificarán con al menos 15 días de anticipación mediante:
              </p>
              <ul>
                <li>Correo electrónico al email registrado en la cuenta.</li>
                <li>Banner o notificación visible dentro del panel de usuario.</li>
              </ul>
              <p>
                El uso continuado del servicio tras la fecha de entrada en vigor de los cambios implica
                la aceptación de los nuevos términos. Si el usuario no acepta los cambios, puede cancelar
                su suscripción antes de la fecha de entrada en vigor.
              </p>
            </Section>

            <Section id="12" title="12. Ley aplicable y jurisdicción">
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la República de Bolivia.
                Cualquier disputa que no pueda resolverse de forma amistosa se someterá a la jurisdicción
                de los tribunales competentes de la ciudad de Santa Cruz de la Sierra, Bolivia,
                con renuncia expresa a cualquier otro fuero.
              </p>
              <p>
                Las partes acuerdan intentar resolver cualquier controversia mediante negociación directa
                durante un período de 30 días antes de recurrir a la vía judicial.
              </p>
            </Section>

            <Section id="13" title="13. Contacto">
              <p>Para consultas legales, solicitudes de datos o reclamaciones, contáctanos en:</p>
              <InfoBox>
                <strong>Correo legal:</strong> <a href={`mailto:${EMAIL_LEGAL}`} className="text-primary hover:underline">{EMAIL_LEGAL}</a><br />
                <strong>Soporte técnico:</strong> <a href={`mailto:${EMAIL_SOPORTE}`} className="text-primary hover:underline">{EMAIL_SOPORTE}</a><br />
                <strong>Tiempo de respuesta:</strong> 2 días hábiles
              </InfoBox>
            </Section>

          </div>

          {/* Footer note */}
          <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              Estos términos han sido preparados por {COMPANY}. Última revisión: {LAST_UPDATED}.
            </p>
            <div className="flex items-center justify-center gap-6 mt-4">
              <Link href="/privacy" className="text-primary hover:underline">Política de Privacidad</Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Política de Cookies</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contacto</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// --- Sub-components ---

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={`seccion-${id}`} className="scroll-mt-32">
      <div className="rounded-2xl border border-border bg-card/30 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-black text-foreground mb-5 pb-4 border-b border-border/50">
          {title}
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed [&_h3]:text-foreground [&_h3]:font-bold [&_h3]:text-base [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:hover:underline [&_strong]:text-foreground [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:text-foreground [&_th]:font-semibold [&_th]:py-2 [&_th]:px-3 [&_th]:border-b [&_th]:border-border [&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-border/50">
          {children}
        </div>
      </div>
    </section>
  )
}

function InfoBox({
  children,
  variant = "info",
}: {
  children: React.ReactNode
  variant?: "info" | "warning"
}) {
  const styles =
    variant === "warning"
      ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
      : "bg-primary/5 border-primary/20 text-muted-foreground"

  return (
    <div className={`rounded-xl border p-4 text-sm leading-relaxed mt-4 ${styles}`}>
      {children}
    </div>
  )
}
