'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Cpu,
  Target,
  Sparkles,
  BookOpen,
  Table as TableIcon,
  Lightbulb,
} from 'lucide-react';
import { MLAlgorithmData } from '@/data/mlAlgorithmsData';
import { useLanguage } from '@/context/LanguageContext';

// Import the 7 interactive components
import LinearRegressionInteractive from './LinearRegressionInteractive';
import LogisticRegressionInteractive from './LogisticRegressionInteractive';
import DecisionTreeInteractive from './DecisionTreeInteractive';
import RandomForestInteractive from './RandomForestInteractive';
import SvmInteractive from './SvmInteractive';
import KnnInteractive from './KnnInteractive';
import KMeansInteractive from './KMeansInteractive';

interface MlAlgorithmCardProps {
  algorithm: MLAlgorithmData;
}

export default function MlAlgorithmCard({ algorithm }: MlAlgorithmCardProps) {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Render the appropriate interactive simulator for this algorithm
  const renderInteractiveSim = () => {
    switch (algorithm.id) {
      case 'linear-regression':
        return <LinearRegressionInteractive />;
      case 'logistic-regression':
        return <LogisticRegressionInteractive />;
      case 'decision-tree':
        return <DecisionTreeInteractive />;
      case 'random-forest':
        return <RandomForestInteractive />;
      case 'support-vector-machine':
        return <SvmInteractive />;
      case 'k-nearest-neighbors':
        return <KnnInteractive />;
      case 'k-means-clustering':
        return <KMeansInteractive />;
      default:
        return null;
    }
  };

  return (
    <article
      id={algorithm.slug}
      className={`scroll-mt-24 rounded-3xl bg-slate-900/60 border ${algorithm.borderColor} p-4 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-8`}
    >
      {/* Ambient background glow matching algorithm pill color */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10"
        style={{ backgroundColor: algorithm.pillColor }}
      />

      {/* ======================================================== */}
      {/* CARD HEADER: Handwritten badge, title & subtitle pill */}
      {/* ======================================================== */}
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Algorithm Number Badge */}
          <div className="flex items-center gap-3">
            <span
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-extrabold text-xl sm:text-2xl shadow-lg border text-white"
              style={{
                backgroundColor: `${algorithm.pillColor}25`,
                borderColor: algorithm.pillColor,
              }}
            >
              {algorithm.number}
            </span>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {isBn ? algorithm.nameBn : algorithm.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
                {isBn ? algorithm.summaryBn : algorithm.summary}
              </p>
            </div>
          </div>

          {/* Type Badges */}
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-bold border"
              style={{
                backgroundColor: `${algorithm.pillColor}20`,
                borderColor: `${algorithm.pillColor}50`,
                color: algorithm.pillColor,
              }}
            >
              {isBn ? algorithm.typeBadgeBn : algorithm.typeBadge}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
              {isBn ? algorithm.taskTypeBn : algorithm.taskType}
            </span>
          </div>
        </div>

        {/* Subtitle Highlight Banner (The handwritten note pill) */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-medium"
          style={{
            backgroundColor: `${algorithm.pillColor}15`,
            borderColor: `${algorithm.pillColor}40`,
            color: '#FFFFFF',
          }}
        >
          <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: algorithm.pillColor }} />
          <span>{isBn ? algorithm.subtitleBn : algorithm.subtitle}</span>
        </div>
      </header>

      {/* ======================================================== */}
      {/* SECTION 1: WHAT IT IS (① এটা কী) */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span
            className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: algorithm.pillColor }}
          >
            1
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {isBn ? 'এটা কী (What it is)' : 'What it is'}
          </h4>
        </div>

        <ul className="grid grid-cols-1 gap-2.5 pl-2 sm:pl-4">
          {(isBn ? algorithm.whatItIs.pointsBn : algorithm.whatItIs.points).map(
            (point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: algorithm.pillColor }}
                />
                <span>{point}</span>
              </li>
            )
          )}
        </ul>

        {/* Dynamic Animated Interactive Simulator */}
        <div className="pt-2">
          {renderInteractiveSim()}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: HOW IT WORKS (② এটা কীভাবে কাজ করে) */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span
            className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: algorithm.pillColor }}
          >
            2
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {isBn ? 'এটা কীভাবে কাজ করে (How it works)' : 'How it works'}
          </h4>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {algorithm.howItWorks.steps.map((step) => (
            <div
              key={step.stepNum}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-md text-[11px] font-mono font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: algorithm.pillColor }}
                >
                  {step.stepNum}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {isBn ? `ধাপ 0${step.stepNum}` : `Step 0${step.stepNum}`}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isBn ? step.textBn : step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Mathematical Equation & Variable Breakdown Box */}
        {algorithm.howItWorks.equation && (
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <span className="text-xs font-mono text-slate-400">
                {isBn ? 'মূল গাণিতিক সূত্র (Mathematical Equation):' : 'Core Mathematical Equation:'}
              </span>
              <div
                className="px-3 py-1 rounded-lg font-mono font-bold text-sm tracking-wide"
                style={{
                  backgroundColor: `${algorithm.pillColor}20`,
                  color: algorithm.pillColor,
                }}
              >
                {algorithm.howItWorks.equation.formula}
              </div>
            </div>

            {/* Symbols Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              {algorithm.howItWorks.equation.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1"
                >
                  <div
                    className="font-mono font-extrabold text-sm"
                    style={{ color: algorithm.pillColor }}
                  >
                    {item.symbol}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isBn ? item.meaningBn : item.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: WHEN TO USE IT (③ কখন ব্যবহার করবেন) */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span
            className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: algorithm.pillColor }}
          >
            3
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {isBn ? 'কখন এটি ব্যবহার করবেন (When to use it)' : 'When to use it'}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(isBn ? algorithm.whenToUse.pointsBn : algorithm.whenToUse.points).map(
            (point, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3"
              >
                <Target
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: algorithm.pillColor }}
                />
                <span className="text-xs text-slate-300 leading-relaxed">{point}</span>
              </div>
            )
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: ADVANTAGES & LIMITATIONS (④ সুবিধা ও সীমাবদ্ধতা) */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span
            className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: algorithm.pillColor }}
          >
            4
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {isBn ? 'সুবিধা এবং সীমাবদ্ধতা (Advantages & Limitations)' : 'Advantages & Limitations'}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Advantages Column (Green) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isBn ? 'সুবিধাসমূহ (Advantages)' : 'Advantages'}</span>
            </div>
            <ul className="space-y-2.5">
              {(isBn ? algorithm.prosAndCons.advantagesBn : algorithm.prosAndCons.advantages).map(
                (adv, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Limitations Column (Red) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <XCircle className="w-4 h-4" />
              <span>{isBn ? 'সীমাবদ্ধতাসমূহ (Limitations)' : 'Limitations'}</span>
            </div>
            <ul className="space-y-2.5">
              {(isBn ? algorithm.prosAndCons.limitationsBn : algorithm.prosAndCons.limitations).map(
                (lim, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{lim}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: REAL-WORLD EXAMPLE (⑤ বাস্তব জীবনের উদাহরণ) */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span
            className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: algorithm.pillColor }}
          >
            5
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {isBn ? 'বাস্তব জীবনের উদাহরণ (Real-world example)' : 'Real-world example'}
          </h4>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
          <div className="space-y-1">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>
                {isBn
                  ? algorithm.realWorldExample.titleBn
                  : algorithm.realWorldExample.title}
              </span>
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn
                ? algorithm.realWorldExample.scenarioBn
                : algorithm.realWorldExample.scenario}
            </p>
          </div>

          {/* Dataset Table if available */}
          {algorithm.realWorldExample.table && (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-300">
                  <tr>
                    {(isBn
                      ? algorithm.realWorldExample.table.headersBn
                      : algorithm.realWorldExample.table.headers
                    ).map((head, idx) => (
                      <th key={idx} className="p-2.5 font-bold">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950">
                  {algorithm.realWorldExample.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/40 transition">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2.5 text-slate-300">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Practical Takeaway Banner */}
          <div
            className="p-3.5 rounded-xl border text-xs leading-relaxed"
            style={{
              backgroundColor: `${algorithm.pillColor}10`,
              borderColor: `${algorithm.pillColor}30`,
              color: '#F8FAFC',
            }}
          >
            <strong className="text-white">
              {isBn ? 'মূল শিক্ষা (Core Insight): ' : 'Core Insight: '}
            </strong>
            <span>
              {isBn
                ? algorithm.realWorldExample.takeawayBn
                : algorithm.realWorldExample.takeaway}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}
