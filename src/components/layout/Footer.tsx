'use client';

import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Github,
  Rocket,
  Heart,
  Code2,
  Terminal,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">
                NextGen Full-Stack Mastery
              </span>
            </div>
            <p className="text-slate-300 text-xs max-w-md leading-relaxed">
              The premier interactive, animated curriculum taking developers from foundational
              HTML5 semantic architecture all the way to secure, production-grade Next.js App
              Router deployments on Vercel.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                AntiGravity Bio-Pulse Gate Active
              </span>
            </div>
          </div>

          {/* Col 2: Modules */}
          <div className="space-y-2">
            <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">
              Core Modules
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <a href="#roadmap" className="hover:text-cyan-400 transition">
                  Phase 1: Web Foundations
                </a>
              </li>
              <li>
                <a href="#grid-lab" className="hover:text-cyan-400 transition">
                  Phase 2: Tailwind Grid Lab
                </a>
              </li>
              <li>
                <a href="#react-next" className="hover:text-cyan-400 transition">
                  Phase 3: React 18 Core
                </a>
              </li>
              <li>
                <a href="#react-next" className="hover:text-cyan-400 transition">
                  Phase 4: Next.js App Router
                </a>
              </li>
              <li>
                <a href="#security-audit" className="hover:text-cyan-400 transition">
                  Phase 5: Security Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech Stack */}
          <div className="space-y-2">
            <h4 className="font-mono text-white text-xs font-bold uppercase tracking-wider">
              Tech Stack
            </h4>
            <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
              <li>Next.js 14 (App Router)</li>
              <li>TypeScript Strict Mode</li>
              <li>Tailwind CSS Dark Theme</li>
              <li>Framer Motion Animations</li>
              <li>Vercel Edge Network</li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 NextGen Mastery. Production-Grade Educational Platform. Zero-Bug Guarantee.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with Next.js &amp; Tailwind CSS
            </span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">100% Vercel Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
