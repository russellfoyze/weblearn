'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gamepad2, Award, Zap, Crosshair, Shield, GitBranch, Radio, Sparkles } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';

// Import Mini Games
import LinearSniperGame from './LinearSniperGame';
import SpamDefenderGame from './SpamDefenderGame';
import DecisionMazeGame from './DecisionMazeGame';
import KnnRadarGame from './KnnRadarGame';

export default function GameArenaModal() {
  const { isGameModalOpen, closeGame, activeGameId, xp, level, coins } = useGame();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [selectedTab, setSelectedTab] = useState<'linear' | 'spam' | 'tree' | 'knn'>('linear');

  // Sync selectedTab if activeGameId changed
  useEffect(() => {
    if (activeGameId) {
      if (activeGameId.includes('linear')) setSelectedTab('linear');
      else if (activeGameId.includes('logistic') || activeGameId.includes('spam')) setSelectedTab('spam');
      else if (activeGameId.includes('tree') || activeGameId.includes('forest')) setSelectedTab('tree');
      else if (activeGameId.includes('knn') || activeGameId.includes('radar')) setSelectedTab('knn');
    }
  }, [activeGameId]);

  if (!isGameModalOpen) return null;

  const gameTabs = [
    {
      id: 'linear',
      name: isBn ? '১. লিনিয়ার স্নাইপার' : '1. Linear Sniper',
      icon: Crosshair,
      color: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
    },
    {
      id: 'spam',
      name: isBn ? '২. স্প্যাম ডিফেন্ডার' : '2. Spam Defender',
      icon: Shield,
      color: 'text-sky-400 border-sky-500/40 bg-sky-500/10',
    },
    {
      id: 'tree',
      name: isBn ? '৩. ডিসিশন মেজ' : '3. Decision Dungeon',
      icon: GitBranch,
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    },
    {
      id: 'knn',
      name: isBn ? '৪. কেএনএন রাডার' : '4. KNN Radar',
      icon: Radio,
      color: 'text-violet-400 border-violet-500/40 bg-violet-500/10',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/50 p-4 sm:p-6 space-y-5"
        >
          {/* Top Bar: Arcade Title + Player HUD + Close */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-lg">
                <Gamepad2 className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                    {isBn ? 'নেক্সটজেন এমএল আর্কেড এরিনা' : 'NextGen ML Arcade Arena'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold">
                    PLAY &amp; LEARN
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  {isBn
                    ? 'গেম খেলে মেশিন লার্নিংয়ের অ্যালগরিদম শিখুন ও এক্সপি জিতুন'
                    : 'Master core algorithms through fast-paced mini-games & earn XP'}
                </p>
              </div>
            </div>

            {/* Right cluster: Player Level & Coins & Close */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <span className="text-amber-400 font-bold">Lv. {level}</span>
                <span className="text-slate-500">•</span>
                <span className="text-cyan-400">{xp} XP</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-300">🪙 {coins}</span>
              </div>

              <button
                onClick={closeGame}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 border border-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Arcade Game Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {gameTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as 'linear' | 'spam' | 'tree' | 'knn')}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 text-xs font-bold ${
                    isActive
                      ? tab.color + ' ring-2 ring-cyan-500/30 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Mini Game Stage */}
          <div className="pt-2">
            {selectedTab === 'linear' && <LinearSniperGame />}
            {selectedTab === 'spam' && <SpamDefenderGame />}
            {selectedTab === 'tree' && <DecisionMazeGame />}
            {selectedTab === 'knn' && <KnnRadarGame />}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
