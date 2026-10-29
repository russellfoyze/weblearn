'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Zap, RotateCcw, Award, Sliders, Trophy } from 'lucide-react';
import { soundEffects } from '@/utils/soundEffects';
import { useLanguage } from '@/context/LanguageContext';
import { useGame } from '@/context/GameContext';

export default function LinearSniperGame() {
  const { language } = useLanguage();
  const { addXP, addCoins, recordScore } = useGame();
  const isBn = language === 'bn';

  // Game state
  const [slope, setSlope] = useState<number>(0.02);
  const [intercept, setIntercept] = useState<number>(1.5);
  const [isFiring, setIsFiring] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<{
    rank: 'S' | 'A' | 'B' | 'C' | null;
    mse: number;
    score: number;
  } | null>(null);

  // Targets to hit
  const targets = [
    { x: 100, y: 55 },
    { x: 180, y: 70 },
    { x: 250, y: 110 },
    { x: 310, y: 140 },
    { x: 380, y: 190 },
    { x: 440, y: 220 },
  ];

  const svgWidth = 500;
  const svgHeight = 280;

  // Calculate coordinates for the laser line
  // y = slope * (x - 80) * 10 + intercept * 20
  const getY = (x: number) => slope * (x - 60) * 5 + intercept * 20 + 20;

  const yStart = getY(40);
  const yEnd = getY(460);

  // Calculate MSE
  const calculateMSE = () => {
    let sum = 0;
    targets.forEach((t) => {
      const predY = getY(t.x);
      sum += Math.pow(t.y - predY, 2);
    });
    return Math.round((sum / targets.length) * 10) / 10;
  };

  const handleFireLaser = () => {
    setIsFiring(true);
    soundEffects.playLaser();

    const mse = calculateMSE();
    let rank: 'S' | 'A' | 'B' | 'C' = 'C';
    let earnedXp = 40;
    let earnedCoins = 10;
    let score = 500;

    if (mse <= 18) {
      rank = 'S';
      earnedXp = 150;
      earnedCoins = 40;
      score = 1200;
      soundEffects.playLevelUp();
    } else if (mse <= 38) {
      rank = 'A';
      earnedXp = 100;
      earnedCoins = 25;
      score = 850;
      soundEffects.playSuccess();
    } else if (mse <= 70) {
      rank = 'B';
      earnedXp = 60;
      earnedCoins = 15;
      score = 650;
      soundEffects.playSuccess();
    } else {
      soundEffects.playFail();
    }

    setTimeout(() => {
      setIsFiring(false);
      setGameResult({ rank, mse, score });
      recordScore('linear_sniper', score);
      addXP(earnedXp, `Sniper Laser ${rank}-Rank`);
      addCoins(earnedCoins);
    }, 600);
  };

  const handleReset = () => {
    setSlope(0.02);
    setIntercept(1.5);
    setGameResult(null);
  };

  const currentMSE = calculateMSE();

  return (
    <div className="space-y-4 select-none">
      {/* Game Header Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/80 border border-rose-500/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold">
            <Crosshair className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">
              {isBn ? 'মিশন: রিগ্রেশন লেজার গানার' : 'Mission: Regression Laser Sniper'}
            </div>
            <div className="text-[10px] text-slate-400">
              {isBn
                ? 'ঢাল ও ইন্টারসেপ্ট ঘুরিয়ে সর্বনিম্ন ত্রুটিতে টার্গেট ধ্বংস করুন!'
                : 'Adjust slope and intercept to slice targets with minimum MSE error!'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            {isBn ? 'ত্রুটি (MSE):' : 'Error (MSE):'}{' '}
            <strong
              className={
                currentMSE <= 20
                  ? 'text-emerald-400'
                  : currentMSE <= 50
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }
            >
              {currentMSE}
            </strong>
          </span>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Arcade Radar Screen (SVG Canvas) */}
      <div className="relative rounded-2xl bg-slate-950 border-2 border-slate-800 p-2 sm:p-4 overflow-hidden shadow-2xl">
        {/* Retro scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none opacity-40 animate-pulse" />

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Grid lines */}
          {[60, 120, 180, 240].map((y) => (
            <line
              key={`gy-${y}`}
              x1="30"
              y1={y}
              x2={svgWidth - 30}
              y2={y}
              stroke="#1E293B"
              strokeDasharray="4 4"
            />
          ))}
          {[100, 200, 300, 400].map((x) => (
            <line
              key={`gx-${x}`}
              x1={x}
              y1="20"
              x2={x}
              y2={svgHeight - 20}
              stroke="#1E293B"
              strokeDasharray="4 4"
            />
          ))}

          {/* Residual guide lines from targets to current laser beam */}
          {targets.map((t, idx) => {
            const predY = getY(t.x);
            return (
              <line
                key={`guide-${idx}`}
                x1={t.x}
                y1={t.y}
                x2={t.x}
                y2={predY}
                stroke="#F43F5E"
                strokeWidth="1.5"
                strokeDasharray="2 2"
                strokeOpacity="0.6"
              />
            );
          })}

          {/* The Laser Beam Line */}
          <line
            x1={40}
            y1={yStart}
            x2={460}
            y2={yEnd}
            stroke={isFiring ? '#FFFFFF' : '#F43F5E'}
            strokeWidth={isFiring ? 6 : 3}
            strokeLinecap="round"
            className={`transition-all duration-300 ${isFiring ? 'drop-shadow-[0_0_14px_#F43F5E]' : ''}`}
          />

          {/* Target Orbs */}
          {targets.map((t, idx) => {
            const predY = getY(t.x);
            const dist = Math.abs(t.y - predY);
            const isTargetHit = dist < 12;

            return (
              <g key={`target-${idx}`}>
                {/* Glow ring */}
                <circle
                  cx={t.x}
                  cy={t.y}
                  r="12"
                  fill="none"
                  stroke={isTargetHit ? '#10B981' : '#38BDF8'}
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                  className="animate-spin"
                  style={{ transformOrigin: `${t.x}px ${t.y}px`, animationDuration: '4s' }}
                />
                {/* Center target node */}
                <circle
                  cx={t.x}
                  cy={t.y}
                  r="6"
                  fill={isTargetHit ? '#10B981' : '#38BDF8'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <circle cx={t.x} cy={t.y} r="2" fill="#FFFFFF" />
              </g>
            );
          })}
        </svg>

        {/* Victory/Result Modal Overlay */}
        <AnimatePresence>
          {gameResult && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3 z-30"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black shadow-2xl border-2 ${
                  gameResult.rank === 'S'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                    : gameResult.rank === 'A'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                    : 'bg-rose-500/20 text-rose-300 border-rose-400'
                }`}
              >
                {gameResult.rank}
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">
                  {gameResult.rank === 'S'
                    ? isBn
                      ? 'অসাধারণ নিখুঁত হিট (S-Rank)!'
                      : 'PERFECT S-RANK SNIPER!'
                    : gameResult.rank === 'A'
                    ? isBn
                      ? 'চমৎকার হিট (A-Rank)!'
                      : 'GREAT A-RANK HIT!'
                    : isBn
                    ? 'ভালো চেষ্টা! আরেকটু সমন্বয় করুন'
                    : 'GOOD ATTEMPT! TUNE CLOSER'}
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  MSE: <strong>{gameResult.mse}</strong> • Score: <strong>+{gameResult.score} pts</strong>
                </p>
              </div>

              <button
                onClick={() => setGameResult(null)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition hover:scale-105"
              >
                {isBn ? 'আবার খেলুন' : 'Play Again'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Weapon Controls: Slope & Intercept & Fire Button */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-8 p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          {/* Slope Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1">
                <Sliders className="w-3 h-3 text-rose-400" />
                {isBn ? 'লেজার কোণ / ঢাল (m):' : 'Laser Slope (m):'}
              </span>
              <span className="text-rose-400 font-bold">{slope.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.005"
              max="0.045"
              step="0.001"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
              className="w-full accent-rose-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Intercept Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">{isBn ? 'উচ্চতা / ছেদক (b):' : 'Height / Intercept (b):'}</span>
              <span className="text-rose-400 font-bold">{(intercept * 20).toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-0.5"
              max="3.0"
              step="0.1"
              value={intercept}
              onChange={(e) => setIntercept(parseFloat(e.target.value))}
              className="w-full accent-rose-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>
        </div>

        {/* Big Fire Button */}
        <div className="sm:col-span-4">
          <button
            onClick={handleFireLaser}
            disabled={isFiring}
            className="w-full py-5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-rose-950/50 hover:scale-[1.02] active:scale-95 transition"
          >
            <Zap className={`w-4 h-4 ${isFiring ? 'animate-bounce' : ''}`} />
            <span>{isBn ? '🔥 লেজার ফায়ার করুন!' : '🔥 FIRE LASER!'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
