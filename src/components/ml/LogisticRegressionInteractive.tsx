'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Sliders, Mail, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LogisticRegressionInteractive() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // State
  const [threshold, setThreshold] = useState<number>(0.5);
  const [numLinks, setNumLinks] = useState<number>(2);
  const [hasFreeWord, setHasFreeWord] = useState<boolean>(true);

  // Logistic function
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

  // Linear combination: z = w0 + w1 * links + w2 * freeWord
  // Base bias: -2.2, link weight: 1.1, "free" weight: 2.5
  const zScore = -2.2 + 1.1 * numLinks + (hasFreeWord ? 2.5 : 0);
  const probability = sigmoid(zScore);
  const isSpam = probability >= threshold;

  // SVG plot settings
  const svgWidth = 460;
  const svgHeight = 260;
  const paddingX = 45;
  const paddingY = 30;

  // X range for z from -6 to +6
  const minZ = -6;
  const maxZ = 6;

  const scaleZ = (z: number) =>
    paddingX + ((z - minZ) / (maxZ - minZ)) * (svgWidth - 2 * paddingX);
  const scaleProb = (p: number) =>
    svgHeight - paddingY - p * (svgHeight - 2 * paddingY);

  // Generate Sigmoid curve SVG path
  const curvePoints: string[] = [];
  for (let z = minZ; z <= maxZ; z += 0.2) {
    const p = sigmoid(z);
    curvePoints.push(`${scaleZ(z)},${scaleProb(p)}`);
  }
  const sigmoidPathD = `M ${curvePoints.join(' L ')}`;

  // Simulated points along the curve
  const samplePoints = [
    { z: -4.5, label: 'Legit', classId: 0 },
    { z: -3.0, label: 'Legit', classId: 0 },
    { z: -1.5, label: 'Borderline', classId: 0 },
    { z: 0.8, label: 'Promo', classId: 1 },
    { z: 2.8, label: 'Spam', classId: 1 },
    { z: 4.5, label: 'Spam', classId: 1 },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {isBn ? 'সিগময়েড ও লজিস্টিক প্রোবাবিলিটি সিমুলেটর' : 'Interactive Sigmoid & Probability Lab'}
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              {isBn
                ? 'সিগময়েড কার্ভ σ(z) এবং ডিসিশন থ্রেশহোল্ড (০.৫) পরিবর্তন করে দেখুন'
                : 'Interactive S-curve σ(z) mapping features into 0 to 1 probability'}
            </p>
          </div>
        </div>

        {/* Live Threshold Indicator */}
        <div className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
          {isBn ? 'কাট-অফ থ্রেশহোল্ড:' : 'Threshold:'}{' '}
          <span className="font-bold text-sky-400">{threshold.toFixed(2)}</span>
        </div>
      </div>

      {/* Main Grid: Sigmoid Plot + Live Email Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Animated Sigmoid Curve (Left 7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-slate-800/80 p-2 sm:p-4 flex flex-col items-center relative overflow-hidden">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[440px] h-auto select-none overflow-visible"
          >
            {/* Horizontal Grid lines at 0.0, 0.5, 1.0 */}
            {[0, 0.5, 1].map((p) => (
              <g key={`prob-grid-${p}`}>
                <line
                  x1={paddingX}
                  y1={scaleProb(p)}
                  x2={svgWidth - paddingX}
                  y2={scaleProb(p)}
                  stroke={p === 0.5 ? '#334155' : '#1E293B'}
                  strokeDasharray={p === 0.5 ? '4 4' : '2 2'}
                />
                <text
                  x={paddingX - 8}
                  y={scaleProb(p) + 4}
                  fill="#94A3B8"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {p.toFixed(1)}
                </text>
              </g>
            ))}

            {/* Threshold Line (Dynamic) */}
            <line
              x1={paddingX}
              y1={scaleProb(threshold)}
              x2={svgWidth - paddingX}
              y2={scaleProb(threshold)}
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text
              x={svgWidth - paddingX - 4}
              y={scaleProb(threshold) - 5}
              fill="#38BDF8"
              fontSize="10"
              textAnchor="end"
              fontFamily="monospace"
            >
              {isBn ? `কাট-অফ (${threshold.toFixed(2)})` : `Cutoff (${threshold.toFixed(2)})`}
            </text>

            {/* Axes */}
            <line
              x1={paddingX}
              y1={scaleProb(0)}
              x2={svgWidth - paddingX + 10}
              y2={scaleProb(0)}
              stroke="#64748B"
              strokeWidth="2"
            />
            <line
              x1={scaleZ(0)}
              y1={scaleProb(0)}
              x2={scaleZ(0)}
              y2={scaleProb(1) - 10}
              stroke="#64748B"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Sigmoid Curve */}
            <path
              d={sigmoidPathD}
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Static Training Sample Dots */}
            {samplePoints.map((pt, i) => {
              const p = sigmoid(pt.z);
              const isPtSpam = p >= threshold;
              return (
                <circle
                  key={`sp-${i}`}
                  cx={scaleZ(pt.z)}
                  cy={scaleProb(p)}
                  r="4.5"
                  fill={isPtSpam ? '#F43F5E' : '#10B981'}
                  stroke="#0F172A"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Real-Time Live Query Dot on Curve */}
            <motion.g
              animate={{
                x: scaleZ(Math.max(-5.8, Math.min(5.8, zScore))),
                y: scaleProb(probability),
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            >
              <circle
                r="10"
                fill={isSpam ? '#F43F5E' : '#10B981'}
                fillOpacity="0.3"
                className="animate-ping"
              />
              <circle
                r="6.5"
                fill={isSpam ? '#F43F5E' : '#10B981'}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </motion.g>

            {/* Axis Titles */}
            <text
              x={svgWidth / 2}
              y={svgHeight - 6}
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
            >
              {isBn ? 'ইনপুট স্কোর z = w·x + b' : 'Linear Feature Score z = w·X + b'}
            </text>
          </svg>

          {/* Plot Legends */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              {isBn ? 'ক্লাস ০: নিরাপদ (Prob < Cutoff)' : 'Class 0: Legit Email'}
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              {isBn ? 'ক্লাস ১: স্প্যাম (Prob ≥ Cutoff)' : 'Class 1: Spam Email'}
            </span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-4 h-0.5 border-b border-dashed border-sky-400" />
              {isBn ? 'কাট-অফ থ্রেশহোল্ড' : 'Decision Cutoff'}
            </span>
          </div>
        </div>

        {/* Live Email Spam Simulator (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Threshold slider */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-sky-400" />
                {isBn ? 'ডিসিশন থ্রেশহোল্ড কাট-অফ:' : 'Decision Threshold:'}
              </span>
              <span className="font-mono text-sky-400 font-bold">{threshold.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-full accent-sky-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Test an Email Box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-sky-950/20 to-slate-950 border border-sky-500/20 space-y-3.5">
            <div className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>{isBn ? 'ইমেইল স্প্যাম ডিটেক্টর সিমুলেশন' : 'Live Email Spam Detector'}</span>
            </div>

            {/* Feature 1: Number of links */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isBn ? 'বাহ্যিক লিংকের সংখ্যা:' : 'Number of Links:'}</span>
                <span className="font-mono font-bold text-white">{numLinks}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={numLinks}
                onChange={(e) => setNumLinks(parseInt(e.target.value))}
                className="w-full accent-sky-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Feature 2: Contains "Free" */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-300">
                {isBn ? 'মেসেজে "Free" বা অফার শব্দ আছে?' : 'Contains keyword "Free"?'}
              </span>
              <button
                type="button"
                onClick={() => setHasFreeWord(!hasFreeWord)}
                className={`px-3 py-1 rounded text-xs font-bold transition ${
                  hasFreeWord
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {hasFreeWord ? (isBn ? 'হ্যাঁ (Yes)' : 'Yes') : (isBn ? 'না (No)' : 'No')}
              </button>
            </div>

            {/* Probability Output Meter */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">
                  {isBn ? 'স্প্যাম হওয়ার সিগময়েড সম্ভাবনা:' : 'Spam Probability σ(z):'}
                </span>
                <span className="font-mono text-sm font-bold text-sky-300">
                  {(probability * 100).toFixed(1)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                <motion.div
                  className={`h-full ${
                    isSpam
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  }`}
                  initial={false}
                  animate={{ width: `${Math.round(probability * 100)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Final Classification Verdict Badge */}
              <div
                className={`mt-2 p-2 rounded-md border flex items-center justify-center gap-2 text-xs font-bold ${
                  isSpam
                    ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                    : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                }`}
              >
                {isSpam ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>{isBn ? 'চিহ্নিত: এটি একটি SPAM ইমেইল!' : 'FLAGGED: SPAM DETECTED!'}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{isBn ? 'নিরাপদ: সাধারণ বৈধ ইনবক্স ইমেইল' : 'SAFE: LEGITIMATE INBOX EMAIL'}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
