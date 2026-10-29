'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, ArrowRight, CheckCircle2, Users, Sliders } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function KMeansInteractive() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Step state:
  // 1: Random Centroid Init
  // 2: Assign Points to Nearest
  // 3: Update Centroid to Mean
  // 4: Converged Final Clusters
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [activeClusterInfo, setActiveClusterInfo] = useState<number | null>(null);

  // SVG coordinate dimensions
  const width = 460;
  const height = 280;
  const padding = 35;

  // 3 Natural Clusters of Data Points
  // Group 1: Low Income, High Spending (Red)
  const group1_points = [
    { id: 1, x: 100, y: 80 },
    { id: 2, x: 120, y: 70 },
    { id: 3, x: 110, y: 100 },
    { id: 4, x: 140, y: 85 },
    { id: 5, x: 130, y: 115 },
    { id: 6, x: 160, y: 95 },
  ];

  // Group 2: High Income, High Spending (Blue)
  const group2_points = [
    { id: 7, x: 300, y: 70 },
    { id: 8, x: 320, y: 85 },
    { id: 9, x: 340, y: 65 },
    { id: 10, x: 310, y: 110 },
    { id: 11, x: 350, y: 95 },
    { id: 12, x: 330, y: 125 },
  ];

  // Group 3: Medium/High Income, Low Spending (Green)
  const group3_points = [
    { id: 13, x: 210, y: 190 },
    { id: 14, x: 230, y: 175 },
    { id: 15, x: 250, y: 200 },
    { id: 16, x: 220, y: 220 },
    { id: 17, x: 270, y: 185 },
    { id: 18, x: 260, y: 215 },
  ];

  const allPoints = [...group1_points, ...group2_points, ...group3_points];

  // Centroid Positions across 4 Steps:
  // In Step 1: Centroids are randomly scattered
  // In Step 2: Points colored by nearest centroid
  // In Step 3: Centroids glide toward the mean center of mass
  // In Step 4: Final converged clusters with boundary rings
  const centroidsByStep = {
    1: [
      { id: 1, x: 170, y: 130, color: '#F43F5E', label: 'C1' },
      { id: 2, x: 260, y: 90, color: '#0EA5E9', label: 'C2' },
      { id: 3, x: 190, y: 170, color: '#10B981', label: 'C3' },
    ],
    2: [
      { id: 1, x: 170, y: 130, color: '#F43F5E', label: 'C1' },
      { id: 2, x: 260, y: 90, color: '#0EA5E9', label: 'C2' },
      { id: 3, x: 190, y: 170, color: '#10B981', label: 'C3' },
    ],
    3: [
      { id: 1, x: 135, y: 95, color: '#F43F5E', label: 'C1' },
      { id: 2, x: 320, y: 88, color: '#0EA5E9', label: 'C2' },
      { id: 3, x: 235, y: 195, color: '#10B981', label: 'C3' },
    ],
    4: [
      { id: 1, x: 132, y: 92, color: '#F43F5E', label: 'C1' },
      { id: 2, x: 325, y: 92, color: '#0EA5E9', label: 'C2' },
      { id: 3, x: 240, y: 198, color: '#10B981', label: 'C3' },
    ],
  };

  const currentCentroids = centroidsByStep[currentStep as 1 | 2 | 3 | 4];

  // Determine point color depending on currentStep
  const getPointColor = (ptId: number) => {
    if (currentStep === 1) return '#94A3B8'; // gray unassigned
    if (ptId <= 6) return '#F43F5E'; // Red group
    if (ptId <= 12) return '#0EA5E9'; // Blue group
    return '#10B981'; // Green group
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < 4 ? prev + 1 : 1));
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {isBn ? 'কে-মিন্স ক্লাস্টারিং ও সেন্ট্রয়েড ল্যাব' : 'K-Means Iterative Centroid Convergence Lab'}
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              {isBn
                ? '৪-ধাপের ইন্টারেক্টিভ সিমুলেশন: সেন্ট্রয়েড চলন ও কাস্টমার সেগমেন্টেশন'
                : 'Interactive 4-step convergence loop: Centroids find natural customer clusters'}
            </p>
          </div>
        </div>

        {/* Action Step Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNextStep}
            className="px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-teal-950/40 transition"
          >
            <span>
              {currentStep < 4
                ? isBn
                  ? `পরবর্তী ধাপ (${currentStep + 1}/৪)`
                  : `Next Step (${currentStep + 1}/4)`
                : isBn
                ? 'পুনরায় শুরু (Reset)'
                : 'Restart Loop'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Indicator Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {[
          { step: 1, title: isBn ? 'ধাপ ১: সেন্ট্রয়েড শুরু' : 'Step 1: Init Centroids', desc: isBn ? 'র‍্যান্ডম ৩টি কেন্দ্র বসানো' : 'Place 3 random seeds' },
          { step: 2, title: isBn ? 'ধাপ ২: ক্লাস্টার নিয়োগ' : 'Step 2: Assign Points', desc: isBn ? 'কাছের সেন্ট্রয়েডে যুক্ত' : 'Assign to nearest center' },
          { step: 3, title: isBn ? 'ধাপ ৩: কেন্দ্র আপডেট' : 'Step 3: Update Means', desc: isBn ? 'গড় কেন্দ্রে রূপান্তর' : 'Centroids glide to mean' },
          { step: 4, title: isBn ? 'ধাপ ৪: চূড়ান্ত রূপান্তর' : 'Step 4: Convergence', desc: isBn ? 'স্থির নিখুঁত ক্লাস্টার' : 'Clusters locked & stable' },
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step)}
            className={`p-2 rounded-xl border text-left transition ${
              currentStep === s.step
                ? 'bg-teal-500/20 border-teal-500/60 ring-1 ring-teal-500/40'
                : 'bg-slate-950/40 border-slate-800/80 opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`font-bold ${currentStep === s.step ? 'text-teal-300' : 'text-slate-300'}`}>
              {s.title}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">{s.desc}</div>
          </button>
        ))}
      </div>

      {/* Main Grid: Plot + Customer Segmentation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Animated SVG Plot (Left 7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-slate-800/80 p-2 sm:p-4 flex flex-col items-center relative overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full max-w-[440px] h-auto select-none overflow-visible"
          >
            {/* Grid Lines */}
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
            {[115, 230, 345].map((x) => (
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

            {/* In Step 4: Render Cluster Boundary Envelopes */}
            {currentStep === 4 && (
              <g>
                <ellipse
                  cx="132"
                  cy="92"
                  rx="48"
                  ry="38"
                  fill="#F43F5E"
                  fillOpacity="0.08"
                  stroke="#F43F5E"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <ellipse
                  cx="325"
                  cy="92"
                  rx="46"
                  ry="40"
                  fill="#0EA5E9"
                  fillOpacity="0.08"
                  stroke="#0EA5E9"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <ellipse
                  cx="240"
                  cy="198"
                  rx="50"
                  ry="38"
                  fill="#10B981"
                  fillOpacity="0.08"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              </g>
            )}

            {/* In Step 2 & 3: Connection lines from points to assigned centroids */}
            {(currentStep === 2 || currentStep === 3) &&
              allPoints.map((pt) => {
                let targetCentroid = currentCentroids[0];
                if (pt.id > 6 && pt.id <= 12) targetCentroid = currentCentroids[1];
                if (pt.id > 12) targetCentroid = currentCentroids[2];
                return (
                  <line
                    key={`conn-${pt.id}`}
                    x1={pt.x}
                    y1={pt.y}
                    x2={targetCentroid.x}
                    y2={targetCentroid.y}
                    stroke={targetCentroid.color}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    strokeOpacity="0.4"
                  />
                );
              })}

            {/* Data Points */}
            {allPoints.map((pt) => {
              const pColor = getPointColor(pt.id);
              return (
                <motion.circle
                  key={`pt-${pt.id}`}
                  cx={pt.x}
                  cy={pt.y}
                  r="5.5"
                  fill={pColor}
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  initial={false}
                  animate={{ fill: pColor }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

            {/* The 3 Centroids ('X' Marks with Glide Animation) */}
            {currentCentroids.map((c) => (
              <motion.g
                key={`c-${c.id}`}
                initial={false}
                animate={{ x: c.x, y: c.y }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              >
                {/* Pulsing ring around centroid */}
                <circle r="14" fill={c.color} fillOpacity="0.2" className="animate-ping" />
                <circle r="10" fill="#0F172A" stroke={c.color} strokeWidth="2.5" />
                {/* 'X' icon inside centroid */}
                <path
                  d="M -4 -4 L 4 4 M 4 -4 L -4 4"
                  stroke={c.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </motion.g>
            ))}

            {/* Axis Titles */}
            <text
              x={width / 2}
              y={height - 8}
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
            >
              {isBn ? 'বার্ষিক আয় (Annual Income in $1000)' : 'Annual Income (in $1,000)'}
            </text>
            <text
              x={14}
              y={height / 2}
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
              transform={`rotate(-90, 14, ${height / 2})`}
            >
              {isBn ? 'খরচের স্কোর (Spending Score 1-100)' : 'Spending Score (1-100)'}
            </text>
          </svg>

          {/* Plot Legends */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-2">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              {isBn ? 'ক্লাস্টার ১ (বাজেট ক্রেতা)' : 'Cluster 1: Budget Shoppers'}
            </span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              {isBn ? 'ক্লাস্টার ২ (প্রিমিয়াম ভিআইপি)' : 'Cluster 2: Premium VIPs'}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              {isBn ? 'ক্লাস্টার ৩ (মিতব্যয়ী সঞ্চয়ী)' : 'Cluster 3: Savers'}
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <span className="w-3 h-3 rounded-full border border-white flex items-center justify-center text-[8px] font-bold">
                ✕
              </span>
              {isBn ? 'সেন্ট্রয়েড (Centroid Mean)' : 'Centroid Mean'}
            </span>
          </div>
        </div>

        {/* Business Segmentation Insights (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-teal-300 flex items-center justify-between">
            <span>{isBn ? 'মার্কেট সেগমেন্টেশন বিজনেস প্রোফাইল:' : 'Discovered Customer Segments:'}</span>
            <span className="font-mono text-slate-400">K = 3 Clusters</span>
          </div>

          {/* Segment 1 */}
          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-rose-300">
              <span>{isBn ? 'ক্লাস্টার ১: মূল্য-সচেতন সক্রিয় ক্রেতা' : 'Cluster 1: Price-Sensitive Shoppers'}</span>
              <span className="text-[10px] font-mono text-rose-400">Low Inc • High Spend</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isBn
                ? 'কৌশল: ডিসকাউন্ট কুপন, ফ্ল্যাশ সেল এবং কিস্তির সুযোগ দিয়ে এদের সেলস বাড়ানো হয়।'
                : 'Strategy: High purchase enthusiasm. Target with seasonal discounts, promo codes, and flash bundles.'}
            </p>
          </div>

          {/* Segment 2 */}
          <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/30 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-sky-300">
              <span>{isBn ? 'ক্লাস্টার ২: প্রিমিয়াম গোল্ড গ্রাহক' : 'Cluster 2: Premium VIP Shoppers'}</span>
              <span className="text-[10px] font-mono text-sky-400">High Inc • High Spend</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isBn
                ? 'কৌশল: এক্সক্লুসিভ লাক্সারি প্রিভিউ, কনসিয়ার্জ সেবা এবং প্রাইভেট অফার।'
                : 'Strategy: High purchasing power. Target with VIP launches, personalized luxury concierge, and exclusive previews.'}
            </p>
          </div>

          {/* Segment 3 */}
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
              <span>{isBn ? 'ক্লাস্টার ৩: সতর্ক সঞ্চয়ী গ্রাহক' : 'Cluster 3: Cautious Savers'}</span>
              <span className="text-[10px] font-mono text-emerald-400">Med Inc • Low Spend</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {isBn
                ? 'কৌশল: এদের সাথে রি-এনগেজমেন্ট ক্যাম্পেইন এবং দীর্ঘমেয়াদি মূল্যের পণ্য প্রস্তাব করা।'
                : 'Strategy: Rarely spends on impulse. Target with essential household bundles and high-utility reliability campaigns.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
