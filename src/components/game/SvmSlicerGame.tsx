'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Shield, Zap, RotateCcw, Sliders, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

export default function SvmSlicerGame() {
  const { language } = useLanguage();
  const { addXP, addCoins, recordScore } = useGame();
  const isBn = language === 'bn';

  const [marginWidth, setMarginWidth] = useState<number>(28);
  const [isSliced, setIsSliced] = useState<boolean>(false);
  const [result, setResult] = useState<{ rank: 'S' | 'A' | 'B' | 'FAIL'; score: number } | null>(null);

  const width = 460;
  const height = 240;
  const centerX = 230;

  // Left territory (Red) and Right territory (Blue)
  const leftAliens = [
    { x: 90, y: 60 },
    { x: 130, y: 110 },
    { x: 150, y: 70 },
    { x: 175, y: 140, isSV: true },
    { x: 140, y: 180 },
  ];

  const rightAliens = [
    { x: 285, y: 100, isSV: true },
    { x: 320, y: 60 },
    { x: 310, y: 160 },
    { x: 350, y: 120 },
    { x: 380, y: 170 },
  ];

  const handleTestMargin = () => {
    setIsSliced(true);
    soundEffects.playLaser();

    // Check collision: left bound is centerX - marginWidth, right bound is centerX + marginWidth
    // Max safe margin is ~54px (left alien closest is 175, so 230 - 175 = 55)
    // right alien closest is 285, so 285 - 230 = 55
    const collision = marginWidth > 54;

    setTimeout(() => {
      setIsSliced(false);
      if (collision) {
        soundEffects.playFail();
        setResult({ rank: 'FAIL', score: 0 });
      } else if (marginWidth >= 48) {
        soundEffects.playLevelUp();
        setResult({ rank: 'S', score: 1200 });
        addXP(160, 'SVM Maximum Margin Master (S-Rank)');
        addCoins(45);
        recordScore('svm_slicer', 1200);
      } else if (marginWidth >= 36) {
        soundEffects.playSuccess();
        setResult({ rank: 'A', score: 800 });
        addXP(100, 'SVM Margin Slicer (A-Rank)');
        addCoins(25);
        recordScore('svm_slicer', 800);
      } else {
        soundEffects.playSuccess();
        setResult({ rank: 'B', score: 500 });
        addXP(60, 'SVM Margin (B-Rank)');
        addCoins(15);
      }
    }, 600);
  };

  const handleReset = () => {
    setMarginWidth(28);
    setResult(null);
  };

  return (
    <div className="space-y-4 select-none">
      {/* Header ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-fuchsia-500/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/40 flex items-center justify-center font-bold">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">
              {isBn ? 'মিশন: হাইপারপ্লেন ম্যাক্স-মার্জিন স্লাইসার' : 'Mission: Hyperplane Max-Margin Slicer'}
            </div>
            <div className="text-[10px] text-slate-400">
              {isBn
                ? 'এলিয়েন স্পর্শ না করে মার্জিন সড়ক সর্বোচ্চ প্রশস্ত করুন!'
                : 'Maximize the boundary corridor without touching any alien outpost!'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-fuchsia-300">
            Margin: <strong>{marginWidth}px</strong> / 54px max
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Battlefield SVG Screen */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-2 sm:p-4 overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none overflow-visible">
          {/* Margin Corridor Shading */}
          <rect
            x={centerX - marginWidth}
            y="20"
            width={marginWidth * 2}
            height={height - 40}
            fill="#D946EF"
            fillOpacity={marginWidth > 54 ? 0.35 : 0.12}
            stroke={marginWidth > 54 ? '#F43F5E' : '#D946EF'}
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Central Hyperplane */}
          <line
            x1={centerX}
            y1="15"
            x2={centerX}
            y2={height - 15}
            stroke="#FFFFFF"
            strokeWidth={isSliced ? 4 : 2}
            className={isSliced ? 'drop-shadow-[0_0_12px_#D946EF]' : ''}
          />

          {/* Left Aliens (Red) */}
          {leftAliens.map((alien, i) => (
            <g key={`la-${i}`}>
              {alien.isSV && (
                <circle
                  cx={alien.x}
                  cy={alien.y}
                  r="12"
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                  className="animate-spin"
                  style={{ transformOrigin: `${alien.x}px ${alien.y}px`, animationDuration: '4s' }}
                />
              )}
              <polygon
                points={`${alien.x},${alien.y - 7} ${alien.x - 6},${alien.y + 5} ${alien.x + 6},${alien.y + 5}`}
                fill="#F43F5E"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </g>
          ))}

          {/* Right Aliens (Blue) */}
          {rightAliens.map((alien, i) => (
            <g key={`ra-${i}`}>
              {alien.isSV && (
                <circle
                  cx={alien.x}
                  cy={alien.y}
                  r="12"
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                  className="animate-spin"
                  style={{ transformOrigin: `${alien.x}px ${alien.y}px`, animationDuration: '4s' }}
                />
              )}
              <circle
                cx={alien.x}
                cy={alien.y}
                r="6.5"
                fill="#0EA5E9"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </g>
          ))}
        </svg>

        {/* Result Overlay */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3 z-30"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black border-2 ${
                  result.rank === 'S'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                    : result.rank === 'A'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                    : result.rank === 'B'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400'
                    : 'bg-rose-500/20 text-rose-300 border-rose-400'
                }`}
              >
                {result.rank}
              </div>
              <h4 className="text-base font-bold text-white">
                {result.rank === 'FAIL'
                  ? isBn
                    ? 'সংঘর্ষ! মার্জিন এলিয়েনদের স্পর্শ করেছে'
                    : 'COLLISION! Margin breached an outpost!'
                  : isBn
                  ? 'সর্বোচ্চ মার্জিন সফলভাবে লক করা হয়েছে!'
                  : 'MAX-MARGIN STREET ESTABLISHED!'}
              </h4>
              <button
                onClick={() => setResult(null)}
                className="px-5 py-2 rounded-xl bg-fuchsia-500 text-white font-bold text-xs shadow-lg transition"
              >
                {isBn ? 'আবার চেষ্টা করুন' : 'Try Again'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-fuchsia-400" />
              {isBn ? 'মার্জিন প্রশস্ততা (2 / ||w||):' : 'Margin Clearance Width:'}
            </span>
            <span className="text-fuchsia-400 font-bold">{marginWidth}px</span>
          </div>
          <input
            type="range"
            min="20"
            max="65"
            step="2"
            value={marginWidth}
            onChange={(e) => setMarginWidth(parseInt(e.target.value))}
            className="w-full accent-fuchsia-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
          />
        </div>

        <div className="sm:col-span-4">
          <button
            onClick={handleTestMargin}
            disabled={isSliced}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-fuchsia-950/50 hover:scale-[1.02] active:scale-95 transition"
          >
            <Zap className="w-4 h-4" />
            <span>{isBn ? '⚡ মার্জিন লক করুন' : '⚡ LOCK HYPERPLANE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
