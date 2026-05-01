import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { CTASection, Footer, Navbar } from "@/components/landing"

const ALLOWED_SLUGS = [
  "docs",
  "security",
  "integrations",
  "about",
  "blog",
  "careers",
  "press",
  "api-docs",
  "status",
  "help-center",
  "privacy",
  "terms",
  "cookies",
  "contact",
] as const

type AllowedSlug = (typeof ALLOWED_SLUGS)[number]

function isAllowedSlug(value: string): value is AllowedSlug {
  return (ALLOWED_SLUGS as readonly string[]).includes(value)
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const locales = ["es", "en"]
  return locales.flatMap((locale) =>
    ALLOWED_SLUGS.map((slug) => ({
      locale,
      slug,
    })),
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isAllowedSlug(slug)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "sitePages" })
  return {
    title: `${t(`pages.${slug}.title`)} | Yeison`,
    description: t(`pages.${slug}.description`),
  }
}

export default async function MarketingSubpage({ params }: PageProps) {
  const { locale, slug } = await params
  if (!isAllowedSlug(slug)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "sitePages" })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-card p-8 sm:p-12">
          <span className="inline-flex rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-[0.625rem] font-bold uppercase tracking-[0.15em] text-primary">
            {t("badge")}
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-[-0.02em] leading-[1.08]">
            {t(`pages.${slug}.title`)}
          </h1>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{t(`pages.${slug}.description`)}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-[#080808] p-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-primary">{t("box1Title")}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(`pages.${slug}.box1`)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#080808] p-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-primary">{t("box2Title")}</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(`pages.${slug}.box2`)}</p>
            </div>
          </div>
        </div>
      </main>

      <CTASection />
      <Footer />
    </div>
  )
}
