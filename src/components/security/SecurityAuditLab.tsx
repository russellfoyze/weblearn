'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Activity,
  FileCheck,
  ArrowRight,
  Database,
  Key,
  Flame,
  Bug,
  EyeOff,
  Filter,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SECURITY_AUDIT_ITEMS } from '@/data/securityAuditData';
import { SecurityCheckItem } from '@/types';
import { soundEffects } from '@/utils/soundEffects';

export default function SecurityAuditLab() {
  // State: Record of item states (true = secured / production-ready, false = vulnerable / anti-pattern)
  const [securedItems, setSecuredItems] = useState<Record<number, boolean>>(() => {
    // Initial default: 10 items secured, 6 vulnerable for realistic discovery
    const initial: Record<number, boolean> = {};
    SECURITY_AUDIT_ITEMS.forEach((item, idx) => {
      initial[item.id] = idx < 9; // First 9 secured initially
    });
    return initial;
  });

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'must_have' | 'anti_patterns'>('all');
  const [selectedItemId, setSelectedItemId] = useState<number>(1);
  const [isDiagnosticScanning, setIsDiagnosticScanning] = useState<boolean>(false);
  const [diagnosticScanStep, setDiagnosticScanStep] = useState<number>(0);
  const [auditReportOpen, setAuditReportOpen] = useState<boolean>(false);

  // Compute Production Readiness Score (0% to 100%)
  const scorePercent = useMemo(() => {
    const total = SECURITY_AUDIT_ITEMS.length;
    const securedCount = Object.values(securedItems).filter(Boolean).length;
    return Math.round((securedCount / total) * 100);
  }, [securedItems]);

  const toggleItemSecurity = (id: number) => {
    soundEffects.playClick();
    setSecuredItems((prev) => {
      const next = !prev[id];
      if (next) {
        soundEffects.playSuccess(1);
      } else {
        soundEffects.playFail();
      }
      return { ...prev, [id]: next };
    });
  };

  const handleFixAll = () => {
    soundEffects.playSuccess(3);
    const allSecured: Record<number, boolean> = {};
    SECURITY_AUDIT_ITEMS.forEach((item) => {
      allSecured[item.id] = true;
    });
    setSecuredItems(allSecured);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#a855f7'],
      });
    } catch {}
  };

  // Automated Pre-Deploy Diagnostic Scanner
  const runPreDeployVerification = () => {
    setIsDiagnosticScanning(true);
    setDiagnosticScanStep(0);
    soundEffects.playClick();

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setDiagnosticScanStep(step);
      soundEffects.playClick();

      if (step >= SECURITY_AUDIT_ITEMS.length) {
        clearInterval(interval);
        setTimeout(() => {
          // Lock all items to secured
          const allFixed: Record<number, boolean> = {};
          SECURITY_AUDIT_ITEMS.forEach((it) => {
            allFixed[it.id] = true;
          });
          setSecuredItems(allFixed);
          setIsDiagnosticScanning(false);
          setAuditReportOpen(true);
          soundEffects.playComplete();

          try {
            confetti({
              particleCount: 120,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#10b981', '#34d399', '#06b6d4'],
            });
          } catch {}
        }, 600);
      }
    }, 120);
  };

  const selectedItem =
    SECURITY_AUDIT_ITEMS.find((it) => it.id === selectedItemId) ||
    SECURITY_AUDIT_ITEMS[0];
  const isSelectedSecured = !!securedItems[selectedItem.id];

  const filteredItems = SECURITY_AUDIT_ITEMS.filter((item) => {
    if (activeCategoryFilter === 'must_have') return !item.isAntiPattern;
    if (activeCategoryFilter === 'anti_patterns') return item.isAntiPattern;
    return true;
  });

  return (
    <section id="security-audit" className="space-y-8 scroll-mt-20">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Module C • Production Security Lab & Test Suite</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          &quot;MAKE NO MISTAKES&quot; — Full-Stack Security Audit
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          The comprehensive 16-point production pre-flight audit. Eliminate all 13 critical
          vulnerabilities and 3 launch-blocking anti-patterns before going live on Vercel.
        </p>
      </div>

      {/* Production Readiness Score & Diagnostic Runner Hero Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-4">
            {/* Circular Gauge */}
            <div className="relative w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center font-mono font-extrabold text-xl shrink-0">
              <span
                className={
                  scorePercent === 100
                    ? 'text-emerald-400'
                    : scorePercent >= 75
                    ? 'text-cyan-400'
                    : 'text-amber-400'
                }
              >
                {scorePercent}%
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  Production Readiness Score
                </h3>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    scorePercent === 100
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {scorePercent === 100 ? '✅ 100% Vercel Ready' : '⚠️ Action Required'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {Object.values(securedItems).filter(Boolean).length} of{' '}
                {SECURITY_AUDIT_ITEMS.length} critical controls verified & locked
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleFixAll}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Auto-Harden All 16
            </button>

            <button
              onClick={runPreDeployVerification}
              disabled={isDiagnosticScanning}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-950/40 disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isDiagnosticScanning
                ? `Scanning (${diagnosticScanStep}/${SECURITY_AUDIT_ITEMS.length})...`
                : 'Run Pre-Deploy Verification'}
            </button>
          </div>
        </div>

        {/* Dynamic Health Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5">
            <motion.div
              className={`h-full rounded-full transition-all duration-500 ${
                scorePercent === 100
                  ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                  : 'bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400'
              }`}
              style={{ width: `${scorePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>0% Vulnerable Prototype</span>
            <span>50% Staging Threshold</span>
            <span>100% Production Grade</span>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
            activeCategoryFilter === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All 16 Rules
        </button>
        <button
          onClick={() => setActiveCategoryFilter('must_have')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
            activeCategoryFilter === 'must_have'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          13 Must-Have Controls
        </button>
        <button
          onClick={() => setActiveCategoryFilter('anti_patterns')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
            activeCategoryFilter === 'anti_patterns'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          3 Launch Anti-Patterns
        </button>
      </div>

      {/* Main Split Interface: Left List of 16 Rules / Right Interactive Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 16 Items List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
          {filteredItems.map((item) => {
            const isSecured = !!securedItems[item.id];
            const isSelected = selectedItemId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedItemId(item.id);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400 shadow-md shadow-cyan-950/40'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      item.isAntiPattern
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {item.id < 10 ? `0${item.id}` : item.id}
                  </span>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                      {item.title}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {item.citationBadge}
                    </div>
                  </div>
                </div>

                {/* State Toggle Pill */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItemSecurity(item.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition flex items-center gap-1 shrink-0 ${
                    isSecured
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
                      : 'bg-rose-500/15 text-rose-300 border-rose-500/40 hover:bg-rose-500/25'
                  }`}
                >
                  {isSecured ? (
                    <>
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span>Secured</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3 text-rose-400" />
                      <span>Vulnerable</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive Deep-Dive Simulator Box */}
        <div className="lg:col-span-7">
          <motion.div
            key={selectedItem.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl"
          >
            {/* Item Title & Security Toggle Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                    Rule #{selectedItem.id}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {selectedItem.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {selectedItem.title}
                </h3>
              </div>

              {/* Big Interactive State Switch */}
              <button
                onClick={() => toggleItemSecurity(selectedItem.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold border transition-all shadow-md shrink-0 ${
                  isSelectedSecured
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-emerald-950/40'
                    : 'bg-rose-500 text-white border-rose-400 shadow-rose-950/40 animate-pulse'
                }`}
              >
                {isSelectedSecured ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>State: SECURED (Production-Ready)</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>State: VULNERABLE (Click to Fix)</span>
                  </>
                )}
              </button>
            </div>

            {/* Dynamic Interactive Attack vs Defense Simulation Widget */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Live Attack & Mitigation Simulation:
                </span>
                <span
                  className={
                    isSelectedSecured ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'
                  }
                >
                  {isSelectedSecured ? '🛡️ Attack Blocked / Invariant Intact' : '🚨 Exploitation Possible'}
                </span>
              </div>

              <div
                className={`p-3.5 rounded-xl border text-xs font-mono space-y-2 transition-all ${
                  isSelectedSecured
                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>
                    {isSelectedSecured
                      ? `[SECURED] ${selectedItem.securedState.headline}`
                      : `[EXPOSED] ${selectedItem.vulnerableState.headline}`}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-xs">
                  {isSelectedSecured
                    ? selectedItem.securedState.description
                    : selectedItem.vulnerableState.description}
                </p>
              </div>
            </div>

            {/* Side-by-Side or Active Code Snippet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  {isSelectedSecured ? 'Production Mitigation Code:' : 'Vulnerable Anti-Pattern Code:'}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    isSelectedSecured
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {isSelectedSecured ? 'PRODUCTION STANDARD' : 'VULNERABLE / REJECTED'}
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-4">
                <pre className="text-xs font-mono leading-relaxed overflow-x-auto text-slate-200">
                  <code>
                    {isSelectedSecured
                      ? selectedItem.securedState.code
                      : selectedItem.vulnerableState.code}
                  </code>
                </pre>
              </div>
            </div>

            {/* Impact & Compliance Standard Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Security Impact / Risk</div>
                <div className="text-slate-300 font-medium">
                  {isSelectedSecured
                    ? selectedItem.securedState.mitigation
                    : selectedItem.vulnerableState.impact}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Governing Security Standard</div>
                <div className="text-cyan-400 font-mono font-medium">
                  {selectedItem.securedState.standard}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pre-Deploy Diagnostic Verification Certificate Modal */}
      <AnimatePresence>
        {auditReportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 text-slate-100 shadow-2xl shadow-emerald-950/50 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Pre-Deploy Verification Audit Passed
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono">
                    All 16 Mission-Critical Security Checks Verified
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Target Framework:</span>
                  <span className="text-white">Next.js App Router (TypeScript)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Production Readiness Score:</span>
                  <span className="text-emerald-400 font-bold">100% (16/16 Checks Passed)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Vercel Edge Compatibility:</span>
                  <span className="text-emerald-400">Zero-Bug Guarantee Validated</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Audit Certificate SHA:</span>
                  <span className="text-cyan-400 truncate max-w-[200px]">
                    ag_audit_94821a06fc00_passed
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setAuditReportOpen(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
                >
                  Acknowledge & Proceed
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
