"use client"

import Link from "next/link"
import { ArrowRight, Zap, BarChart3, Users, Sparkles, Shield, TrendingUp, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-accent to-primary rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Yeison</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-accent transition relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-accent transition relative group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition relative group">
              Docs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-accent transition">
              Sign in
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover-lift"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="fade-in-up inline-block mb-6 px-4 py-2 glass rounded-full border-2 border-primary/30">
            <span className="text-sm font-medium text-accent">✨ New: Multi-language Agent Support</span>
          </div>

          <h1 className="fade-in-up stagger-1 text-6xl sm:text-7xl lg:text-8xl font-black mb-6 text-balance leading-tight tracking-tight">
            Close deals{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              3x faster
            </span>
          </h1>

          <p className="fade-in-up stagger-2 text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 text-balance leading-relaxed">
            AI agents that never sleep. Intelligent automation that scales your entire sales operation. Enterprise-grade
            security. Fortune 500 approved.
          </p>

          <div className="fade-in-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              href="/login"
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover-lift flex items-center gap-2 group btn-premium text-lg"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#demo"
              className="px-8 py-4 glass rounded-lg font-bold transition-all duration-300 border-2 border-primary/30 hover:border-primary/60 text-lg hover:bg-white/20"
            >
              Watch 2-min Demo
            </Link>
          </div>

          {/* Hero Visualization */}
          <div className="fade-in-up stagger-4 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary opacity-20 rounded-3xl blur-2xl"></div>
            <div className="relative glass rounded-3xl p-10 border-2 border-primary/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl -z-10"></div>
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl animate-pulse"></div>
                  <div
                    className="h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <div className="space-y-4">
                  <div
                    className="h-40 bg-gradient-to-br from-accent/30 to-accent/10 rounded-xl animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <div className="space-y-4">
                  <div
                    className="h-28 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  ></div>
                  <div
                    className="h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg animate-pulse"
                    style={{ animationDelay: "0.8s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Companies trust us", value: "2,500+" },
              { label: "Deals closed annually", value: "$5.2B" },
              { label: "Uptime SLA", value: "99.99%" },
              { label: "Response time", value: "<100ms" },
            ].map((stat, i) => (
              <div
                key={i}
                className="fade-in-up group text-center p-6 glass rounded-2xl transition-all border-2 border-primary/20 hover:bg-white/20"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black mb-6 text-balance">
              Enterprise features. <span className="text-gradient">Zero complexity.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful automation that your entire team will love using
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI Agents That Sell",
                description:
                  "Intelligent agents that qualify leads, handle objections, and negotiate terms 24/7. They learn and improve constantly.",
                color: "from-primary to-accent",
              },
              {
                icon: TrendingUp,
                title: "Predictive Analytics",
                description:
                  "AI-powered forecasting shows you exactly which deals will close and when. Never miss a target again.",
                color: "from-accent to-primary",
              },
              {
                icon: BarChart3,
                title: "Real-Time Dashboards",
                description:
                  "Live pipeline visibility across your entire sales org. Every metric that matters, in one place.",
                color: "from-primary to-accent",
              },
              {
                icon: Clock,
                title: "Automated Workflows",
                description:
                  "Repetitive tasks gone. Your team focuses on strategy, not admin. Save 20+ hours per week per rep.",
                color: "from-accent to-primary",
              },
              {
                icon: Users,
                title: "Team Intelligence",
                description: "Share playbooks, track performance, and celebrate wins across your entire organization.",
                color: "from-primary to-accent",
              },
              {
                icon: Shield,
                title: "Enterprise Grade",
                description: "SOC 2 Type II certified. GDPR compliant. API-first architecture. Trusted by Fortune 500.",
                color: "from-accent to-primary",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="fade-in-up group glass p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">Transparent pricing that scales</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free. Upgrade when you're ready. Pay for what you use.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "Forever free",
                description: "Perfect for testing the platform",
                features: [
                  "Up to 5 AI agents",
                  "1,000 conversations/month",
                  "Basic analytics",
                  "Community support",
                  "Salesforce integration",
                ],
                cta: "Start Free",
                highlight: false,
              },
              {
                name: "Professional",
                price: "$499",
                period: "/month",
                description: "For growing sales teams",
                features: [
                  "Unlimited AI agents",
                  "Unlimited conversations",
                  "Advanced analytics & forecasting",
                  "Priority support",
                  "Custom integrations",
                  "Team collaboration",
                  "API access",
                ],
                cta: "Start Trial",
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "Let's talk",
                description: "For large organizations",
                features: [
                  "Everything in Professional",
                  "Dedicated account manager",
                  "Custom SLAs & compliance",
                  "White-label options",
                  "Advanced security",
                  "On-premise deployment",
                  "Training & implementation",
                ],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`fade-in-up group relative rounded-3xl border-2 transition-all duration-300 hover-lift ${
                  plan.highlight
                    ? "bg-gradient-to-br from-primary/20 to-accent/10 border-primary/60 md:scale-105"
                    : "glass border-primary/20 hover:border-primary/40"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm font-bold rounded-full">
                    RECOMMENDED
                  </div>
                )}
                <div className="p-8 h-full flex flex-col">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <div className="text-5xl font-black">{plan.price}</div>
                    <div className="text-muted-foreground text-sm mt-1">{plan.period}</div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/login"
                    className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-300 ${
                      plan.highlight
                        ? "bg-gradient-to-r from-primary to-accent text-white hover:shadow-2xl hover:shadow-primary/40"
                        : "glass border border-primary/30 hover:bg-white/20"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 glass border-y border-primary/30"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl sm:text-6xl font-black mb-6">Ready to transform your sales?</h2>
          <p className="text-xl text-muted-foreground mb-12 text-balance">
            Join 2,500+ companies closing deals faster with Yeison. No credit card required.
          </p>
          <Link
            href="/login"
            className="inline-flex px-10 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover-lift group btn-premium text-lg"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">Yeison</span>
              </div>
              <p className="text-sm text-muted-foreground">Enterprise sales automation powered by AI.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    API Ref
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-accent transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
            <p>&copy; 2025 Yeison. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition">
                Twitter
              </Link>
              <Link href="#" className="hover:text-accent transition">
                LinkedIn
              </Link>
              <Link href="#" className="hover:text-accent transition">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
