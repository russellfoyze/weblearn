'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, HelpCircle, Film, Sliders, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function KnnInteractive() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // State
  const [kValue, setKValue] = useState<number>(3);
  const [queryPt, setQueryPt] = useState<{ x: number; y: number }>({ x: 230, y: 140 });

  // Dataset: Red (Class A / Drama) vs Blue (Class B / Action)
  const trainingData = [
    { id: 1, x: 120, y: 70, classType: 'red', label: 'Drama 1' },
    { id: 2, x: 140, y: 110, classType: 'red', label: 'Drama 2' },
    { id: 3, x: 170, y: 80, classType: 'red', label: 'Drama 3' },
    { id: 4, x: 160, y: 150, classType: 'red', label: 'Drama 4' },
    { id: 5, x: 190, y: 120, classType: 'red', label: 'Drama 5' },
    { id: 6, x: 210, y: 180, classType: 'red', label: 'Drama 6' },

    { id: 7, x: 250, y: 110, classType: 'blue', label: 'Action 1' },
    { id: 8, x: 280, y: 80, classType: 'blue', label: 'Action 2' },
    { id: 9, x: 290, y: 140, classType: 'blue', label: 'Action 3' },
    { id: 10, x: 320, y: 110, classType: 'blue', label: 'Action 4' },
    { id: 11, x: 310, y: 170, classType: 'blue', label: 'Action 5' },
    { id: 12, x: 340, y: 150, classType: 'blue', label: 'Action 6' },
  ];

  // SVG plot settings
  const width = 460;
  const height = 280;
  const padding = 35;

  // Compute Euclidean distances from queryPt
  const distances = trainingData.map((pt) => {
    const dist = Math.sqrt(Math.pow(pt.x - queryPt.x, 2) + Math.pow(pt.y - queryPt.y, 2));
    return { ...pt, distance: dist };
  });

  // Sort and pick K nearest
  distances.sort((a, b) => a.distance - b.distance);
  const kNearest = distances.slice(0, kValue);

  // Radius for animated radar circle is the distance to the K-th neighbor
  const currentRadius = kNearest.length > 0 ? kNearest[kNearest.length - 1].distance : 40;

  // Tally votes
  const redVotes = kNearest.filter((pt) => pt.classType === 'red').length;
  const blueVotes = kNearest.filter((pt) => pt.classType === 'blue').length;
  const predictedClass = blueVotes > redVotes ? 'blue' : 'red';

  // Handle clicking on SVG to move query point
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * width;
    const clickY = ((e.clientY - rect.top) / rect.height) * height;

    // Keep within bounds
    const boundedX = Math.max(padding + 10, Math.min(width - padding - 10, clickX));
    const boundedY = Math.max(padding + 10, Math.min(height - padding - 10, clickY));

    setQueryPt({ x: Math.round(boundedX), y: Math.round(boundedY) });
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {isBn ? 'কে-নিকটতম প্রতিবেশী (KNN) সিমুলেটর' : 'Interactive KNN Nearest Proximity Lab'}
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              {isBn
                ? 'গ্রাফে ক্লিক করে নতুন পয়েন্ট বসান এবং দেখুন K প্রতিবেশীদের ভোট'
                : 'Click anywhere to place a test point and watch K neighbors vote'}
            </p>
          </div>
        </div>

        {/* K Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 px-2">K =</span>
          {[1, 3, 5, 7].map((k) => (
            <button
              key={k}
              onClick={() => setKValue(k)}
              className={`w-7 h-7 rounded-lg font-bold transition ${
                kValue === k
                  ? 'bg-violet-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Plot + Vote Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Animated SVG Plot (Left 7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-slate-800/80 p-2 sm:p-4 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
            {isBn ? '💡 গ্রাফের যেকোনো স্থানে ক্লিক করুন' : '💡 Click anywhere to reposition "?"'}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            onClick={handleSvgClick}
            className="w-full max-w-[440px] h-auto select-none overflow-visible cursor-crosshair"
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

            {/* Expanding KNN Neighborhood Radar Circle */}
            <motion.circle
              cx={queryPt.x}
              cy={queryPt.y}
              r={currentRadius + 4}
              fill="#8B5CF6"
              fillOpacity="0.1"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeDasharray="5 3"
              initial={false}
              animate={{ cx: queryPt.x, cy: queryPt.y, r: currentRadius + 4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />

            {/* Connector Lines to K Nearest Neighbors */}
            {kNearest.map((neighbor) => (
              <line
                key={`line-${neighbor.id}`}
                x1={queryPt.x}
                y1={queryPt.y}
                x2={neighbor.x}
                y2={neighbor.y}
                stroke={neighbor.classType === 'blue' ? '#38BDF8' : '#F43F5E'}
                strokeWidth="1.8"
                strokeDasharray="3 2"
                className="transition-all duration-200"
              />
            ))}

            {/* Training Points */}
            {trainingData.map((pt) => {
              const isSelected = kNearest.some((k) => k.id === pt.id);
              const isBlue = pt.classType === 'blue';
              return (
                <g key={`point-${pt.id}`}>
                  {isSelected && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="10"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="animate-ping"
                    />
                  )}
                  {isBlue ? (
                    <polygon
                      points={`${pt.x},${pt.y - 7} ${pt.x - 6},${pt.y + 5} ${pt.x + 6},${pt.y + 5}`}
                      fill="#0EA5E9"
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? '2.5' : '1'}
                    />
                  ) : (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="6"
                      fill="#F43F5E"
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? '2.5' : '1'}
                    />
                  )}
                </g>
              );
            })}

            {/* The Query Point '?' */}
            <motion.g
              animate={{ x: queryPt.x, y: queryPt.y }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <circle
                r="11"
                fill={predictedClass === 'blue' ? '#0EA5E9' : '#F43F5E'}
                stroke="#FFFFFF"
                strokeWidth="2.5"
                className="shadow-xl"
              />
              <text
                x="0"
                y="4.5"
                fill="#FFFFFF"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                ?
              </text>
            </motion.g>

            {/* Labels */}
            <text
              x={width / 2}
              y={height - 8}
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
            >
              {isBn ? 'ফিচার ১ (যেমন: কমেডি রেটিং)' : 'Feature 1 (e.g. Comedy Preference)'}
            </text>
            <text
              x={14}
              y={height / 2}
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
              transform={`rotate(-90, 14, ${height / 2})`}
            >
              {isBn ? 'ফিচার ২ (যেমন: ড্রামা রেটিং)' : 'Feature 2 (e.g. Drama Preference)'}
            </text>
          </svg>

          {/* Plot Legends */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-2">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              {isBn ? 'ক্লাস A (Drama)' : 'Class A (Drama)'}
            </span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-sky-400" />
              {isBn ? 'ক্লাস B (Action)' : 'Class B (Action)'}
            </span>
            <span className="flex items-center gap-1.5 text-violet-400">
              <span className="w-3.5 h-3.5 rounded-full border border-dashed border-violet-400 flex items-center justify-center text-[8px] font-bold">
                ?
              </span>
              {isBn ? 'পরীক্ষামূলক কোয়েরি পয়েন্ট' : 'Query Test Point'}
            </span>
          </div>
        </div>

        {/* Voting & Proximity Breakdown (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tally Card */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-violet-300 flex items-center justify-between">
              <span>{isBn ? `${kValue}-জন প্রতিবেশীর ভোট:` : `Votes from ${kValue} Nearest Neighbors:`}</span>
              <span className="font-mono text-slate-400">K = {kValue}</span>
            </div>

            {/* Vote Count Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div
                className={`p-2.5 rounded-lg border text-center ${
                  blueVotes > redVotes
                    ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div>Class B (Action)</div>
                <div className="text-lg font-extrabold text-sky-400">{blueVotes}</div>
              </div>

              <div
                className={`p-2.5 rounded-lg border text-center ${
                  redVotes > blueVotes
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div>Class A (Drama)</div>
                <div className="text-lg font-extrabold text-rose-400">{redVotes}</div>
              </div>
            </div>

            {/* Prediction Ribbon */}
            <div
              className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
                predictedClass === 'blue'
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {predictedClass === 'blue'
                    ? isBn
                      ? 'ভোটের রায়: Class B (Action)'
                      : 'Prediction: Class B (Action)'
                    : isBn
                    ? 'ভোটের রায়: Class A (Drama)'
                    : 'Prediction: Class A (Drama)'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {isBn ? 'গরিষ্ঠমত বিজয়ী' : 'Majority Wins'}
              </span>
            </div>
          </div>

          {/* Proximity Table of K Nearest */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-slate-400">
              {isBn ? 'নিকটবর্তী দূরত্বের তালিকা (ইউক্লিডীয় দূরত্ব):' : 'Nearest Neighbors Distance Ranking:'}
            </span>
            <div className="space-y-1 text-xs font-mono">
              {kNearest.map((neighbor, idx) => (
                <div
                  key={neighbor.id}
                  className="flex items-center justify-between px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800/80"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-slate-500">#{idx + 1}</span>
                    <span className={neighbor.classType === 'blue' ? 'text-sky-400' : 'text-rose-400'}>
                      {neighbor.label}
                    </span>
                  </span>
                  <span className="text-slate-400">{neighbor.distance.toFixed(1)} px</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
