'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Shield, Sparkles, Layers, Sliders } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function SvmInteractive() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Toggle mode: Linear vs Kernel Trick
  const [mode, setMode] = useState<'linear' | 'kernel'>('linear');
  const [marginWidth, setMarginWidth] = useState<number>(36);
  const [isKernelApplied, setIsKernelApplied] = useState<boolean>(false);

  // SVG coordinate dimensions
  const width = 460;
  const height = 280;
  const padding = 40;

  // Linear separable data
  const classA_Points = [
    { x: 90, y: 70 },
    { x: 130, y: 55 },
    { x: 100, y: 110 },
    { x: 150, y: 95 },
    { x: 180, y: 80 },
    { x: 160, y: 140, isSupportVector: true }, // SV
    { x: 200, y: 120, isSupportVector: true }, // SV
  ];

  const classB_Points = [
    { x: 260, y: 190, isSupportVector: true }, // SV
    { x: 300, y: 170, isSupportVector: true }, // SV
    { x: 280, y: 230 },
    { x: 330, y: 210 },
    { x: 370, y: 195 },
    { x: 350, y: 245 },
    { x: 400, y: 225 },
  ];

  // Kernel trick points (concentric circle pattern)
  const innerCircle = [
    { x: 230, y: 140 },
    { x: 210, y: 125 },
    { x: 250, y: 125 },
    { x: 220, y: 155 },
    { x: 240, y: 155 },
  ];
  const outerCircle = [
    { x: 140, y: 140 },
    { x: 320, y: 140 },
    { x: 230, y: 60 },
    { x: 230, y: 220 },
    { x: 170, y: 80 },
    { x: 290, y: 80 },
    { x: 170, y: 200 },
    { x: 290, y: 200 },
  ];

  // Hyperplane line formula in linear mode:
  // Center line: passes through (215, 155) with slope ~ 0.75
  const hpSlope = -0.8;
  const hpCenterX = 225;
  const hpCenterY = 150;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 flex items-center justify-center">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {isBn ? 'সাপোর্ট ভেক্টর ও সর্বোচ্চ মার্জিন ল্যাব' : 'SVM Maximum Margin & Kernel Lab'}
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              {isBn
                ? 'হাইপারপ্লেন, সাপোর্ট ভেক্টর (SV) এবং আরডিএফ কার্নেল ট্রিক পর্যবেক্ষণ করুন'
                : 'Visualize the optimal street, support vectors, and non-linear RBF kernel trick'}
            </p>
          </div>
        </div>

        {/* Linear vs Kernel Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setMode('linear')}
            className={`px-3 py-1 rounded-lg transition ${
              mode === 'linear'
                ? 'bg-fuchsia-500 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? '১. রৈখিক (Linear SVM)' : '1. Linear SVM'}
          </button>
          <button
            onClick={() => setMode('kernel')}
            className={`px-3 py-1 rounded-lg transition ${
              mode === 'kernel'
                ? 'bg-fuchsia-500 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isBn ? '২. কার্নেল ট্রিক (Non-Linear)' : '2. Kernel Trick (RBF)'}
          </button>
        </div>
      </div>

      {/* Main Plot Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Animated SVG Plot (Left 7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-slate-800/80 p-2 sm:p-4 flex flex-col items-center relative overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full max-w-[440px] h-auto select-none overflow-visible"
          >
            {/* Grid */}
            {[70, 140, 210].map((y) => (
              <line
                key={`grid-y-${y}`}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#1E293B"
                strokeDasharray="3 3"
              />
            ))}
            {[110, 220, 330].map((x) => (
              <line
                key={`grid-x-${x}`}
                x1={x}
                y1={padding}
                x2={x}
                y2={height - padding}
                stroke="#1E293B"
                strokeDasharray="3 3"
              />
            ))}

            {/* Axes */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - padding + 10}
              y2={height - padding}
              stroke="#64748B"
              strokeWidth="2"
            />
            <line
              x1={padding}
              y1={height - padding}
              x2={padding}
              y2={padding - 10}
              stroke="#64748B"
              strokeWidth="2"
            />

            {/* Axis labels */}
            <text
              x={width / 2}
              y={height - 10}
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
            >
              {isBn ? 'ফিচার ১ (Feature 1)' : 'Feature 1'}
            </text>
            <text
              x={15}
              y={height / 2}
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
              transform={`rotate(-90, 15, ${height / 2})`}
            >
              {isBn ? 'ফিচার ২ (Feature 2)' : 'Feature 2'}
            </text>

            {/* MODE 1: LINEAR SVM */}
            {mode === 'linear' && (
              <g>
                {/* Margin Corridor Shading */}
                <polygon
                  points={`
                    ${hpCenterX - 180 + marginWidth},${hpCenterY - 180 * hpSlope}
                    ${hpCenterX + 180 + marginWidth},${hpCenterY + 180 * hpSlope}
                    ${hpCenterX + 180 - marginWidth},${hpCenterY + 180 * hpSlope}
                    ${hpCenterX - 180 - marginWidth},${hpCenterY - 180 * hpSlope}
                  `}
                  fill="#D946EF"
                  fillOpacity="0.08"
                />

                {/* Left Margin (Dashed) */}
                <line
                  x1={hpCenterX - 180 - marginWidth}
                  y1={hpCenterY - 180 * hpSlope}
                  x2={hpCenterX + 180 - marginWidth}
                  y2={hpCenterY + 180 * hpSlope}
                  stroke="#D946EF"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="transition-all duration-300"
                />

                {/* Right Margin (Dashed) */}
                <line
                  x1={hpCenterX - 180 + marginWidth}
                  y1={hpCenterY - 180 * hpSlope}
                  x2={hpCenterX + 180 + marginWidth}
                  y2={hpCenterY + 180 * hpSlope}
                  stroke="#D946EF"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="transition-all duration-300"
                />

                {/* Main Optimal Hyperplane (Solid Street Divider) */}
                <line
                  x1={hpCenterX - 180}
                  y1={hpCenterY - 180 * hpSlope}
                  x2={hpCenterX + 180}
                  y2={hpCenterY + 180 * hpSlope}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />

                {/* Class A Data Points (Circles) */}
                {classA_Points.map((pt, i) => (
                  <g key={`ca-${i}`}>
                    {pt.isSupportVector && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="11"
                        fill="none"
                        stroke="#F43F5E"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ transformOrigin: `${pt.x}px ${pt.y}px`, animationDuration: '6s' }}
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="6"
                      fill="#F43F5E"
                      stroke="#881337"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}

                {/* Class B Data Points (Triangles) */}
                {classB_Points.map((pt, i) => (
                  <g key={`cb-${i}`}>
                    {pt.isSupportVector && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="12"
                        fill="none"
                        stroke="#0EA5E9"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ transformOrigin: `${pt.x}px ${pt.y}px`, animationDuration: '6s' }}
                      />
                    )}
                    <polygon
                      points={`${pt.x},${pt.y - 7} ${pt.x - 6},${pt.y + 5} ${pt.x + 6},${pt.y + 5}`}
                      fill="#0EA5E9"
                      stroke="#0369A1"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}
              </g>
            )}

            {/* MODE 2: KERNEL TRICK (NON-LINEAR RBF) */}
            {mode === 'kernel' && (
              <g>
                {/* RBF Separating Contour Boundary */}
                {isKernelApplied ? (
                  <motion.circle
                    cx="230"
                    cy="140"
                    r="58"
                    fill="#D946EF"
                    fillOpacity="0.12"
                    stroke="#D946EF"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 15 }}
                  />
                ) : (
                  <text
                    x="230"
                    y="45"
                    fill="#F43F5E"
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {isBn ? '⚠️ সরলরেখা দিয়ে এদের আলাদা করা অসম্ভব!' : '⚠️ Impossible to separate with a straight line!'}
                  </text>
                )}

                {/* Inner Circle Points (Class A Red) */}
                {innerCircle.map((pt, i) => (
                  <circle
                    key={`in-${i}`}
                    cx={pt.x}
                    cy={pt.y}
                    r="6"
                    fill="#F43F5E"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ))}

                {/* Outer Circle Points (Class B Blue Triangles) */}
                {outerCircle.map((pt, i) => (
                  <polygon
                    key={`out-${i}`}
                    points={`${pt.x},${pt.y - 7} ${pt.x - 6},${pt.y + 5} ${pt.x + 6},${pt.y + 5}`}
                    fill="#0EA5E9"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            )}
          </svg>

          {/* Plot Legends */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-2">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              {isBn ? 'ক্লাস A (Class A)' : 'Class A'}
            </span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-sky-400" />
              {isBn ? 'ক্লাস B (Class B)' : 'Class B'}
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <span className="w-4 h-0.5 bg-white rounded" />
              {isBn ? 'হাইপারপ্লেন (Hyperplane)' : 'Hyperplane'}
            </span>
            <span className="flex items-center gap-1.5 text-fuchsia-400">
              <span className="w-2.5 h-2.5 rounded-full border border-dashed border-fuchsia-400" />
              {isBn ? 'সাপোর্ট ভেক্টর (SV)' : 'Support Vectors'}
            </span>
          </div>
        </div>

        {/* Controls & SVM Mechanics (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {mode === 'linear' ? (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-fuchsia-400" />
                  {isBn ? 'মার্জিনের প্রশস্ততা (Margin):' : 'Margin Width:'}
                </span>
                <span className="font-mono text-fuchsia-400 font-bold">{marginWidth} px</span>
              </div>
              <input
                type="range"
                min="20"
                max="55"
                step="2"
                value={marginWidth}
                onChange={(e) => setMarginWidth(parseInt(e.target.value))}
                className="w-full accent-fuchsia-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />

              <div className="p-3 rounded-lg bg-fuchsia-950/20 border border-fuchsia-500/20 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-fuchsia-300">
                  {isBn ? 'সাপোর্ট ভেক্টরের জাদু:' : 'Support Vector Principle:'}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {isBn
                    ? 'লক্ষ্য করুন: যেসব পয়েন্ট বৃত্তাকার ড্যাশ দিয়ে ঘেরা কেবল তারাই সাপোর্ট ভেক্টর। বাকি দূরবর্তী কোনো পয়েন্ট সরিয়ে ফেললেও হাইপারপ্লেনের কোনো পরিবর্তন হবে না!'
                    : 'Only the points with dashed halos directly anchor the boundary. Moving distant points has ZERO impact on the model!'}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-fuchsia-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <span>{isBn ? 'RBF কার্নেল ট্রিক রূপান্তর' : 'RBF Kernel Trick Transformation'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {isBn
                  ? 'যখন ডেটা বৃত্তাকারে থাকে, তখন ২D স্পেসে সোজা দাগ টানা অসম্ভব। কার্নেল ট্রিক ডেটাকে ৩য় মাত্রায় (Z-অক্ষে) তুলে দেয়, ফলে উপর থেকে একটি সমতল কেটে আলাদা করা যায়।'
                  : 'Projects 2D circular data into higher 3D space where a flat slicing plane cleanly separates the concentric rings.'}
              </p>
              <button
                type="button"
                onClick={() => setIsKernelApplied(!isKernelApplied)}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  isKernelApplied
                    ? 'bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-950/50'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>
                  {isKernelApplied
                    ? isBn
                      ? '✓ আরডিএফ কার্নেল বাউন্ডারি সক্রিয়'
                      : '✓ RBF Kernel Boundary Active'
                    : isBn
                    ? 'কার্নেল ট্রিক প্রয়োগ করুন'
                    : 'Apply Kernel Trick'}
                </span>
              </button>
            </div>
          )}

          {/* Quick Formula Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono space-y-1">
            <span className="text-slate-400">
              {isBn ? 'হাইপারপ্লেন সমীকরণ:' : 'Hyperplane Equation:'}
            </span>
            <div className="text-fuchsia-400 font-bold text-sm">w · x + b = 0</div>
            <div className="text-[10px] text-slate-500">
              Margin = 2 / ||w|| (Maximizes safety clearance)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
