'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, RotateCcw, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

export default function KMeansGalaxyGame() {
  const { language } = useLanguage();
  const { addXP, addCoins, recordScore } = useGame();
  const isBn = language === 'bn';

  const [step, setStep] = useState<number>(1);
  const [hasWon, setHasWon] = useState<boolean>(false);

  // 3 Natural Star Systems
  const stars = [
    // Nebula 1 (Red)
    { id: 1, x: 100, y: 70, group: 1 },
    { id: 2, x: 120, y: 60, group: 1 },
    { id: 3, x: 110, y: 90, group: 1 },
    { id: 4, x: 135, y: 80, group: 1 },
    // Nebula 2 (Blue)
    { id: 5, x: 310, y: 65, group: 2 },
    { id: 6, x: 330, y: 85, group: 2 },
    { id: 7, x: 350, y: 60, group: 2 },
    { id: 8, x: 320, y: 105, group: 2 },
    // Nebula 3 (Green)
    { id: 9, x: 210, y: 175, group: 3 },
    { id: 10, x: 230, y: 160, group: 3 },
    { id: 11, x: 250, y: 185, group: 3 },
    { id: 12, x: 225, y: 205, group: 3 },
  ];

  // Centroid locations at each step
  const centroidPositions = {
    1: [
      { id: 1, x: 180, y: 120, color: '#F43F5E' },
      { id: 2, x: 260, y: 80, color: '#0EA5E9' },
      { id: 3, x: 200, y: 160, color: '#10B981' },
    ],
    2: [
      { id: 1, x: 180, y: 120, color: '#F43F5E' },
      { id: 2, x: 260, y: 80, color: '#0EA5E9' },
      { id: 3, x: 200, y: 160, color: '#10B981' },
    ],
    3: [
      { id: 1, x: 116, y: 75, color: '#F43F5E' },
      { id: 2, x: 327, y: 78, color: '#0EA5E9' },
      { id: 3, x: 228, y: 181, color: '#10B981' },
    ],
  };

  const currentCentroids = centroidPositions[step as 1 | 2 | 3];

  const handleNextAction = () => {
    soundEffects.playCombo();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      soundEffects.playLevelUp();
      setHasWon(true);
      addXP(150, 'K-Means Galaxy Convergence Master');
      addCoins(40);
      recordScore('kmeans_galaxy', 1000);
    } else {
      setStep(1);
      setHasWon(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setHasWon(false);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Header ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-teal-500/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">
              {isBn ? 'মিশন: গ্যালাক্টিক সেন্ট্রয়েড ক্লাস্টারিং' : 'Mission: Galactic Centroid Magnetizer'}
            </div>
            <div className="text-[10px] text-slate-400">
              {isBn
                ? 'সেন্ট্রয়েড দিয়ে নক্ষত্রগুলোকে ৩টি নিখুঁত গ্যালাক্সিতে দলভুক্ত করুন!'
                : 'Partition deep-space stars into 3 orbital clusters with minimum inertia!'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-teal-300">
            Phase: <strong>{step}/3</strong>
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screen */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-2 sm:p-4 overflow-hidden">
        <svg viewBox="0 0 460 240" className="w-full h-auto select-none overflow-visible">
          {/* Gravitational Cluster Envelopes in step 3 */}
          {step === 3 && (
            <g>
              <ellipse cx="116" cy="75" rx="45" ry="35" fill="#F43F5E" fillOpacity="0.1" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 2" />
              <ellipse cx="327" cy="78" rx="45" ry="35" fill="#0EA5E9" fillOpacity="0.1" stroke="#0EA5E9" strokeWidth="1.5" strokeDasharray="3 2" />
              <ellipse cx="228" cy="181" rx="45" ry="35" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 2" />
            </g>
          )}

          {/* Stars */}
          {stars.map((s) => {
            let color = '#94A3B8';
            if (step >= 2) {
              if (s.group === 1) color = '#F43F5E';
              else if (s.group === 2) color = '#0EA5E9';
              else color = '#10B981';
            }
            return (
              <circle
                key={s.id}
                cx={s.x}
                cy={s.y}
                r="5"
                fill={color}
                stroke="#FFFFFF"
                strokeWidth="1.2"
                className="transition-colors duration-300"
              />
            );
          })}

          {/* Centroids ('X' Magnets with Glide) */}
          {currentCentroids.map((c) => (
            <motion.g
              key={c.id}
              animate={{ x: c.x, y: c.y }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            >
              <circle r="12" fill={c.color} fillOpacity="0.25" className="animate-ping" />
              <circle r="9" fill="#0B0F19" stroke={c.color} strokeWidth="2" />
              <path d="M -3.5 -3.5 L 3.5 3.5 M 3.5 -3.5 L -3.5 3.5" stroke={c.color} strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          ))}
        </svg>

        {/* Victory Toast Overlay */}
        <AnimatePresence>
          {hasWon && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-2 z-30"
            >
              <div className="text-3xl">🌌</div>
              <h4 className="text-base font-bold text-white">
                {isBn ? 'কে-মিন্স গ্যালাক্সি ক্লাস্টার সফল!' : 'PERFECT GALACTIC CONVERGENCE!'}
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Centroids locked at minimum WCSS dispersion • +150 XP &amp; 40 Coins!
              </p>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                {isBn ? 'পুনরায় খেলুন' : 'Restart Simulation'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button to advance convergence loop */}
      <button
        onClick={handleNextAction}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500 hover:from-teal-300 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-teal-950/50 hover:scale-[1.01] active:scale-95 transition"
      >
        <span>
          {step === 1
            ? isBn
              ? 'ধাপ ২: সেন্ট্রয়েডের দিকে নক্ষত্র আকর্ষণ করুন'
              : 'STEP 2: PULSE GRAVITY (ASSIGN STARS)'
            : step === 2
            ? isBn
              ? 'ধাপ ৩: কেন্দ্রবিন্দুতে সেন্ট্রয়েড নিয়ে যান'
              : 'STEP 3: SNAP TO MEAN CENTER OF MASS'
            : isBn
            ? 'পুনরায় শুরু করুন'
            : 'RESTART ORBIT'}
        </span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
