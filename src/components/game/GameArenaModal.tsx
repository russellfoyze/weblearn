'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Gamepad2,
  Award,
  Zap,
  Crosshair,
  Shield,
  GitBranch,
  Radio,
  Sparkles,
  Trees,
  Maximize2,
  Users,
} from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { useLanguage } from '@/context/LanguageContext';

// Import all 7 Mini Games
import LinearSniperGame from './LinearSniperGame';
import SpamDefenderGame from './SpamDefenderGame';
import DecisionMazeGame from './DecisionMazeGame';
import ForestBattleGame from './ForestBattleGame';
import SvmSlicerGame from './SvmSlicerGame';
import KnnRadarGame from './KnnRadarGame';
import KMeansGalaxyGame from './KMeansGalaxyGame';

export type GameTabType = 'linear' | 'spam' | 'tree' | 'forest' | 'svm' | 'knn' | 'kmeans';

export default function GameArenaModal() {
  const { isGameModalOpen, closeGame, activeGameId, xp, level, coins } = useGame();
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [selectedTab, setSelectedTab] = useState<GameTabType>('linear');

  // Sync selectedTab whenever activeGameId is opened
  useEffect(() => {
    if (activeGameId) {
      if (activeGameId.includes('linear')) setSelectedTab('linear');
      else if (activeGameId.includes('logistic') || activeGameId.includes('spam')) setSelectedTab('spam');
      else if (activeGameId.includes('forest')) setSelectedTab('forest');
      else if (activeGameId.includes('tree') || activeGameId.includes('decision')) setSelectedTab('tree');
      else if (activeGameId.includes('svm') || activeGameId.includes('vector')) setSelectedTab('svm');
      else if (activeGameId.includes('knn') || activeGameId.includes('neighbor') || activeGameId.includes('radar')) setSelectedTab('knn');
      else if (activeGameId.includes('means') || activeGameId.includes('cluster') || activeGameId.includes('galaxy')) setSelectedTab('kmeans');
    }
  }, [activeGameId]);

  if (!isGameModalOpen) return null;

  const gameTabs = [
    {
      id: 'linear' as GameTabType,
      name: isBn ? '১. লিনিয়ার স্নাইপার' : '1. Linear Sniper',
      icon: Crosshair,
      color: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
    },
    {
      id: 'spam' as GameTabType,
      name: isBn ? '২. স্প্যাম ডিফেন্ডার' : '2. Spam Defender',
      icon: Shield,
      color: 'text-sky-400 border-sky-500/40 bg-sky-500/10',
    },
    {
      id: 'tree' as GameTabType,
      name: isBn ? '৩. ডিসিশন মেজ' : '3. Decision Dungeon',
      icon: GitBranch,
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    },
    {
      id: 'forest' as GameTabType,
      name: isBn ? '৪. ফরেস্ট কাউন্সিল' : '4. Forest Council',
      icon: Trees,
      color: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    },
    {
      id: 'svm' as GameTabType,
      name: isBn ? '৫. এসভিএম স্লাইসার' : '5. SVM Slicer',
      icon: Maximize2,
      color: 'text-fuchsia-400 border-fuchsia-500/40 bg-fuchsia-500/10',
    },
    {
      id: 'knn' as GameTabType,
      name: isBn ? '৬. কেএনএন রাডার' : '6. KNN Radar',
      icon: Radio,
      color: 'text-violet-400 border-violet-500/40 bg-violet-500/10',
    },
    {
      id: 'kmeans' as GameTabType,
      name: isBn ? '৭. গ্যালাক্সি ক্লাস্টার' : '7. Galaxy Cluster',
      icon: Users,
      color: 'text-teal-400 border-teal-500/40 bg-teal-500/10',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-xl select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/60 p-4 sm:p-6 space-y-4"
        >
          {/* Top Bar: Title + HUD + Close */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
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
                    7 GAMES ACTIVE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  {isBn
                    ? 'গেম খেলে মেশিন লার্নিংয়ের অ্যালগরিদম শিখুন ও এক্সপি জিতুন'
                    : 'Master all 7 algorithms through fast-paced mini-games & earn XP'}
                </p>
              </div>
            </div>

            {/* Right cluster: Player Level & Coins & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
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

          {/* Arcade Game Selector Tabs (All 7 Games) */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {gameTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? tab.color + ' ring-2 ring-cyan-500/40 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Mini Game Stage */}
          <div className="pt-2">
            {selectedTab === 'linear' && <LinearSniperGame />}
            {selectedTab === 'spam' && <SpamDefenderGame />}
            {selectedTab === 'tree' && <DecisionMazeGame />}
            {selectedTab === 'forest' && <ForestBattleGame />}
            {selectedTab === 'svm' && <SvmSlicerGame />}
            {selectedTab === 'knn' && <KnnRadarGame />}
            {selectedTab === 'kmeans' && <KMeansGalaxyGame />}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
