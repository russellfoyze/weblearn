'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Sparkles, TrendingUp, Sliders } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LinearRegressionInteractive() {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // State for interactive slope and intercept
  const [slope, setSlope] = useState<number>(0.05); // optimal ~0.049
  const [intercept, setIntercept] = useState<number>(0.5); // optimal ~0.2
  const [showResiduals, setShowResiduals] = useState<boolean>(true);
  const [houseSize, setHouseSize] = useState<number>(1300);

  // Sample data points: [x in sq ft (scaled 600-2000), y in Lakhs (20-100)]
  const dataPoints = [
    { x: 800, y: 40 },
    { x: 1000, y: 50 },
    { x: 1100, y: 52 },
    { x: 1200, y: 60 },
    { x: 1400, y: 68 },
    { x: 1500, y: 75 },
    { x: 1650, y: 80 },
    { x: 1800, y: 90 },
  ];

  // SVG dimensions
  const svgWidth = 460;
  const svgHeight = 280;
  const padding = 45;

  const minX = 600;
  const maxX = 2000;
  const minY = 20;
  const maxY = 100;

  // Coordinate transforms
  const scaleX = (x: number) =>
    padding + ((x - minX) / (maxX - minX)) * (svgWidth - 2 * padding);
  const scaleY = (y: number) =>
    svgHeight - padding - ((y - minY) / (maxY - minY)) * (svgHeight - 2 * padding);

  // Line points
  const lineY1 = slope * (minX - 600) + intercept * 20 + 20;
  const lineY2 = slope * (maxX - 600) + intercept * 20 + 20;

  const pt1 = { x: scaleX(minX), y: scaleY(lineY1) };
  const pt2 = { x: scaleX(maxX), y: scaleY(lineY2) };

  // Calculate Mean Squared Error (MSE)
  const calculateMSE = () => {
    let sum = 0;
    dataPoints.forEach((pt) => {
      const predY = slope * (pt.x - 600) + intercept * 20 + 20;
      sum += Math.pow(pt.y - predY, 2);
    });
    return (sum / dataPoints.length).toFixed(1);
  };

  // Auto-fit to optimal line
  const handleAutoFit = () => {
    setSlope(0.0485);
    setIntercept(0.1);
  };

  const handleReset = () => {
    setSlope(0.02);
    setIntercept(1.5);
  };

  // Predicted house price for the interactive slider
  const predictedHousePrice = (
    slope * (houseSize - 600) +
    intercept * 20 +
    20
  ).toFixed(1);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              {isBn ? 'অ্যানিমেটেড রিগ্রেশন সিমুলেটর' : 'Interactive Animated Regression Lab'}
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              {isBn
                ? 'y = mx + b সমীকরণে ঢাল ও ইন্টারসেপ্ট পরিবর্তন করে দেখুন'
                : 'Adjust slope (m) and intercept (b) to minimize error (residuals)'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoFit}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>{isBn ? 'অটো-ফিট সেরা রেখা' : 'Auto-Fit Best Line'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            title="Reset Line"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Plot + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Animated SVG Plot (Left 7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-xl border border-slate-800/80 p-2 sm:p-4 flex flex-col items-center relative overflow-hidden">
          {/* Status pill overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-2 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              MSE Error: <strong className="text-rose-400">{calculateMSE()}</strong>
            </span>
          </div>

          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[440px] h-auto select-none overflow-visible"
          >
            {/* Grid Lines */}
            {[30, 50, 70, 90].map((val) => (
              <line
                key={`grid-y-${val}`}
                x1={padding}
                y1={scaleY(val)}
                x2={svgWidth - padding}
                y2={scaleY(val)}
                stroke="#1E293B"
                strokeDasharray="3 3"
              />
            ))}
            {[800, 1100, 1400, 1700].map((val) => (
              <line
                key={`grid-x-${val}`}
                x1={scaleX(val)}
                y1={padding}
                x2={scaleX(val)}
                y2={svgHeight - padding}
                stroke="#1E293B"
                strokeDasharray="3 3"
              />
            ))}

            {/* X and Y Axes */}
            <line
              x1={padding}
              y1={svgHeight - padding}
              x2={svgWidth - padding + 10}
              y2={svgHeight - padding}
              stroke="#64748B"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <line
              x1={padding}
              y1={svgHeight - padding}
              x2={padding}
              y2={padding - 10}
              stroke="#64748B"
              strokeWidth="2"
            />

            {/* Axis Labels */}
            <text
              x={svgWidth / 2}
              y={svgHeight - 10}
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {isBn ? 'ফ্ল্যাটের সাইজ X (বর্গফুট)' : 'House Size X (sq ft)'}
            </text>
            <text
              x={15}
              y={svgHeight / 2}
              fill="#94A3B8"
              fontSize="11"
              textAnchor="middle"
              transform={`rotate(-90, 15, ${svgHeight / 2})`}
              fontFamily="sans-serif"
            >
              {isBn ? 'মূল্য y (লাখ ৳)' : 'Price y (Lakhs)'}
            </text>

            {/* Regression Line */}
            <motion.line
              x1={pt1.x}
              y1={pt1.y}
              x2={pt2.x}
              y2={pt2.y}
              stroke="#F43F5E"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={false}
              animate={{ x1: pt1.x, y1: pt1.y, x2: pt2.x, y2: pt2.y }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />

            {/* Residuals (error distance lines) */}
            {showResiduals &&
              dataPoints.map((pt, i) => {
                const predY = slope * (pt.x - 600) + intercept * 20 + 20;
                const px = scaleX(pt.x);
                const py = scaleY(pt.y);
                const predPy = scaleY(predY);
                return (
                  <motion.line
                    key={`res-${i}`}
                    x1={px}
                    y1={py}
                    x2={px}
                    y2={predPy}
                    stroke="#F43F5E"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    initial={false}
                    animate={{ y2: predPy }}
                    transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  />
                );
              })}

            {/* Actual Data Points */}
            {dataPoints.map((pt, i) => {
              const cx = scaleX(pt.x);
              const cy = scaleY(pt.y);
              return (
                <g key={`pt-${i}`} className="cursor-pointer group">
                  <circle
                    cx={cx}
                    cy={cy}
                    r="5.5"
                    fill="#38BDF8"
                    stroke="#0284C7"
                    strokeWidth="2"
                    className="group-hover:scale-125 transition-transform"
                  />
                  <circle cx={cx} cy={cy} r="2" fill="#FFFFFF" />
                </g>
              );
            })}

            {/* Interactive Query Point for House Size Slider */}
            <motion.g
              animate={{
                x: scaleX(houseSize),
                y: scaleY(parseFloat(predictedHousePrice)),
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            >
              <circle r="8" fill="#F43F5E" fillOpacity="0.3" className="animate-ping" />
              <circle r="6" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="2" />
            </motion.g>
          </svg>

          {/* Plot Footer Legends */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-2">
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              {isBn ? 'প্রকৃত ডেটা (Actual)' : 'Actual Data Point'}
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-4 h-0.5 bg-rose-500 rounded" />
              {isBn ? 'রিগ্রেশন লাইন (y = mx + b)' : 'Regression Line (y = mx + b)'}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-4 h-0.5 border-b border-dashed border-rose-400" />
              {isBn ? 'ত্রুটি (Error / Residual)' : 'Error (Residual)'}
            </span>
          </div>
        </div>

        {/* Controls & Real-Time Calculation (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Sliders for m (Slope) and b (Intercept) */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-rose-400" />
                {isBn ? 'ঢাল (Slope m):' : 'Slope (m):'}
              </span>
              <span className="font-mono text-rose-400 font-bold">{slope.toFixed(4)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.08"
              step="0.002"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
              className="w-full accent-rose-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-300 font-medium">
                {isBn ? 'ছেদক (Intercept b):' : 'Y-Intercept (b):'}
              </span>
              <span className="font-mono text-rose-400 font-bold">{(intercept * 20).toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-1"
              max="2"
              step="0.1"
              value={intercept}
              onChange={(e) => setIntercept(parseFloat(e.target.value))}
              className="w-full accent-rose-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />

            <label className="flex items-center gap-2 pt-1 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showResiduals}
                onChange={(e) => setShowResiduals(e.target.checked)}
                className="rounded accent-rose-500"
              />
              <span>{isBn ? 'ত্রুটির দাগ (Residual lines) দেখান' : 'Show Error (Residual) Lines'}</span>
            </label>
          </div>

          {/* Real-World Prediction Calculator Box */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/20 to-slate-950 border border-rose-500/20 space-y-3">
            <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
              <span>🏡</span>
              <span>
                {isBn ? 'লাইভ ফ্ল্যাটের দাম প্রেডিক্টর' : 'Live House Price Predictor'}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{isBn ? 'ফ্ল্যাটের সাইজ:' : 'House Floor Size:'}</span>
                <span className="font-mono font-bold text-white">{houseSize} sq ft</span>
              </div>
              <input
                type="range"
                min="650"
                max="1950"
                step="50"
                value={houseSize}
                onChange={(e) => setHouseSize(parseInt(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Calculated Output Badge */}
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
              <span className="text-xs text-slate-300">
                {isBn ? 'মডেলের পূর্বাভাষকৃত মূল্য:' : 'Predicted Price:'}
              </span>
              <span className="font-mono text-base font-extrabold text-rose-400">
                {predictedHousePrice} {isBn ? 'লাখ টাকা' : 'Lakhs'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
