'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Server,
  Layers,
  Zap,
  Cpu,
  RefreshCw,
  FolderTree,
  FileCode,
  ShieldAlert,
  ArrowRight,
  Database,
} from 'lucide-react';
import InteractiveLessonSimulator from '@/components/roadmap/InteractiveLessonSimulators';
import { soundEffects } from '@/utils/soundEffects';

export default function ReactNextEngineSection() {
  const [activeTab, setActiveTab] = useState<'rsc' | 'app_router' | 'vdom' | 'server_actions'>('rsc');

  const tabs = [
    {
      id: 'rsc',
      label: 'Server (RSC) vs Client Components',
      icon: Server,
      desc: 'Zero client bundle size, server-side data fetching, and the hydration boundary.',
    },
    {
      id: 'app_router',
      label: 'App Router File-System Simulator',
      icon: FolderTree,
      desc: 'Nested layouts, instant Suspense loading states, and isolated error boundaries.',
    },
    {
      id: 'vdom',
      label: 'Virtual DOM Diffing & React Fiber',
      icon: Cpu,
      desc: 'How React Fiber computes minimal DOM mutations using key props and in-memory reconciliation.',
    },
    {
      id: 'server_actions',
      label: 'Server Actions & Mutations',
      icon: Zap,
      desc: 'Direct async server function execution, Zod validation, and instant cache revalidation.',
    },
  ];

  return (
    <section id="react-next" className="space-y-8 scroll-mt-20">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
          <Code2 className="w-3.5 h-3.5" />
          <span>Interactive Architecture Simulator</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          React &amp; Next.js Execution Engine
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Deep-dive into the architectural mechanics that distinguish Next.js App Router from
          traditional SPAs: Server Component streaming, Fiber reconciliation, and secure Server Actions.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                soundEffects.playClick();
                setActiveTab(t.id as any);
              }}
              className={`p-3.5 rounded-xl border text-left transition select-none flex flex-col justify-between gap-2 ${
                isActive
                  ? 'bg-slate-800 border-purple-400 text-purple-300 shadow-md shadow-purple-950/40'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                <span className="text-[10px] font-mono opacity-60">Interactive</span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {t.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Hero Visualizer Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
        <div className="space-y-1 pb-4 border-b border-slate-800">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            {tabs.find((t) => t.id === activeTab)?.label}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {tabs.find((t) => t.id === activeTab)?.desc}
          </p>
        </div>

        {/* Live Simulator View */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-inner">
          {activeTab === 'rsc' && <InteractiveLessonSimulator type="rsc_vs_client" />}
          {activeTab === 'app_router' && <InteractiveLessonSimulator type="app_router_tree" />}
          {activeTab === 'vdom' && <InteractiveLessonSimulator type="virtual_dom_diff" />}
          {activeTab === 'server_actions' && <InteractiveLessonSimulator type="server_actions" />}
        </div>
      </div>
    </section>
  );
}
