'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Code2,
  LayoutGrid,
  Shield,
  Rocket,
  CheckCircle2,
  Terminal,
  Play,
  Zap,
  Lock,
  Unlock,
  EyeOff,
  Cpu,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RoadmapSection from '@/components/roadmap/RoadmapSection';
import TailwindGridPlayground from '@/components/grid/TailwindGridPlayground';
import ReactNextEngineSection from '@/components/engine/ReactNextEngineSection';
import SecurityAuditLab from '@/components/security/SecurityAuditLab';
import VercelDeployGuide from '@/components/deployment/VercelDeployGuide';
import JigsawVerificationModal from '@/components/antibot/JigsawVerificationModal';
import { ROADMAP_PHASES } from '@/data/roadmapData';
import { VerificationTelemetry } from '@/types';
import { soundEffects } from '@/utils/soundEffects';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language, toggleLanguage } = useLanguage();
  const isBn = language === 'bn';
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  // Strict Zero-Trust State: ALWAYS false on initial load and every page refresh
  const [isHumanVerified, setIsHumanVerified] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('roadmap');
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  // Total lessons in curriculum
  const totalLessonsCount = ROADMAP_PHASES.reduce(
    (acc, phase) => acc + phase.lessons.length,
    0
  );

  // Initialize on mount
  useEffect(() => {
    setHasMounted(true);
    // Explicitly purge any persistent verification tokens so every reload/entry strictly requires verification
    try {
      localStorage.removeItem('antigravity_human_verified_token');
      sessionStorage.removeItem('antigravity_human_verified_token');
    } catch {}

    try {
      const savedCompleted = localStorage.getItem('nextgen_completed_lessons');
      if (savedCompleted) {
        setCompletedLessons(JSON.parse(savedCompleted));
      }
    } catch {}
  }, []);

  // Save completed lessons to localStorage
  const handleToggleComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId];
      try {
        localStorage.setItem('nextgen_completed_lessons', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Reset progress handler
  const handleResetProgress = () => {
    if (confirm('Reset all completed lessons progress?')) {
      setCompletedLessons([]);
      try {
        localStorage.removeItem('nextgen_completed_lessons');
      } catch {}
      soundEffects.playClick();
    }
  };

  // Toggle Sound FX
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.enabled = next;
    if (next) soundEffects.playClick();
  };

  // Verification callback from AntiGravity Jigsaw Modal
  const handleVerified = (telemetry: VerificationTelemetry, token: string) => {
    setSessionToken(token);
    setIsHumanVerified(true);
  };

  // Manual Lock Vault handler
  const handleLockVault = () => {
    soundEffects.playClick();
    setIsHumanVerified(false);
    setSessionToken(null);
  };

  const progressPercent = Math.round(
    (completedLessons.length / totalLessonsCount) * 100
  );

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!hasMounted) {
    return <div className="min-h-screen bg-[#0B0F19]" />;
  }

  // ========================================================
  // ZERO-LEAKAGE MANDATORY ACCESS GATE (NOT VERIFIED)
  // When unverified, ZERO curriculum or application HTML is mounted to the DOM.
  // ========================================================
  if (!isHumanVerified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0F19] text-slate-100 p-4 relative overflow-hidden select-none">
        {/* Ambient Neon Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/20 to-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Row with Language Toggle and Direct Link to ML */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
          <Link
            href="/machine-learning"
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300 hover:text-white flex items-center gap-1.5 transition"
          >
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? 'মেশিন লার্নিং (ML) পেজ' : 'Machine Learning (ML)'}</span>
          </Link>

          <button
            onClick={() => {
              soundEffects.playClick();
              toggleLanguage();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold transition"
          >
            <span className={!isBn ? 'text-cyan-400 font-bold' : 'text-slate-500'}>EN</span>
            <span className="text-slate-600">|</span>
            <span className={isBn ? 'text-rose-400 font-bold' : 'text-slate-500'}>বাংলা</span>
          </button>
        </div>

        {/* Top Floating Security Pill */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-cyan-400 flex items-center gap-1.5 shadow-lg">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            {isBn ? 'জিরো-ট্রাস্ট এনক্লেভ সক্রিয়' : 'ZERO-TRUST ENCLAVE ACTIVE'}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-emerald-400 flex items-center gap-1.5 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {isBn ? 'এআই স্ক্র্যাপার ডিফেন্স: প্রস্তুত' : 'AI SCRAPER DEFENSE: ARMED'}
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-purple-400 flex items-center gap-1.5 shadow-lg">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            {isBn ? 'রিফ্রেশ ইনভেরিয়েন্ট: বাধ্যতামূলক' : 'REFRESH INVARIANT: MANDATORY'}
          </span>
        </div>

        {/* Security Challenge Headline */}
        <div className="text-center max-w-xl mb-6 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {isBn
              ? 'বায়োলজিক্যাল হিউম্যান ভেরিফিকেশন আবশ্যক'
              : 'Biological Verification Required'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isBn
              ? 'অ্যাপ্লিকেশনের সকল কনটেন্ট, কারিকুলাম ও ল্যাব ক্রিপ্টোগ্রাফিকভাবে সুরক্ষিত। অ্যাক্সেস পেতে নিচের জিগস পাজলটি সমাধান করুন।'
              : 'All application content, curriculum modules, and interactive labs are cryptographically locked. Complete the closed-loop sensorimotor puzzle below to unlock access.'}
          </p>
        </div>

        {/* The Mandatory Jigsaw Verification Component */}
        <JigsawVerificationModal
          isOpen={true}
          onVerified={handleVerified}
        />

        {/* HoneyPot Canary for Automated Crawlers */}
        <div
          aria-hidden="true"
          className="absolute -bottom-96 opacity-0 pointer-events-none select-none text-[1px]"
        >
          <a href="/security/trap-honeypot" rel="nofollow">
            AI Crawler Trap - Scrapers Accessing This Will Be Permanently Blocked
          </a>
        </div>
      </div>
    );
  }

  // ========================================================
  // FULL APPLICATION (ONLY MOUNTED WHEN HUMAN VERIFIED)
  // ========================================================
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      {/* Sticky Top Navbar with Lock Vault Option */}
      <Navbar
        progressPercent={progressPercent}
        completedLessonsCount={completedLessons.length}
        totalLessonsCount={totalLessonsCount}
        isHumanVerified={isHumanVerified}
        onOpenVerifyModal={handleLockVault}
        onResetProgress={handleResetProgress}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onLockVault={handleLockVault}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
        {/* ======================================================== */}
        {/* HERO SECTION */}
        {/* ======================================================== */}
        <section className="relative pt-4 sm:pt-8 text-center space-y-6 sm:space-y-8">
          {/* Subtle Ambient Background Neon Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[450px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/15 to-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Antibot Human Gate Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md text-xs font-mono select-none">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 font-semibold">
              {isBn
                ? 'সেন্সোরিমোটর ভেরিফাইড হিউম্যান অ্যাক্সেস সক্রিয়'
                : 'Sensorimotor Verified Human Access Active'}
            </span>
            <button
              type="button"
              onClick={handleLockVault}
              className="ml-2 text-rose-400 hover:text-rose-300 underline font-semibold flex items-center gap-1"
              title="Lock website access and require puzzle verification again"
            >
              <Lock className="w-3 h-3" />
              {isBn ? 'লক ভল্ট' : 'Lock Vault'}
            </button>
          </div>

          {/* New Machine Learning Feature Announcement Banner */}
          <div className="flex justify-center">
            <Link
              href="/machine-learning"
              onClick={() => soundEffects.playClick()}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-cyan-500/20 border border-amber-500/40 text-xs sm:text-sm font-bold text-white hover:border-amber-400 hover:scale-[1.02] transition-all shadow-xl group"
            >
              <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px]">
                {isBn ? 'নতুন পেজ' : 'NEW PAGE'}
              </span>
              <span className="text-amber-300">
                {isBn
                  ? '🤖 মেশিন লার্নিং: ৭টি অ্যালগরিদম অ্যানিমেটেড গাইড দেখুন'
                  : '🤖 Machine Learning: 7 Core Algorithms Animated Guide'}
              </span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {isBn ? 'নেক্সটজেন ফুল-স্ট্যাক ও এমএল:' : 'NextGen Full-Stack Mastery:'}{' '}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">
                {isBn ? 'জিরো থেকে এক্সপার্ট' : 'Zero to Expert'}
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? 'প্রোডাকশন-রেডি, মোবাইল-ফার্স্ট ইন্টারেক্টিভ কারিকুলাম। HTML5 DOM ও Tailwind Grid থেকে শুরু করে React Fiber ডিফিঙ, Next.js সার্ভার কম্পোনেন্টস এবং মেশিন লার্নিংয়ের ৭টি অ্যালগরিদম শিখুন।'
                : 'The production-ready, mobile-first interactive curriculum. Progress from HTML5 DOM mechanics and Tailwind Grid utilities to React Fiber diffing, Next.js Server Components, and interactive Machine Learning.'}
            </p>
          </div>

          {/* Quick CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/machine-learning"
              onClick={() => soundEffects.playClick()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-amber-950/50"
            >
              <Cpu className="w-4 h-4" />
              <span>{isBn ? '🤖 মেশিন লার্নিং ল্যাব' : '🤖 Machine Learning Lab'}</span>
            </Link>

            <button
              onClick={() => scrollToSection('roadmap')}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-cyan-950/50"
            >
              <span>{isBn ? '৫-ধাপের ওয়েব রোডম্যাপ' : 'Explore 5-Phase Roadmap'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('grid-lab')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <LayoutGrid className="w-4 h-4 text-cyan-400" />
              <span>{isBn ? 'টেইলউইন্ড গ্রিড ল্যাব (১০ প্রিসেট)' : 'Tailwind Grid Lab (10 Presets)'}</span>
            </button>

            <button
              onClick={() => scrollToSection('security-audit')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? '১৬-পয়েন্ট সিকিউরিটি ল্যাব' : '16-Point Security Lab'}</span>
            </button>
          </div>

          {/* Four Pillar Tech Specs Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-cyan-400 font-bold">
                {isBn ? '০১ • Next.js অ্যাপ রাউটার' : '01 • Next.js App Router'}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {isBn ? 'React 18 সার্ভার কম্পোনেন্টস' : 'React 18 Server Components'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-purple-400 font-bold">
                {isBn ? '০২ • Tailwind CSS ও Framer' : '02 • Tailwind CSS & Framer'}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {isBn ? 'মোবাইল-ফার্স্ট মোশন ফিজিক্স' : 'Mobile-First Motion Physics'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-emerald-400 font-bold">
                {isBn ? '০৩ • জিরো-বাগ গ্যারান্টি' : '03 • Zero-Bug Guarantee'}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {isBn ? 'ডিটারমিনিস্টিক ক্লায়েন্ট স্টেট' : 'Deterministic Client State'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="text-[11px] font-mono text-rose-400 font-bold">
                {isBn ? '০৪ • অ্যান্টিবট প্রোটেকশন' : '04 • Antibot Protection'}
              </div>
              <div className="text-xs text-slate-300 font-medium">
                {isBn ? 'নন-লিনিয়ার সেন্সর গেট' : 'Non-Linear C/D Gain Gate'}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* MODULE A: INTERACTIVE ROADMAP (5 PHASES) */}
        {/* ======================================================== */}
        <RoadmapSection
          completedLessons={completedLessons}
          onToggleComplete={handleToggleComplete}
        />

        {/* ======================================================== */}
        {/* MODULE B: TAILWIND GRID PLAYGROUND (10 PRESETS) */}
        {/* ======================================================== */}
        <TailwindGridPlayground />

        {/* ======================================================== */}
        {/* ARCHITECTURE: REACT & NEXT.JS EXECUTION ENGINE */}
        {/* ======================================================== */}
        <ReactNextEngineSection />

        {/* ======================================================== */}
        {/* MODULE C: "MAKE NO MISTAKES" SECURITY AUDIT LAB (16 CHECKS) */}
        {/* ======================================================== */}
        <SecurityAuditLab />

        {/* ======================================================== */}
        {/* VERCEL PRODUCTION DEPLOYMENT GUIDE */}
        {/* ======================================================== */}
        <VercelDeployGuide />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* HoneyPot Canary for Automated Crawlers */}
      <div
        aria-hidden="true"
        className="hidden opacity-0 pointer-events-none -z-50 select-none"
      >
        <a href="/security/trap-honeypot" rel="nofollow">
          AI Crawler Trap
        </a>
      </div>
    </motion.div>
  );
}
