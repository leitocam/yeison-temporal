"use client"

import Link from "next/link"
import LoginForm from "@/components/login-form"
import { Zap } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/15 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/15 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-border/50 bg-gradient-to-br from-card/40 via-background to-background relative">
        <div className="absolute inset-0 backdrop-blur-xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg shadow-primary/40">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight">Yeison</span>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="fade-in-up">
            <h2 className="text-5xl font-black mb-6 tracking-tight">Unlock your sales potential with AI</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join 2,500+ companies closing deals 3x faster with intelligent automation.
            </p>
          </div>

          <div className="space-y-4 pt-8">
            {[
              { number: "01", title: "AI Agents", desc: "Work 24/7 on your sales process, never sleep" },
              { number: "02", title: "Predictive AI", desc: "Know which deals will close before they happen" },
              { number: "03", title: "Enterprise Scale", desc: "Built for teams that think big and move fast" },
            ].map((item, i) => (
              <div
                key={item.number}
                className="fade-in-up group glass p-4 rounded-xl border border-primary/20 hover:border-primary/50 hover:bg-white/10 transition-all"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/40 transition-all">
                    <span className="font-bold text-white text-sm">{item.number}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">✨ Enterprise sales automation for serious teams</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background"></div>
              <div className="w-8 h-8 rounded-full bg-primary/50 border-2 border-background flex items-center justify-center text-white font-bold">
                +
              </div>
            </div>
            <span>Trusted by Fortune 500 companies</span>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="fade-in-up lg:hidden flex flex-col items-center mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/40 mb-6">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black">Yeison</span>
          </div>

          <div className="fade-in-up stagger-1 mb-10">
            <h1 className="text-4xl font-black mb-3 tracking-tight">Welcome back</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Access your AI-powered sales dashboard</p>
          </div>

          <LoginForm />

          <div className="fade-in-up stagger-2 mt-10 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account?{" "}
              <Link href="#" className="text-accent font-bold hover:text-primary transition">
                Start a free trial
              </Link>
            </p>
            <p className="mt-4 text-xs">All plans come with a 14-day free trial. No credit card required.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
