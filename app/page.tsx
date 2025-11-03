"use client"

import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import SoftCard from '@/components/ui/soft-card'
export default function Landing() {
  async function signInWithGoogle() {
    try {
      const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
      if (error) throw error
    } catch (e: any) {
      toast.error(e?.message || 'Google sign-in failed')
    }
  }

  return (
    <main className="relative min-h-screen flex items-center">
      {/* Subtle decorative background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-[#9ad4ff]/10 blur-3xl" />
      </div>
      <div className="max-w-[1100px] mx-auto w-full px-6 md:px-8">
        <div className="absolute top-6 right-6">
          <Link href="/about" className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10" aria-label="About us">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 2C6.475 2 2 6.588 2 12.253c0 4.52 2.865 8.35 6.839 9.703c.5.096.683-.22.683-.49c0-.242-.01-1.048-.015-1.901c-2.782.616-3.37-1.215-3.37-1.215c-.455-1.177-1.11-1.49-1.11-1.49c-.908-.64.069-.627.069-.627c1.003.072 1.53 1.05 1.53 1.05c.892 1.57 2.341 1.116 2.91.853c.091-.665.35-1.116.636-1.373c-2.222-.258-4.555-1.144-4.555-5.09c0-1.124.387-2.043 1.021-2.763c-.103-.258-.443-1.3.097-2.71c0 0 .836-.275 2.74 1.055A9.29 9.29 0 0 1 12 6.844c.847.004 1.7.117 2.497.343c1.902-1.33 2.737-1.055 2.737-1.055c.542 1.41.202 2.452.1 2.71c.636.72 1.02 1.639 1.02 2.763c0 3.957-2.337 4.828-4.565 5.082c.36.32.682.948.682 1.912c0 1.38-.013 2.493-.013 2.832c0 .272.18.592.688.49C19.138 20.6 22 16.77 22 12.252C22 6.588 17.523 2 12 2Z"/>
            </svg>
          </Link>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-muted hover:bg-white/10 transition-colors float-subtle">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Introducing GrindFlow
        </div>

        <h1 className="mt-5 text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight fade visible">
          Make your study notes look
          <span className="relative inline-block align-baseline ml-2">
            <span className="sr-only"> ten times </span>
            <span className="mx-3">10x</span>
            <ContainerTextFlip
              words={["better", "cleaner", "sharper"]}
              className="align-middle ml-2"
              textClassName="px-2"
              interval={2400}
              animationDuration={600}
            />
          </span>
        </h1>

        <p className="mt-6 max-w-[680px] text-lg text-muted">
          Upload your notes, get AI feedback, generate quizzes, and earn coins for sharing quality content. Minimalist motion, maximal clarity.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={signInWithGoogle} className="btn-primary inline-flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 533.5 544.3" aria-hidden="true"><path fill="#4285F4" d="M533.5 278.4c0-18.6-1.7-37-5.2-54.8H272.1v103.8h147c-6.3 34.1-25.4 63-54.2 82.3v68h87.5c51.2-47.2 81.1-116.8 81.1-199.3z"/><path fill="#34A853" d="M272.1 544.3c73.4 0 135.3-24.3 180.4-66.1l-87.5-68c-24.3 16.3-55.3 26.1-92.9 26.1-71.3 0-131.8-48-153.5-112.4H28.7v70.7C73.3 486.4 166.5 544.3 272.1 544.3z"/><path fill="#FBBC05" d="M118.6 323.9c-10.8-31.9-10.8-66.4 0-98.3V154.9H28.7c-38.3 76.3-38.3 167.8 0 244.1l89.9-75.1z"/><path fill="#EA4335" d="M272.1 106.6c39.8-.6 78.1 14.3 107.1 41.9l79.8-79.8C404.9 25.2 340.6-.2 272.1 0 166.5 0 73.3 57.9 28.7 154.9l89.9 70.7c21.7-64.5 82.2-112.4 153.5-119z"/></svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-3">
          <SoftCard>
            <div className="inline-flex items-center gap-2 text-xs mb-2">
              <span className="px-2 py-1 rounded-full bg-white/8 border border-white/10 text-muted">Feature</span>
              <span className="px-2 py-1 rounded-full bg-accent/15 text-accent">AI</span>
            </div>
            <div className="text-xl font-semibold mb-1">AI scoring</div>
            <p className="text-sm text-muted">Smart ratings with actionable suggestions.</p>
          </SoftCard>
          <SoftCard>
            <div className="inline-flex items-center gap-2 text-xs mb-2">
              <span className="px-2 py-1 rounded-full bg-white/8 border border-white/10 text-muted">Workflow</span>
              <span className="px-2 py-1 rounded-full bg-accent/15 text-accent">Flow</span>
            </div>
            <div className="text-xl font-semibold mb-1">Study flows</div>
            <p className="text-sm text-muted">Adaptive steps to master your topic.</p>
          </SoftCard>
          <SoftCard>
            <div className="inline-flex items-center gap-2 text-xs mb-2">
              <span className="px-2 py-1 rounded-full bg-white/8 border border-white/10 text-muted">Practice</span>
              <span className="px-2 py-1 rounded-full bg-accent/15 text-accent">Quiz</span>
            </div>
            <div className="text-xl font-semibold mb-1">Quizzes</div>
            <p className="text-sm text-muted">Auto-generated questions to test yourself.</p>
          </SoftCard>
        </div>

        {/* Removed trust strip and secondary cards as requested */}
      </div>
    </main>
  )
}

