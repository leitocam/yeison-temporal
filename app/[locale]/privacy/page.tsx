import type { Metadata } from "next"
import { Navbar, Footer } from "@/components/landing"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Privacidad | Yeison AI",
  description:
    "Política de privacidad y protección de datos personales de la plataforma Yeison AI.",
}

const LAST_UPDATED = "27 de junio de 2026"
const COMPANY = "Yeison AI S.R.L."
const EMAIL_PRIVACIDAD = "privacidad@yeison.ai"

export default function PrivacyPage() {
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
              Política de Privacidad
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              En Yeison AI tomamos la privacidad muy en serio. Esta política explica qué datos recopilamos,
              cómo los usamos y cuáles son tus derechos.
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
                ["1", "Responsable del tratamiento"],
                ["2", "Datos que recopilamos"],
                ["3", "Finalidades del tratamiento"],
                ["4", "Base legal del tratamiento"],
                ["5", "Compartición de datos con terceros"],
                ["6", "Transferencias internacionales"],
                ["7", "Conservación de datos"],
                ["8", "Seguridad de los datos"],
                ["9", "Tus derechos"],
                ["10", "Cookies y tecnologías similares"],
                ["11", "Menores de edad"],
                ["12", "Cambios en esta política"],
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
          <div className="space-y-12">

            <Section id="1" title="1. Responsable del tratamiento">
              <p>
                <strong>{COMPANY}</strong> es el responsable del tratamiento de los datos personales
                recogidos a través de la plataforma Yeison AI.
              </p>
              <InfoBox>
                <strong>Responsable:</strong> {COMPANY}<br />
                <strong>Correo de privacidad:</strong>{" "}
                <a href={`mailto:${EMAIL_PRIVACIDAD}`} className="text-primary hover:underline">
                  {EMAIL_PRIVACIDAD}
                </a>
              </InfoBox>
            </Section>

            <Section id="2" title="2. Datos que recopilamos">
              <h3>2.1 Datos proporcionados por el usuario</h3>
              <ul>
                <li><strong>Registro:</strong> nombre completo, correo electrónico, teléfono, contraseña.</li>
                <li><strong>Empresa:</strong> nombre, industria, tamaño, sitio web, descripción.</li>
                <li><strong>Productos:</strong> catálogo, precios, imágenes, descripciones.</li>
                <li><strong>Proceso de ventas:</strong> guiones, FAQs, objeciones, técnicas de cierre.</li>
                <li><strong>Pago:</strong> datos de facturación (no almacenamos datos de tarjeta directamente;
                    los procesa nuestro proveedor de pagos).</li>
              </ul>

              <h3>2.2 Datos generados por el uso</h3>
              <ul>
                <li>Conversaciones entre los agentes y los clientes del usuario.</li>
                <li>Métricas de rendimiento del agente (mensajes enviados, tasas de respuesta, conversiones).</li>
                <li>Logs de acceso: dirección IP, navegador, dispositivo, páginas visitadas, timestamps.</li>
                <li>Acciones dentro del panel: configuraciones modificadas, agentes creados, etc.</li>
              </ul>

              <h3>2.3 Datos de terceros</h3>
              <ul>
                <li>Si usas "Iniciar sesión con Google", recibiremos tu nombre y correo de Google.</li>
                <li>Al conectar WhatsApp Business via Meta, recibiremos identificadores de tu cuenta WABA.</li>
              </ul>
            </Section>

            <Section id="3" title="3. Finalidades del tratamiento">
              <p>Utilizamos tus datos para:</p>
              <ul>
                <li>Prestarte el servicio contratado (crear, operar y gestionar agentes de ventas IA).</li>
                <li>Gestionar tu cuenta, suscripción y pagos.</li>
                <li>Enviarte comunicaciones del servicio (facturas, alertas, actualizaciones importantes).</li>
                <li>Mejorar los modelos de IA y la calidad del servicio (con datos anonimizados).</li>
                <li>Cumplir con obligaciones legales y regulatorias.</li>
                <li>Prevenir fraudes y garantizar la seguridad de la plataforma.</li>
                <li>Enviarte comunicaciones comerciales propias (puedes darte de baja en cualquier momento).</li>
              </ul>
            </Section>

            <Section id="4" title="4. Base legal del tratamiento">
              <p>Tratamos tus datos bajo las siguientes bases legales:</p>
              <ul>
                <li><strong>Ejecución de contrato:</strong> para prestar el servicio que nos has contratado.</li>
                <li><strong>Consentimiento:</strong> para comunicaciones de marketing y mejora de modelos IA.</li>
                <li><strong>Interés legítimo:</strong> para seguridad, prevención de fraudes y análisis estadísticos.</li>
                <li><strong>Obligación legal:</strong> para cumplir con requerimientos fiscales y regulatorios.</li>
              </ul>
            </Section>

            <Section id="5" title="5. Compartición de datos con terceros">
              <p>Compartimos datos únicamente en los siguientes casos:</p>
              <ul>
                <li>
                  <strong>Proveedores de infraestructura:</strong> servidores en la nube, bases de datos,
                  CDN — bajo acuerdos de confidencialidad y procesamiento de datos.
                </li>
                <li>
                  <strong>Proveedores de IA:</strong> modelos de lenguaje de terceros para generar respuestas
                  del agente. Los datos se transmiten de forma segura y no se usan para entrenar modelos sin tu
                  consentimiento.
                </li>
                <li>
                  <strong>Meta / WhatsApp:</strong> para la integración de WhatsApp Business API, datos
                  necesarios para el registro y operación de tu cuenta WABA.
                </li>
                <li>
                  <strong>Pasarela de pagos:</strong> datos de facturación necesarios para procesar cobros.
                </li>
                <li>
                  <strong>Autoridades:</strong> cuando sea requerido por ley, orden judicial o autoridad competente.
                </li>
              </ul>
              <p>
                No vendemos, alquilamos ni cedemos tus datos personales a terceros con fines comerciales.
              </p>
            </Section>

            <Section id="6" title="6. Transferencias internacionales">
              <p>
                Algunos de nuestros proveedores (servidores en la nube, APIs de IA) pueden estar ubicados
                fuera de Bolivia. En estos casos, nos aseguramos de que las transferencias se realicen
                con las garantías adecuadas: cláusulas contractuales estándar, certificaciones de seguridad
                (ISO 27001, SOC 2) o mecanismos equivalentes reconocidos internacionalmente.
              </p>
            </Section>

            <Section id="7" title="7. Conservación de datos">
              <p>Conservamos tus datos durante los siguientes períodos:</p>
              <ul>
                <li><strong>Datos de cuenta:</strong> mientras la cuenta esté activa, más 90 días tras la
                    cancelación para posible recuperación.</li>
                <li><strong>Conversaciones de agentes:</strong> 12 meses desde la fecha de la conversación,
                    salvo que el usuario solicite eliminación anticipada.</li>
                <li><strong>Logs de acceso:</strong> 6 meses.</li>
                <li><strong>Datos de facturación:</strong> 5 años por obligaciones fiscales.</li>
                <li><strong>Datos anonimizados:</strong> indefinidamente para estadísticas e investigación.</li>
              </ul>
            </Section>

            <Section id="8" title="8. Seguridad de los datos">
              <p>Implementamos medidas técnicas y organizativas apropiadas, incluyendo:</p>
              <ul>
                <li>Cifrado en tránsito (TLS 1.3) y en reposo (AES-256).</li>
                <li>Autenticación de dos factores disponible para todas las cuentas.</li>
                <li>Acceso a datos restringido por roles y necesidad de conocimiento.</li>
                <li>Monitoreo continuo de seguridad y alertas de intrusión.</li>
                <li>Copias de seguridad automáticas cifradas con retención de 30 días.</li>
                <li>Revisiones periódicas de seguridad y pruebas de penetración.</li>
              </ul>
              <InfoBox variant="warning">
                En caso de detectar una brecha de seguridad que afecte tus datos personales, te notificaremos
                en un plazo máximo de 72 horas desde que tengamos conocimiento del incidente.
              </InfoBox>
            </Section>

            <Section id="9" title="9. Tus derechos">
              <p>Como titular de datos personales, tienes derecho a:</p>
              <ul>
                <li><strong>Acceso:</strong> solicitar una copia de los datos personales que tenemos sobre ti.</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
                <li><strong>Eliminación:</strong> solicitar la eliminación de tus datos ("derecho al olvido"),
                    cuando no exista obligación legal de conservarlos.</li>
                <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado y de uso común.</li>
                <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo o marketing directo.</li>
                <li><strong>Limitación:</strong> solicitar que restrinjamos el tratamiento de tus datos
                    en determinadas circunstancias.</li>
                <li><strong>Retirar consentimiento:</strong> en cualquier momento, para tratamientos basados
                    en consentimiento, sin que ello afecte la licitud del tratamiento anterior.</li>
              </ul>
              <p>
                Para ejercer cualquiera de estos derechos, envía una solicitud a{" "}
                <a href={`mailto:${EMAIL_PRIVACIDAD}`} className="text-primary hover:underline">
                  {EMAIL_PRIVACIDAD}
                </a>{" "}
                con tu nombre, correo registrado y descripción de la solicitud. Responderemos en un
                plazo máximo de 30 días hábiles.
              </p>
            </Section>

            <Section id="10" title="10. Cookies y tecnologías similares">
              <p>Utilizamos cookies y tecnologías similares para:</p>
              <ul>
                <li><strong>Cookies esenciales:</strong> mantener tu sesión iniciada y garantizar la seguridad.</li>
                <li><strong>Cookies de análisis:</strong> entender cómo los usuarios interactúan con la plataforma
                    para mejorarla (datos anonimizados).</li>
                <li><strong>Cookies de preferencias:</strong> recordar tus configuraciones (idioma, tema).</li>
              </ul>
              <p>
                Puedes gestionar o rechazar cookies no esenciales desde la configuración de tu navegador.
                Para más detalles, consulta nuestra{" "}
                <Link href="/cookies" className="text-primary hover:underline">
                  Política de Cookies
                </Link>.
              </p>
            </Section>

            <Section id="11" title="11. Menores de edad">
              <p>
                Yeison AI es un servicio dirigido exclusivamente a empresas y profesionales mayores de 18 años.
                No recopilamos intencionalmente datos de menores de edad. Si detectamos que un menor ha
                proporcionado datos personales, los eliminaremos de forma inmediata.
              </p>
            </Section>

            <Section id="12" title="12. Cambios en esta política">
              <p>
                Podemos actualizar esta Política de Privacidad periódicamente. Los cambios materiales
                se comunicarán mediante correo electrónico o notificación destacada en el panel, con
                al menos 15 días de anticipación. El uso continuado del servicio tras la publicación
                de los cambios implica la aceptación de la nueva política.
              </p>
            </Section>

            <Section id="13" title="13. Contacto">
              <p>
                Para cualquier consulta, solicitud o reclamación relacionada con la protección de
                datos personales:
              </p>
              <InfoBox>
                <strong>Correo de privacidad:</strong>{" "}
                <a href={`mailto:${EMAIL_PRIVACIDAD}`} className="text-primary hover:underline">
                  {EMAIL_PRIVACIDAD}
                </a>
                <br />
                <strong>Tiempo de respuesta:</strong> 5 días hábiles para consultas,
                30 días para ejercicio de derechos.
              </InfoBox>
            </Section>

          </div>

          {/* Footer note */}
          <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              Política de Privacidad de {COMPANY}. Última revisión: {LAST_UPDATED}.
            </p>
            <div className="flex items-center justify-center gap-6 mt-4">
              <Link href="/terms" className="text-primary hover:underline">Términos y Condiciones</Link>
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
        <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed [&_h3]:text-foreground [&_h3]:font-bold [&_h3]:text-base [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:hover:underline [&_strong]:text-foreground">
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
