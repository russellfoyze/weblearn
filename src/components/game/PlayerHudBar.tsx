'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Gamepad2, Sparkles, Flame, Coins, Zap } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';

export default function PlayerHudBar() {
  const {
    xp,
    level,
    xpInLevel,
    xpRequiredForNext,
    coins,
    streak,
    openGame,
    setQuestDrawerOpen,
    lastAward,
  } = useGame();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const progressPercent = Math.min(100, Math.round((xpInLevel / xpRequiredForNext) * 100));

  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-800/80 px-4 py-2 select-none z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Player Level & XP Bar */}
        <div className="flex items-center gap-3">
          {/* Level Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 font-mono font-bold shadow-sm">
            <span className="text-amber-400">⚡</span>
            <span>
              {isBn ? 'লেভেল' : 'LVL'} {level}
            </span>
          </div>

          {/* XP Progress Bar */}
          <div className="hidden sm:flex flex-col gap-1 w-36 lg:w-48">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>XP: {xp}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400"
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Coins & Streak */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300">
              <span>🪙</span>
              <span>{coins}</span>
            </span>

            <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-rose-400 font-bold">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>{streak} {isBn ? 'দিন' : 'd'}</span>
            </span>
          </div>
        </div>

        {/* Right: Quest Log & Game Arena Launch Buttons */}
        <div className="flex items-center gap-2">
          {/* Quests Button */}
          <button
            onClick={() => setQuestDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-850 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-bold transition shadow-sm"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? 'কোয়েস্ট ও ট্রফি' : 'Quests & Trophies'}</span>
          </button>

          {/* Master Play Game Arcade Button */}
          <button
            onClick={() => openGame('linear-regression')}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500 hover:from-cyan-400 hover:to-rose-400 text-slate-950 font-black text-xs transition shadow-md shadow-cyan-950/50 hover:scale-105 active:scale-95"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-slate-950 animate-bounce" />
            <span>{isBn ? '🎮 গেম খেলুন (Play Arcade)' : '🎮 PLAY ARCADE'}</span>
          </button>
        </div>
      </div>

      {/* Floating XP Award Toast */}
      <AnimatePresence>
        {lastAward && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/95 border-2 border-amber-400 text-white font-mono text-xs shadow-2xl shadow-amber-950/60"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>
              <strong className="text-amber-400">+{lastAward.xp} XP</strong> • {lastAward.reason}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
