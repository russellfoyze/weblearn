'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, ArrowUpRight } from 'lucide-react';
import { ML_ALGORITHMS } from '@/data/mlAlgorithmsData';
import { useLanguage } from '@/context/LanguageContext';

export default function MlOverviewHero() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const scrollToAlg = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative space-y-8 text-center pt-2 pb-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[450px] bg-gradient-to-tr from-rose-600/10 via-purple-600/15 to-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Centerpiece Title Badge (Faithful to Page 1 Infographic) */}
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg text-xs font-mono select-none">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-300 font-bold">
            {isBn ? 'হাতে আঁকা ইনফোগ্রাফিক টিউটোরিয়াল' : 'Interactive Hand-Drawn Infographic Guide'}
          </span>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border-2 border-dashed border-amber-400/50 shadow-2xl relative">
          <div className="text-4xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight flex items-center justify-center gap-3">
            <span className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold shadow-lg">
              7
            </span>
            <span className="text-white">
              {isBn ? 'মেশিন লার্নিং' : 'Machine Learning'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 mt-2">
            {isBn ? 'অ্যালগরিদম যা প্রতিটা বিগিনারের জানা উচিত' : 'Algorithms Every Beginner Should Know'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 mt-3 max-w-lg mx-auto leading-relaxed">
            {isBn
              ? 'বাস্তব জীবনের উদাহরণ, অ্যানিমেটেড ভিজ্যুয়াল এবং গণিতের সহজ বিশ্লেষণের মাধ্যমে মেশিন লার্নিংয়ের ৭টি ভিত্তিপ্রস্তর আয়ত্ত করুন।'
              : 'Master the 7 foundational machine learning algorithms through animated visual mechanics, formula breakdowns, and live interactive simulations.'}
          </p>
        </div>
      </div>

      {/* 7 Interactive Overview Cards (Page 1 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto pt-4 text-left">
        {ML_ALGORITHMS.map((alg) => (
          <motion.div
            key={alg.id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollToAlg(alg.slug)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition flex flex-col justify-between space-y-3 relative overflow-hidden shadow-lg"
          >
            {/* Top row: Number pill + Name */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-xl font-mono font-black text-xs flex items-center justify-center text-white"
                    style={{ backgroundColor: alg.pillColor }}
                  >
                    {alg.number}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {isBn ? alg.typeBadgeBn : alg.typeBadge}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {isBn ? alg.nameBn : alg.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {isBn ? alg.subtitleBn : alg.subtitle}
                </p>
              </div>
            </div>

            {/* Mini Animated Visual Preview Thumbnail */}
            <div className="h-20 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-center p-2 relative overflow-hidden">
              {alg.id === 'linear-regression' && (
                <svg viewBox="0 0 100 50" className="w-full h-full stroke-slate-500">
                  <line x1="10" y1="45" x2="90" y2="45" stroke="#475569" strokeWidth="1" />
                  <line x1="10" y1="45" x2="10" y2="5" stroke="#475569" strokeWidth="1" />
                  <line x1="15" y1="40" x2="85" y2="10" stroke="#F43F5E" strokeWidth="2" />
                  {[
                    { cx: 25, cy: 38 },
                    { cx: 40, cy: 26 },
                    { cx: 55, cy: 28 },
                    { cx: 70, cy: 15 },
                    { cx: 80, cy: 12 },
                  ].map((p, i) => (
                    <circle key={i} cx={p.cx} cy={p.cy} r="2.5" fill="#38BDF8" />
                  ))}
                </svg>
              )}

              {alg.id === 'logistic-regression' && (
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <line x1="10" y1="45" x2="90" y2="45" stroke="#475569" strokeWidth="1" />
                  <line x1="50" y1="45" x2="50" y2="5" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                  <path
                    d="M 15 42 Q 40 42, 50 25 T 85 8"
                    fill="none"
                    stroke="#0EA5E9"
                    strokeWidth="2.5"
                  />
                  <circle cx="30" cy="42" r="2.5" fill="#10B981" />
                  <circle cx="70" cy="8" r="2.5" fill="#F43F5E" />
                </svg>
              )}

              {alg.id === 'decision-tree' && (
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <rect x="36" y="4" width="28" height="10" rx="3" fill="#A855F7" fillOpacity="0.3" stroke="#A855F7" />
                  <line x1="50" y1="14" x2="25" y2="28" stroke="#64748B" />
                  <line x1="50" y1="14" x2="75" y2="28" stroke="#64748B" />
                  <rect x="12" y="28" width="26" height="9" rx="2" fill="#10B981" fillOpacity="0.4" stroke="#10B981" />
                  <rect x="62" y="28" width="26" height="9" rx="2" fill="#F43F5E" fillOpacity="0.4" stroke="#F43F5E" />
                </svg>
              )}

              {alg.id === 'random-forest' && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl">🌲</span>
                  <span className="text-xl">🌳</span>
                  <span className="text-xl">🌲</span>
                  <span className="text-[10px] font-mono text-amber-400 font-bold ml-1">➔ Vote</span>
                </div>
              )}

              {alg.id === 'support-vector-machine' && (
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <line x1="20" y1="45" x2="80" y2="5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="30" y1="45" x2="90" y2="5" stroke="#D946EF" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="10" y1="45" x2="70" y2="5" stroke="#D946EF" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="28" cy="28" r="3" fill="#F43F5E" />
                  <circle cx="72" cy="22" r="3" fill="#0EA5E9" />
                </svg>
              )}

              {alg.id === 'k-nearest-neighbors' && (
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <circle cx="50" cy="25" r="16" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeDasharray="2 2" />
                  <circle cx="50" cy="25" r="3.5" fill="#8B5CF6" stroke="#FFFFFF" />
                  <circle cx="42" cy="18" r="2.5" fill="#0EA5E9" />
                  <circle cx="58" cy="20" r="2.5" fill="#0EA5E9" />
                  <circle cx="45" cy="32" r="2.5" fill="#F43F5E" />
                </svg>
              )}

              {alg.id === 'k-means-clustering' && (
                <svg viewBox="0 0 100 50" className="w-full h-full">
                  <ellipse cx="28" cy="25" rx="14" ry="12" fill="#F43F5E" fillOpacity="0.15" stroke="#F43F5E" strokeDasharray="2 2" />
                  <ellipse cx="72" cy="25" rx="14" ry="12" fill="#0EA5E9" fillOpacity="0.15" stroke="#0EA5E9" strokeDasharray="2 2" />
                  <circle cx="28" cy="25" r="2" fill="#F43F5E" />
                  <circle cx="72" cy="25" r="2" fill="#0EA5E9" />
                </svg>
              )}
            </div>

            {/* Bottom action */}
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 group-hover:text-cyan-400">
              <span>{isBn ? 'বিস্তারিত দেখুন' : 'Explore Deep-Dive'}</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
