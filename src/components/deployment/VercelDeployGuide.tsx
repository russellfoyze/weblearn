'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Server,
  Globe,
  GitBranch,
  Cpu,
  Layers,
} from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';

export default function VercelDeployGuide() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const deploymentSteps = [
    {
      id: 1,
      title: 'Local Zero-Bug Build Verification',
      badge: 'Step 1',
      desc: 'Verify TypeScript types, zero unused imports, and production bundle compilation locally before git push.',
      command: 'npm run build',
      output: `▲ Next.js 14.2.15
   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Linting and checking validity of types
 ✓ Collecting page data
 ✓ Generating static pages (5/5)
 ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.4 kB         89.2 kB
└ ○ /_not-found                          871 B          84.6 kB
+ First Load JS shared by all            83.8 kB
  ├ chunks/23-1d4821a06fc00.js           54.2 kB
  └ other shared chunks (total)          29.6 kB

○  (Static)  prerendered as static content`,
    },
    {
      id: 2,
      title: 'Git Version Control Push',
      badge: 'Step 2',
      desc: 'Stage all tracked files. Our .gitignore automatically excludes .env.local, .next, and node_modules.',
      command: `git init\ngit add .\ngit commit -m "feat: launch NextGen Full-Stack Mastery"\ngit branch -M main\ngit remote add origin https://github.com/your-username/nextgen-mastery.git\ngit push -u origin main`,
      output: `Enumerating objects: 42, done.
Counting objects: 100% (42/42), done.
Delta compression using up to 16 threads
Compressing objects: 100% (38/38), done.
Writing objects: 100% (42/42), 148.21 KiB | 8.23 MiB/s, done.
Total 42 (delta 6), reused 0 (delta 0), pack-reused 0
To https://github.com/your-username/nextgen-mastery.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.`,
    },
    {
      id: 3,
      title: 'Vercel 1-Command CLI Deployment',
      badge: 'Step 3',
      desc: 'Deploy directly from your terminal using Vercel CLI, or connect your GitHub repository in the Vercel Dashboard.',
      command: 'npx vercel --prod',
      output: `Vercel CLI 37.14.0
? Set up and deploy “nextgen-mastery”? [Y/n] y
? Which scope do you want to deploy to? your-team
? Link to existing project? [y/N] n
? What's your project's name? nextgen-fullstack-mastery
? In which directory is your code located? ./
Auto-detected Project Settings (Next.js):
- Build Command: next build
- Output Directory: Next.js default
- Development Command: next dev --port $PORT
🔗 Linked to your-team/nextgen-fullstack-mastery (created .vercel)
🔍 Inspect: https://vercel.com/your-team/nextgen-fullstack-mastery/deployments
✅ Production: https://nextgen-fullstack-mastery.vercel.app [34s]`,
    },
  ];

  const handleCopy = (idx: number, text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      soundEffects.playClick();
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const currentStep = deploymentSteps.find((s) => s.id === activeStep) || deploymentSteps[0];

  return (
    <section id="vercel-deploy" className="space-y-8 scroll-mt-20">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Rocket className="w-3.5 h-3.5" />
          <span>Production Infrastructure Guide</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Vercel Production Deployment Guide
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          From localhost to global edge deployment in under 60 seconds. Learn how Vercel
          optimizes Next.js Server Components, Edge Middleware, and provides instant Preview URLs.
        </p>
      </div>

      {/* Step Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {deploymentSteps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => {
                soundEffects.playClick();
                setActiveStep(step.id);
              }}
              className={`p-4 rounded-xl border text-left transition select-none flex flex-col justify-between gap-2 ${
                isActive
                  ? 'bg-slate-800 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-950/40'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white">{step.badge}</span>
                <span className="text-[10px] text-slate-400">CI/CD</span>
              </div>
              <div className="font-bold text-xs sm:text-sm text-white">{step.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active Step Terminal Hero Display */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
              {currentStep.badge}
            </span>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight">
              {currentStep.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentStep.desc}
            </p>
          </div>

          <button
            onClick={() => handleCopy(currentStep.id, currentStep.command)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 transition shrink-0"
          >
            {copiedIndex === currentStep.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied Command!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Command</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Simulated Terminal */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs shadow-inner">
          {/* Terminal Window Header Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-medium text-slate-300">bash — terminal@vercel-deploy</span>
            </div>
            <span>Node v22 • Edge Runtime</span>
          </div>

          {/* Terminal Content */}
          <div className="p-4 space-y-3 overflow-x-auto leading-relaxed">
            <div className="flex items-start gap-2 text-cyan-400">
              <span className="select-none text-slate-400">$</span>
              <pre className="font-bold text-white whitespace-pre-wrap">{currentStep.command}</pre>
            </div>

            <div className="text-slate-400 border-t border-slate-900 pt-2 whitespace-pre leading-relaxed text-[11px]">
              {currentStep.output}
            </div>
          </div>
        </div>

        {/* Best Practice Note */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Vercel Zero-Config Full-Stack Architecture Highlights:
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 text-xs">
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Automatic global SSL certificate generation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Zero-cold-start Edge Middleware execution
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Isolated preview environments for every git branch
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              Instant atomic production rollbacks with 0ms downtime
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
